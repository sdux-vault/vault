import type { EventShape } from '@sdux-vault/shared';
import type {
  CellAggregateShape,
  TraceExecutionShape
} from '../../shapes/trace';
import { TraceExecutionStatuses } from '../../shapes/trace';

/**
 * Deterministic events for a single successful trace.
 * All IDs and timestamps are fixed for exact assertion matching.
 */
export const COMPLETE_TRACE_EVENTS: EventShape[] = [
  Object({
    id: 'evt-001',
    cell: 'test-cell',
    behaviorKey: 'behavior-key',
    type: 'controller',
    boundary: 'start',
    timestamp: 1000,
    name: 'controller:start:attempt',
    traceId: 'trace-1'
  }),
  Object({
    id: 'evt-002',
    cell: 'test-cell',
    behaviorKey: 'behavior-key',
    type: 'stage',
    boundary: 'start',
    timestamp: 1005,
    name: 'stage:start:filter',
    traceId: 'trace-1'
  }),
  Object({
    id: 'evt-003',
    cell: 'test-cell',
    behaviorKey: 'behavior-key',
    type: 'stage',
    boundary: 'end',
    timestamp: 1015,
    name: 'stage:end:filter',
    traceId: 'trace-1'
  }),
  Object({
    id: 'evt-004',
    cell: 'test-cell',
    behaviorKey: 'behavior-key',
    type: 'controller',
    boundary: 'end',
    timestamp: 1050,
    name: 'controller:end:attempt',
    traceId: 'trace-1'
  })
];

/**
 * Expected TraceExecutionShape output after processing COMPLETE_TRACE_EVENTS.
 */
export const COMPLETE_TRACE_EXPECTED: TraceExecutionShape = {
  traceId: 'trace-1',
  cellKey: 'test-cell',
  startedAt: 1000,
  finishedAt: 1050,
  events: COMPLETE_TRACE_EVENTS,
  metrics: {
    duration: 50,
    eventCount: 4,
    status: TraceExecutionStatuses.Success,
    slowestStage: { name: 'filter', duration: 10 },
    fastestStage: { name: 'filter', duration: 10 },
    stages: [
      {
        name: 'filter',
        behaviorKey: 'behavior-key',
        startedAt: 1005,
        finishedAt: 1015,
        duration: 10,
        type: 'stage',
        payload: undefined,
        error: undefined
      },
      {
        name: 'attempt',
        behaviorKey: 'behavior-key',
        startedAt: 1000,
        finishedAt: 1050,
        duration: 50,
        type: 'controller',
        payload: undefined,
        error: undefined
      }
    ],
    hadRevote: false,
    controllerVoteCount: 0,
    usedLicensedFeatures: false
  }
};

/**
 * Deterministic events for a denied trace.
 */
export const DENIED_TRACE_EVENTS: EventShape[] = [
  Object({
    id: 'evt-deny-001',
    cell: 'test-cell',
    behaviorKey: 'behavior-key',
    type: 'controller',
    boundary: 'start',
    timestamp: 2000,
    name: 'controller:start:attempt',
    traceId: 'trace-deny'
  }),
  Object({
    id: 'evt-deny-002',
    cell: 'test-cell',
    behaviorKey: 'behavior-key',
    type: 'conductor',
    boundary: 'start',
    timestamp: 2010,
    name: 'conductor:start:deny',
    traceId: 'trace-deny'
  })
];

/**
 * Expected TraceExecutionShape for the denied trace.
 */
export const DENIED_TRACE_EXPECTED: TraceExecutionShape = {
  traceId: 'trace-deny',
  cellKey: 'test-cell',
  startedAt: 2000,
  finishedAt: 2010,
  events: DENIED_TRACE_EVENTS,
  metrics: {
    duration: 10,
    eventCount: 2,
    status: TraceExecutionStatuses.Denied,
    slowestStage: { name: 'none', duration: 0 },
    fastestStage: { name: 'none', duration: 0 },
    stages: [],
    hadRevote: false,
    controllerVoteCount: 0,
    usedLicensedFeatures: false
  }
};

/**
 * Deterministic events for an aborted trace.
 */
