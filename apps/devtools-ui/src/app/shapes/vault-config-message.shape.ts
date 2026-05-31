import { VaultRegistrationSerializedShape } from './vault-registration-serialized.shape';

/**
 * Shape of the serialized Vault configuration forwarded by the Chrome extension bridge.
 */
export interface VaultConfigMessageShape {
  /** Registered package versions keyed by npm package name. */
  versions: Record<string, string>;
  /** Serialized FeatureCell registry snapshot. */
  registry: VaultRegistrationSerializedShape[] | null;
}
