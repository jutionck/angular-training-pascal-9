import { Component, OnInit } from '@angular/core';
import { Todo } from './model/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: Todo[] = [];
  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todos = [
      {
        id: 1,
        name: 'Makan',
        isDone: false
      },
      {
        id: 2,
        name: 'Minum',
        isDone: true
      }
    ];
  }

  onSaveTodo(todo: Todo): void {
    todo.id = this.todos.length + 1;
    this.todos.push(todo);
  }

}
