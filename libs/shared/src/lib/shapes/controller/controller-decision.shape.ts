import { DecisionOutcomeType } from '../../types/controller/decision-outcome.type';

/** Shape representing the outcome of a controller voting round. */
export interface ControllerDecisionShape {
  /** Trace identifier for the pipeline operation under evaluation. */
  traceId: string;

  /** Normalized decision outcome used by the conductor. */
  outcome: DecisionOutcomeType;
}
