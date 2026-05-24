import { StepwiseBehaviorOptions } from '../options/stepwise-behavior.options';

declare module '@sdux-vault/shared' {
  /**
   * Extends the FeatureCell base shape with stepwise behavior configuration methods.
   *
   * These methods allow a FeatureCell to be configured with stepwise policies
   * that participate in resolve, reducer, or filter stages when the corresponding
   * stepwise behaviors are installed.
   */
  interface FeatureCellBaseShape<T> {
    /**
     * Configures stepwise resolve behavior for the FeatureCell.
     *
     * @param options - Configuration options supplied to the stepwise resolve behavior.
     * @returns The FeatureCell instance for fluent chaining.
     */
    withStepwiseResolve?(options: StepwiseBehaviorOptions<T>): this;

    /**
     * Configures stepwise reducer behavior for the FeatureCell.
     *
     * @param options - Configuration options supplied to the stepwise reducer behavior.
     * @returns The FeatureCell instance for fluent chaining.
     */
    withStepwiseReducer?(options: StepwiseBehaviorOptions<T>): this;

    /**
     * Configures stepwise filter behavior for the FeatureCell.
     *
     * @param options - Configuration options supplied to the stepwise filter behavior.
     * @returns The FeatureCell instance for fluent chaining.
     */
    withStepwiseFilter?(options: StepwiseBehaviorOptions<T>): this;
  }
}

/** Module augmentation anchor for the stepwise behavior extension. */
export const __stepwise_extension = true;
