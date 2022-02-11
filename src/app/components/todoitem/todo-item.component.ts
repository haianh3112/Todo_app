import { Component, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/interfaces/todo';
import { EventEmitter } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;


  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }


}
