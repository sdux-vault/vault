import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthenticationService } from 'apps/docs-app/app/dashboard/service/authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * SduxHttpClientInterceptor
 *
 * Attaches the JWT token to outgoing API requests and unwraps the
 * server's `{ data: T }` success envelope so consuming services
 * receive the payload directly without coupling to the transport shape.
 *
 * Token is only sent to API endpoints to prevent leakage to external services.
 * Envelope unwrapping only triggers when the response body is an object with
 * a single `data` key, ensuring non-envelope responses pass through unchanged.
 */
@Injectable()
export class SduxHttpClientInterceptor implements HttpInterceptor {
  #auth = inject(AuthenticationService);

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.#auth.getToken();

    const isApiRequest =
      req.url.startsWith('/api') || req.url.includes('/api/');

    const outgoing =
      token && isApiRequest
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;

    return next.handle(outgoing).pipe(
      map((event) => {
        if (event instanceof HttpResponse && this.#isEnvelope(event.body)) {
          return event.clone({ body: event.body.data });
        }
        return event;
      })
    );
  }

  /**
   * Determines whether a response body is a `{ data: T }` envelope.
   * Returns true only when the body is a non-null object whose sole key is `data`.
   */
  #isEnvelope(body: unknown): body is { data: unknown } {
    return (
      body !== null &&
      typeof body === 'object' &&
      !Array.isArray(body) &&
      'data' in body &&
      Object.keys(body).length === 1
    );
  }
}
