/**
 * Represents the final UI-facing value flowing out of a FeatureCell.
 *
 * A `PipelineValue<T>` is the resolved form of state after all
 * pipeline stages
 *
 * Unlike internal pipeline values, this UI-facing type never includes
 *
 * @typeParam T - The underlying state type maintained by the FeatureCell.
 */
export type PipelineValue<T> = T | undefined;
