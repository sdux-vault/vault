import { FeatureCellShape } from '@sdux-vault/engine';
import { DeferredFactory, StateInputShape } from '@sdux-vault/shared';

/**
 * Extends a FeatureCell with promise-based resolution placeholders.
 *
 * This function attaches `fromDeferred` and `fromPromise` methods to the
 * FeatureCell shape as build-time stubs. These methods are replaced at
 * runtime by the corresponding resolve behavior when installed.
 *
 *
 * @param cell The FeatureCell instance being extended.
 */
export function extendFromPromise<T>(cell: FeatureCellShape<T>) {
  /**
   * Resolves state from a deferred factory using promise semantics.
   *
   * @param _incoming Deferred factory that produces the state value.
   * @returns A promise resolving to a normalized state envelope.
   */
  cell.fromDeferred = function (
    _incoming: DeferredFactory<T>
  ): Promise<StateInputShape<T>> {
    // runtime behavior will replace this implementation
    throw new Error('[vault] fromDeferred() behavior not installed');
  };

  /**
   * Resolves state from a deferred factory using promise semantics.
   *
   * @param _incoming Deferred factory that produces the state value.
   * @returns A promise resolving to a normalized state envelope.
   */
  cell.fromPromise = function (
    _incoming: DeferredFactory<T>
  ): Promise<StateInputShape<T>> {
    // runtime behavior will replace this implementation
    throw new Error('[vault] fromPromise() behavior not installed');
  };
}
