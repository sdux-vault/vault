import { EventBoundaryTypes, EventTypes } from '@sdux-vault/shared';

/** Shared base properties for chaos test events. */
const base = {
  cell: 'chaos-cell',
  behaviorKey: 'chaos-behavior',
  type: EventTypes.Stage
};

/** Test artifact containing chaotic pipeline events for edge-case testing. */
export const EVENTS_CHAOS_ARTIFACT = [
  {
    ...base,
    id: 'chaos-1',
    name: 'pipeline-start',
    traceId: 'trace-chaos',
    timestamp: 100,
    monotonicTimestamp: 100,
    boundary: EventBoundaryTypes.Start,
    stageDurationMs: 5,
    latencyCategory: 'pipeline'
  },

  {
    ...base,
    id: 'chaos-2',
    name: 'pipeline-step',
    traceId: 'trace-chaos',
    timestamp: 100, // collision
    monotonicTimestamp: 100, // collision
    boundary: EventBoundaryTypes.Start,
    stageDurationMs: 10,
    latencyCategory: 'pipeline'
  },

  {
    ...base,
    id: 'chaos-3',
    name: 'pipeline-step',
    traceId: 'trace-chaos',
    timestamp: 101,
    monotonicTimestamp: 90, // out of order
    boundary: EventBoundaryTypes.Start,
    stageDurationMs: 8,
    latencyCategory: 'user'
  },

  {
    ...base,
    id: 'chaos-4',
    name: 'scheduler-delay',
    traceId: 'trace-chaos',
    timestamp: 102,
    monotonicTimestamp: 102,
    boundary: EventBoundaryTypes.Start,
    stageDurationMs: 12,
    latencyCategory: 'system'
  },

  {
    ...base,
    id: 'chaos-5',
    name: 'persist-state',
    traceId: 'trace-chaos',
    timestamp: 103,
    monotonicTimestamp: 103,
    boundary: EventBoundaryTypes.Notification,
    payload: { huge: 'x'.repeat(60000) },
    state: { a: 1 }
  },

  {
    ...base,
    id: 'chaos-6',
    name: 'persist-state',
    traceId: 'trace-chaos',
    timestamp: 104,
    monotonicTimestamp: 104,
    boundary: EventBoundaryTypes.Notification,
    payload: { huge: 'x'.repeat(70000) },
    state: { a: 1 } // identical state
  }
];
