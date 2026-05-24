import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthenticationService } from 'apps/docs-app/app/dashboard/service/authentication.service';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequestShape } from '../shape/login-request.shape';
import { LoginResponseShape } from '../shape/login-response.shape';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  #http = inject(HttpClient);
  #auth = inject(AuthenticationService);
  #url = environment.api;

  /**
   * login
   *
   * Calls the authentication API and stores the returned JWT token.
   */
  login(payload: LoginRequestShape): Observable<void> {
    return this.#http
      .post<LoginResponseShape>(`${this.#url}/api/v1/authenticate`, payload)
      .pipe(
        tap((response: LoginResponseShape) => this.#auth.login(response.token)),
        map(() => void 0)
      );
  }
}