export const ABORTED_TRACE_EVENTS: EventShape[] = [
  Object({
    id: 'evt-abort-001',
    cell: 'test-cell',
    behaviorKey: 'behavior-key',
    type: 'controller',
    boundary: 'start',
    timestamp: 3000,
    name: 'controller:start:attempt',
    traceId: 'trace-abort'
  }),
  Object({
    id: 'evt-abort-002',
    cell: 'test-cell',
    behaviorKey: 'behavior-key',
    type: 'conductor',
    boundary: 'start',
    timestamp: 3010,
    name: 'conductor:start:abort',
    traceId: 'trace-abort'
  })
];

/**
 * Expected TraceExecutionShape for the aborted trace.
 */
export const ABORTED_TRACE_EXPECTED: TraceExecutionShape = {
  traceId: 'trace-abort',
  cellKey: 'test-cell',
  startedAt: 3000,
  finishedAt: 3010,
  events: ABORTED_TRACE_EVENTS,
  metrics: {
    duration: 10,
    eventCount: 2,
    status: TraceExecutionStatuses.Aborted,
    slowestStage: { name: 'none', duration: 0 },
    fastestStage: { name: 'none', duration: 0 },
    stages: [],
    hadRevote: false,
    controllerVoteCount: 0,
    usedLicensedFeatures: false
  }
};

/**
 * Deterministic events for a failed trace (lifecycle:notification:failure).
 */
export const FAILED_TRACE_EVENTS: EventShape[] = [
  Object({
    id: 'evt-fail-001',
    cell: 'test-cell',
    behaviorKey: 'behavior-key',
    type: 'controller',
    boundary: 'start',
    timestamp: 4000,
    name: 'controller:start:attempt',
    traceId: 'trace-fail'
  }),
  Object({
    id: 'evt-fail-002',
    cell: 'test-cell',
    behaviorKey: 'behavior-key',
    type: 'lifecycle',
    boundary: 'start',
    timestamp: 4010,
    name: 'lifecycle:notification:failure',
    traceId: 'trace-fail'
  })
];

/**
 * Expected TraceExecutionShape for the failed trace.
 */
export const FAILED_TRACE_EXPECTED: TraceExecutionShape = {
  traceId: 'trace-fail',
  cellKey: 'test-cell',
  startedAt: 4000,
  finishedAt: 4010,
  events: FAILED_TRACE_EVENTS,
  metrics: {
    duration: 10,
    eventCount: 2,
    status: TraceExecutionStatuses.Failed,
    slowestStage: { name: 'none', duration: 0 },
    fastestStage: { name: 'none', duration: 0 },
    stages: [],
    hadRevote: false,
    controllerVoteCount: 0,
    usedLicensedFeatures: false
  }
};

/**
 * Deterministic events for a trace with revotes and controller votes.
 */
export const REVOTE_TRACE_EVENTS: EventShape[] = [
  Object({
    id: 'evt-revote-001',
    cell: 'test-cell',
    behaviorKey: 'behavior-key',
    type: 'controller',
    boundary: 'start',
    timestamp: 5000,
    name: 'controller:start:attempt',
    traceId: 'trace-revote'
  }),
  Object({
    id: 'evt-revote-002',
    cell: 'test-cell',
    behaviorKey: 'behavior-key',
    type: 'conductor',
    boundary: 'start',
    timestamp: 5005,
    name: 'conductor:start:revote',
    traceId: 'trace-revote'
  }),
  Object({
    id: 'evt-revote-003',
    cell: 'test-cell',
    behaviorKey: 'behavior-key',
    type: 'controller',
    boundary: 'end',
    timestamp: 5020,
    name: 'controller:end:attempt',
    traceId: 'trace-revote'
  })
];

/**
 * Expected TraceExecutionShape for the revote trace.
 */
export const REVOTE_TRACE_EXPECTED: TraceExecutionShape = {
  traceId: 'trace-revote',
  cellKey: 'test-cell',
  startedAt: 5000,
  finishedAt: 5020,
  events: REVOTE_TRACE_EVENTS,
  metrics: {
    duration: 20,
    eventCount: 3,
    status: TraceExecutionStatuses.Success,
    slowestStage: { name: 'none', duration: 0 },
    fastestStage: { name: 'none', duration: 0 },
    stages: [
      {
        name: 'attempt',
        behaviorKey: 'behavior-key',
        startedAt: 5000,
        finishedAt: 5020,
        duration: 20,
        type: 'controller',
        payload: undefined,
        error: undefined
      }
    ],
    hadRevote: true,
    controllerVoteCount: 0,
    usedLicensedFeatures: false
  }
};

