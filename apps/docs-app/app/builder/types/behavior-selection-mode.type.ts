export const BehaviorSelectionModeTypes = {
  Single: 'single',
  Multiple: 'multiple'
} as const;

export type BehaviorSelectionModeType =
  (typeof BehaviorSelectionModeTypes)[keyof typeof BehaviorSelectionModeTypes];
