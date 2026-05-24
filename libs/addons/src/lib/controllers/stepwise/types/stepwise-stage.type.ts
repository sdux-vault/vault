/**
 * Defines the supported pipeline stages at which stepwise behaviors may execute.
 *
 * This constant enumerates the filter, reducer, and resolve stages used during
 * stepwise policy evaluation.
 */
export const StepwiseStageTypes = {
  Filter: 'filter',
  Reducer: 'reducer',
  Resolve: 'resolve'
} as const;

/**
 * Represents the union type of all supported stepwise stage values.
 *
 * This type is derived from the StepwiseStageTypes constant and is used to
 * identify the pipeline stage associated with a stepwise request or response.
 */
export type StepwiseStageType =
  (typeof StepwiseStageTypes)[keyof typeof StepwiseStageTypes];
