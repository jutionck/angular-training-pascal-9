import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, Observer } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/response.model';
import Swal from 'sweetalert2';
import { TodoField } from '../model/todo-field.model';
import { Todo } from '../model/todo.model';
import { TodosService } from '../services/todos.service';

const TODO_URL = '/demo/todos';
@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  id?: string; // bisa di pake untuk sweetAlert2
  subcriber?: Observer<any>;
  field: typeof TodoField = TodoField;
  todoForm: FormGroup = new FormGroup({
    [TodoField.ID]: new FormControl(null),
    [TodoField.NAME]: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    [TodoField.IS_COMPLETED]: new FormControl(false),
  });

  constructor(
    private readonly todoService: TodosService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map((params: Params) => {
        return params['id'] ? params['id'] : ''
      })
    ).subscribe((id: string) => {
      this.todoService.get(id).subscribe((response: ApiResponse<Todo>) => {
        this.setFormValue(response.data);
      })
      this.id = id; // pengecekan sweetAlert2
    });
  }

  onSubmitTodo(): void {
    const todo: Todo = this.todoForm.value;
    if (!todo.isCompleted) {
      todo.isCompleted = false;
    }
    this.todoService.save(todo).subscribe(() => {
      if (this.id) {
        Swal.fire({
          icon: 'success',
          title: `Todo ${todo.name} telah di ubah!`,
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: `Todo ${todo.name} telah di tambah!`,
          showConfirmButton: false,
          timer: 1500
        });
      }
      this.router.navigateByUrl(TODO_URL);
      this.todoForm.reset();
    });
  }

  setFormValue(todo: Todo): void {
    this.todoForm.get(TodoField.ID)?.setValue(todo.id);
    this.todoForm.get(TodoField.NAME)?.setValue(todo.name);
    this.todoForm.get(TodoField.IS_COMPLETED)?.setValue(todo.isCompleted);
  }

  isFieldValid(todoField: TodoField): string {
    const control: AbstractControl = this.todoForm.get(todoField) as AbstractControl;
    if (control && control.touched && control.invalid) {
      return 'is-invalid';
    } else if (control && control.valid) {
      return 'is-valid';
    } else {
      return '';
    }
  }

}
