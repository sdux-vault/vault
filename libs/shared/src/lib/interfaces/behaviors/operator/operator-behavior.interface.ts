import { PipelineUpstreamValue } from '../../../types/pipeline/pipeline-upstream-value.type';
import { BehaviorContract } from '../behavior/behavior.interface';

/** Contract for operator behaviors that transform pipeline values. */
export interface OperatorBehaviorContract<T> extends BehaviorContract<T> {
  /**
   * Applies the operator transformation to the current pipeline value.
   *
   * @param value - The upstream pipeline value to transform.
   * @returns A promise resolving to the transformed pipeline value.
   */
  applyOperator(
    value: PipelineUpstreamValue<T>
  ): Promise<PipelineUpstreamValue<T>>;
}
