import { StepwiseStageType } from '../types/stepwise-stage.type';

/**
 * Represents a stepwise request emitted during pipeline evaluation.
 *
 * This shape captures the request identity, execution stage, and state snapshot
 * required for stepwise decision processing.
 */
export interface StepwiseRequestShape {
  /**
   * Unique identifier of the stepwise request.
   */
  id: string;

  /**
   * Identifier of the pipeline instance that emitted the request.
   */
  pipelineId: string;

  /**
   * Pipeline stage at which the stepwise request was generated.
   */
  stage: StepwiseStageType;

  /**
   * State snapshot associated with the request.
   */
  snapshot: unknown;
}
