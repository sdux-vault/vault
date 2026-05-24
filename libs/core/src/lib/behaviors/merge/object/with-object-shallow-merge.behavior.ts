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
 * Shallow object merge behavior for the Vault merge stage.
 *
 * This behavior performs a one-level object merge where the incoming
 * object spreads over the existing state. Non-object values, arrays,
 * and `null` values bypass merging and are returned directly.
 *
 * The behavior also supports optional merge configuration, such as
 * `clearUndefined`, which determines whether an `undefined` incoming
 * value should clear the current state.
 *
 * This merge strategy is marked as a core, critical behavior and must
 * always be present when selected as the FeatureCell’s merge behavior.
 *
 * @typeParam T - The state value type processed during merge.
 */
@VaultBehavior({
  type: BehaviorTypes.Merge,
  key: defineBehaviorKey('Core', 'ObjectMerge'),
  critical: true
})
export class withObjectShallowMergeBehavior<T>
  implements MergeBehaviorContract<T>
{
  /** Static metadata used for orchestrator behavior classification. */
  static readonly type: BehaviorType;

  /** Unique identifier for behavior diagnostics and devtools. */
  static readonly key: string;

  /** Indicates this merge behavior is pipeline-critical. */
  static readonly critical = true;

  /** Pipeline behavior type identifier. */
  readonly type = BehaviorTypes.Merge;

  /** Unique merge behavior instance identifier. */
  readonly key: string;

  /** Instance-level criticality flag. */
  readonly critical = true;

  /**
   * Creates a new shallow object merge behavior instance.
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
   * Computes the shallow merge result between the current state and
   * the incoming value. Non-object inputs bypass merging and are
   * forwarded directly. When `clearUndefined=true`, an undefined
   * incoming value clears the state.
   *
   * @param currentValue - The current FeatureCell state value.
   * @param nextValue - The incoming value to merge into the current state.
   * @param options - Optional merge configuration including `clearUndefined`.
   * @returns The merged or forwarded next state value.
   */
  computeMerge(
    currentValue: PipelineUpstreamValue<T> | undefined,
    nextValue: PipelineUpstreamValue<T> | undefined,
    options?: MergeConfig
  ): PipelineUpstreamValue<T> | undefined {
    const curr = currentValue;
    const next = nextValue;

    const clear = options?.clearUndefined ?? false;

    vaultDebug(`${this.key} shallow merge (clearUndefined=${clear})`);

    if (next === undefined && !clear) {
      vaultDebug(`${this.key} next undefined, preserve current`);
      return curr;
    }

    if (next === undefined && clear) {
      vaultDebug(`${this.key} next undefined & clear=true → return undefined`);
      return VAULT_CLEAR_STATE;
    }

    if (
      curr == null ||
      next == null ||
      typeof curr !== 'object' ||
      typeof next !== 'object' ||
      Array.isArray(curr) ||
      Array.isArray(next)
    ) {
      vaultDebug(`${this.key} non-object merge return next`);
      return next;
    }

    vaultDebug(`${this.key} shallow merge curr & next`);
    return { ...curr, ...next } as PipelineUpstreamValue<T>;
  }

  /**
   * Invoked when the behavior instance is destroyed.
   * This merge behavior maintains no internal resources.
   */
  destroy(): void {
    vaultWarn(`${this.key} - destroy "noop"`);
  }

  /**
   * Resets the shallow merge behavior.
   *
   * Object shallow merge is a fully stateless, pure merge strategy.
   * It holds no timers, caches, or internal merge state, meaning
   * there is nothing to reset. This lifecycle hook exists solely
   * to support the FeatureCell reset pipeline and to provide a
   * diagnostic signal for DevTools and monitoring systems.
   *
   * After reset, the behavior continues to function identically.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset "noop"`);
  }
}
