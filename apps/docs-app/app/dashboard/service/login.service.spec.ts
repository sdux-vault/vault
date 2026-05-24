import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { AuthenticationService } from 'apps/docs-app/app/dashboard/service/authentication.service';
import { environment } from '../../../environments/environment';
import { LoginRequestShape } from '../shape/login-request.shape';
import { LoginResponseShape } from '../shape/login-response.shape';
import { LoginService } from './login.service';

describe('Service: Login', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;
  let authService: jasmine.SpyObj<AuthenticationService>;

  const apiUrl = `${environment.api}/api/v1/authenticate`;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthenticationService', ['login']);

    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [
        LoginService,
        { provide: AuthenticationService, useValue: authService }
      ]
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should POST login payload to the API and store the token', () => {
    const payload: LoginRequestShape = {
      email: 'sam@openai.com',
      password: 'super-secure-password'
    };

    const mockResponse: LoginResponseShape = {
      token: 'jwt-token-123'
    };

    let completed = false;

    service.login(payload).subscribe(() => {
      completed = true;
    });

    const req = httpMock.expectOne(apiUrl);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);

    req.flush(mockResponse);

    expect(authService.login).toHaveBeenCalledWith('jwt-token-123');
    expect(completed).toBeTrue();
  });

  it('should call AuthenticationService.login when token is returned', () => {
    const payload: LoginRequestShape = {
      email: 'user@test.com',
      password: 'strong-password'
    };

    const mockResponse: LoginResponseShape = {
      token: 'auth-token'
    };

    service.login(payload).subscribe();

    const req = httpMock.expectOne(apiUrl);
    req.flush(mockResponse);

    expect(authService.login).toHaveBeenCalledTimes(1);
    expect(authService.login).toHaveBeenCalledWith('auth-token');
  });

  it('should propagate HTTP errors', () => {
    const payload: LoginRequestShape = {
      email: 'user@test.com',
      password: 'wrong-password'
    };

    let errorResponse: unknown;

    service.login(payload).subscribe({
      error: (err) => {
        errorResponse = err;
      }
    });

    const req = httpMock.expectOne(apiUrl);

    req.flush(
      { message: 'Authentication failed' },
      { status: 401, statusText: 'Unauthorized' }
    );

    expect(authService.login).not.toHaveBeenCalled();
    expect(errorResponse).toBeTruthy();
  });
});
