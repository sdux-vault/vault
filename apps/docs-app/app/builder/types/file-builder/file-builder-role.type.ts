export const FileBuilderRoleTypes = {
  Structural: 'structural',
  Functional: 'functional'
} as const;

export type FileBuilderRoleType =
  (typeof FileBuilderRoleTypes)[keyof typeof FileBuilderRoleTypes];
