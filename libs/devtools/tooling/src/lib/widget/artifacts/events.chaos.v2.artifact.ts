import { EventBoundaryTypes, EventTypes } from '@sdux-vault/shared';
import { DebugWidgetLatencyCategoryTypes } from '../../types/debug-widget-latency-category.type';

/* eslint-disable */

/** Shared base properties for chaos v2 test events. */
const base = {
  cell: 'chaos-cell',
  behaviorKey: 'chaos-behavior',
  type: EventTypes.Stage
};

/**
 * Generates a chaos event identifier from a numeric index.
 *
 * @param n - The event index.
 * @returns A prefixed chaos identifier string.
 */
const id = (n: number) => `chaos-${n}`;

/* ----------------------------- */
/* circular structures           */
/* ----------------------------- */

/** Circular state object used to test serialization error handling. */
const CIRCULAR_STATE: any = { a: 1 };
CIRCULAR_STATE.self = CIRCULAR_STATE;

/** Circular payload object used to test serialization error handling. */
const CIRCULAR_PAYLOAD: any = { p: 1 };
CIRCULAR_PAYLOAD.self = CIRCULAR_PAYLOAD;

/* ----------------------------- */
/* fanout trace                  */
/* ----------------------------- */

/** Simulated fan-out events with 50 entries sharing one trace ID. */
const FANOUT_EVENTS = Array.from({ length: 50 }, (_, i) => ({
  ...base,
  id: id(i),
  name: 'fanout-stage',
  traceId: 'trace-fanout',
  timestamp: 1000 + i,
  monotonicTimestamp: 1000 + i,
  boundary: EventBoundaryTypes.Start,
  stageDurationMs: 1,
  latencyCategory: 'pipeline'
}));

/* ----------------------------- */
/* recursion ABABAB              */
/* ----------------------------- */

/** Simulated ABABAB recursion pattern events for recursion detection testing. */
const RECURSION_EVENTS = [
  {
    ...base,
    id: id(100),
    name: 'A',
    traceId: 'trace-recursion',
    timestamp: 200,
    monotonicTimestamp: 200,
    boundary: EventBoundaryTypes.Start,
    stageDurationMs: 2
  },
  {
    ...base,
    id: id(101),
    name: 'B',
    traceId: 'trace-recursion',
    timestamp: 210,
    monotonicTimestamp: 210,
    boundary: EventBoundaryTypes.Start,
    stageDurationMs: 2
  },
  {
    ...base,
    id: id(102),
    name: 'A',
    traceId: 'trace-recursion',
    timestamp: 220,
    monotonicTimestamp: 220,
    boundary: EventBoundaryTypes.Start,
    stageDurationMs: 2
  },
  {
    ...base,
    id: id(103),
    name: 'B',
    traceId: 'trace-recursion',
    timestamp: 230,
    monotonicTimestamp: 230,
    boundary: EventBoundaryTypes.Start,
    stageDurationMs: 2
  },
  {
    ...base,
    id: id(104),
    name: 'A',
    traceId: 'trace-recursion',
    timestamp: 240,
    monotonicTimestamp: 240,
    boundary: EventBoundaryTypes.Start,
    stageDurationMs: 2
  },
  {
    ...base,
    id: id(105),
    name: 'B',
    traceId: 'trace-recursion',
    timestamp: 250,
    monotonicTimestamp: 250,
    boundary: EventBoundaryTypes.Start,
    stageDurationMs: 2
  }
];

/* ----------------------------- */
/* deadlock trace                */
/* ----------------------------- */

/** Simulated deadlock events with a long gap between start and end. */
const DEADLOCK_EVENTS = [
  {
    ...base,
    id: id(200),
    name: 'deadlock-start',
    traceId: 'trace-deadlock',
    timestamp: 0,
    monotonicTimestamp: 0,
    boundary: EventBoundaryTypes.Start,
    stageDurationMs: 1
  },
  {
    ...base,
    id: id(201),
    name: 'deadlock-end',
    traceId: 'trace-deadlock',
    timestamp: 3005,
    monotonicTimestamp: 3005,
    boundary: EventBoundaryTypes.End,
    stageDurationMs: 1
  }
];

/* ----------------------------- */
/* collision + distribution      */
/* ----------------------------- */

