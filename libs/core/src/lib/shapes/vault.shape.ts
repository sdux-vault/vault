import { LogLevelType } from '@sdux-vault/shared';

/**
 * Defines the public runtime shape of the Vault instance.
 * This interface exposes configuration flags and core services required to reason about Vault execution and environment state.
 *
 */
export interface VaultShape {
  /**
   * Indicates whether the Vault is running in development mode.
   */
  devMode: boolean;

  /**
   * Indicates whether the Vault is executing in a unit test environment.
   */
  unitTest: boolean;

  /**
   * Specifies the active logging level for Vault diagnostics.
   */
  logLevel: LogLevelType;

  /**
   * Indicates whether a valid license token has been provided.
   */
  validLicenseToken: boolean;
}
