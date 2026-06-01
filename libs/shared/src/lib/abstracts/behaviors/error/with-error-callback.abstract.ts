import { BehaviorClassContext } from '../../../contexts/behavior-class.context';
import { ErrorCallbackBehaviorContract } from '../../../interfaces/behaviors/error-callback-behavior.interface';
import { StateSnapshotShape } from '../../../shapes/state/state-snapshot.shape';
import { VaultErrorShape } from '../../../shapes/vault-error.shape';
import { BehaviorTypes } from '../../../types/behavior/behavior.type';
import { VaultErrorCallback } from '../../../types/callback/vault-error-callback.type';
import { vaultWarn } from '../../../utils/logger/logger.util';

/**
 * Abstract base class for error callback behaviors that execute consumer-supplied
 * error handlers during the error stage of the Vault pipeline.
 */
export abstract class AbstractErrorCallbackBehavior<
  T
> implements ErrorCallbackBehaviorContract<T> {
  /** Indicates that this error behavior is critical and always executed. */
  readonly critical!: boolean;

  /** Unique identifier for this behavior instance. */
  readonly key: string;

  /** Behavior type for orchestrator registration. */
  readonly type = BehaviorTypes.CoreErrorCallback;

  /**
   * Creates a new abstract error behavior instance.
   *
   * @param key - Unique behavior identifier supplied by the behavior factory.
   * @param behaviorCtx - Behavior class context providing injector access and extensibility hooks.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    this.key = key;
  }

  /**
   * Executes the consumer-supplied error callback against the current error and state.
   *
   * @param current - The error shape describing the pipeline failure.
   * @param state - The state snapshot at the time of the error.
   * @param oldschoolCallback - Consumer-supplied error callback to invoke.
   * @returns A promise that resolves when the callback completes.
   */
  abstract callbackError(
    current: VaultErrorShape,
    state: StateSnapshotShape<T>,
    oldschoolCallback: VaultErrorCallback<T>
  ): Promise<void>;

  /**
   * Teardown hook invoked when the behavior instance is destroyed.
   */
  destroy(): void {
    vaultWarn(`${this.key} - destroy "noop"`);
  }

  /**
   * Resets the error behavior to its initial state.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset "noop"`);
  }
}
