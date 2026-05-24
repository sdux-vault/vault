import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  #http = inject(HttpClient);
  #url = environment.api;

  /**
   * createCheckoutSession
   *
   * Requests a Stripe checkout session from the backend.
   * The backend returns a URL that redirects the user to Stripe.
   */
  createCheckoutSession(domain: string): Observable<string> {
    return this.#http.post<string>(
      `${this.#url}/api/v1/organization/stripe/checkout`,
      { domain }
    );
  }
}
