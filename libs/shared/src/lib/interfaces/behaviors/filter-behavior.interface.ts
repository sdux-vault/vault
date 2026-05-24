import { FilterFunction } from '../../types/function/filter-function.type';
import { PipelineUpstreamValue } from '../../types/pipeline/pipeline-upstream-value.type';
import { BehaviorContract } from './behavior/behavior.interface';

/**
 * Contract for filter behaviors that selectively pass or reject state updates.
 */
export interface FilterBehaviorContract<T> extends BehaviorContract<T> {
  /** Identifies this behavior as a filter behavior. */
  type: 'filter';

  /**
   * Applies the filter function against the current pipeline value.
   *
   * @param current - The upstream pipeline value to evaluate.
   * @param filter - The filter function that determines acceptance.
   * @returns The filtered pipeline value.
   */
  applyFilter(
    current: PipelineUpstreamValue<T>,
    filter: FilterFunction<T>
  ): PipelineUpstreamValue<T>;
}
