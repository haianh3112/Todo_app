import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
  providers : [TodoService]

})
export class TodolistComponent implements OnInit {

  todoTitle: string;


  constructor(private todoService: TodoService) {
  }

  ngOnInit() {

    this.todoTitle = '';

  }
  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return alert("Error");
    }
    else

    this.todoService.addTodo(this.todoTitle);

    this.todoTitle = '';
    debugger;
  }

}
