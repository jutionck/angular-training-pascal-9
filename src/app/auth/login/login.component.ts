import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/response.model';
import { SessionService } from 'src/app/shared/services/session.service';
import Swal from 'sweetalert2';
import { LoginField } from '../models/login-field.model';
import { LoginResponse } from '../models/login.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  field: typeof LoginField = LoginField;
  showPassword: boolean = false;
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly sessionService: SessionService,
  ) { }

  buildForm(): void {
    this.loginForm = new FormGroup({
      [LoginField.EMAIL]: new FormControl('', [Validators.required, Validators.email]),
      [LoginField.PASSWORD]: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    const payload = this.loginForm.value;
    this.authService.login(payload).subscribe({
      next: (response: ApiResponse<LoginResponse>) => {
        const { accessToken } = response.data;
        if (accessToken) {
          this.handleLogin(accessToken)
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email atau Password salah',
          });
        }
      },
      error: (error) => console.error(error.message)
    })
  }

  private handleLogin(token: string): void {
    this.sessionService.set('token', token);
    this.activatedRoute.queryParams
      .pipe(map((params) => params['next'] || null))
      .subscribe((next: string = '') => {
        this.router.navigateByUrl(next).finally();
      });
  }

  isFieldValid(loginField: LoginField): string {
    const control: AbstractControl = this.loginForm.get(loginField) as AbstractControl;
    if (control && control.touched && control.invalid) {
      return 'is-invalid';
    } else if (control && control.valid) {
      return 'is-valid';
    } else {
      return '';
    }
  }

}
