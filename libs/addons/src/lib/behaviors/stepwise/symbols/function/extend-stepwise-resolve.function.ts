import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { StepwiseBehaviorOptions } from '../options/stepwise-behavior.options';

/**
 * Extends a FeatureCell instance with the stepwise resolve configuration API.
 *
 * This function installs a placeholder `withStepwiseResolve` method on the cell
 * shape, which is intended to be replaced at runtime by the corresponding
 * stepwise resolve behavior implementation.
 *
 * @param cell - The FeatureCell base shape to extend.
 * @returns Nothing.
 */
export function extendStepwiseResolveFunction<T>(
  cell: FeatureCellBaseShape<T>
): void {
  /**
   * Configures stepwise resolve behavior for the FeatureCell.
   *
   * @param _options - Configuration options supplied to the stepwise resolve behavior.
   * @returns The FeatureCell instance for fluent chaining.
   */
  cell.withStepwiseResolve = function (_options: StepwiseBehaviorOptions<T>) {
    throw new Error('[vault] withStepwiseResolve() behavior not installed');
  };
}
