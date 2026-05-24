import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { AuthenticationService } from 'apps/docs-app/app/dashboard/service/authentication.service';
import { SignUpRegisteredShape } from '../shapes/sign-up.registered.shape';
import { SignUpShape } from '../shapes/sign-up.shape';
import { SignupService } from './signup.service';

describe('Service: SignupService', () => {
  let service: SignupService;
  let httpMock: HttpTestingController;
  let authService: jasmine.SpyObj<AuthenticationService>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthenticationService', ['login']);

    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [
        SignupService,
        { provide: AuthenticationService, useValue: authSpy }
      ]
    });

    service = TestBed.inject(SignupService);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should POST signup payload and login with returned token', () => {
    const payload: SignUpShape = {
      organizationName: 'OpenAI',
      fullName: 'Sam Altman',
      email: 'sam@openai.com',
      password: '1234567890',
      domain: 'openai.com'
    };

    const response: SignUpRegisteredShape = {
      organizationName: 'OpenAI',
      organizationUuid: 'org-uuid',
      token: 'jwt-token',
      active: true
    };

    let emitted: void | undefined;

    service.signUp(payload).subscribe((result) => {
      emitted = result;
    });

    const req = httpMock.expectOne('http://localhost:3101/api/v1/signup');

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);

    req.flush(response);

    expect(authService.login).toHaveBeenCalledWith('jwt-token');
    expect(emitted).toBeUndefined();
  });

  it('should propagate HTTP errors', () => {
    const payload: SignUpShape = {
      organizationName: 'OpenAI',
      fullName: 'Sam Altman',
      email: 'sam@openai.com',
      password: '1234567890',
      domain: 'openai.com'
    };

    let errorResponse: unknown;

    service.signUp(payload).subscribe({
      error: (err) => {
        errorResponse = err;
      }
    });

    const req = httpMock.expectOne('http://localhost:3101/api/v1/signup');

    req.flush(
      { message: 'Signup failed' },
      { status: 500, statusText: 'Server Error' }
    );

    expect(errorResponse).toBeTruthy();
    expect(authService.login).not.toHaveBeenCalled();
  });
});
