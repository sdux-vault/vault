/**
 * Defines the control actions available to a stepwise decision callback.
 *
 * This shape provides imperative decision functions that determine how
 * the pipeline proceeds at a given stepwise stage.
 */
export interface StepwiseBehaviorDecisionShape {
  /**
   * Signals that the pipeline should be blocked at the current stage.
   */
  block: () => void;

  /**
   * Signals that the pipeline state should be cleared at the current stage.
   */
  clear: () => void;

  /**
   * Signals that the pipeline should continue to the next stage.
   */
  continue: () => void;

  /**
   * Identifier for the stepwise stage where the decision is being applied.
   */
  stage: string;
}
