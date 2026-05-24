import { Observable } from 'rxjs';
import { VaultErrorShape } from '../../shapes/vault-error.shape';

/** Contract for the internal private error service used by VaultErrorService. */
export interface VaultPrivateErrorServiceContract {
  /**
   * Publishes a new error or clears the current error.
   *
   * @param error - The error shape to publish, or null to clear.
   */
  setError(error: VaultErrorShape | null): void;

  /**
   * Returns an observable of the current error state.
   *
   * @returns Observable emitting the current error or null.
   */
  getError(): Observable<VaultErrorShape | null>;

  /** Resets the error state to null. */
  clear(): void;
}
