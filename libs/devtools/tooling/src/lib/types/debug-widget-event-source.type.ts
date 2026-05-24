/** Available event source classifications for debug widget events. */
export const DebugWidgetEventSourceTypes = {
  UI: 'ui',
  Stream: 'stream',
  Timer: 'timer',
  Internal: 'internal'
} as const;

/** Union of valid event source values. */
export type DebugWidgetEventSourceType =
  (typeof DebugWidgetEventSourceTypes)[keyof typeof DebugWidgetEventSourceTypes];
