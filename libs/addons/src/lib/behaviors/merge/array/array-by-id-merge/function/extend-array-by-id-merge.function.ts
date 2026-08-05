import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { ArrayByIdMergeOptions } from '../options/array-by-id-merge-behavior.options';

/**
 * Installs delete and withArrayMergeId fluent API stubs on a FeatureCell.
 *
 * @param cell - The FeatureCell base shape to extend.
 */
export function extendArrayByIdMergeFunction<TEntity>(
  cell: FeatureCellBaseShape<TEntity>
) {
  cell.delete = function (_id: string): void {
    throw new Error('[vault] delete() behavior not installed');
  };

  cell.withArrayMergeId = function (_options: ArrayByIdMergeOptions) {
    throw new Error('[vault] withArrayMergeId() behavior not installed');
  };
}
