/** Enumeration of Vault error name identifiers. */
export const VaultErrorNameTypes = {
  EncryptionIntegrity: 'VaultErrorEncryptionIntegrity',
  License: 'VaultErrorLicense',
  Usage: 'VaultErrorUsage',
  VaultError: 'VaultError'
} as const;

/** Union type derived from VaultErrorNameTypes values. */
export type VaultErrorNameType =
  (typeof VaultErrorNameTypes)[keyof typeof VaultErrorNameTypes];
