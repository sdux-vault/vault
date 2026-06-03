/** Enumeration of Vault license tier classifications. */
export const VaultLicensePayloadTypes = {
  Development: 'development',
  Pro: 'pro',
  Enterprise: 'enterprise'
} as const;

/** Union type of all Vault license payload values. */
export type VaultLicensePayloadType =
  (typeof VaultLicensePayloadTypes)[keyof typeof VaultLicensePayloadTypes];
