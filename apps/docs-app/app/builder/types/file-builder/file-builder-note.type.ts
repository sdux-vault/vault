export const FileBuilderNoteTypes = {
  CoreBehaviorWithFluentApi: 'coreBehaviorWithFluentApi',
  CoreBehaviorWithoutFluentApi: 'coreBehaviorWithoutFluentApi'
} as const;

export type FileBuilderNoteType =
  (typeof FileBuilderNoteTypes)[keyof typeof FileBuilderNoteTypes];
