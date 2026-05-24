import {
  BehaviorClassContext,
  BehaviorType,
  BehaviorTypes,
  defineBehaviorKey,
  MergeBehaviorContract,
  PipelineUpstreamValue,
  VAULT_CLEAR_STATE,
  VaultBehavior,
  vaultDebug,
  vaultWarn
} from '@sdux-vault/shared';

import { MergeConfig } from '@sdux-vault/shared';

/**
 * Core merge behavior that performs **array append semantics**.
 *
 * This behavior is used during the merge stage of the ngSDuX pipeline.
 * When both the current and incoming values are arrays, it returns a
 * new array containing the concatenation of both values (`[...curr, ...next]`).
 *
 * If either value is not an array, the incoming value is returned as-is.
 *
 * Merge behavior is **pure**, meaning it never mutates the input arrays.
 * It also supports a `clearUndefined` option, which converts an explicit
 * `undefined` incoming value into a `VAULT_NOOP` signal if configured.
 *
 * @typeParam T - The value type being merged.
 */
@VaultBehavior({
  type: BehaviorTypes.Merge,
  key: defineBehaviorKey('Merge', 'ArrayAppend'),
  critical: true
})
export class withArrayAppendMergeBehavior<T>
  implements MergeBehaviorContract<T>
{
  /**
   * Static metadata assigned by the VaultBehavior decorator.
   */
  static readonly type: BehaviorType;
  /**
   * The static key
   */
  static readonly key: string;

  /** Indicates that append merge is a critical pipeline behavior. */
  static readonly critical = false;

  /** Instance-level pipeline behavior type identifier. */
  readonly type = withArrayAppendMergeBehavior.type;

  /** Unique behavior identifier for diagnostics and devtools. */
  readonly key: string;

  /** Indicates that this instance of the merge behavior is critical. */
  readonly critical = withArrayAppendMergeBehavior.critical;

  /**
   * Creates a new Array Append Merge behavior instance.
   *
   * @param key - Unique behavior identifier assigned by the factory.
   * @param behaviorCtx - BehaviorCtx for future extensibility hooks.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    this.key = key;
  }

  /**
   * Computes the merged output between `currentValue` and `nextValue`
   * using append semantics when both are arrays.
   *
   * - If both values are arrays → returns a new array containing both.
   * - If the incoming value is `undefined` and `clearUndefined` is enabled,
   *   the behavior returns `VAULT_NOOP` to signal an intentional clear.
   * - If only one value is an array → returns the incoming value as-is.
   *
   * This method is executed during the merge stage of the pipeline and
   * must remain pure and side-effect free.
   *
   * @param currentValue - The current upstream value before merge.
   * @param nextValue - The incoming value to merge.
   * @param options - Optional merge configuration.
   * @returns The merged result or `VAULT_NOOP` when clearing is requested.
   */
  computeMerge(
    currentValue: PipelineUpstreamValue<T>,
    nextValue: PipelineUpstreamValue<T>,
    options?: MergeConfig
  ): PipelineUpstreamValue<T> {
    const curr = currentValue;
    const next = nextValue;
    const clear = options?.clearUndefined ?? false;

    vaultDebug(`${this.key} merge called (clear: ${clear})`);

    if (next === undefined && !clear) {
      vaultDebug(
        `${this.key} computeMerge skipped. next="${next}" clear="${clear}"`
      );
      return curr;
    }

    if (next === undefined && clear) {
      vaultDebug(
        `${this.key} ComputeMerge skipped. next="${next}" clear="${clear}"`
      );
      return VAULT_CLEAR_STATE;
    }

    if (Array.isArray(curr) && Array.isArray(next)) {
      vaultDebug(`${this.key} appending arrays → return [...curr, ...next]`);
      return [...curr, ...next] as PipelineUpstreamValue<T>;
    }

    vaultDebug(`${this.key} non-array branch. return next`);
    return next as PipelineUpstreamValue<T>;
  }

  /**
   * Lifecycle hook invoked when the behavior instance is destroyed.
   * This behavior maintains no internal resources and requires no cleanup.
   */
  destroy(): void {
    vaultWarn(`${this.key} - destroy "noop"`);
  }

  /**
   * Resets the merge behavior to its initial state.
   *
   * Array append merge is a stateless, pure behavior and does not maintain
   * any internal data, timers, or cached values. Resetting this behavior
   * simply records the reset event for diagnostics and DevTools inspection.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset "noop"`);
  }
}
