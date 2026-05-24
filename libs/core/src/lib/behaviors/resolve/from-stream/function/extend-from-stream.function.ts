import { FeatureCellShape } from '@sdux-vault/engine';
import { Observable } from 'rxjs';
import { FromStreamOptions } from '../options/from-stream.options';

/**
 * Extends a FeatureCell instance with a placeholder `fromStream` API.
 *
 * This function installs a stub implementation that is replaced at runtime
 * by the corresponding behavior. It defines the method shape so that
 * consumers may invoke `fromStream` once the behavior is installed.
 *
 * @param cell The FeatureCell instance being extended.
 */
export function extendFromStream<T>(cell: FeatureCellShape<T>) {
  /**
   * Bridges a streaming observable source into the FeatureCell pipeline.
   *
   * @param _source$ Observable stream emitting values to be resolved.
   * @param _options Optional stream configuration options.
   */
  cell.fromStream = function (
    _source$: Observable<T>,
    _options: FromStreamOptions
  ): void {};
}
