import { BehaviorExtFunction } from '@sdux-vault/shared';
import { ArrayByIdMergeOptions } from '../options/array-by-id-merge-behavior.options';

/**
 * Defines the extension contract for deleting entities by identifier and configuring array merge behavior.
 */
// eslint-disable-next-line
export interface ArrayByIdMergeBehaviorExtension<TEntity> extends Partial<
  Record<string, BehaviorExtFunction>
> {
  /**
   * Index signature supporting dynamic behavior extension bindings.
   */
  [key: string]: BehaviorExtFunction | undefined;
}

declare module '@sdux-vault/shared' {
  /**
   * Augments the FeatureCell base shape with array-by-id-merge delete configuration support.
   */
  // eslint-disable-next-line
  interface FeatureCellFluentApi<TEntity> {
    /**
     * Registers array-by-id-merge delete behavior configuration on the FeatureCell instance.
     *
     * @param options - Options used to configure array-by-id-merge delete behavior.
     * @returns The FeatureCell instance for chaining.
     */
    withArrayMergeId?(options: ArrayByIdMergeOptions): this;
  }
}
