import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    private readonly sessionService: SessionService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string = this.sessionService.get('token');
    if (token) {
      const requestClone: any = request.clone();
      requestClone.headers = request.headers.set('Authorization', `Bearer ${token}`);
      return next.handle(requestClone);
    }
    return next.handle(request)
  }
}
