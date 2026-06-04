import type { StageMetricShape } from './stage-metric.shape';
import type { TraceExecutionStatus } from './trace-execution-status.type';

/**
 * Aggregated metrics computed from all events in a single trace execution.
 *
 * Metrics are computed once when the terminal event fires and are
 * immutable thereafter.
 */
export interface TraceMetricsShape {
  /** Total wall-clock duration (`controller:start:attempt` → `controller:end:attempt`). */
  duration: number;

  /** Total number of events in this trace. */
  eventCount: number;

  /** Outcome status of the trace execution. */
  status: TraceExecutionStatus;

  /** Slowest matched start/end boundary pair by duration. */
  slowestStage: { name: string; duration: number };

  /** Fastest matched start/end boundary pair by duration. */
  fastestStage: { name: string; duration: number };

  /** Every matched start/end boundary pair with timing data. */
  stages: StageMetricShape[];

  /** Whether a controller revote occurred during this trace. */
  hadRevote: boolean;

  /** Number of controllers that cast a vote during this trace. */
  controllerVoteCount: number;

  /** Whether any licensed behaviors or controllers participated. */
  usedLicensedFeatures: boolean;
}
