import { StepwiseDecisionType } from '../types/stepwise-decision.type';
import { StepwiseStageType } from '../types/stepwise-stage.type';

/**
 * Represents a response issued for a stepwise request.
 *
 * This shape conveys the selected decision along with the originating pipeline
 * and execution stage.
 */
export interface StepwiseResponseShape {
  /**
   * Unique identifier of the stepwise request.
   */
  id: string;

  /**
   * Identifier of the pipeline instance associated with the response.
   */
  pipelineId: string;

  /**
   * Pipeline stage to which the response applies.
   */
  stage: StepwiseStageType;

  /**
   * The decision selected for the stepwise request.
   */
  decision: StepwiseDecisionType;
}
