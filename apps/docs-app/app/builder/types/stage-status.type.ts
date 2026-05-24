export const StageStatusTypes = {
  Complete: 'complete',
  Idle: 'idle',
  Inactive: 'inactive'
} as const;

export type StageStatusType =
  (typeof StageStatusTypes)[keyof typeof StageStatusTypes];
