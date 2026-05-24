/** Enumeration of license validation statuses for FeatureCell registration. */
export const VaultRegistrationLicenseStatusTypes = {
  NotRequired: 'not-required',
  Pending: 'pending',
  Revoked: 'revoked',
  Timeout: 'timeout',
  Valid: 'valid'
} as const;

/** Union type derived from VaultRegistrationLicenseStatusTypes values. */
export type VaultRegistrationLicenseStatusType =
  (typeof VaultRegistrationLicenseStatusTypes)[keyof typeof VaultRegistrationLicenseStatusTypes];
