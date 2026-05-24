export const FileBuilderUpdateStrategyType = {
  Merge: 'merge',
  Replace: 'replace'
} as const;

export type FileBuilderUpdateStrategyType =
  (typeof FileBuilderUpdateStrategyType)[keyof typeof FileBuilderUpdateStrategyType];
