export const FileBuilderTargetTypes = {
  FeatureCell: 'featureCell',
  Vault: 'vault'
} as const;

export type FileBuilderTargetType =
  (typeof FileBuilderTargetTypes)[keyof typeof FileBuilderTargetTypes];
