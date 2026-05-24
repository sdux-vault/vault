import { StepwiseDecisionType } from '../types/stepwise-decision.type';

/**
 * Represents a finalized decision returned for a stepwise request.
 *
 * This shape associates a resolved decision with the originating request identifier.
 */
export interface StepwiseAnswerShape {
  /**
   * Unique identifier of the stepwise request.
   */
  id: string;

  /**
   * The decision outcome produced by the stepwise evaluation.
   */
  decision: StepwiseDecisionType;
}
