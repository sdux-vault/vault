import { PipelineUpstreamValue } from '../../types/pipeline/pipeline-upstream-value.type';
import { BehaviorContract } from './behavior/behavior.interface';

/** Contract for stepwise behaviors that compare current and candidate state. */
export interface StepwiseBehaviorContract<T> extends BehaviorContract<T> {
  /**
   * Evaluates whether the candidate value should replace the current state.
   *
   * @param current - The current state value.
   * @param candidate - The candidate pipeline value.
   * @param pipelineId - Trace identifier for the current pipeline run.
   * @returns A promise resolving to the accepted pipeline value.
   */
  evaluateStepwise(
    current: T | undefined,
    candidate: PipelineUpstreamValue<T>,
    pipelineId: string
  ): Promise<PipelineUpstreamValue<T>>;
}
