import { Component, OnInit } from '@angular/core';
import { Todo } from './model/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: Todo[] = [];
  todo?: Todo;

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    const sessionTodos: string = sessionStorage.getItem('todos') as string;
    if (!sessionTodos) {
      const todos: Todo[] = [
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
      sessionStorage.setItem('todos', JSON.stringify(todos));
      this.todos = todos;
    } else {
      this.todos = JSON.parse(sessionTodos);
    }
  }

  onSaveTodo(todo: Todo): void {
    todo.id = this.todos.length + 1;
    this.todos.push(todo);
    sessionStorage.setItem('todos', JSON.stringify(this.todos));
  }
  onEditTodo(todo: Todo): void { }
  onToggleTodo(todo: Todo): void { }
}
