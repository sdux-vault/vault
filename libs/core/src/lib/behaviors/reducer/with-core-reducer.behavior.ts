import {
  BehaviorClassContext,
  BehaviorType,
  BehaviorTypes,
  defineBehaviorKey,
  PipelineUpstreamValue,
  ReduceBehaviorContract,
  ReducerFunction,
  safeStringify,
  VaultBehavior,
  vaultDebug,
  vaultWarn
} from '@sdux-vault/shared';

/**
 * Core reducer behavior that applies pure reducer functions to state values.
 *
 * This behavior participates in the reduce stage of the pipeline and is
 * responsible for invoking reducer functions supplied by consumers to
 * transform the current state into a new value. It performs no validation
 * beyond ensuring the reducer is callable.
 */
@VaultBehavior({
  type: BehaviorTypes.Reduce,
  key: defineBehaviorKey('Core', 'Reducer'),
  critical: true
})
export class withCoreReducerBehavior<T> implements ReduceBehaviorContract<T> {
  /** Static metadata used for orchestrator behavior classification. */
  static readonly type: BehaviorType;

  /** Unique behavior identifier for diagnostics and devtools. */
  static readonly key: string;

  /** Indicates that reducer behavior is essential to the pipeline. */
  static readonly critical: boolean;

  /** Instance-level criticality flag. */
  readonly critical = true;

  /** Pipeline behavior type identifier. */
  readonly type = BehaviorTypes.Reduce;

  /** Unique identifier for this reducer behavior instance. */
  readonly key: string;

  /**
   * Creates a new reducer behavior instance.
   *
   * @param key Unique behavior identifier supplied by the factory.
   * @param behaviorCtx Behavior class context for dependency injection and configuration.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    this.key = key;
  }

  /**
   * Applies a reducer function to the current state value.
   *
   * @param current The current state value before reduction.
   * @param reducer A reducer function that produces the next state value.
   * @returns The reduced state value.
   */
  applyReducer(
    current: PipelineUpstreamValue<T>,
    reducer: ReducerFunction<T>
  ): T {
    vaultDebug(
      `${this.key} applyReducer called with "${safeStringify(current)}".`
    );
    if (typeof reducer !== 'function') {
      vaultDebug(
        `${this.key} applyReducer skipped - reducer is not a function.`
      );
      return current as T;
    }
    return reducer(current as T);
  }

  /**
   * Invoked when the behavior instance is destroyed.
   */
  destroy(): void {
    vaultWarn(`${this.key} - destroy "noop"`);
  }

  /**
   * Resets the reducer behavior to its initial state.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset "noop"`);
  }
}
