export const FileBuilderTemplateTokenTypes = {
  ExampleLiteral: '__EXAMPLE_LITERAL__',
  Input: '__INPUT__',
  InstantiatedServiceName: '__INSTANTIATED_SERVICE_NAME__',
  Key: '__KEY__',
  Type: '__TYPE__',
  Vault: '__VAULT__'
} as const;

export type FileBuilderTemplateTokenType =
  (typeof FileBuilderTemplateTokenTypes)[keyof typeof FileBuilderTemplateTokenTypes];
