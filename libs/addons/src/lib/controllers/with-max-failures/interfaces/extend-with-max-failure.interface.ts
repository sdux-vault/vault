import { WithMaxFailureControllerOptions } from '../options/with-max-failure-controller.options';

declare module '@sdux-vault/shared' {
  /** Fluent API extension surface for the withMaxFailures controller. */
  // eslint-disable-next-line
  interface FeatureCellFluentApi<TEntity> {
    /**
     * Registers max-failures controller configuration on the FeatureCell.
     *
     * @param options - Options for configuring the max-failures controller.
     * @returns The FeatureCell instance for chaining.
     */
    withMaxFailures?(options: WithMaxFailureControllerOptions): this;
  }
}

/** Module augmentation anchor for the withMaxFailures controller extension. */
export const __with_max_failures_extension = true;
