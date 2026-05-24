import {
  BehaviorClassContext,
  BehaviorType,
  BehaviorTypes,
  CoreEmitStateBehaviorContract,
  CoreEmitStateCallback,
  CoreEmitStateResult,
  defineBehaviorKey,
  safeStringify,
  StateSnapshotShape,
  VAULT_NOOP,
  VaultBehavior,
  vaultDebug,
  vaultError,
  vaultWarn
} from '@sdux-vault/shared';

/**
 * Core behavior responsible for invoking `emitState` callbacks.
 *
 * This behavior executes a consumer-provided callback with the current
 * immutable state snapshot, allowing external observers to react to
 * state emission events without mutating pipeline state.
 *
 * It is critical to pipeline execution and always runs during emitState
 * processing when a callback is provided.
 */
@VaultBehavior({
  type: BehaviorTypes.CoreEmitState,
  key: defineBehaviorKey('Core', 'EmitState'),
  critical: true
})
export class withCoreEmitStateBehavior<T>
  implements CoreEmitStateBehaviorContract<T>
{
  /** Static behavior type used for pipeline classification. */
  static readonly type: BehaviorType;

  /** Unique behavior key used for introspection and diagnostics. */
  static readonly key: string;

  /** Indicates that emitState behavior is required in the pipeline. */
  static readonly critical: boolean;

  /** Instance-level pipeline behavior type identifier. */
  readonly type = BehaviorTypes.CoreEmitState;

  /** Indicates that this behavior must always run during emitState execution. */
  readonly critical = true;

  /** Unique identifier for this emitState behavior instance. */
  readonly key: string;

  /**
   * Creates a new core emitState behavior instance.
   *
   * @param key Unique behavior identifier supplied by the factory.
   * @param behaviorCtx Behavior class context for dependency injection and extensibility.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    this.key = key;
  }

  /**
   * Executes a provided emitState callback with the current state snapshot.
   *
   * If the callback is not a function or throws during execution, the behavior
   * logs the failure and returns `VAULT_NOOP` without interrupting pipeline flow.
   *
   * @param snapshot Immutable snapshot of the current FeatureCell state.
   * @param callback Consumer-provided emitState callback.
   * @returns A core emitState result or `VAULT_NOOP` when no action is taken.
   */
  emitState<T>(
    snapshot: StateSnapshotShape<T>,
    // eslint-disable-next-line
    callback: CoreEmitStateCallback<T, any>
  ): CoreEmitStateResult {
    vaultDebug(
      `${this.key} emitState called with "${safeStringify(snapshot)}".`
    );

    if (typeof callback !== 'function') {
      vaultDebug(
        `${this.key} emitState skipped. The emitState type is ${typeof callback}. "${safeStringify(snapshot)}" returned.`
      );
      return VAULT_NOOP;
    }

    try {
      callback(snapshot);
    } catch (err) {
      vaultError(`${this.key} emitState execution failed`, safeStringify(err));
      return VAULT_NOOP;
    }

    return;
  }

  /**
   * Performs cleanup when the behavior instance is destroyed.
   */
  destroy(): void {
    vaultWarn(`${this.key} - destroy "noop"`);
  }

  /**
   * Resets the emitState behavior.
   *
   * This behavior does not retain internal state and therefore requires
   * no reset logic beyond lifecycle participation.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset "noop"`);
  }
}
