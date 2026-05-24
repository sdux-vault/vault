/** Available trace phase markers for Chrome trace format output. */
export const DebugWidgetEventTracePhaseTypes = {
  Begin: 'B',
  End: 'E',
  Instant: 'I',
  Meta: 'M',
  Complete: 'X'
} as const;

/** Union of valid trace phase values. */
export type DebugWidgetEventTracePhaseType =
  (typeof DebugWidgetEventTracePhaseTypes)[keyof typeof DebugWidgetEventTracePhaseTypes];
