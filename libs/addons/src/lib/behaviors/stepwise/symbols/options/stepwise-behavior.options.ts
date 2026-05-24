import { StepwiseFunction } from '../types/function/stepwise-function.type';

/**
 * Configuration options for stepwise behavior execution.
 *
 * This interface defines the callback contract that is invoked to make
 * stepwise decisions during pipeline evaluation.
 */
export interface StepwiseBehaviorOptions<T> {
  /**
   * Callback function used to evaluate and control stepwise pipeline behavior.
   */
  stepwiseCallback: StepwiseFunction<T>;
}
