import { StepwiseDecisionType } from '../types/stepwise-decision.type';

/**
 * Represents a stepwise decision value without request context.
 *
 * This shape is used to convey a decision type in isolation.
 */
export interface StepwiseDecisionShape {
  /**
   * The decision classification.
   */
  kind: StepwiseDecisionType;
}
