import {
  BehaviorClassContext,
  BehaviorType,
  BehaviorTypes,
  defineBehaviorKey,
  FilterBehaviorContract,
  FilterFunction,
  PipelineUpstreamValue,
  safeStringify,
  VAULT_NOOP,
  VaultBehavior,
  vaultDebug,
  vaultError,
  vaultWarn
} from '@sdux-vault/shared';

/**
 * Core filter behavior for Vault.
 *
 * This behavior participates in the filter stage of the pipeline.
 * A filter function receives the current state and may return:
 * - the same state
 * - a transformed state of the same structural type
 * - `undefined` to indicate that the state update should be aborted
 *
 * This behavior enforces type alignment between the incoming value
 * and the filtered result, ensuring that filters cannot mutate or
 * reshape the state into an incompatible type. When a mismatch is
 * detected, a controlled Vault error is thrown.
 *
 * Filters MUST be pure and must not mutate the incoming value.
 *
 * @typeParam T - The state type handled by this filter behavior.
 */
@VaultBehavior({
  type: BehaviorTypes.Filter,
  key: defineBehaviorKey('Core', 'Filter'),
  critical: true
})
export class withCoreFilterBehavior<T> implements FilterBehaviorContract<T> {
  /** Static behavior type used for pipeline classification. */
  static readonly type: BehaviorType;

  /** Unique behavior key used for introspection and diagnostics. */
  static readonly key: string;

  /** Indicates that filter behavior is required in the pipeline. */
  static readonly critical: boolean;

  /** Instance-level criticality flag. */
  readonly type = BehaviorTypes.Filter;

  /** Indicates that this behavior must always run as part of filtering. */
  readonly critical = true;

  /** Unique identifier for this filter behavior instance. */
  readonly key: string;

  /**
   * Creates a new filter behavior instance.
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
   * Applies the provided filter function to the current state.
   *
   * If the filter returns `undefined`, the state update is aborted.
   * Filter output must preserve the shape of:
   * - arrays
   * - plain objects
   * - primitives
   *
   * Structural mismatches result in a thrown Vault error.
   * Filters must not mutate the incoming value and should remain pure.
   *
   * @param current - The current value before filtering.
   * @param filter - A pure filter function that may transform or reject the value.
   * @returns The filtered value, or `undefined` to abort the update.
   */
  applyFilter(current: T, filter: FilterFunction<T>): PipelineUpstreamValue<T> {
    vaultDebug(
      `${this.key} applyFilter called with "${safeStringify(current)}".`
    );

    if (current === undefined) {
      vaultDebug(
        `${this.key} applyFilter skipped - not a valid plain state. The current type is ${typeof current}. Undefined returned.`
      );
      return undefined;
    }
    if (typeof filter !== 'function') {
      vaultDebug(
        `${this.key} applyFilter skipped. The filter type is ${typeof filter}. "${safeStringify(current)}" returned.`
      );
      return current;
    }

    let next: T;
    try {
      next = filter(current);
      // eslint-disable-next-line
    } catch (err: any) {
      vaultError(`${this.key} filter execution failed`, err.message);
      throw err;
    }

    if (next === undefined) {
      vaultDebug(`${this.key} Filter returned undefined. state rejected.`);
      return VAULT_NOOP;
    }

    if (this.#handleArrayLogic(current, next)) return next;

    if (this.#handleObjectLogic(current, next)) return next;

    this.#handlePrimitiveLogic(current, next);

    vaultDebug(
      `${this.key} applyFilter returned with "${safeStringify(next)}".`
    );
    return next;
  }

  /**
   * Performs type validation when filtering array state values.
   *
   * Ensures the filtered output remains an array when the input was an array.
   *
   * @param current - The pre-filter state value.
   * @param next - The filtered state value.
   * @returns `true` if array handling was applied.
   */
  #handleArrayLogic(current: T, next: T): boolean {
    if (Array.isArray(current)) {
      if (!Array.isArray(next)) {
        this.#typeAlignmentDebug(current, next);
        throw new Error(`[vault] Filter returned non-array for array input.`);
      }
      return true;
    }

    return false;
  }

  /**
   * Performs type validation when filtering object-based state values.
   *
   * Ensures the filter returns a valid non-null object of compatible structure.
   *
   * @param current - The pre-filter state value.
   * @param next - The filtered state value.
   * @returns `true` if object handling was applied.
   */
  #handleObjectLogic(current: T, next: T): boolean {
    if (current !== null && typeof current === 'object') {
      if (typeof next !== 'object' || next === null || Array.isArray(next)) {
        this.#typeAlignmentDebug(current, next);
        throw new Error(
          `[vault] Filter returned invalid object for object input.`
        );
      }
      return true;
    }
    return false;
  }

  /**
   * Performs type validation for primitive state values.
   *
   * Ensures the filter output matches the primitive type of the input.
   *
   * @param current - The pre-filter primitive value.
   * @param next - The filtered primitive value.
   */
  #handlePrimitiveLogic(current: T, next: T): void {
    if (typeof next !== typeof current) {
      this.#typeAlignmentDebug(current, next);
      throw new Error(
        `[vault] Filter returned a value of incorrect type. Expected "${typeof current}", got "${typeof next}".`
      );
    }
  }

  /**
   * Emits detailed debug output when filter output does not align with the input type.
   *
   * @param current - The original state value.
   * @param next - The returned filter value.
   */
  #typeAlignmentDebug(current: T, next: T): void {
    vaultDebug(
      `${this.key} The types not aligned. Current type: "${typeof current}". Next type: ${typeof next}. "${safeStringify(next)}" returned.`
    );
  }

  /**
   * Invoked during behavior teardown.
   * This behavior maintains no internal resources and requires no cleanup.
   */
  destroy(): void {
    vaultWarn(`${this.key} - destroy "noop"`);
  }

  /**
   * Resets the filter behavior.
   *
   * Since core filters do not maintain internal state, this reset operation
   * performs no functional work. It exists to support the FeatureCell reset
   * lifecycle and provides a diagnostic hook for DevTools and monitoring.
   *
   * After reset, the behavior continues operating identically to before.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset "noop"`);
  }
}
