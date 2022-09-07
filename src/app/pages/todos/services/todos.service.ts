import { Injectable } from '@angular/core';
import { SessionService } from 'src/app/shared/services/session.service';
import { Todo } from '../model/todo.model';

const TODO_KEY = 'todos'

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos: Todo[] = [];
  constructor(
    private readonly sessionService: SessionService
  ) { }

  list(): Todo[] {
    const todoValue: string = this.sessionService.get(TODO_KEY);
    try {
      const todos: Todo[] = todoValue ? JSON.parse(todoValue) : [
        {
          id: 1,
          name: 'Makan',
          isDone: false
        }];
      this.todos = todos;
      this.updateSessionStorage();
      return todos;
    } catch (err: any) {
      return err.message;
    }
  }

  checked(todo: Todo): void {
    try {
      this.todos.forEach((item) => {
        if (item.id === todo.id) item.isDone = !item.isDone;
        this.updateSessionStorage();
      })
    } catch (err) {
      console.error(err);
    }
  }

  remove(id: number): void {
    try {
      const todoId: number = this.todos.findIndex(item => item.id == id);
      this.todos.splice(todoId, 1);
      this.updateSessionStorage();
    } catch (error) {
      console.error(error)
    }
  }

  save(todo: Todo): void {
    console.log('todo.service:', todo);
    try {
      if (!todo.id) {
        todo.id = this.todos.length + 1;
        this.todos.push(todo);
      } else {
        // Update
        this.todos = this.todos.map((item) => {
          if (item.id === todo.id) {
            item = todo
            // item = { ...item, ...todo }
          }
          return item;
        });
      }
      this.updateSessionStorage();
    } catch (error) {
      console.error(error);
    }
  }

  get(id: number): Todo {
    try {
      return this.todos.find((todo) => todo.id === id) as Todo;
    } catch (err: any) {
      return err.messsage
    }
  }

  private updateSessionStorage(): void {
    this.sessionService.set(TODO_KEY, JSON.stringify(this.todos))
  }
}
