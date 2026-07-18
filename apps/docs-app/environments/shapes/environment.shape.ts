import { VaultLicensingShape } from '@sdux-vault/shared';

import { EnvironmentType } from '../types/environment.type';

/** Shape defining the structure of a docs-app environment configuration. */
export interface EnvironmentShape {
  /** Whether the enterprise feature set is enabled. */
  readonly enterprise: boolean;
  /** Whether the pro feature set is enabled. */
  readonly pro: boolean;
  /** Whether the environment is a development build. */
  readonly development: boolean;
  /** Whether Google Analytics event collection is enabled. */
  readonly analyticsEnabled: boolean;
  /** Base URL for the API server. */
  readonly api: string;
  /** Whether to use an in-memory API instead of a remote server. */
  readonly useInMemoryApi: boolean;
  /** Whether Vault dev mode is active. */
  readonly devMode: boolean;
  /** Whether Vault licensing checks are bypassed. */
  readonly bypassLicensing: boolean;
  /** Vault licensing configuration for this environment. */
  readonly license: VaultLicensingShape;
  /** Vault licensing configuration for this environment. */
  readonly environment: EnvironmentType;
}
