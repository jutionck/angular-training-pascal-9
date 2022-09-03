import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() saveTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  todoForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    isDone: new FormControl(false),
  })
  constructor() { }

  ngOnInit(): void {
  }

  onSubmitTodo(): void {
    this.saveTodo.emit(this.todoForm.value);
    this.todoForm.reset();
  }

}
