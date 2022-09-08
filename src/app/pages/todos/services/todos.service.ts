import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
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

  list(): Observable<Todo[]> {
    return new Observable<Todo[]>((observer: Observer<Todo[]>) => {
      try {
        const todoValue: string = this.sessionService.get(TODO_KEY);
        const todos: Todo[] = todoValue ? JSON.parse(todoValue) : [
          {
            id: 1,
            name: 'Makan',
            isDone: false
          }];
        this.todos = todos;
        this.updateSessionStorage();
        observer.next(todos);
      } catch (err: any) {
        observer.error(err.message)
      }
      observer.complete();
    });
  }

  checked(todo: Todo): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        this.todos.forEach((item) => {
          if (item.id === todo.id) item.isDone = !item.isDone;
          this.updateSessionStorage();
          observer.next();
        })
      } catch (err: any) {
        observer.error(err.message)
      }
      observer.complete();
    });
  }

  remove(id: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        const todoId: number = this.todos.findIndex(item => item.id == id);
        this.todos.splice(todoId, 1);
        this.updateSessionStorage();
        observer.next();
      } catch (err: any) {
        observer.error(err.message)
      }
      observer.complete();
    });
  }

  save(todo: Todo): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        if (!todo.id) {
          todo.id = this.todos.length + 1;
          this.todos.push(todo);
        } else {
          this.todos = this.todos.map((item) => {
            if (item.id === todo.id) {
              item = { ...item, ...todo }
            }
            return item;
          });
        }
        this.updateSessionStorage();
        observer.next();
      } catch (err: any) {
        observer.error(err.message)
      }
      observer.complete();
    });
  }

  get(id: number): Observable<Todo> {
    return new Observable<Todo>((observer: Observer<Todo>) => {
      try {
        const todo: Todo = this.todos.find((todo) => todo.id === id) as Todo;
        observer.next(todo);
      } catch (err: any) {
        observer.error(err.message)
      }
      observer.complete();
    });
  }

  private updateSessionStorage(): void {
    this.sessionService.set(TODO_KEY, JSON.stringify(this.todos))
  }
}
