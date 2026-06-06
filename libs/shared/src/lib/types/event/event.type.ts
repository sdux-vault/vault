/** Enumeration of monitor event category classifications. */
export const EventTypes = {
  Conductor: 'conductor',
  Controller: 'controller',
  Lifecycle: 'lifecycle',
  Pipeline: 'pipeline',
  Stage: 'stage',
  Unknown: 'unknown'
} as const;

/** Union type derived from EventTypes values. */
export type EventType = (typeof EventTypes)[keyof typeof EventTypes];
