export const FileBuilderExampleTypes = {
  Service: 'service',
  Component: 'component',
  ComponentLifecycle: 'componentLifecycle'
} as const;

export type FileBuilderExampleType =
  (typeof FileBuilderExampleTypes)[keyof typeof FileBuilderExampleTypes];
