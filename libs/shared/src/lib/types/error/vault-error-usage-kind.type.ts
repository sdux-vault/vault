/** Enumeration of usage-specific Vault error sub-kind classifications. */
export const VaultErrorUsageKindTypes = {
  Encryption: 'VaultErrorEncryption',
  License: 'VaultErrorLicense',
  Promise: 'VaultErrorUsagePromise',
  PromiseFactoryRequired: 'VaultErrorUsagePromiseFactoryRequired',
  Usage: 'VaultErrorUsage'
} as const;

/** Union type derived from VaultErrorUsageKindTypes values. */
export type VaultErrorUsageKindType =
  (typeof VaultErrorUsageKindTypes)[keyof typeof VaultErrorUsageKindTypes];
