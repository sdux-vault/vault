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

import { ObjectDeepMergeConfig } from '@sdux-vault/shared';

/**
 * Deep merge behavior used to combine nested state objects in the Vault pipeline.
 *
 * This behavior performs a recursive deep merge across plain-object structures,
 * replacing primitive values, arrays, nulls, and non-plain objects while
 * descending into nested plain objects. It supports advanced merge options such
 * as conditional clearing of undefined values and optional removal of null fields.
 *
 * Deep merge is useful for complex feature states that evolve through patch-style
 * updates across multiple nested levels.
 *
 * This behavior is marked **critical**, ensuring that a merge strategy is always
 * present during pipeline execution.
 *
 * @typeParam T - The state value type handled during the merge operation.
 */
@VaultBehavior({
  type: BehaviorTypes.Merge,
  key: defineBehaviorKey('Merge', 'Deep'),
  critical: true
})
export class withObjectDeepMergeBehavior<T>
  implements MergeBehaviorContract<T>
{
  /** Static metadata used by the orchestrator to classify this behavior. */
  static readonly type: BehaviorType;

  /** Global behavior identifier assigned by the decorator. */
  static readonly key: string;

  /** Marks this behavior as required for operation. */
  static readonly critical: boolean;

  /** Instance-level merge type classification. */
  readonly type = withObjectDeepMergeBehavior.type;

  /** Unique behavior key assigned during construction. */
  readonly key: string;

  /** Indicates this behavior is required to run within the merge stage. */
  readonly critical = withObjectDeepMergeBehavior.critical;

  /**
   * Creates a new deep-merge behavior instance.
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
   * Computes a deep merge between the current and next pipeline values.
   *
   * Non-object values—including primitives, arrays, nulls, or non-plain objects—
   * are replaced directly. When both inputs are plain objects, a recursive merge
   * is performed. Optional configuration allows undefined inputs to clear the
   * current value and enables removal of null fields from merged output.
   *
   * @param currentValue - The existing pipeline value before merging.
   * @param nextValue - The incoming update to merge into the current value.
   * @param options - Merge configuration controlling undefined clearing and null stripping.
   * @returns The merged pipeline value.
   */
  computeMerge(
    currentValue: PipelineUpstreamValue<T> | undefined,
    nextValue: PipelineUpstreamValue<T> | undefined,
    options?: ObjectDeepMergeConfig
  ): PipelineUpstreamValue<T> | undefined {
    const curr = currentValue;
    const next = nextValue;

    const clear = options?.clearUndefined ?? false;
    const stripNulls = options?.stripNulls ?? false;

    vaultDebug(
      `${this.key} deepMerge(clear=${clear}, stripNulls=${stripNulls})`
    );

    if (next === undefined && !clear) {
      vaultDebug(`${this.key} next undefined :: preserve current`);
      return curr;
    }

    if (next === undefined && clear) {
      vaultDebug(`${this.key} next undefined & clear=true :: undefined`);
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
      vaultDebug(`${this.key} non-object merge :: next`);
      return next;
    }

    vaultDebug(`${this.key} deep merging objects`);

    // eslint-disable-next-line
    const result = this.#deepMerge(curr as any, next as any);

    return stripNulls ? this.#stripNullsFromObject(result) : result;
  }

  /**
   * Recursively merges two plain objects, descending into nested structures
   * and replacing non-plain-object values. Arrays, nulls, primitives, and
   * class instances are treated as replaceable values and are not traversed.
   *
   * The method constructs a new output object and does not mutate either input.
   *
   * @param target - The base object serving as the merge target.
   * @param incoming - The incoming object providing updated nested fields.
   * @returns The fully merged result object.
   */
  // eslint-disable-next-line
  #deepMerge(target: any, incoming: any): any {
    vaultDebug(
      `${this.key} #deepMerge() called with keys: ${Object.keys(incoming).join(', ')}`
    );

    // eslint-disable-next-line
    const out: any = {};

    for (const key of Object.keys(target)) {
      if (key in incoming) continue;
      const val = target[key];
      out[key] = this.#isPlainObject(val) ? this.#deepMerge(val, {}) : val;
    }

    for (const key of Object.keys(incoming)) {
      const nextVal = incoming[key];
      const currVal = target[key];

      vaultDebug(
        `${this.key} #deepMerge evaluating key="${key}" (curr: ${typeof currVal}, next: ${typeof nextVal})`
      );

      if (this.#isPlainObject(currVal) && this.#isPlainObject(nextVal)) {
        vaultDebug(
          `${this.key} #deepMerge key="${key}" → nested plain objects → recurse`
        );
        out[key] = this.#deepMerge(currVal, nextVal);
      } else {
        vaultDebug(
          `${this.key} #deepMerge key="${key}" → overwrite with next (no recursion)`
        );
        out[key] = nextVal;
      }
    }

    vaultDebug(
      `${this.key} #deepMerge result keys: ${Object.keys(out).join(', ')}`
    );

    return out;
  }

  /**
   * Determines whether the provided value is a plain object suitable for
   * recursive deep merging. Only objects whose prototype is `Object.prototype`
   * qualify as plain objects; arrays, dates, class instances, and other
   * structured objects are excluded.
   *
   * @param value - The value to test for plain-object semantics.
   * @returns `true` if the value is a plain object, otherwise `false`.
   */
  // eslint-disable-next-line
  #isPlainObject(value: any): boolean {
    const isPlainObject =
      value !== null &&
      typeof value === 'object' &&
      Object.getPrototypeOf(value) === Object.prototype;

    vaultDebug(
      `${this.key} #isPlainObject valueType="${typeof value}" isPlainObject=${isPlainObject}`
    );

    return isPlainObject;
  }

  /**
   * Removes all properties with `null` values from a deep merge result.
   * Nested objects are processed recursively, with empty objects removed
   * entirely if all nested values evaluate to null.
   *
   * This method does not modify the input and returns a new cleaned structure.
   *
   * @param obj - The merged object to clean of null-valued fields.
   * @returns A new object with null values removed.
   */
  // eslint-disable-next-line
  #stripNullsFromObject(obj: any): any {
    vaultDebug(
      `${this.key} #stripNullsFromObject called on keys: ${Object.keys(obj).join(', ')}`
    );

    // eslint-disable-next-line
    const out: any = {};

    for (const key of Object.keys(obj)) {
      const value = obj[key];

      if (value === null) {
        vaultDebug(`${this.key} stripNulls key="${key}" → removed (null)`);
        continue;
      }

      if (typeof value === 'object' && !Array.isArray(value)) {
        vaultDebug(
          `${this.key} stripNulls key="${key}" → recurse into nested object`
        );
        const cleaned = this.#stripNullsFromObject(value);

        if (Object.keys(cleaned).length > 0) {
          vaultDebug(
            `${this.key} stripNulls key="${key}" → keeping cleaned nested object`
          );
          out[key] = cleaned;
        } else {
          vaultDebug(
            `${this.key} stripNulls key="${key}" → nested object became empty after cleaning (removed)`
          );
        }
      } else {
        vaultDebug(`${this.key} stripNulls key="${key}" → retained`);
        out[key] = value;
      }
    }

    vaultDebug(
      `${this.key} #stripNullsFromObject final keys: ${Object.keys(out).join(', ')}`
    );

    return out;
  }

  /**
   * Called when the behavior instance is destroyed.
   * This behavior maintains no internal resources and performs no cleanup.
   */
  destroy(): void {
    vaultWarn(`${this.key} - destroy "noop"`);
  }

  /**
   * Resets the deep-merge behavior to its initial state.
   *
   * This merge behavior is completely stateless and retains no internal
   * references, buffers, or cached structures. A reset therefore performs
   * no operational work and exists only for lifecycle completeness and
   * diagnostic visibility within DevTools.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset "noop"`);
  }
}
