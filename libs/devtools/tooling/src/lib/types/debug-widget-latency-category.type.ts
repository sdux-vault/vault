/** Available latency category labels for event classification. */
export const DebugWidgetLatencyCategoryTypes = {
  Pipeline: 'pipeline',
  System: 'system',
  Unknown: 'unknown',
  User: 'ui'
} as const;

/** Union of valid latency category values. */
export type DebugWidgetLatencyCategoryType =
  (typeof DebugWidgetLatencyCategoryTypes)[keyof typeof DebugWidgetLatencyCategoryTypes];
