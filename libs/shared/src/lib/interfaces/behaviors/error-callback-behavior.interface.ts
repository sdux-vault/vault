import { StateSnapshotShape } from '../../shapes/state/state-snapshot.shape';
import { VaultErrorShape } from '../../shapes/vault-error.shape';
import { VaultErrorCallback } from '../../types/callback/vault-error-callback.type';
import { BehaviorContract } from './behavior/behavior.interface';

/** Contract for behaviors that invoke consumer error callbacks on pipeline errors. */
export interface ErrorCallbackBehaviorContract<T> extends BehaviorContract<T> {
  /** Identifies this behavior as a core error callback behavior. */
  type: 'coreErrorCallback';

  /**
   * Invokes the consumer error callback with the current error and state.
   *
   * @param current - The current Vault error shape.
   * @param state - The state snapshot at the time of error.
   * @param oldschoolCallback - The consumer-supplied error callback.
   */
  callbackError(
    current: VaultErrorShape,
    state: StateSnapshotShape<T>,
    oldschoolCallback: VaultErrorCallback<T>
  ): Promise<void>;
}
