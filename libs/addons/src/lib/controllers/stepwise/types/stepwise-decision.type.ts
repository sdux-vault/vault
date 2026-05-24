/**
 * Defines the supported decision values used by stepwise behaviors.
 *
 * This constant provides the canonical string literals that represent
 * block, clear, and continue outcomes during stepwise evaluation.
 */
export const StepwiseDecisionTypes = {
  Block: 'block',
  Clear: 'clear',
  Continue: 'continue'
} as const;

/**
 * Represents the union type of all supported stepwise decision values.
 *
 * This type is derived from the StepwiseDecisionTypes constant and is used
 * wherever a stepwise decision must be expressed.
 */
export type StepwiseDecisionType =
  (typeof StepwiseDecisionTypes)[keyof typeof StepwiseDecisionTypes];
