import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { StepwiseBehaviorOptions } from '../options/stepwise-behavior.options';

/**
 * Extends a FeatureCell instance with the stepwise filter configuration API.
 *
 * This function installs a placeholder `withStepwiseFilter` method on the cell
 * shape, which is intended to be replaced at runtime by the corresponding
 * stepwise filter behavior implementation.
 *
 * @param cell - The FeatureCell base shape to extend.
 */
export function extendStepwiseFilterFunction<T>(
  cell: FeatureCellBaseShape<T>
): void {
  /**
   * Configures stepwise filter behavior for the FeatureCell.
   *
   * @param _options - Configuration options supplied to the stepwise filter behavior.
   * @returns The FeatureCell instance for fluent chaining.
   */
  cell.withStepwiseFilter = function (_options: StepwiseBehaviorOptions<T>) {
    throw new Error('[vault] withStepwiseFilter() behavior not installed');
  };
}
