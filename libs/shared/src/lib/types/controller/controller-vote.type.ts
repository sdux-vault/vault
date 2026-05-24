/** Enumeration of votes a controller may cast during pipeline admission. */
export const ControllerVotes = {
  Abstain: 'abstain',
  Abort: 'abort',
  Deny: 'deny'
} as const;

/** Union type derived from ControllerVotes values. */
export type ControllerVote =
  (typeof ControllerVotes)[keyof typeof ControllerVotes];
