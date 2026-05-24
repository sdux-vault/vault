import { BehaviorSubject, Subscription } from 'rxjs';
import { VaultErrorServiceContract } from '../../interfaces/vault/vault-error-service.interface';
import { VaultErrorShape } from '../../shapes/vault-error.shape';
import { vaultDebug } from '../../utils/logger/logger.util';
import { VaultPrivateErrorService } from './vault-private-error.service';

/**
 * Singleton service that aggregates and exposes the current Vault error state.
 * Subscribes to the private error service and mirrors updates through a public
 * observable stream for consumer consumption.
 */
class VaultErrorServiceClass implements VaultErrorServiceContract {
  /** Internal delegate responsible for low-level error state management. */
  readonly #privateVaultErrorService = VaultPrivateErrorService();

  /** Subject backing the public error observable. */
  readonly #error$ = new BehaviorSubject<VaultErrorShape | null>(null);

  /** Tracks whether an active error is currently held. */
  #hasErrorState = false;

  /** Aggregate subscription used for cleanup on teardown. */
  readonly #subscription = new Subscription();

  /** Public observable stream of the current error state. */
  readonly error$ = this.#error$.asObservable();

  /** Initializes the service and subscribes to the private error stream. */
  constructor() {
    vaultDebug(
      '[VaultErrorService] Initializing service and subscribing to private error stream.'
    );

    // Mirror the private error service into this one
    const sub = this.#privateVaultErrorService
      .getError()
      .subscribe((err: VaultErrorShape | null) => {
        vaultDebug(
          `[VaultErrorService] Received error update from private service: ${err ? err.message : 'null'}`
        );
        this.#hasErrorState = !!err;
        this.#error$.next(err);
      });

    this.#subscription.add(sub);
  }

  /** Whether an active error is currently present. */
  get hasError(): boolean {
    return this.#hasErrorState;
  }

  /** Clears the current error state via the private error service. */
  clear(): void {
    vaultDebug('[VaultErrorService] Clearing current error.');
    this.#privateVaultErrorService.clear();
  }
}

/** Cached singleton instance of the VaultErrorService. */
let _instance: VaultErrorServiceClass | null = null;

/**
 * Returns the singleton VaultErrorService instance, creating it on first call.
 *
 * @returns The shared VaultErrorService instance.
 */
export function VaultErrorService(): VaultErrorServiceContract {
  if (!_instance) {
    vaultDebug('[VaultErrorService] Creating new singleton instance.');
    _instance = new VaultErrorServiceClass();
  }
  return _instance;
}
