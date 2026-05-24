import type {
  OperatorBehaviorContract,
  OperatorsBehaviorClassContract,
  PipelineUpstreamValue
} from '@sdux-vault/shared';
import {
  BehaviorClassContext,
  BehaviorType,
  BehaviorTypes,
  defineBehaviorKey,
  DistinctComparison,
  safeStringify,
  VAULT_NOOP,
  VaultBehavior,
  vaultDebug,
  vaultWarn
} from '@sdux-vault/shared';

/**
 * Operator behavior that suppresses updates unless the incoming value
 * differs from the previously emitted value. Values are compared using
 * either:
 *
 * 1. A user-provided comparison function, or
 * 2. A structural JSON-based comparison (default)
 *
 * This operator is useful for preventing redundant state processing
 * when consecutive pipeline values are semantically identical.
 *
 * @typeParam T - The state value type processed by this operator.
 */
@VaultBehavior({
  type: BehaviorTypes.Operator,
  key: defineBehaviorKey('Addon', 'DistinctUntilChanged'),
  critical: true
})
abstract class withDistinctUntilChangedBehavior<T>
  implements OperatorBehaviorContract<T>
{
  /** Static metadata describing the behavior classification. */
  static readonly type: BehaviorType;

  /** Static identifier for behavior discovery and debugging. */
  static readonly key: string;

  /** Indicates that this behavior participates critically in the pipeline. */
  static readonly critical: boolean;

  /** Instance-level criticality. */
  readonly critical = withDistinctUntilChangedBehavior.critical;

  /** Operator behavior type classification. */
  readonly type = withDistinctUntilChangedBehavior.type;

  /** Unique identifier for this operator instance. */
  readonly key: string;

  /** Last successfully emitted value used for distinct comparison. */
  #previous: PipelineUpstreamValue<T> = undefined;

  /**
   * User-provided comparison function for determining equality.
   * If omitted, structural JSON comparison is used.
   */
  private readonly compare?: DistinctComparison<T>;

  /**
   * Creates a new instance of the DistinctUntilChanged operator.
   *
   * @param key - Unique behavior identifier assigned by the factory.
   * @param behaviorCtx - BehaviorCtx for future extensibility hooks.
   * @param compare - Optional custom comparison function.
   */
  protected constructor(
    key: string,
    behaviorCtx: BehaviorClassContext,
    compare?: DistinctComparison<T>
  ) {
    this.key = key;
    this.compare = compare;
  }

  /**
   * Applies the distinct-until-changed operator to the provided value.
   * If this is the first emission, the value is always forwarded.
   * If the value equals the previous emission according to the configured
   * comparison strategy, it is suppressed.
   *
   * @param value - The incoming pipeline value.
   * @returns The value to forward, or `undefined` to suppress emission.
   */
  async applyOperator(
    value: PipelineUpstreamValue<T>
  ): Promise<PipelineUpstreamValue<T>> {
    vaultDebug(
      `${this.key} applyOperator called with value: "${safeStringify(value)}"`
    );

    if (value == null) {
      vaultDebug(`${this.key} skipped — value is invalid.`);
      return VAULT_NOOP;
    }

    // First emission
    if (this.#previous === undefined) {
      this.#previous = value;
      vaultDebug(`${this.key} first value accepted: "${safeStringify(value)}"`);
      return value;
    }

    // Duplicate → block
    if (this.#isEqual(value, this.#previous)) {
      vaultDebug(
        `${this.key} value unchanged. Blocking update and returning noop.`
      );
      return VAULT_NOOP;
    }

    // Changed → accept and update previous
    this.#previous = value;

    vaultDebug(
      `${this.key} value changed. Emitting "${safeStringify(value)}".`
    );
    return value;
  }

  /**
   * Determines equality between two values using either a custom
   * user-provided comparison strategy or a default structural JSON
   * comparison. This method encapsulates the equality logic used by
   * the operator to decide whether to suppress or emit a value.
   *
   * @param incoming - The new incoming value.
   * @param lastEmittedValue - The last emitted value.
   * @returns `true` if the values are considered equal.
   */
  #isEqual(
    incoming: PipelineUpstreamValue<T>,
    lastEmittedValue: PipelineUpstreamValue<T>
  ): boolean {
    if (this.compare) {
      return this.compare(incoming as T, lastEmittedValue as T);
    }
    return JSON.stringify(incoming) === JSON.stringify(lastEmittedValue);
  }

  /**
   * Resets the internal cached value when the operator is destroyed.
   * This ensures the next created instance treats its first value as new.
   */
  destroy() {
    vaultWarn(`${this.key} - destroy called`);
    this.#previous = undefined;
  }

  /**
   * Resets the operator’s internal distinct-tracking state.
   *
   * The previously-emitted value is cleared so that the next incoming
   * value is always treated as a new emission. This ensures that a
   * reset causes the operator to “forget” historical comparisons and
   * re-evaluate the next value as if seen for the first time.
   *
   * This mirrors the behavior of destroy(), but is invoked during
   * FeatureCell resets rather than during teardown.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset called; clearing previous distinct value`);
    this.#previous = undefined;
  }
}

/**
 * Factory function for constructing the DistinctUntilChanged operator.
 * The returned behavior class is ready to be registered inside a vault
 * pipeline. A custom comparison function may be supplied to override
 * the default structural comparison.
 *
 * @typeParam T - The state value type to be processed by the operator.
 * @param compare - Optional equality comparison function.
 * @returns A behavior class to be registered via `.operators([...])`.
 */
export function withDistinctUntilChanged<T>(
  compare?: DistinctComparison<T>
): OperatorsBehaviorClassContract<T> {
  class DistinctUntilChangedOperator extends withDistinctUntilChangedBehavior<T> {
    static override readonly type = BehaviorTypes.Operator;
    static override readonly key = defineBehaviorKey(
      'Addon',
      `DistinctUntilChanged`
    );
    static override readonly critical = true;

    constructor(key: string, behaviorCtx: BehaviorClassContext) {
      super(key, behaviorCtx, compare);
    }
  }

  return DistinctUntilChangedOperator;
}
