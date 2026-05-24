export const BehaviorStatusTypes = {
  Complete: 'complete',
  Idle: 'idle',
  Inactive: 'inactive'
} as const;

export type BehaviorStatusType =
  (typeof BehaviorStatusTypes)[keyof typeof BehaviorStatusTypes];
