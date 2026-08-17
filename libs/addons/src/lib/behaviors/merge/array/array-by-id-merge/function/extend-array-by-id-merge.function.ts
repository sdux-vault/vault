import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { ArrayByIdMergeOptions } from '../options/array-by-id-merge-behavior.options';

/**
 * Installs withArrayMergeId fluent API stub on a FeatureCell.
 *
 * @param cell - The FeatureCell base shape to extend.
 */
export function extendArrayByIdMergeFunction<TEntity>(
  cell: FeatureCellBaseShape<TEntity>
) {
  cell.withArrayMergeId = function (_options: ArrayByIdMergeOptions) {
    throw new Error('[vault] withArrayMergeId() behavior not installed');
  };
}
