import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    private readonly http: HttpClient,
    private readonly sessionService: SessionService,
  ) { }

  list(): Observable<ApiResponse<Todo[]>> {
    try {
      const headers = this.setHeaders();
      return this.http.get<ApiResponse<Todo[]>>(TODO_URL, { headers })
    } catch (error: any) {
      console.log(error);
      return error;
    }
  }

  checked(todo: Todo): Observable<void> {
    try {
      const headers = this.setHeaders();
      todo.isCompleted = !todo.isCompleted;
      const { id, name, isCompleted } = todo;
      return this.http.put<void>(TODO_URL, { id, name, isCompleted }, { headers })
    } catch (error: any) {
      return error;
    }
  }

  remove(id: string): Observable<ApiResponse<string>> {
    try {
      const headers = this.setHeaders();
      return this.http.delete<ApiResponse<string>>(TODO_URL + `/${id}`, { headers })
    } catch (error: any) {
      return error;
    }
  }

  save(todo: Todo): Observable<ApiResponse<Todo>> {
    try {
      const headers = this.setHeaders();
      if (todo.id) {
        return this.http.put<ApiResponse<Todo>>(TODO_URL, todo, { headers })
      }
      return this.http.post<ApiResponse<Todo>>(TODO_URL, todo, { headers })
    } catch (error: any) {
      return error;
    }
  }

  get(id: string): Observable<ApiResponse<Todo>> {
    try {
      const headers = this.setHeaders();
      return this.http.get<ApiResponse<Todo>>(TODO_URL + `/${id}`, { headers })
    } catch (error: any) {
      return error;
    }
  }

  private setHeaders(): HttpHeaders {
    const token: string = this.sessionService.get('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  public notify(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