/** Simulated events with timestamp collisions and missing fields. */
const COLLISION_EVENTS = [
  // missing name -> should "continue"
  {
    type: 'missing-name',
    traceId: 'trace-null-name',
    monotonicTimestamp: 10
  } as any,

  // missing type -> should "continue"
  {} as any,

  {
    ...base,
    id: id(300),
    name: 'no-ts',
    traceId: 'trace-null-ts',
    boundary: EventBoundaryTypes.Notification
  } as any,

  {
    ...base,
    id: id(301),
    name: 'collision-step',
    traceId: 'trace-collide',
    timestamp: 500,
    monotonicTimestamp: 500,
    boundary: EventBoundaryTypes.Start,
    stageDurationMs: 5
  },
  {
    ...base,
    id: id(302),
    name: 'collision-step',
    traceId: 'trace-collide',
    timestamp: 500,
    monotonicTimestamp: 500,
    boundary: EventBoundaryTypes.End,
    stageDurationMs: 6
  },
  {
    ...base,
    id: id(303),
    name: 'ooo-step',
    traceId: 'trace-collide',
    timestamp: 501,
    monotonicTimestamp: 450,
    boundary: EventBoundaryTypes.Start,
    stageDurationMs: 7
  },

  {
    ...base,
    id: id(304),
    name: 'dist-step',
    traceId: 'trace-dist',
    timestamp: 800,
    monotonicTimestamp: 800,
    boundary: EventBoundaryTypes.Start,
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    stageDurationMs: 3
  },

  {
    ...base,
    id: id(305),
    name: 'something-error',
    traceId: 'trace-flags',
    timestamp: 900,
    monotonicTimestamp: 900,
    boundary: EventBoundaryTypes.Notification,
    error: true
  },

  {
    ...base,
    id: id(306),
    name: 'vote-abstain',
    traceId: 'trace-flags',
    timestamp: 901,
    monotonicTimestamp: 901,
    boundary: EventBoundaryTypes.Notification
  },

  {
    ...base,
    id: id(307),
    name: 'vote-success',
    traceId: 'trace-flags',
    timestamp: 902,
    monotonicTimestamp: 902,
    boundary: EventBoundaryTypes.Notification
  },

  {
    ...base,
    id: id(308),
    name: 'noop-suppressed',
    traceId: 'trace-flags',
    timestamp: 903,
    monotonicTimestamp: 903,
    boundary: EventBoundaryTypes.Notification
  },

  {
    ...base,
    id: id(309),
    name: 'ui-controller-step',
    traceId: 'trace-latency',
    timestamp: 100,
    monotonicTimestamp: 100,
    boundary: EventBoundaryTypes.Start,
    latencyCategory: DebugWidgetLatencyCategoryTypes.User,
    stageDurationMs: 200
  },
  {
    ...base,
    id: id(310),
    name: 'scheduler-delay',
    traceId: 'trace-latency',
    timestamp: 101,
    monotonicTimestamp: 101,
    boundary: EventBoundaryTypes.Start,
    latencyCategory: DebugWidgetLatencyCategoryTypes.System,
    stageDurationMs: 20
  },
  {
    ...base,
    id: id(311),
    name: 'pipeline-compute',
    traceId: 'trace-latency',
    timestamp: 102,
    monotonicTimestamp: 102,
    boundary: EventBoundaryTypes.Start,
    latencyCategory: DebugWidgetLatencyCategoryTypes.Pipeline,
    stageDurationMs: 10
  },

  {
    ...base,
    id: id(309),
    name: 'persist-state',
    traceId: 'trace-persist',
    timestamp: 1100,
    monotonicTimestamp: 1100,
    boundary: EventBoundaryTypes.Notification,
    payload: { huge: 'x'.repeat(70000) },
    state: { a: 1, nested: { b: 2 } }
  },

  {
    ...base,
    id: id(310),
    name: 'persist-state',
    traceId: 'trace-persist',
    timestamp: 1101,
    monotonicTimestamp: 1101,
    boundary: EventBoundaryTypes.Notification,
    payload: { huge: 'x'.repeat(60000) },
    state: { a: 1, nested: { b: 2 } }
  },

  {
    ...base,
    id: id(311),
    name: 'state-change',
    traceId: 'trace-persist',
    timestamp: 1102,
    monotonicTimestamp: 1102,
    boundary: EventBoundaryTypes.Notification,
    state: { a: 999, nested: { b: 2, c: 3 } }
  },

  {
    ...base,
    id: id(312),
    name: 'state-circular',
    traceId: 'trace-circular',
    timestamp: 1200,
    monotonicTimestamp: 1200,
    boundary: EventBoundaryTypes.Notification,
    state: CIRCULAR_STATE,
    payload: CIRCULAR_PAYLOAD
  }
];

/** Test artifact combining all chaos v2 event sets for comprehensive edge-case testing. */
export const EVENTS_CHAOS_V2_ARTIFACT = [
  ...COLLISION_EVENTS,
  ...DEADLOCK_EVENTS,
  ...RECURSION_EVENTS,
  ...FANOUT_EVENTS
];

/* eslint-enable */
