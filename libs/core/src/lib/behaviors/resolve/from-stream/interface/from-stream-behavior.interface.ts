import { BehaviorExtFunction } from '@sdux-vault/shared';
import { Observable } from 'rxjs';
import { FromStreamOptions } from '../options/from-stream.options';

/**
 * Runtime extension contract for behaviors that expose a `fromStream` API.
 *
 * This interface defines the shape of the dynamically injected extension
 * that enables streaming observable sources to participate in pipeline
 * execution through a FeatureCell instance.
 */
export interface FromStreamBehaviorExtension extends Partial<
  Record<string, BehaviorExtFunction>
> {
  [key: string]: BehaviorExtFunction | undefined;

  /**
   * Function used to bridge an observable stream into the FeatureCell pipeline.
   */
  fromStream: BehaviorExtFunction;
}

declare module '@sdux-vault/shared' {
  /**
   * FeatureCell extension surface for stream-based resolution.
   */
  interface FeatureCellExtension<TEntity> {
    /**
     * Submits a streaming observable source for pipeline processing.
     *
     * @param source$ Observable stream emitting candidate values.
     * @param options Optional configuration controlling stream behavior.
     */
    fromStream?(
      source$: Observable<TEntity>,
      options?: FromStreamOptions
    ): void;
  }
}
/** Module augmentation anchor for the fromStream behavior extension. */
export const __fromStream_extension = true;
