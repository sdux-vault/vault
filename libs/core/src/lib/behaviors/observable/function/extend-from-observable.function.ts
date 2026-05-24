import { FeatureCellShape, VaultStateRef } from '@sdux-vault/engine';
import { Observable } from 'rxjs';

/**
 * Extends a FeatureCell with a `fromObservable` helper for observable-based state sources.
 *
 * This function installs a placeholder implementation that accepts an observable
 * and exposes it as a stream of `VaultStateRef<T>` values, with the runtime behavior
 * replaced by the corresponding pipeline behavior when installed.
 *
 * @param cell The FeatureCell instance to extend.
 */
export function extendFromObservable<T>(cell: FeatureCellShape<T>) {
  /**
   * Wraps an observable source for integration with the FeatureCell pipeline.
   *
   * @param source$ Observable emitting raw state values.
   * @returns Observable emitting vault state references.
   */
  cell.fromObservable = function (
    source$: Observable<T>
  ): Observable<VaultStateRef<T>> {
    return source$ as Observable<VaultStateRef<T>>;
  };
}
