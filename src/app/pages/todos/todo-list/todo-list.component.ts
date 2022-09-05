import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() todos: Todo[] = [];
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() toggleTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  title: string = 'List';
  constructor() { }

  ngOnInit(): void {
  }

  onCheckTodo(todo: Todo): void {
    todo.isDone = !todo.isDone;
    this.toggleTodo.emit(todo);
  }

  onSelectTodo(todo: Todo): void {
    this.editTodo.emit(todo);
  }

  onDeleteTodo(todo: Todo): void {
    this.deleteTodo.emit(todo)
  }

}
