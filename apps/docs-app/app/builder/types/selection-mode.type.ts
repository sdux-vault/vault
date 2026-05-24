export const SelectionModeTypes = {
  Single: 'single',
  Multiple: 'multiple'
} as const;

export type SelectionModeType =
  (typeof SelectionModeTypes)[keyof typeof SelectionModeTypes];
