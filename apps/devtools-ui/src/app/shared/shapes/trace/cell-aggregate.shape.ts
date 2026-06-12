/**
 * Aggregated statistics for all traces belonging to a single FeatureCell key.
 *
 * Computed as a derived signal on the aggregate service; never stored
 * in the FeatureCell itself.
 */
export interface CellAggregateShape {
  /** FeatureCell key this aggregate describes. */
  cellKey: string;

  /** Total number of completed traces for this cell. */
  traceCount: number;

  /** Average trace duration in milliseconds. */
  averageDuration: number;

  /** Shortest trace duration in milliseconds. */
  minDuration: number;

  /** Longest trace duration in milliseconds. */
  maxDuration: number;

  /** Number of traces that ended in a failed or orphaned status. */
  errorCount: number;

  /** Error rate as a fraction (0–1). */
  errorRate: number;

  /** TraceIds of traces that ended with an error or orphaned status. */
  errorTraceIds: string[];
}
