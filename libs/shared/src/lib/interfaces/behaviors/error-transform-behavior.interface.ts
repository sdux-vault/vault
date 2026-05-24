import { VAULT_NOOP } from '../../constants/vault/vault-noop.constant';
import { StateSnapshotShape } from '../../shapes/state/state-snapshot.shape';
import { VaultErrorShape } from '../../shapes/vault-error.shape';
import { BehaviorContract } from './behavior/behavior.interface';

/** Contract for behaviors that transform pipeline errors before propagation. */
export interface ErrorTransformBehaviorContract<T> extends BehaviorContract<T> {
  /** Identifies this behavior as an error transform behavior. */
  type: 'errorTransform';

  /**
   * Transforms a raw error into a normalized shape or signals a NOOP.
   *
   * @param error - The raw error thrown during pipeline execution.
   * @param current - The current Vault error shape.
   * @param previousStateSnapshot - The state snapshot before the error occurred.
   * @returns The transformed error value, or VAULT_NOOP to skip.
   */
  transformError(
    error: unknown,
    current: VaultErrorShape,
    previousStateSnapshot: StateSnapshotShape<T>
  ): Promise<unknown | typeof VAULT_NOOP>;
}
