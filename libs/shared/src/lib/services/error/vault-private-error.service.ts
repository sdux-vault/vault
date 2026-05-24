import { BehaviorSubject, Observable } from 'rxjs';
import { VaultPrivateErrorServiceContract } from '../../interfaces/vault/vault-private-error-service.interface';
import { VaultErrorShape } from '../../shapes/vault-error.shape';
import { vaultDebug } from '../../utils/logger/logger.util';
import { safeStringify } from '../../utils/safe-stringify/safe-stringify.util';

/** ------------------------------------------
 * INTERNAL CLASS (NOT EXPORTED)
 * ------------------------------------------ */
/**
 * Internal singleton error service that holds the current Vault error state.
 * Not exported directly; consumed exclusively by the public VaultErrorService.
 */
class VaultPrivateErrorClass implements VaultPrivateErrorServiceContract {
  /** Subject backing the private error observable. */
  readonly #error$ = new BehaviorSubject<VaultErrorShape | null>(null);

  /** Initializes the private error service singleton. */
  constructor() {
    vaultDebug(
      '[VaultPrivateErrorService] initialized (singleton instance created)'
    );
  }

  /**
   * Publishes a new error or clears the current error.
   *
   * @param error - The error shape to publish, or null to clear.
   */
  setError(error: VaultErrorShape | null): void {
    vaultDebug(`[VaultPrivateErrorService] setError() ${safeStringify(error)}`);
    this.#error$.next(error);
  }

  /**
   * Returns an observable of the current error state.
   *
   * @returns Observable emitting the current error or null.
   */
  getError(): Observable<VaultErrorShape | null> {
    vaultDebug('[VaultPrivateErrorService] getError() → observable subscribed');
    return this.#error$.asObservable();
  }

  /** Resets the error state to null. */
  clear(): void {
    vaultDebug('[VaultPrivateErrorService] clear() → error reset to null');
    this.#error$.next(null);
  }
}

/** ------------------------------------------
 * SINGLETON FACTORY (EXPORTED)
 * ------------------------------------------ */
let _instance: VaultPrivateErrorServiceContract | null = null;

/**
 * Returns the singleton VaultPrivateErrorService instance, creating it on first call.
 *
 * @returns The shared private error service instance.
 */
export function VaultPrivateErrorService(): VaultPrivateErrorServiceContract {
  if (!_instance) {
    vaultDebug('[VaultPrivateErrorService] creating new singleton instance');
    _instance = new VaultPrivateErrorClass();
  } else {
    vaultDebug(
      '[VaultPrivateErrorService] returning existing singleton instance'
    );
  }
  return _instance;
}
