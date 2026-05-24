import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import {
  VaultErrorShape,
  VaultPrivateErrorService,
  VaultPrivateErrorServiceContract
} from '@sdux-vault/shared';
import { Subscription } from 'rxjs';

/**
 * Angular-facing service that exposes the current global Vault error as a signal.
 *
 * This service bridges the internal VaultPrivateErrorService into Angular’s
 * signal system, allowing UI layers to observe global error state reactively
 * and clear it when appropriate.
 */
@Injectable({ providedIn: 'root' })
export class VaultErrorService {
  /**
   * Internal Vault error service used as the authoritative error source.
   */
  readonly #privateVaultErrorService: VaultPrivateErrorServiceContract;

  /**
   * Writable signal holding the current global error or null.
   */
  readonly #error: WritableSignal<VaultErrorShape | null> =
    signal<VaultErrorShape | null>(null);

  /**
   * Subscription to the internal error observable.
   */
  readonly #errorSubscription: Subscription;

  /**
   * Read-only signal exposing the current global error state.
   */
  readonly error: Signal<VaultErrorShape | null> = this.#error.asReadonly();

  /**
   * Creates a new VaultErrorService instance and subscribes to global error updates.
   */
  constructor() {
    this.#privateVaultErrorService = VaultPrivateErrorService();

    this.#errorSubscription = this.#privateVaultErrorService
      .getError()
      .subscribe({
        next: (error: VaultErrorShape | null) => {
          this.#error.set(error);
        }
      });
  }

  /**
   * Clears the currently stored global error.
   */
  clear(): void {
    this.#privateVaultErrorService.clear();
  }

  /**
   * Cleans up internal subscriptions when the service is destroyed.
   */
  ngOnDestroy(): void {
    this.#errorSubscription.unsubscribe();
  }
}
