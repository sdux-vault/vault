import { TapCallback } from '@sdux-vault/shared';
import { ExtendedStateSnapshot } from './interfaces/extended-state-snap-shot.interface';

/**
 * Produces a pure `TapFunction<T>` implementation used by the partial Tap
 * integration test suite.
 *
 * This factory creates a tap function that:
 * - receives the immutable `StateSnapshot<T>` supplied by the pipeline
 * - annotates it with a `source` identifier (via `ExtendedStateSnapshot<T>`)
 * - records the enriched snapshot into the provided `taps` collection
 *
 * Because the function returned is a **pure standalone tap** (no lexical
 * `this`, no class binding), it validates that SDuX correctly executes
 * external, factory-produced tap functions within `beforeTaps()` and
 * `afterTaps()` chains.
 *
 * @typeParam T The FeatureCell state type.
 * @param type A string label used to tag the tap's origin in tests.
 * @param taps The collection into which captured tap snapshots are pushed.
 * @returns A `TapFunction<T>` suitable for registration with the SDuX pipeline.
 */
export const partialPureTapFunction = <T>(
  type: string,
  taps: ExtendedStateSnapshot<T>[]
): TapCallback<T> => {
  return (value: T): void => {
    const extendedTap = { value } as ExtendedStateSnapshot<T>;
    extendedTap.source = type;
    taps.push(extendedTap);
  };
};
