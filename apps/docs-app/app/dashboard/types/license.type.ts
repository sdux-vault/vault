export const LicenseTypes = {
  Standard: 'standard',
  Enterprise: 'enterprise',
  Internal: 'internal'
} as const;

export type LicenseType = (typeof LicenseTypes)[keyof typeof LicenseTypes];
