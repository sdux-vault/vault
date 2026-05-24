import { StepwiseBehaviorDecisionShape } from '../../shapes/stepwise-behavior-decision.shape';

/**
 * Defines the callback signature invoked during a stepwise behavior evaluation.
 *
 * This function receives the current state snapshot, the candidate value under evaluation,
 * and a decision control object that determines how the pipeline proceeds at the stepwise stage.
 *
 *
 * @param current - The current state value prior to stepwise evaluation, or undefined if no state is present.
 * @param candidate - The proposed next state value being evaluated.
 * @param decisions - The decision controls used to signal how the pipeline should proceed.
 * @returns No return value; pipeline control is determined by invoking a decision function.
 */
export type StepwiseFunction<T> = (
  current: T | undefined,
  candidate: T,
  decisions: StepwiseBehaviorDecisionShape
) => void;
