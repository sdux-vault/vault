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
 * Array merge behavior for Vault.
 *
 * This merge strategy replaces arrays rather than merging them, ensuring
 * predictable and immutable updates for list-like state. All non-array values
 * are returned directly without transformation.
 *
 * This behavior is marked as critical, ensuring it participates in every
 * merge pipeline unless explicitly replaced by a custom merge behavior.
 *
 * @typeParam T - The pipeline state value type handled by this behavior.
 */
@VaultBehavior({
  type: BehaviorTypes.Merge,
  key: defineBehaviorKey('Core', 'ArrayMerge'),
  critical: true
})
export class withArrayMergeBehavior<T> implements MergeBehaviorContract<T> {
  /** Static behavior type used by the orchestrator. */
  static readonly type: BehaviorType;

  /** Static unique key assigned to this behavior. */
  static readonly key: string;

  /** Indicates this behavior is required for merge processing. */
  static readonly critical = true;

  /** Instance-level merge behavior type identifier. */
  readonly type = withArrayMergeBehavior.type;

  /** Unique identifier for this behavior instance. */
  readonly key: string;

  /** Flags this behavior instance as critical within the pipeline. */
  readonly critical = withArrayMergeBehavior.critical;

  /**
   * Creates a new array merge behavior instance.
   *
   * @param key - Unique behavior identifier supplied by the factory.
   * @param behaviorCtx - BehaviorCtx for future extensibility hooks.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    this.key = key;
  }

  /**
   * Computes the merged state value using array-replacement semantics.
   *
   * - If `nextValue` is undefined and `clearUndefined` is false,
   *   the current value is preserved.
   * - If `nextValue` is undefined and `clearUndefined` is true,
   *   the merge resolves to `undefined`.
   * - If both values are arrays, a shallow clone of `nextValue`
   *   is returned to maintain immutability.
   * - All other values pass through as-is.
   *
   * @param currentValue - The existing state value.
   * @param nextValue - The incoming state value to merge.
   * @param options - Optional merge configuration.
   * @returns The merged pipeline value.
   */
  computeMerge(
    currentValue: PipelineUpstreamValue<T> | undefined,
    nextValue: PipelineUpstreamValue<T> | undefined,
    options?: MergeConfig
  ): PipelineUpstreamValue<T> {
    const curr = currentValue;
    const next = nextValue;

    const clear = options?.clearUndefined ?? false;

    vaultDebug(`${this.key} merge called (clear: ${clear})`);

    if (next === undefined && !clear) {
      vaultDebug(
        `${this.key} computeMerge skipped. The next value "${next}" and clear is "${clear}`
      );
      return curr;
    }

    if (next === undefined && clear) {
      vaultDebug(
        `${this.key} computeMerge skipped. The next value "${next}" and clear is "${clear}`
      );
      return VAULT_CLEAR_STATE;
    }

    if (Array.isArray(curr) && Array.isArray(next)) {
      vaultDebug(`${this.key} merging array. Return clone of next`);
      return [...next] as PipelineUpstreamValue<T>;
    }

    vaultDebug(`${this.key} non-array branch. Return next`);
    return next as PipelineUpstreamValue<T>;
  }

  /**
   * Performs teardown when the behavior instance is destroyed.
   * This merge behavior maintains no resources and requires no cleanup.
   */
  destroy(): void {
    vaultWarn(`${this.key} - destroy "noop"`);
  }

  /**
   * Resets the merge behavior.
   *
   * Array merge is a fully stateless behavior and maintains no internal
   * resources, configuration mutations, or cached values. As a result,
   * this reset operation performs no functional work and simply emits a
   * diagnostic event for DevTools and monitoring.
   *
   * After reset, this behavior continues to operate identically to before.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset "noop"`);
  }
}
