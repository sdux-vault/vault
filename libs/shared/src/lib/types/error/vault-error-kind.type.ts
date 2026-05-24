import { VaultErrorUsageKindTypes } from './vault-error-usage-kind.type';

/** Enumeration of top-level Vault error kind classifications. */
export const VaultErrorKindTypes = {
  Usage: 'VaultErrorUsage',
  VaultError: 'VaultError'
} as const;

/** Union type of all Vault error kind values including usage sub-kinds. */
export type VaultErrorKindType =
  | (typeof VaultErrorKindTypes)[keyof typeof VaultErrorKindTypes]
  | (typeof VaultErrorUsageKindTypes)[keyof typeof VaultErrorUsageKindTypes];
