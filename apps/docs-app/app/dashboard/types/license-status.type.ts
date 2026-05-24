export const LicenseStatusTypes = {
  Active: 'active',
  Error: 'error',
  Inactive: 'inactive'
} as const;

export type LicenseStatusType =
  (typeof LicenseStatusTypes)[keyof typeof LicenseStatusTypes];
