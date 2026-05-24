import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { Observable } from 'rxjs';
import { LookupBehaviorOptions } from '../options/lookup-behavior.options';

/**
 * Extends a FeatureCell instance with lookup-related API placeholders.
 *
 * This function defines the `lookup`, `lookup$`, and `withLookup` members on the
 * provided FeatureCell shape, establishing the consumer-facing contract that is
 * later fulfilled by an installed lookup behavior. The default implementations
 * are placeholders and are replaced at runtime or build time by the behavior
 * system.
 *
 *
 * @param cell - The FeatureCell instance to extend with lookup APIs.
 */
export function extendLookupFunction<T>(cell: FeatureCellBaseShape<T>) {
  /**
   * Resolves a lookup request by identifier.
   *
   * @param _id - Identifier used to perform the lookup.
   * @returns A promise that resolves to the lookup result.
   */
  // eslint-disable-next-line
  cell.lookup = function (_id: string): Promise<any> {
    throw new Error('[vault] lookup() behavior not installed');
  };

  /**
   * Resolves a lookup request by identifier as an observable.
   *
   * @param _id - Identifier used to perform the lookup.
   * @returns An observable that emits the lookup result.
   */
  // eslint-disable-next-line
  cell.lookup$ = function (_id: string): Observable<any> {
    throw new Error('[vault] lookup$() behavior not installed');
  };

  /**
   * Configures lookup behavior options on the FeatureCell instance.
   *
   * @param _options - Configuration options used to enable lookup behavior.
   * @returns The FeatureCell instance augmented with lookup behavior.
   */
  cell.withLookup = function (_options: LookupBehaviorOptions<T>) {
    throw new Error('[vault] withLookup() behavior not installed');
  };
}