/**
 * Deterministic events for a trace with controller votes.
 */
export const VOTES_TRACE_EVENTS: EventShape[] = [
  Object({
    id: 'evt-votes-001',
    cell: 'test-cell',
    behaviorKey: 'behavior-key',
    type: 'controller',
    boundary: 'start',
    timestamp: 6000,
    name: 'controller:start:attempt',
    traceId: 'trace-votes'
  }),
  Object({
    id: 'evt-votes-002',
    cell: 'test-cell',
    behaviorKey: 'behavior-key',
    type: 'controller',
    boundary: 'end',
    timestamp: 6005,
    name: 'controller:end:vote',
    traceId: 'trace-votes'
  }),
  Object({
    id: 'evt-votes-003',
    cell: 'test-cell',
    behaviorKey: 'behavior-key',
    type: 'controller',
    boundary: 'end',
    timestamp: 6010,
    name: 'controller:end:vote',
    traceId: 'trace-votes'
  }),
  Object({
    id: 'evt-votes-004',
    cell: 'test-cell',
    behaviorKey: 'behavior-key',
    type: 'controller',
    boundary: 'end',
    timestamp: 6020,
    name: 'controller:end:attempt',
    traceId: 'trace-votes'
  })
];

/**
 * Expected TraceExecutionShape for the votes trace.
 */
export const VOTES_TRACE_EXPECTED: TraceExecutionShape = {
  traceId: 'trace-votes',
  cellKey: 'test-cell',
  startedAt: 6000,
  finishedAt: 6020,
  events: VOTES_TRACE_EVENTS,
  metrics: {
    duration: 20,
    eventCount: 4,
    status: TraceExecutionStatuses.Success,
    slowestStage: { name: 'none', duration: 0 },
    fastestStage: { name: 'none', duration: 0 },
    stages: [
      {
        name: 'attempt',
        behaviorKey: 'behavior-key',
        startedAt: 6000,
        finishedAt: 6020,
        duration: 20,
        type: 'controller',
        payload: undefined,
        error: undefined
      }
    ],
    hadRevote: false,
    controllerVoteCount: 2,
    usedLicensedFeatures: false
  }
};

/**
 * Deterministic events for an orphaned trace (no terminal event).
 */
export const ORPHAN_TRACE_EVENTS: EventShape[] = [
  Object({
    id: 'evt-orphan-001',
    cell: 'test-cell',
    behaviorKey: 'behavior-key',
    type: 'controller',
    boundary: 'start',
    timestamp: 7000,
    name: 'controller:start:attempt',
    traceId: 'trace-orphan'
  })
];

/**
 * Expected TraceExecutionShape for the orphaned trace.
 */
export const ORPHAN_TRACE_EXPECTED: TraceExecutionShape = {
  traceId: 'trace-orphan',
  cellKey: 'test-cell',
  startedAt: 7000,
  finishedAt: 7000,
  events: ORPHAN_TRACE_EVENTS,
  metrics: {
    duration: 0,
    eventCount: 1,
    status: TraceExecutionStatuses.Orphaned,
    slowestStage: { name: 'none', duration: 0 },
    fastestStage: { name: 'none', duration: 0 },
    stages: [],
    hadRevote: false,
    controllerVoteCount: 0,
    usedLicensedFeatures: false
  }
};

// ---------------------------------------------------------------------------
// Multi-cell trace artifacts
// ---------------------------------------------------------------------------

/**
 * Helper to create a deterministic complete trace for a given cell.
 */
