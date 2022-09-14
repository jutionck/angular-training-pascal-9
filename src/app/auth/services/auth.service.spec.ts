import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ApiResponse } from "src/app/shared/models/response.model";
import { Login, LoginResponse } from "../models/login.model";
import { AuthService } from "./auth.service"

describe('7. AuthService with HTTP scenario test', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeAll(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    })
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  })

  describe('7.1 AuthService initialize', () => {
    it('should have initialized', () => {
      expect(authService).toBeTruthy()
    })
  })

  describe('7.2 AuthService with login method', () => {
    it('should have return Observable<ApiResponse<LoginResponse>>', () => {
      const expectedUrl = `/api/v1/auth/login`;
      const mockLogin: Login = {
        email: 'admin@gmail.com',
        password: 'password'
      };

      const mockLoginToken: ApiResponse<LoginResponse> = {
        code: 201,
        message: '',
        status: '',
        data: {
          email: 'admin@gmail.com',
          accessToken: '123'
        }
      }
      authService.login(mockLogin).subscribe((response) => {
        expect(response).toEqual(mockLoginToken);
      })

      const http = httpMock.expectOne(expectedUrl);
      expect(http.request.method).toBe('POST');
      expect(http.request.body).toEqual(mockLogin);
    })
  })


})
