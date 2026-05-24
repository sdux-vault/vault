export const FileBuilderArgStyleTypes = {
  Object: 'object',
  positional: 'positional'
} as const;

export type FileBuilderArgStyleType =
  (typeof FileBuilderArgStyleTypes)[keyof typeof FileBuilderArgStyleTypes];
