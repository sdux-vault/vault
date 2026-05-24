import { MergeConfig } from '../../config/merge.config';
import { PipelineUpstreamValue } from '../../types/pipeline/pipeline-upstream-value.type';
import { BehaviorContract } from './behavior/behavior.interface';

/** Contract for merge behaviors that combine current and incoming state. */
export interface MergeBehaviorContract<T> extends BehaviorContract<T> {
  /**
   * Computes the merged result of the current and next pipeline values.
   *
   * @param currentValue - The existing state value.
   * @param nextValue - The incoming candidate value.
   * @param options - Optional merge configuration.
   * @returns The merged pipeline value.
   */
  computeMerge(
    currentValue: PipelineUpstreamValue<T> | undefined,
    nextValue: PipelineUpstreamValue<T> | undefined,
    options?: MergeConfig
  ): PipelineUpstreamValue<T> | undefined;
}
