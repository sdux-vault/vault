import {
  BehaviorClassContext,
  BehaviorType,
  BehaviorTypes,
  defineBehaviorKey,
  DevMode,
  MergeBehaviorContract,
  PipelineUpstreamValue,
  safeStringify,
  VAULT_CLEAR_STATE,
  VAULT_NOOP,
  VaultBehavior,
  vaultDebug,
  vaultWarn
} from '@sdux-vault/shared';

import { MergeConfig } from '@sdux-vault/shared';

/**
 * Merge behavior that appends a single incoming value to an existing array state.
 *
 * This behavior performs push-style merge semantics by returning a new array
 * containing the current array elements followed by the incoming value, while
 * supporting optional clearing of undefined values via merge configuration.
 */
@VaultBehavior({
  type: BehaviorTypes.Merge,
  key: defineBehaviorKey('Merge', 'ArrayPush'),
  critical: true
})
export class withArrayPushMergeBehavior<T> implements MergeBehaviorContract<T> {
  /**
   * Static behavior type identifier used for pipeline classification.
   */
  static readonly type: BehaviorType;

  /**
   * Static behavior key assigned by the decorator.
   */
  static readonly key: string;

  /**
   * Indicates whether the behavior is critical at the static level.
   */
  static readonly critical = false;

  /**
   * Instance-level behavior type identifier.
   */
  readonly type = withArrayPushMergeBehavior.type;

  /**
   * Unique behavior key for this instance.
   */
  readonly key: string;

  /**
   * Indicates whether this behavior instance is critical.
   */
  readonly critical = withArrayPushMergeBehavior.critical;

  /**
   * Indicates whether the runtime is operating in development mode.
   */
  #isDevMode = false;

  /**
   * Tracks whether a non-array warning has already been emitted.
   */
  #warned = false;

  /**
   * Creates a new array push merge behavior instance.
   *
   * @param key - Unique behavior identifier assigned by the factory.
   * @param behaviorCtx - Behavior class context for dependency injection.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    this.key = key;
    this.#isDevMode = DevMode.active;
  }

  /**
   * Computes the merged result by appending the incoming value to the current array.
   *
   * @param currentValue - The current upstream state value.
   * @param nextValue - The incoming value to merge.
   * @param options - Optional merge configuration.
   * @returns The merged pipeline value or a control signal.
   */
  computeMerge(
    currentValue: PipelineUpstreamValue<T>,
    nextValue: PipelineUpstreamValue<T>,
    options?: MergeConfig
  ): PipelineUpstreamValue<T> {
    const clear = options?.clearUndefined ?? false;

    vaultDebug(`${this.key} merge called (clear: ${clear})`);

    this.#warnNonArray(currentValue, nextValue);

    if (nextValue === undefined && !clear) {
      vaultDebug(
        `${this.key} computeMerge skipped. next="${nextValue}" clear="${clear}"`
      );
      return currentValue;
    }

    if (nextValue === undefined && clear) {
      vaultDebug(
        `${this.key} computeMerge skipped. next="${nextValue}" clear="${clear}"`
      );
      return VAULT_CLEAR_STATE;
    }

    if (Array.isArray(currentValue) && nextValue != null) {
      vaultDebug(`${this.key} pushing T to State → return [...curr, next]`);
      return [...currentValue, nextValue] as PipelineUpstreamValue<T>;
    }

    vaultDebug(`${this.key} non-array branch. return next`);
    return nextValue as PipelineUpstreamValue<T>;
  }

  /**
   * Invoked when the behavior instance is destroyed.
   */
  destroy(): void {
    vaultWarn(`${this.key} - destroy "noop"`);
  }

  /**
   * Resets the behavior to its initial state.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset "noop"`);
  }

  /**
   * Emits a warning when non-array values are encountered during merge.
   *
   * @param currentValue - The current upstream state value.
   * @param nextValue - The incoming value to merge.
   */
  #warnNonArray(
    currentValue: PipelineUpstreamValue<T>,
    nextValue: PipelineUpstreamValue<T>
  ): void {
    if (
      Array.isArray(currentValue) === false &&
      currentValue != null &&
      nextValue !== undefined &&
      currentValue !== VAULT_NOOP
    ) {
      const message = `[vault] ${this.key}: ArrayPushMerge received non-array current value. This behavior is intended for array state.`;
      const output = safeStringify({
        currentType: typeof currentValue,
        currentValue: currentValue,
        nextValue: nextValue
      });

      if (this.#isDevMode && !this.#warned) {
        this.#warned = true;
        // eslint-disable-next-line
        console.warn(`One Time Warning: ${message}`, output);
        vaultWarn(`One Time Warning: ${message}`, output);
      } else {
        vaultWarn(message, output);
      }
    }
  }
}
