export const FileBuilderCallStyleTypes = {
  Grouped: 'grouped',
  Fluent: 'fluent'
} as const;

export type FileBuilderCallStyleType =
  (typeof FileBuilderCallStyleTypes)[keyof typeof FileBuilderCallStyleTypes];
