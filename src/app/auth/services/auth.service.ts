import { Injectable } from "@angular/core";
import { SessionService } from "src/app/shared/services/session.service";
import { Login, LoginToken } from "../models/login.model";

const AUTH_KEY = 'token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly sessionService: SessionService) { }
  login(payload: Login): LoginToken | null {
    const { email, password } = payload;
    if (email === 'admin@gmail.com' && password === 'password') {
      const token: LoginToken = { token: '12345' };
      this.sessionService.set(AUTH_KEY, JSON.stringify(token));
      return token;
    }
    return null;
  }
}
