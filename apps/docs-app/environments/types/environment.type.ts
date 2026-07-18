/** Enumeration of environment types. */
export const EnvironmentTypes = {
  BypassLicensing: 'bypass-licensing',
  Pro: 'pro',
  Enterprise: 'enterprise',
  Development: 'development',
  Default: 'default'
} as const;

/** Union type of all environment types. */
export type EnvironmentType =
  (typeof EnvironmentTypes)[keyof typeof EnvironmentTypes];
