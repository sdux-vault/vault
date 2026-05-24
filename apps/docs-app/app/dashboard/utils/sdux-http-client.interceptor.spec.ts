import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { AuthenticationService } from '../service/authentication.service';
import { SduxHttpClientInterceptor } from './sdux-http-client.interceptor';

describe('Interceptor: SduxHttpClient', () => {
  let interceptor: SduxHttpClientInterceptor;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let next: jasmine.SpyObj<HttpHandler>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthenticationService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [
        SduxHttpClientInterceptor,
        { provide: AuthenticationService, useValue: authSpy }
      ]
    });

    interceptor = TestBed.inject(SduxHttpClientInterceptor);
    authService = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
    next = jasmine.createSpyObj('HttpHandler', ['handle']);
  });

  describe('Authorization header', () => {
    it('should pass request through when no token exists', () => {
      authService.getToken.and.returnValue(null);

      const req = new HttpRequest('GET', '/api/test');

      next.handle.and.returnValue(of({} as HttpEvent<any>));

      interceptor.intercept(req, next);

      expect(next.handle).toHaveBeenCalledWith(req);
    });

    it('should attach Authorization header for API requests', () => {
      authService.getToken.and.returnValue('jwt-token');

      const req = new HttpRequest('GET', '/api/users');

      next.handle.and.returnValue(of({} as HttpEvent<any>));

      interceptor.intercept(req, next);

      const modifiedReq = next.handle.calls.mostRecent().args[0];

      expect(modifiedReq.headers.get('Authorization')).toBe('Bearer jwt-token');
    });

    it('should not attach Authorization header for non-api requests', () => {
      authService.getToken.and.returnValue('jwt-token');

      const req = new HttpRequest('GET', 'https://stripe.com/pay');

      next.handle.and.returnValue(of({} as HttpEvent<any>));

      interceptor.intercept(req, next);

      const handledReq = next.handle.calls.mostRecent().args[0];

      expect(handledReq.headers.has('Authorization')).toBeFalse();
    });

    it('should allow absolute API URLs', () => {
      authService.getToken.and.returnValue('jwt-token');

      const req = new HttpRequest('GET', 'http://localhost:3101/api/users');

      next.handle.and.returnValue(of({} as HttpEvent<any>));

      interceptor.intercept(req, next);

      const modifiedReq = next.handle.calls.mostRecent().args[0];

      expect(modifiedReq.headers.get('Authorization')).toBe('Bearer jwt-token');
    });
  });

  describe('Response envelope unwrapping', () => {
    it('should unwrap a { data: T } envelope from API responses', (done) => {
      authService.getToken.and.returnValue('jwt-token');

      const req = new HttpRequest('GET', '/api/users');
      const envelope = { data: { token: 'abc123' } };
      const response = new HttpResponse({ body: envelope, status: 200 });

      next.handle.and.returnValue(of(response));

      interceptor.intercept(req, next).subscribe((event) => {
        expect((event as HttpResponse<any>).body).toEqual({ token: 'abc123' });
        done();
      });
    });

    it('should not unwrap responses with multiple keys', (done) => {
      authService.getToken.and.returnValue('jwt-token');

      const req = new HttpRequest('GET', '/api/users');
      const body = { data: { token: 'abc' }, meta: { page: 1 } };
      const response = new HttpResponse({ body, status: 200 });

      next.handle.and.returnValue(of(response));

      interceptor.intercept(req, next).subscribe((event) => {
        expect((event as HttpResponse<any>).body).toEqual(body);
        done();
      });
    });

    it('should not unwrap array responses', (done) => {
      authService.getToken.and.returnValue('jwt-token');

      const req = new HttpRequest('GET', '/api/users');
      const body = [{ id: 1 }, { id: 2 }];
      const response = new HttpResponse({ body, status: 200 });

      next.handle.and.returnValue(of(response));

      interceptor.intercept(req, next).subscribe((event) => {
        expect((event as HttpResponse<any>).body).toEqual(body);
        done();
      });
    });

    it('should not unwrap null responses', (done) => {
      authService.getToken.and.returnValue('jwt-token');

      const req = new HttpRequest('GET', '/api/users');
      const response = new HttpResponse({ body: null, status: 204 });

      next.handle.and.returnValue(of(response));

      interceptor.intercept(req, next).subscribe((event) => {
        expect((event as HttpResponse<any>).body).toBeNull();
        done();
      });
    });

    it('should pass through non-HttpResponse events unchanged', (done) => {
      authService.getToken.and.returnValue('jwt-token');

      const req = new HttpRequest('GET', '/api/users');
      const sentEvent = { type: 0 } as HttpEvent<any>;

      next.handle.and.returnValue(of(sentEvent));

      interceptor.intercept(req, next).subscribe((event) => {
        expect(event).toBe(sentEvent);
        done();
      });
    });
  });
});
