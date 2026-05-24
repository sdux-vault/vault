/** Shape representing aggregate statistics computed from debug widget events. */
export interface DebugWidgetEventStatShape {
  /** Total number of events analyzed. */
  totalEvents: number;
  /** Number of events classified as errors. */
  errorEvents: number;
  /** Monotonic timestamp of the first event. */
  firstEventTimestamp: number | null;
  /** Monotonic timestamp of the last event. */
  lastEventTimestamp: number | null;
  /** Total duration spanned by all events in milliseconds. */
  totalDurationMs: number;
  /** Event count grouped by event type name. */
  eventTypes: Record<string, number>;

  /** Long task count and maximum duration from performance entries. */
  longTaskStats: { count: number; maxDuration: number } | undefined;

  /** Per-stage timing aggregates including percentiles. */
  stageAggregates?: Record<
    string,
    {
      count: number;
      total: number;
      max: number;
      min: number;
      avg: number;
      p95: number;
    }
  >;

  /** Event count grouped by detected scheduler type. */
  schedulerDistribution: Record<string, number>;

  /** Event count grouped by detected event loop phase. */
  eventLoopPhaseDistribution?: Record<string, number>;
  /** Largest idle gap between consecutive events in milliseconds. */
  maxIdleGapMs?: number;
  /** Deadlock detection flags indexed by trace ID. */
  deadlockByTrace: Record<string, boolean>;
  /** Trace ID of the longest running pipeline. */
  longestTraceId?: string | null;
  /** Duration of the longest running pipeline in milliseconds. */
  longestTraceDurationMs?: number;

  /** Event fan-out count per trace ID. */
  traceFanOut?: Record<string, number>;

  /** Ranked diagnostic findings from event analysis. */
  diagnosticSummary?: ({
    rank: number;
    type: string;
    id: string;
    evidence: string;
  } | null)[];

  /** Per-trace flamegraph data with ordered stage durations. */
  pipelineFlamegraph?: {
    traceId: string;
    stages: { stage: string; durationMs: number }[];
  }[];

  /** Name of the slowest pipeline stage across all traces. */
  stageBottleneck?: string | null;
  /** Total time consumed by the bottleneck stage in milliseconds. */
  stageBottleneckTimeMs?: number;

  /** Per-trace event statistics and stage breakdowns. */
  traces: Record<
    string,
    {
      eventCount: number;
      firstTimestamp: number;
      lastTimestamp: number;
      durationMs: number;
      stageBreakdown?: Record<string, number>;
      stageSequences: { stage: string; durationMs: number }[];
    }
  >;

  /** Analysis of event burst density per animation frame. */
  burstAnalysis: {
    maxEventsPerFrame: number;
  };

  /** Counts of suppressed, passed, and abstained vote events. */
  suppressionStats: {
    suppressedCount: number;
    votePass: number;
    voteAbstain: number;
  };

  /** Counts of structural anomalies in event ordering. */
  structuralIntegrity: {
    duplicateTraceCount: number;
    outOfOrderCount: number;
  };

  /** Detected pipeline recursion pattern, or null if none found. */
  pipelineRecursion: {
    detected: boolean;
    traceId?: string;
    repeatingPattern?: string[];
    repetitionCount?: number;
  } | null;

  /** Timestamp and monotonic collision rates across traces. */
  timingIntegrity: {
    timestampCollisionRate: number;
    monotonicCollisionRate: number;
    worstCollisionTrace: string | null;
    collisionsPerTrace: Record<string, number>;
  };

  /** State size, serialization, and churn analytics. */
  stateAnalytics: {
    stateSizePerTrace: Record<string, number>;
    stateSerializationErrors: number;
    stateSerializationErrorMessages: Record<string, number>;
    avgPayloadSize: number;
    repeatedIdenticalStateCount: number;
    largeObjectCount: number;
    deepNestingMaxDepth: number;
    persistPayloadSizeRanking: { traceId: string; size: number }[];
    stateEntropyScore: number;
    avgStateDiffSize: number;
    maxChurnPerSecond: number;
    avgChurnPerSecond: number;
  };

  /** Compute time versus idle time ratio. */
  computeVsIdle?: {
    totalComputeTimeMs: number;
    estimatedIdleTimeMs: number;
    computeRatio: number;
  };

  /** User-facing latency distribution statistics. */
  userLatencyDistribution: {
    count: number;
    avgMs: number;
    p95Ms: number;
    maxMs: number;
  };
}
