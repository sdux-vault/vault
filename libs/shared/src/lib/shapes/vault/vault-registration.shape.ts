import { VaultRegistrationEntityShape } from './vault-registration.entity.shape';
import { VaultRegistrationFluentApiShape } from './vault-registration.fluent-api.shape';

/** Shape representing the full registration record of a FeatureCell in the Vault. */
export interface VaultRegistrationShape {
  /** Unique key identifying the registered FeatureCell. */
  key: string;

  /** Factory returning a promise that resolves when the vault has settled. */
  vaultSettled?: () => Promise<void>;

  /** Map of registered behavior entities keyed by behavior key. */
  behaviors?: Map<string, VaultRegistrationEntityShape>;

  /** Map of registered controller entities keyed by controller key. */
  controllers?: Map<string, VaultRegistrationEntityShape>;

  /** Read-only snapshot of fluent API registration counts. */
  fluentApis?: Readonly<VaultRegistrationFluentApiShape>;

  /** Whether all behaviors have completed registration. */
  behaviorsRegistered?: boolean;

  /** Whether all controllers have completed registration. */
  controllersRegistered?: boolean;
}
