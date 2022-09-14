import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { LoginComponent } from "./login.component"
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "../services/auth.service";
import { Login, LoginResponse } from "../models/login.model";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom, of } from 'rxjs';
import { ApiResponse } from "src/app/shared/models/response.model";
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { LoginField } from "../models/login-field.model";

describe('6. Login Component scenario test', () => {
  let loginComponent: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let activatedRoute: ActivatedRoute;
  let router: Router;
  beforeAll(() => {
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

  const formLoginMock = (email: string, password: string): void => {
    loginComponent.loginForm.get('email')?.setValue(email);
    loginComponent.loginForm.get('password')?.setValue(password);
  }

  describe('6.1 LoginComponent initialize', () => {
    it('loginComponent should have initialize', () => {
      expect(loginComponent).toBeDefined();
      expect(loginComponent).toBeTruthy();
    });
  });

  describe('6.2 Form Login submit test scenario', () => {
    it('succesful login', () => {
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
  });

  describe('6.3 Form Login ReactiveForm test', () => {
    describe('6.3.1 FormGroup and FormControl should be initialize', () => {
      it('should be successfully intialized.', () => {
        expect(loginComponent.loginForm).toBeTruthy();
        expect(loginComponent.loginForm.get('email')).toBeDefined();
        expect(loginComponent.loginForm.get('email')).toBeInstanceOf(AbstractControl);
        expect(loginComponent.loginForm.get('password')).toBeDefined();
        expect(loginComponent.loginForm.get('password')).toBeInstanceOf(AbstractControl);
      })
    });

    describe('6.3.2 Email FormControl should be validated', () => {
      let emailControl: AbstractControl;
      beforeEach(() => {
        emailControl = loginComponent.loginForm.get('email') as AbstractControl;
      })
      describe('6.3.2.1 Validations required should be working', () => {
        it('required validator should be true if email value is blank', () => {
          emailControl.setValue('');
          emailControl.markAsTouched();
          fixture.detectChanges();

          const errors = emailControl.errors as ValidationErrors;
          const email = LoginField.EMAIL;
          expect(errors).toBeTruthy();
          expect(errors['required']).toBeTruthy();
          expect(emailControl.invalid).toBeTrue();
          expect(loginComponent.isFieldValid(email)).toMatch('is-invalid');
        })
      })

      describe('6.3.2.2 Validations email should be working', () => {
        it('email validator should be true if email value is wrong', () => {
          emailControl.setValue('admin.com');
          emailControl.markAsTouched();
          fixture.detectChanges();

          const errors = emailControl.errors as ValidationErrors;
          const email = LoginField.EMAIL;
          expect(errors).toBeTruthy();
          expect(errors['email']).toBeTruthy();
          expect(emailControl.invalid).toBeTrue();
          expect(loginComponent.isFieldValid(email)).toMatch('is-invalid');
        })
      })
    })

    describe('6.3.3 Password FormControl should be validated', () => {
      let passwordControl: AbstractControl;
      beforeEach(() => {
        passwordControl = loginComponent.loginForm.get('password') as AbstractControl;
      })
      describe('6.3.3.1 Validations required should be working', () => {
        it('required validator should be true if password value is blank', () => {
          passwordControl.setValue('');
          passwordControl.markAsTouched();
          fixture.detectChanges();
          const errors = passwordControl.errors as ValidationErrors;
          const password = LoginField.PASSWORD;
          expect(errors).toBeTruthy();
          expect(errors['required']).toBeTruthy();
          expect(passwordControl.invalid).toBeTrue();
          expect(loginComponent.isFieldValid(password)).toMatch('is-invalid');
        })
      })

      describe('6.3.3.2 Validations minLength should be working', () => {
        it('minLength validator should be true if password value less than equal 4', () => {
          passwordControl.setValue('123');
          passwordControl.markAsTouched();
          fixture.detectChanges();
          const errors = passwordControl.errors as ValidationErrors;
          const password = LoginField.PASSWORD;
          expect(errors).toBeTruthy();
          expect(errors['minlength']).toBeTruthy();
          expect(passwordControl.invalid).toBeTrue();
          expect(loginComponent.isFieldValid(password)).toMatch('is-invalid');
        })
      })
    })
  })



})
