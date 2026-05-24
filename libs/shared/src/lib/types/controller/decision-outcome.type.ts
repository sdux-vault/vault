/** Enumeration of conductor decision outcomes after controller voting. */
export const DecisionOutcomeTypes = {
  Abort: 'abort',
  Abstain: 'abstain',
  Deny: 'deny'
} as const;

/** Union type derived from DecisionOutcomeTypes values. */
export type DecisionOutcomeType =
  (typeof DecisionOutcomeTypes)[keyof typeof DecisionOutcomeTypes];
