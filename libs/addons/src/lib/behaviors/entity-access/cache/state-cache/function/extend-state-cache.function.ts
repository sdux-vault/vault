import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { Observable } from 'rxjs';
import { StateCacheBehaviorOptions } from '../options/state-cache-behavior.options';

/**
 * Augments a feature cell with placeholder state cache APIs that define the public
 * cache lookup and configuration surface to be replaced by the state cache behavior.
 *
 *
 * @param cell - Feature cell instance to extend with state cache APIs.
 * @returns void
 */
export function extendStateCacheFunction<T>(
  cell: FeatureCellBaseShape<T>
): void {
  // eslint-disable-next-line
  cell.cacheLookup = function (_id: string): Promise<any> {
    // runtime behavior will replace this implementation
    throw new Error('[vault] cacheLookup() behavior not installed');
  };

  // eslint-disable-next-line
  cell.cacheLookup$ = function (_id: string): Observable<any> {
    // runtime behavior will replace this implementation
    throw new Error('[vault] cacheLookup$() behavior not installed');
  };
}

/**
 * Installs the withStateCache fluent API stub on a FeatureCell.
 *
 * @param cell - The FeatureCell base shape to extend.
 */
export function extendWithStateCacheFluent<T>(
  cell: FeatureCellBaseShape<T>
): void {
  cell.withStateCache = function (_options: StateCacheBehaviorOptions<T>) {
    // buildtime behavior will replace this implementation
    throw new Error('[vault] withStateCache() behavior not installed');
  };
}