function createCellTrace(
  traceId: string,
  cellKey: string,
  baseTimestamp: number,
  totalDuration = 50
): { events: EventShape[]; expected: TraceExecutionShape } {
  const filterDuration = Math.round(totalDuration / 5);
  const events: EventShape[] = [
    Object({
      id: `evt-${traceId}-001`,
      cell: cellKey,
      behaviorKey: 'behavior-key',
      type: 'controller',
      boundary: 'start',
      timestamp: baseTimestamp,
      name: 'controller:start:attempt',
      traceId
    }),
    Object({
      id: `evt-${traceId}-002`,
      cell: cellKey,
      behaviorKey: 'behavior-key',
      type: 'stage',
      boundary: 'start',
      timestamp: baseTimestamp + 5,
      name: 'stage:start:filter',
      traceId
    }),
    Object({
      id: `evt-${traceId}-003`,
      cell: cellKey,
      behaviorKey: 'behavior-key',
      type: 'stage',
      boundary: 'end',
      timestamp: baseTimestamp + 5 + filterDuration,
      name: 'stage:end:filter',
      traceId
    }),
    Object({
      id: `evt-${traceId}-004`,
      cell: cellKey,
      behaviorKey: 'behavior-key',
      type: 'controller',
      boundary: 'end',
      timestamp: baseTimestamp + totalDuration,
      name: 'controller:end:attempt',
      traceId
    })
  ];

  const expected: TraceExecutionShape = {
    traceId,
    cellKey,
    startedAt: baseTimestamp,
    finishedAt: baseTimestamp + totalDuration,
    events,
    metrics: {
      duration: totalDuration,
      eventCount: 4,
      status: TraceExecutionStatuses.Success,
      slowestStage: { name: 'filter', duration: filterDuration },
      fastestStage: { name: 'filter', duration: filterDuration },
      stages: [
        {
          name: 'filter',
          behaviorKey: 'behavior-key',
          startedAt: baseTimestamp + 5,
          finishedAt: baseTimestamp + 5 + filterDuration,
          duration: filterDuration,
          type: 'stage',
          payload: undefined,
          error: undefined
        },
        {
          name: 'attempt',
          behaviorKey: 'behavior-key',
          startedAt: baseTimestamp,
          finishedAt: baseTimestamp + totalDuration,
          duration: totalDuration,
          type: 'controller',
          payload: undefined,
          error: undefined
        }
      ],
      hadRevote: false,
      controllerVoteCount: 0,
      usedLicensedFeatures: false
    }
  };

  return { events, expected };
}

/** Trace A in cell-alpha. */
export const CELL_TRACE_A = createCellTrace('trace-a', 'cell-alpha', 10000);

/** Trace B in cell-beta. */
export const CELL_TRACE_B = createCellTrace('trace-b', 'cell-beta', 11000);

/** Trace C in cell-alpha. */
export const CELL_TRACE_C = createCellTrace('trace-c', 'cell-alpha', 12000);

/** Expected cell aggregate for cell-alpha (2 success traces, duration 50 each). */
export const CELL_ALPHA_AGGREGATE: CellAggregateShape = {
  cellKey: 'cell-alpha',
  traceCount: 2,
  averageDuration: 50,
  minDuration: 50,
  maxDuration: 50,
  errorCount: 0,
  errorRate: 0,
  errorTraceIds: []
};

/** Expected cell aggregate for cell-beta (1 success trace, duration 50). */
export const CELL_BETA_AGGREGATE: CellAggregateShape = {
  cellKey: 'cell-beta',
  traceCount: 1,
  averageDuration: 50,
  minDuration: 50,
  maxDuration: 50,
  errorCount: 0,
  errorRate: 0,
  errorTraceIds: []
};

/** Trace 1 in cell-agg (30ms duration). */
export const AGG_TRACE_1 = createCellTrace('trace-1', 'cell-agg', 20000, 30);

/** Trace 2 in cell-agg (90ms duration). */
export const AGG_TRACE_2 = createCellTrace('trace-2', 'cell-agg', 21000, 90);

/** Expected cell aggregate for cell-agg (2 success, durations 30 and 90). */
export const CELL_AGG_AGGREGATE: CellAggregateShape = {
  cellKey: 'cell-agg',
  traceCount: 2,
  averageDuration: 60,
  minDuration: 30,
  maxDuration: 90,
  errorCount: 0,
  errorRate: 0,
  errorTraceIds: []
};

/** Error trace events in cell-err. */
export const ERROR_CELL_TRACE_EVENTS: EventShape[] = [
  Object({
    id: 'evt-err-001',
    cell: 'cell-err',
    behaviorKey: 'behavior-key',
    type: 'controller',
    boundary: 'start',
    timestamp: 30000,
    name: 'controller:start:attempt',
    traceId: 'trace-err'
  }),
  Object({
    id: 'evt-err-002',
    cell: 'cell-err',
    behaviorKey: 'behavior-key',
    type: 'lifecycle',
    boundary: 'start',
    timestamp: 30010,
    name: 'lifecycle:notification:failure',
    traceId: 'trace-err'
  })
];

