import { HttpClient } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/response.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { Todo } from '../model/todo.model';

const TODO_URL = '/api/v1/todos';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private subject: Subject<boolean> = new Subject<boolean>();
  constructor(
    @SkipSelf()
    private readonly http: HttpClient,
    private readonly sessionService: SessionService,
  ) { }

  list(): Observable<ApiResponse<Todo[]>> {
    try {
      return this.http.get<ApiResponse<Todo[]>>(TODO_URL)
    } catch (error: any) {
      console.log(error);
      return error;
    }
  }

  checked(todo: Todo): Observable<void> {
    try {
      todo.isCompleted = !todo.isCompleted;
      const { id, name, isCompleted } = todo;
      return this.http.put<void>(TODO_URL, { id, name, isCompleted })
    } catch (error: any) {
      return error;
    }
  }

  remove(id: string): Observable<ApiResponse<string>> {
    try {
      return this.http.delete<ApiResponse<string>>(TODO_URL + `/${id}`)
    } catch (error: any) {
      return error;
    }
  }

  save(todo: Todo): Observable<ApiResponse<Todo>> {
    try {
      if (todo.id) {
        return this.http.put<ApiResponse<Todo>>(TODO_URL, todo)
      }
      return this.http.post<ApiResponse<Todo>>(TODO_URL, todo)
    } catch (error: any) {
      return error;
    }
  }

  get(id: string): Observable<ApiResponse<Todo>> {
    try {
      return this.http.get<ApiResponse<Todo>>(TODO_URL + `/${id}`)
    } catch (error: any) {
      return error;
    }
  }

  public notify(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
