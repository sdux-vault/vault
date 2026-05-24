// vault-error.interface.ts
import { Observable } from 'rxjs';
import { VaultErrorShape } from '../../shapes/vault-error.shape';

/** Contract for the public-facing Vault error service. */
export interface VaultErrorServiceContract {
  /** Observable stream of the current error state. */
  readonly error$: Observable<VaultErrorShape | null>;

  /** Clears the current error state. */
  clear(): void;

  /** Whether an active error is currently present. */
  get hasError(): boolean;
}
