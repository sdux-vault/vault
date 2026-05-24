import { FeatureCellShape } from '@sdux-vault/angular';
import { StateSnapshotShape, TapCallback } from '@sdux-vault/shared';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { ExtendedStateSnapshot } from './interfaces/extended-state-snap-shot.interface';

/**
 * p200TapAbstractClass<T>
 *
 * Base class used in integration tests to verify TapFunction behavior
 * across the FeatureCell pipeline. This abstraction exposes multiple
 * types of tap function implementations—arrow, inline, bound, and
 * nested/private—to ensure the pipeline accepts and executes all
 * valid TapFunction forms.
 *
 * ---
 * **TapFunction<T> Reminder**
 *
 * A TapFunction observes the immutable resolved state snapshot at a
 * specific point in the pipeline. It must:
 * - receive a `StateSnapshot<T>`
 * - NOT modify the state
 * - NOT return a value
 * - perform side effects only (logging, analytics, instrumentation)
 *
 * ```ts
 * export type TapFunction<T> = (current: StateSnapshot<T>) => void;
 * ```
 *
 * Tap functions run **after filters and reducers**, and before optional
 * encryption or persistence behaviors.
 */
export class PartialTapAbstractClass<T> extends PrimaryPartialAbstractClass<T> {
  /** Accumulated tap results captured during pipeline execution. */
  public taps: ExtendedStateSnapshot<T>[] = [];

  /**
   * Creates a new tap test abstraction.
   *
   * @param vault The injected FeatureCell instance.
   * @param type  A string prefix used to identify this tap source during tests.
   * @param taps A any of ExtendedStateSnapshots that record the tap was called.
   */
  constructor(
    vault: FeatureCellShape<T>,
    private type: string
  ) {
    super(vault);
  }

  /**
   * Removes all collected tap entries.
   */
  clearTaps(): void {
    this.taps.length = 0;
  }

  /**
   * Returns all collected tap events as immutable state snapshots.
   *
   * @returns An array of `StateSnapshot<T>` instances captured from tap execution.
   */
  getTaps(): StateSnapshotShape<T>[] {
    return this.taps;
  }

  /**
   * Arrow tap (#1)
   *
   * Demonstrates an arrow-function style TapFunction<T>.
   * Arrow taps preserve lexical `this` and represent the most common tap usage.
   */
  partialArrowTapFunction: TapCallback<T> = (value: T): void => {
    const extendedTap = {
      value
    } as ExtendedStateSnapshot<T>;
    extendedTap.source = `partialArrow${this.type}TapFunction`;
    this.taps.push(extendedTap);
  };

  /**
   * Inline tap (#2)
   *
   * Demonstrates a class method used directly as a TapFunction<T>.
   * This verifies that prototype methods (unbound) are supported.
   *
   * @param value The immutable FeatureCell state snapshot.
   */
  public partialInlineTapFunction(value: T): void {
    const extendedTap = {
      value
    } as ExtendedStateSnapshot<T>;
    extendedTap.source = `partialInline${this.type}TapFunction`;
    this.taps.push(extendedTap);
  }

  /**
   * Private helper used by the nested/bound tap variant.
   *
   * @param value The immutable FeatureCell state snapshot.
   * @internal Used only to validate nested call chaining.
   */
  #partialPrivateTapFunction(value: T): void {
    const extendedTap = {
      value
    } as ExtendedStateSnapshot<T>;
    extendedTap.source = `partialPrivate${this.type}TapFunction`;
    this.taps.push(extendedTap);
  }

  /**
   * Bound (#3)
   *
   * Demonstrates a TapFunction<T> that calls into a private helper.
   * This validates that nested and bound tap functions execute correctly
   * and preserve the expected execution context.
   *
   * @param tap The immutable FeatureCell state snapshot.
   */
  public partialNestedTapFunction(tap: T): void {
    this.#partialPrivateTapFunction(tap);
  }
}
