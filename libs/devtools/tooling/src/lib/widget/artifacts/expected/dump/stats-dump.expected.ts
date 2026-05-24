/** Expected statistics dump output used in test assertions. */
export const STATS_DUMP_EXPECTED = Object({
  totalEvents: 96,
  errorEvents: 0,
  firstEventTimestamp: 333143.60000002384,
  lastEventTimestamp: 341992.89999997616,
  totalDurationMs: 8849.299999952316,
  longTaskStats: {
    count: 2,
    maxDuration: 20
  },
  eventTypes: {
    'lifecycle:notification:success': 6,
    'lifecycle:notification:finalize': 6
  },
  traces: {
    A5094: {
      eventCount: 12,
      firstTimestamp: 333143.60000002384,
      lastTimestamp: 341992.89999997616,
      durationMs: 8849.299999952316,
      stageBreakdown: {
        'lifecycle:notification:success': 0.5,
        'lifecycle:notification:finalize': 0.8999999761581421
      },
      stageSequence: [],
      meanStageDuration: 0.11666666467984517,
      p95StageDuration: 0.30000007152557373,
      maxStageDuration: 0.30000007152557373
    }
  },
  stageAggregates: {
    'lifecycle:notification:success': {
      count: 6,
      total: 0.5,
      max: 0.20000004768371582,
      min: 0,
      avg: 0.08333333333333333,
      p95: 0.20000004768371582
    },
    'lifecycle:notification:finalize': {
      count: 6,
      total: 0.8999999761581421,
      max: 0.30000007152557373,
      min: 0,
      avg: 0.14999999602635702,
      p95: 0.30000007152557373
    }
  },
  schedulerDistribution: {
    microtask: 12
  },
  eventLoopPhaseDistribution: {
    microtask: 9,
    synchronous: 3
  },
  maxIdleGapMs: 3154.5,
  deadlockByTrace: {
    A5094: false
  },
  longestTraceId: 'A5094',
  longestTraceDurationMs: 8849.299999952316,
  traceFanOut: {},
  diagnosticSummary: [
    {
      rank: 2,
      type: 'stage-bottleneck',
      id: 'lifecycle:notification:finalize',
      evidence: 'Stage has highest total compute time (1ms).'
    },
    {
      rank: 3,
      type: 'slowest-trace',
      id: 'A5094',
      evidence: 'Longest trace duration (8849ms).'
    },
    {
      rank: 5,
      type: 'stall',
      id: 'maxIdleGapMs',
      evidence: 'Large idle gap detected (3155ms).'
    }
  ],
  stageBottleneck: 'lifecycle:notification:finalize',
  stageBottleneckTimeMs: 0.8999999761581421,
  pipelineFlamegraph: [
    {
      traceId: 'A5094',
      stages: []
    }
  ],
  burstAnalysis: {
    maxEventsPerFrame: 2
  },
  suppressionStats: {
    suppressedCount: 0,
    votePass: 6,
    voteAbstain: 0
  },
  structuralIntegrity: {
    duplicateTraceCount: 0,
    outOfOrderCount: 0
  },
  pipelineRecursion: {
    detected: true,
    traceId: 'A5094',
    repeatingPattern: [
      'lifecycle:notification:success',
      'lifecycle:notification:finalize'
    ],
    repetitionCount: 6
  },
  timingIntegrity: {
    timestampCollisionRate: 0.052083333333333336,
    monotonicCollisionRate: 0,
    worstCollisionTrace: 'A5094',
    collisionsPerTrace: {
      A5094: 5
    }
  },
  stateAnalytics: {
    stateSizePerTrace: {},
    stateSerializationErrors: 0,
    stateSerializationErrorMessages: {},
    avgPayloadSize: 0,
    repeatedIdenticalStateCount: 0,
    largeObjectCount: 0,
    deepNestingMaxDepth: 0,
    persistPayloadSizeRanking: [],
    stateEntropyScore: 0,
    avgStateDiffSize: 0,
    maxChurnPerSecond: 4,
    avgChurnPerSecond: 0
  },
  computeVsIdle: {
    totalComputeTimeMs: 1.399999976158142,
    estimatedIdleTimeMs: 8847.899999976158,
    computeRatio: 0.00015820460106061337
  },
  userLatencyDistribution: undefined
});
