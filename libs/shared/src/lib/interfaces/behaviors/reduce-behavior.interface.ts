import { PipelineUpstreamValue } from '../../types';
import { ReducerFunction } from '../../types/function/reducer-function.type';
import { BehaviorContract } from './behavior/behavior.interface';

/**
 * Contract for reducer-stage behaviors that transform pipeline state.
 */
export interface ReduceBehaviorContract<T> extends BehaviorContract<T> {
  /** Pipeline behavior type identifier for reducer-stage execution. */
  type: 'reduce';

  /**
   * Applies the provided reducer function to the current state.
   *
   * @param current - The current state value prior to reducer execution.
   * @param reducer - A pure reducer function returning a new state value.
   * @returns The transformed state value.
   */
  applyReducer(
    current: PipelineUpstreamValue<T>,
    reducer: ReducerFunction<T>
  ): T;
}
