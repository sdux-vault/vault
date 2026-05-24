import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { StepwiseBehaviorOptions } from '../options/stepwise-behavior.options';

/**
 * Extends a FeatureCell instance with the stepwise reducer configuration API.
 *
 * This function installs a placeholder `withStepwiseReducer` method on the cell
 * shape, which is intended to be replaced at runtime by the corresponding
 * stepwise reducer behavior implementation.
 *
 * @param cell - The FeatureCell base shape to extend.
 * @returns Nothing.
 */
export function extendStepwiseReducerFunction<T>(
  cell: FeatureCellBaseShape<T>
): void {
  /**
   * Configures stepwise reducer behavior for the FeatureCell.
   *
   * @param _options - Configuration options supplied to the stepwise reducer behavior.
   * @returns The FeatureCell instance for fluent chaining.
   */
  cell.withStepwiseReducer = function (_options: StepwiseBehaviorOptions<T>) {
    throw new Error('[vault] withStepwiseReducer() behavior not installed');
  };
}
