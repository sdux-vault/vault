import { BehaviorContext } from '../../contexts/behavior.context';
import { PipelineUpstreamValue } from '../../types/pipeline/pipeline-upstream-value.type';
import { BehaviorContract } from './behavior/behavior.interface';

/**
 * Contract for resolve behaviors that derive initial state from an external source.
 */
export interface ResolveBehaviorContract<T> extends BehaviorContract<T> {
  /** Resolve strategy used by this behavior (value, HTTP resource, observable, etc.). */
  resolveType: 'http-resource' | 'observable' | 'promise' | 'value';

  /**
   * Computes the resolved state value for the current pipeline operation.
   *
   * @param ctx - The behavior execution context for the current pipeline run.
   * @returns The resolved state value, synchronously or as a promise.
   */
  computeResolve(
    ctx: BehaviorContext<T>
  ): Promise<PipelineUpstreamValue<T>> | PipelineUpstreamValue<T>;
}
