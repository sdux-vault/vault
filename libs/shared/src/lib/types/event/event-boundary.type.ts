/** Enumeration of event boundary positions within a lifecycle span. */
export const EventBoundaryTypes = {
  Candidate: 'candidate',
  End: 'end',
  Notification: 'notification',
  Start: 'start',
  Unknown: 'unknown'
} as const;

/** Union type derived from EventBoundaryTypes values. */
export type EventBoundaryType =
  (typeof EventBoundaryTypes)[keyof typeof EventBoundaryTypes];
