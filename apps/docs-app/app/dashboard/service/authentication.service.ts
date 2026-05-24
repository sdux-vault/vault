import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TokenPayloadShape } from '../shape/token-payload.shape';

/**
 * AuthenticationService
 *
 * Manages authentication state for the application.
 * Uses Angular signals so components react automatically
 * when login/logout occurs.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  /** Key used to store the JWT token */
  private readonly TOKEN_KEY = 'token';

  /** Internal signal holding the auth token */
  private readonly tokenSignal = signal<string | null>(
    localStorage.getItem(this.TOKEN_KEY)
  );

  /** Public signal: whether the user is authenticated */
  readonly isAuthenticated = computed(() => !!this.tokenSignal());

  #router = inject(Router);

  readonly fullName: Signal<string | null> = computed(
    () => this.#decodedPayload()?.fullName ?? null
  );

  readonly organizationName: Signal<string | null> = computed(
    () => this.#decodedPayload()?.organizationName ?? null
  );

  readonly #decodedPayload = computed(() => {
    const token = this.tokenSignal();

    if (!token) {
      return null;
    }

    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload)) as TokenPayloadShape;
    } catch {
      return null;
    }
  });

  /**
   * login
   *
   * Stores the JWT and updates auth state
   */
  login(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.tokenSignal.set(token);
  }

  /**
   * logout
   *
   * Clears the JWT and resets auth state
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.tokenSignal.set(null);
    this.#router.navigate(['/login']);
  }

  /**
   * getToken
   *
   * Used by HTTP interceptors
   */
  getToken(): string | null {
    return this.tokenSignal();
  }
}
