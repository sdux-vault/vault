/** Enumeration of message types dispatched to controllers during pipeline orchestration. */
export const ControllerMessageTypes = {
  Attempt: 'attempt',
  Failure: 'failure',
  Finalize: 'Finalize Pipeline',
  Success: 'success',
  Vote: 'vote' // mostly internal
} as const;

/** Union type derived from ControllerMessageTypes values. */
export type ControllerMessageType =
  (typeof ControllerMessageTypes)[keyof typeof ControllerMessageTypes];
