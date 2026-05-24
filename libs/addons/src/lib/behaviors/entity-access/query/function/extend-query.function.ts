import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { QueryBehaviorOptions } from '../options/query-behavior.options';

/**
 * Installs query and withQuery fluent API stubs on a FeatureCell.
 *
 * @param cell - The FeatureCell base shape to extend.
 */
export function extendQueryFunction<TEntity>(
  cell: FeatureCellBaseShape<TEntity>
) {
  cell.query = function (_id: string): TEntity | undefined {
    throw new Error('[vault] query() behavior not installed');
  };

  cell.withQuery = function (_options: QueryBehaviorOptions) {
    throw new Error('[vault] withQuery() behavior not installed');
  };
}
