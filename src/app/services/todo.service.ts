import { Injectable } from '@angular/core';
import { Todo } from 'src/app/interfaces/todo';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoTitle: string ='';
  idForTodo: number = 4;
  private beforeEditCache: string = '';
  filter: string = 'all';
  private todos: Todo[] = [];


  constructor(private http: HttpClient) {
      this.todos=this.getTodos();
   }

  getTodos(): Todo[]{
     this.http.get<Todo[]>(API_URL).subscribe((data) => {
      if (data) {
        this.todos = data.reverse();
      }
    });
    return this.todos;
  }

  addTodo(todoTitle: string): void {
    if (todoTitle.trim().length === 0)  {
      return ;
    }
    this.http.post<Todo[]>(API_URL, {
      title: todoTitle,
      completed: false
    })
    .subscribe((response: any) => {
      this.todos.push({
        id: response.id,
        title: todoTitle,
        completed: false,
        editing: false
      });
    });
    this.idForTodo++;
  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
     if (!todo.title.trim().length) {
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;
    this.http.patch(API_URL + '/todos/' + todo.id, {
      title: todo.title,
      completed: todo.completed
    })
  }

  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  deleteTodo(id: number): void {
    this.http
    .delete(`${API_URL}/${id}`)
    .subscribe((data) => {
      this.todos = this.todos.filter(todo => todo.id !== id);
    });
  }

  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  atLeastOneCompleted(): boolean {
    return this.todos.filter(todo => todo.completed).length > 0;
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
    const completed = this.todos
    .filter(todo => todo.completed)
    .map(todo => todo.id)

  this.http.request('delete', API_URL + '/todosDeleteCompleted', {
    body: {
      todos: completed
    }
  }).subscribe((response: any) => {
    this.todos = this.todos.filter(todo => !todo.completed);
  })
  }

  checkAllTodos(): void {
    this.todos.forEach(todo => todo.completed = (<HTMLInputElement>event?.target).checked)
  }

  todosFiltered(): Todo[] {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }
    return this.todos;
  }

}
