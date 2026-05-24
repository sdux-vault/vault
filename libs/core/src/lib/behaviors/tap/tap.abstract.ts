import {
  BehaviorClassContext,
  BehaviorContract,
  BehaviorType,
  PipelineUpstreamValue,
  TapCallback,
  safeStringify,
  vaultDebug,
  vaultWarn
} from '@sdux-vault/shared';

/**
 * Abstract base class for tap behaviors in the Vault pipeline.
 *
 * This class provides shared execution logic for tap behaviors, which observe
 * pipeline values and perform side effects without modifying pipeline state.
 * It centralizes validation, logging, and lifecycle handling common to both
 * pre- and post-reducer tap behaviors.
 */
export abstract class TapAbstractBehavior<T> implements BehaviorContract<T> {
  /** Static behavior type used for pipeline classification. */
  static readonly type: BehaviorType;

  /** Static key used to identify the tap behavior. */
  static readonly key: string;

  /** Indicates that tap behaviors participate critically in the pipeline. */
  static readonly critical = true;

  /** Instance-level criticality flag. */
  readonly critical = true;

  /** Unique identifier for this tap behavior instance. */
  readonly key: string;

  /**
   * Instance-level behavior type identifier.
   */
  readonly type!: BehaviorType;

  /**
   * Creates a new tap behavior instance.
   *
   * @param key Unique behavior identifier supplied by the factory.
   * @param behaviorCtx Behavior class context for dependency injection.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    this.key = key;
  }

  /**
   * Executes a tap callback against the current pipeline value.
   *
   * @param current The current pipeline value being observed.
   * @param tap The tap callback function.
   */
  protected executeTap(
    current: PipelineUpstreamValue<T>,
    tap: TapCallback<T>
  ): void {
    vaultDebug(
      `${this.key} executeTap called with "${safeStringify(current)}".`
    );

    if (typeof tap !== 'function') {
      vaultDebug(
        `${this.key} executeTap skipped - tap is not a function. Type is "${typeof tap}".`
      );
    }

    tap(current as T);
  }

  /**
   * Teardown hook invoked when the behavior instance is destroyed.
   */
  destroy(): void {
    vaultWarn(`${this.key} - destroy "noop"`);
  }

  /**
   * Resets the tap behavior to its initial state.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset "noop"`);
  }
}
