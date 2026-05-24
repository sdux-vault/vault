import { WithThrottleControllerOptions } from '../options/with-throttle-controller.options';

declare module '@sdux-vault/shared' {
  /** Fluent API extension surface for the withThrottle controller. */
  // eslint-disable-next-line
  interface FeatureCellFluentApi<TEntity> {
    /**
     * Registers throttle controller configuration on the FeatureCell.
     *
     * @param options - Options for configuring the throttle controller.
     * @returns The FeatureCell instance for chaining.
     */
    withThrottle?(options: WithThrottleControllerOptions): this;
  }
}

/** Module augmentation anchor for the withThrottle controller extension. */
export const __with_throttle_extension = true;
