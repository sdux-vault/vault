export const FileBuilderModeTypes = {
  Basic: 'basic',
  Advanced: 'advanced'
} as const;

export type FileBuilderModeType =
  (typeof FileBuilderModeTypes)[keyof typeof FileBuilderModeTypes];