/** Expected TraceExecutionShape for the error-cell trace. */
export const ERROR_CELL_TRACE_EXPECTED: TraceExecutionShape = {
  traceId: 'trace-err',
  cellKey: 'cell-err',
  startedAt: 30000,
  finishedAt: 30010,
  events: ERROR_CELL_TRACE_EVENTS,
  metrics: {
    duration: 10,
    eventCount: 2,
    status: TraceExecutionStatuses.Failed,
    slowestStage: { name: 'none', duration: 0 },
    fastestStage: { name: 'none', duration: 0 },
    stages: [],
    hadRevote: false,
    controllerVoteCount: 0,
    usedLicensedFeatures: false
  }
};

/** Expected cell aggregate for cell-err (1 failed trace). */
export const CELL_ERR_AGGREGATE: CellAggregateShape = {
  cellKey: 'cell-err',
  traceCount: 1,
  averageDuration: 10,
  minDuration: 10,
  maxDuration: 10,
  errorCount: 1,
  errorRate: 1,
  errorTraceIds: ['trace-err']
};

// ---------------------------------------------------------------------------
// Mixed cell artifacts — fractional error rate and varying durations
// ---------------------------------------------------------------------------

/** Success trace (40ms) in cell-mixed. */
export const MIXED_TRACE_1 = createCellTrace(
  'trace-mix-1',
  'cell-mixed',
  40000,
  40
);

/** Success trace (80ms) in cell-mixed. */
export const MIXED_TRACE_2 = createCellTrace(
  'trace-mix-2',
  'cell-mixed',
  41000,
  80
);

/** Error trace events in cell-mixed (duration 20ms). */
export const MIXED_ERROR_EVENTS: EventShape[] = [
  Object({
    id: 'evt-mix-err-001',
    cell: 'cell-mixed',
    behaviorKey: 'behavior-key',
    type: 'controller',
    boundary: 'start',
    timestamp: 42000,
    name: 'controller:start:attempt',
    traceId: 'trace-mix-err'
  }),
  Object({
    id: 'evt-mix-err-002',
    cell: 'cell-mixed',
    behaviorKey: 'behavior-key',
    type: 'lifecycle',
    boundary: 'start',
    timestamp: 42020,
    name: 'lifecycle:notification:runtime-error',
    traceId: 'trace-mix-err'
  })
];

/** Expected TraceExecutionShape for the mixed-cell error trace. */
export const MIXED_ERROR_EXPECTED: TraceExecutionShape = {
  traceId: 'trace-mix-err',
  cellKey: 'cell-mixed',
  startedAt: 42000,
  finishedAt: 42020,
  events: MIXED_ERROR_EVENTS,
  metrics: {
    duration: 20,
    eventCount: 2,
    status: TraceExecutionStatuses.Failed,
    slowestStage: { name: 'none', duration: 0 },
    fastestStage: { name: 'none', duration: 0 },
    stages: [],
    hadRevote: false,
    controllerVoteCount: 0,
    usedLicensedFeatures: false
  }
};

/**
 * Expected cell aggregate for cell-mixed.
 * 3 traces: 2 success (40ms, 80ms) + 1 failed (20ms).
 * average = (40+80+20)/3 ≈ 46.666…
 * errorRate = 1/3 ≈ 0.333…
 */
export const CELL_MIXED_AGGREGATE: CellAggregateShape = {
  cellKey: 'cell-mixed',
  traceCount: 3,
  averageDuration: 140 / 3,
  minDuration: 20,
  maxDuration: 80,
  errorCount: 1,
  errorRate: 1 / 3,
  errorTraceIds: ['trace-mix-err']
};

// ---------------------------------------------------------------------------
// Real-world artifact expected aggregates
// ---------------------------------------------------------------------------

/** Expected cell aggregate for starwars from the pipeline event artifact. */
export const ARTIFACT_STARWARS_AGGREGATE: CellAggregateShape = {
  cellKey: 'starwars-feature-cell-key',
  traceCount: 6,
  averageDuration: 521,
  minDuration: 509,
  maxDuration: 530,
  errorCount: 2,
  errorRate: 0.3333333333333333,
  errorTraceIds: [
    '252fe24e-fe96-4d5b-9fbb-4ed338f09791',
    'ec9f318d-8431-4794-b526-aba0a75bb279'
  ]
};

