import { VAULT_NOOP } from '../../../constants/vault/vault-noop.constant';
import { BehaviorClassContext } from '../../../contexts/behavior-class.context';
import { ErrorTransformBehaviorContract } from '../../../interfaces/behaviors/error-transform-behavior.interface';
import { StateSnapshotShape } from '../../../shapes/state/state-snapshot.shape';
import { VaultErrorShape } from '../../../shapes/vault-error.shape';
import { BehaviorTypes } from '../../../types/behavior/behavior.type';
import { vaultWarn } from '../../../utils/logger/logger.util';

/**
 * Abstract base behavior for transforming errors during pipeline execution.
 * This class defines the contract and lifecycle hooks required for error transformation behaviors.
 *
 */
export abstract class AbstractErrorTransformBehavior<
  T
> implements ErrorTransformBehaviorContract<T> {
  /**
   * Indicates that this error transform behavior is critical and always executed.
   */
  readonly critical!: boolean;

  /**
   * Unique identifier for this behavior instance.
   */
  readonly key: string;

  /**
   * Behavior type identifier used for orchestrator registration.
   */
  readonly type = BehaviorTypes.ErrorTransform;

  /**
   * Creates a new abstract error transform behavior instance.
   *
   * @param key Unique behavior identifier supplied by the factory.
   * @param behaviorCtx Behavior class context providing configuration and hooks.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    this.key = key;
  }

  /**
   * Transforms an error produced during pipeline execution.
   *
   * @param error Incoming error value to be transformed.
   * @param current Current normalized Vault error value.
   * @param previousStateSnapshot Snapshot of state prior to the error.
   * @returns Transformed error, original error, or VAULT_NOOP to suppress emission.
   */
  abstract transformError(
    error: unknown,
    current: VaultErrorShape,
    previousStateSnapshot: StateSnapshotShape<T>
  ): Promise<unknown | typeof VAULT_NOOP>;

  /**
   * Lifecycle hook invoked when the behavior instance is destroyed.
   */
  destroy(): void {
    vaultWarn(`${this.key} - destroy "noop"`);
  }

  /**
   * Lifecycle hook invoked when the behavior instance is reset.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset "noop"`);
  }
}
