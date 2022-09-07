import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  constructor(
    private readonly todoService: TodosService
  ) { }

  ngOnInit(): void {
    this.loadTodo()
  }

  loadTodo(): void {
    this.todos = this.todoService.list()
  }

  onCheckTodo(todo: Todo): void {
    this.todoService.checked(todo);
  }

  onDeleteTodo(todo: Todo): void {
    if (todo.isDone) {
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
          this.todoService.remove(todo.id);
        }
      });
    }
  }
}
