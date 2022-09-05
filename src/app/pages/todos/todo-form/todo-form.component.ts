import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoField } from '../model/todo-field.model';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnChanges {
  @Input() todo?: Todo;
  @Output() todoChange: EventEmitter<Todo> = new EventEmitter<Todo>();
  // @Output() saveTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  todoForm!: FormGroup;
  buildForm(): void {
    this.todoForm = new FormGroup({
      [TodoField.ID]: new FormControl(null),
      [TodoField.NAME]: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      [TodoField.IS_DONE]: new FormControl(false),
    })
  }

  ngOnChanges(): void {
    this.setFormValue()
  }

  ngOnInit(): void {
    this.buildForm()
  }

  onSubmitTodo(): void {
    this.todoChange.emit(this.todoForm.value);
    this.todoForm.reset();
  }

  setFormValue(): void {
    if (this.todo) {
      // Cara 1
      this.todoForm.get(TodoField.ID)?.setValue(this.todo.id);
      this.todoForm.get(TodoField.NAME)?.setValue(this.todo.name);
      this.todoForm.get(TodoField.IS_DONE)?.setValue(this.todo.isDone);
    } else if (this.todoForm) {
      this.todoForm.reset()
    }
  }
}
