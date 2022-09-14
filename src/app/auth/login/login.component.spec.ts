import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { LoginComponent } from "./login.component"
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "../services/auth.service";
import { Login, LoginResponse } from "../models/login.model";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom, of } from "rxjs";
import { ApiResponse } from "src/app/shared/models/response.model";

describe('6. Login Component scenario test', () => {
  let loginComponent: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let activatedRoute: ActivatedRoute;
  let router: Router;
  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login'])
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    });
    fixture = TestBed.createComponent(LoginComponent);
    loginComponent = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    loginComponent.ngOnInit();
  });

  it('loginComponent should have initialize', () => {
    expect(loginComponent).toBeDefined();
    expect(loginComponent).toBeTruthy();
  });

  const formLoginMock = (email: string, password: string): void => {
    loginComponent.loginForm.get('email')?.setValue(email);
    loginComponent.loginForm.get('password')?.setValue(password);
  }

  it('check validity', () => {
    formLoginMock('admin@gmail.com', 'password');
    const expected: Login = { email: 'admin@gmail.com', password: 'password' };
    expect(loginComponent.loginForm.value).toEqual(expected);
  })

  it('succesful login and should return LoginToken value', async () => {
    const loginToken: ApiResponse<LoginResponse> = {
      code: 201,
      status: 'SUCCESS',
      message: 'MESSAGE',
      data: {
        email: 'admin@gmail.com',
        accessToken: '123'
      }
    };
    authService.login.and.returnValue(of(loginToken));
    loginComponent.loginForm.setValue({ email: 'admin@gmail,com', password: 'password' });
    loginComponent.onSubmit();
    expect(authService.login.calls.count()).toBe(1);
    // toPromise -> deprecated => lastValueForm
    const actual: ApiResponse<LoginResponse> = await lastValueFrom(authService.login.calls.mostRecent().returnValue);
    expect(actual.data.accessToken).toEqual('123');
  })




})
