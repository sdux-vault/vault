import { VaultLicensingShape } from '../shapes/vault/vault-licensing.shape';
import { LogLevelType } from '../types/logging/log-level.type';

/**
 * Configuration options supplied to Vault at initialization.
 */
export interface VaultConfig {
  /**
   * Enables development-mode diagnostics and additional internal checks.
   * When `true`, Vault emits more verbose warnings and validation errors.
   */
  devMode?: boolean;

  /**
   * Controls the verbosity of internal logging.
   * Common levels: `'debug' | 'info' | 'warn' | 'error' | 'off'`.
   */
  logLevel?: LogLevelType;

  /**
   * Optional array of pre-registered license payloads.
   *
   * Vault stores these payloads in memory at startup and makes them
   * retrievable via `getLicensePayload(licenseId)`. Vault does not
   * validate or interpret the payload — vendors are responsible for
   * validation logic.
   */
  licenses?: VaultLicensingShape[];

  /**
   * Maximum time (in milliseconds) Vault will wait for a required
   * license to be validated before marking it as timed out.
   *
   * If validation does not occur within this window, the FeatureCell
   * is denied. Defaults to 15,000 ms. Set to `0` to disable timeout.
   */
  licenseTimeoutMs?: number;

  /**
   * Skips license enforcement during development.
   *
   * Only honored when `devMode` is `true`. When both `devMode` and
   * `bypassLicensing` are `true`, Vault allows unlicensed extensions
   * to initialize without a valid license token. Defaults to `true`
   * when `devMode` is enabled.
   *
   * Set to `false` with `devMode: true` to exercise license validation
   * against the development public key in integration tests.
   *
   * Ignored entirely when `devMode` is `false` (production) — licensing
   * is always enforced with the production key regardless of this flag.
   */
  bypassLicensing?: boolean;
}
