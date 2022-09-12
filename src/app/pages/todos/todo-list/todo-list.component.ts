import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/response.model';
import Swal from 'sweetalert2';
import { Todo } from '../model/todo.model';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  title: string = 'List';
  isLoading: boolean = false;
  subcriber?: Observer<any>;
  constructor(
    private readonly todoService: TodosService
  ) { }

  ngOnInit(): void {
    this.loadTodo();
    this.todoService.notify().subscribe((notify: boolean) => {
      console.log('notify:', notify);
      if (notify) this.loadTodo();
    })
  }

  loadTodo(): void {
    this.isLoading = true;
    this.todoService.list()
      .subscribe({
        next: (response: ApiResponse<Todo[]>) => {
          this.isLoading = false;
          this.todos = response.data
        },
        error: console.error,
      });
  }

  onCheckTodo(todo: Todo): void {
    this.todoService.checked(todo).subscribe();
  }

  onDeleteTodo(todo: Todo): void {
    if (todo.isCompleted) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Can\'t delete todo',
      })
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
          this.todoService.remove(todo.id).subscribe();
        }
      });
    }
  }
}
