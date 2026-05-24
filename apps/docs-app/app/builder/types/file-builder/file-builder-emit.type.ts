export const FileBuilderEmitTypes = {
  Call: 'call',
  Raw: 'raw',
  Reference: 'reference'
} as const;

export type FileBuilderEmitType =
  (typeof FileBuilderEmitTypes)[keyof typeof FileBuilderEmitTypes];
