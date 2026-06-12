import type { EventShape } from '@sdux-vault/shared';
import type { TraceMetricsShape } from './trace-metrics.shape';

/**
 * Complete record of a single pipeline execution, identified by traceId.
 *
 * Committed to the execution FeatureCell only after the terminal event
 * fires. Once stored, the record is immutable.
 */
export interface TraceExecutionShape {
  /** Unique trace identifier linking all events in this execution. */
  traceId: string;

  /** FeatureCell key that originated this trace. */
  cellKey: string;

  /** Timestamp of the first event in this trace. */
  startedAt: number;

  /** Timestamp of the terminal event in this trace. */
  finishedAt: number;

  /** Ordered array of all events belonging to this trace. */
  events: EventShape[];

  /** Pre-computed metrics derived from the event sequence. */
  metrics: TraceMetricsShape;
}
