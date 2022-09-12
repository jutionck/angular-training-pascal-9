import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { ApiResponse } from "src/app/shared/models/response.model";
import { Login, LoginResponse } from "../models/login.model";

const AUTH_KEY = 'token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly http: HttpClient) { }

  login(payload: Login): Observable<ApiResponse<LoginResponse>> {
    try {
      return this.http.post<ApiResponse<LoginResponse>>('/api/v1/auth/login', payload)
    } catch (error) {
      throw error;
    }
  }
}
