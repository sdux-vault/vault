/** Possible outcome statuses for a completed trace execution. */
export const TraceExecutionStatuses = {
  Success: 'success',
  Denied: 'denied',
  Aborted: 'aborted',
  Failed: 'failed',
  Orphaned: 'orphaned'
} as const;

/** Union type derived from TraceExecutionStatuses values. */
export type TraceExecutionStatus =
  (typeof TraceExecutionStatuses)[keyof typeof TraceExecutionStatuses];