/** Expected cell aggregate for startrek from the pipeline event artifact. */
export const ARTIFACT_STARTREK_AGGREGATE: CellAggregateShape = {
  cellKey: 'startrek-feature-cell-key',
  traceCount: 6,
  averageDuration: 12.5,
  minDuration: 7,
  maxDuration: 18,
  errorCount: 2,
  errorRate: 0.3333333333333333,
  errorTraceIds: [
    'b66e8d34-16c4-4faa-a53c-d365ae435505',
    'daed122e-198f-4517-b60b-d18c9ba3aa45'
  ]
};

/**
 * Expected per-trace metrics from the pipeline event artifact.
 * Each entry maps to a committed trace in order.
 */
export const ARTIFACT_TRACE_METRICS = [
  {
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99',
    duration: 509,
    eventCount: 47,
    status: TraceExecutionStatuses.Success,
    hadRevote: false,
    controllerVoteCount: 14
  },
  {
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c',
    duration: 511,
    eventCount: 49,
    status: TraceExecutionStatuses.Success,
    hadRevote: false,
    controllerVoteCount: 14
  },
  {
    traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979',
    duration: 7,
    eventCount: 21,
    status: TraceExecutionStatuses.Success,
    hadRevote: false,
    controllerVoteCount: 4
  },
  {
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3',
    duration: 520,
    eventCount: 49,
    status: TraceExecutionStatuses.Success,
    hadRevote: false,
    controllerVoteCount: 14
  },
  {
    traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203',
    duration: 11,
    eventCount: 21,
    status: TraceExecutionStatuses.Success,
    hadRevote: false,
    controllerVoteCount: 4
  },
  {
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a',
    duration: 14,
    eventCount: 23,
    status: TraceExecutionStatuses.Success,
    hadRevote: false,
    controllerVoteCount: 4
  },
  {
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505',
    duration: 13,
    eventCount: 18,
    status: TraceExecutionStatuses.Failed,
    hadRevote: false,
    controllerVoteCount: 4
  },
  {
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45',
    duration: 12,
    eventCount: 18,
    status: TraceExecutionStatuses.Failed,
    hadRevote: false,
    controllerVoteCount: 4
  },
  {
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b',
    duration: 18,
    eventCount: 23,
    status: TraceExecutionStatuses.Success,
    hadRevote: false,
    controllerVoteCount: 4
  },
  {
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5',
    duration: 529,
    eventCount: 49,
    status: TraceExecutionStatuses.Success,
    hadRevote: false,
    controllerVoteCount: 14
  },
  {
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791',
    duration: 527,
    eventCount: 40,
    status: TraceExecutionStatuses.Failed,
    hadRevote: false,
    controllerVoteCount: 14
  },
  {
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279',
    duration: 530,
    eventCount: 38,
    status: TraceExecutionStatuses.Failed,
    hadRevote: false,
    controllerVoteCount: 14
  }
];

// ---------------------------------------------------------------------------
// Reset event artifacts (should be filtered out, never buffered)
// ---------------------------------------------------------------------------

/**
 * Reset lifecycle events that should be excluded from trace aggregation.
 * These events have a traceId but never fire a terminal event.
 */
export const RESET_TRACE_EVENTS: EventShape[] = [
  Object({
    id: 'evt-reset-001',
    cell: 'test-cell',
    behaviorKey: 'behavior-key',
    type: 'lifecycle',
    boundary: 'start',
    timestamp: 9000,
    name: 'lifecycle:start:reset',
    traceId: 'trace-reset'
  }),
  Object({
    id: 'evt-reset-002',
    cell: 'test-cell',
    behaviorKey: 'behavior-key',
    type: 'lifecycle',
    boundary: 'end',
    timestamp: 9001,
    name: 'lifecycle:end:reset',
    traceId: 'trace-reset'
  }),
  Object({
    id: 'evt-reset-003',
    cell: 'test-cell',
    behaviorKey: 'other-behavior',
    type: 'lifecycle',
    boundary: 'start',
    timestamp: 9002,
    name: 'lifecycle:start:reset',
    traceId: 'trace-reset'
  }),
  Object({
    id: 'evt-reset-004',
    cell: 'test-cell',
    behaviorKey: 'other-behavior',
    type: 'lifecycle',
    boundary: 'end',
    timestamp: 9003,
    name: 'lifecycle:end:reset',
    traceId: 'trace-reset'
  })
];
