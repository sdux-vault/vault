import {
  AbstractErrorCallbackBehavior,
  BehaviorClassContext,
  BehaviorType,
  BehaviorTypes,
  defineBehaviorKey,
  StateSnapshotShape,
  VaultBehavior,
  VaultErrorCallback,
  VaultErrorShape,
  vaultWarn
} from '@sdux-vault/shared';
/**
 * Core error callback behavior for invoking legacy error handlers.
 *
 * This behavior executes an optional consumer-supplied error callback when a
 * pipeline error occurs, forwarding the normalized error and an immutable
 * snapshot of the FeatureCell state without altering error flow.
 */
@VaultBehavior({
  type: BehaviorTypes.CoreErrorCallback,
  key: defineBehaviorKey('Core', 'ErrorCallback'),
  critical: true
})
export class withCoreErrorCallbackBehavior<
  T
> extends AbstractErrorCallbackBehavior<T> {
  /**
   * Static behavior type identifier used for orchestrator classification.
   */
  static readonly type: BehaviorType;

  /**
   * Static behavior key used for diagnostics and tooling.
   */
  static readonly key: string;

  /**
   * Indicates that this behavior is critical within the pipeline.
   */
  static readonly critical: boolean;

  /**
   * Indicates that this error callback behavior is always executed.
   */
  override readonly critical = withCoreErrorCallbackBehavior.critical;

  /**
   * Creates a new core error callback behavior instance.
   *
   * @param key Unique behavior identifier.
   * @param behaviorCtx Behavior class context for dependency access.
   */
  constructor(key: string, behaviorCtx: BehaviorClassContext) {
    super(key, behaviorCtx);
  }

  /**
   * Invokes a legacy error callback with the normalized error and state snapshot.
   *
   * @param current The normalized error value.
   * @param state Immutable snapshot of the FeatureCell state.
   * @param oldschoolCallback Optional legacy callback function.
   * @returns Resolves after callback execution completes.
   */
  async callbackError(
    current: VaultErrorShape,
    state: StateSnapshotShape<T>,
    oldschoolCallback: VaultErrorCallback<T>
  ): Promise<void> {
    if (typeof oldschoolCallback !== 'function') {
      vaultWarn(
        `${this.key} handleError skipped - "${oldschoolCallback}" is not a function.`
      );
    } else {
      try {
        await oldschoolCallback(current, state);
      } catch (err) {
        vaultWarn(`${this.key} oldschoolCallback threw: ${err}`);
      }
    }

    return;
  }
}
