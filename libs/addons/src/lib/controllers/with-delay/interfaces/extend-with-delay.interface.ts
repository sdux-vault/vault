import { WithDelayControllerOptions } from '../options/with-delay-controller.options';

declare module '@sdux-vault/shared' {
  /** Fluent API extension surface for the withDelay controller. */
  // eslint-disable-next-line
  interface FeatureCellFluentApi<TEntity> {
    /**
     * Registers delay controller configuration on the FeatureCell.
     *
     * @param options - Options for configuring the delay controller.
     * @returns The FeatureCell instance for chaining.
     */
    withDelay?(options: WithDelayControllerOptions): this;
  }
}

/** Module augmentation anchor for the withDelay controller extension. */
export const __with_delay_extension = true;
