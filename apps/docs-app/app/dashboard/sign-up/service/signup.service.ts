import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthenticationService } from 'apps/docs-app/app/dashboard/service/authentication.service';
import { SignUpRegisteredShape } from 'apps/docs-app/app/dashboard/sign-up/shapes/sign-up.registered.shape';
import { Observable, Subscriber } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SignUpShape } from '../shapes/sign-up.shape';

/**
 * SignupService
 *
 * Handles communication with the signup API.
 */
@Injectable({
  providedIn: 'root'
})
export class SignupService {
  #url = environment.api;
  /** Angular HTTP client */
  #http = inject(HttpClient);
  #authenticationService = inject(AuthenticationService);

  /**
   * signUp
   *
   * @description Sends signup data to the API
   */
  public signUp(payload: SignUpShape): Observable<void> {
    return new Observable((subscriber: Subscriber<void>) => {
      this.#http
        .post<SignUpRegisteredShape>(`${this.#url}/api/v1/signup`, payload)
        .subscribe({
          next: (result: SignUpRegisteredShape) => {
            this.#authenticationService.login(result.token);
            subscriber.next();
            subscriber.complete();
          },
          error: (err) => {
            subscriber.error(err);
          }
        });
    });
  }
}
