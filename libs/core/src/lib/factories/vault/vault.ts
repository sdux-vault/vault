import { VaultCore } from '@sdux-vault/engine';
import { VaultConfig } from '@sdux-vault/shared';

/**
 * Initializes the Vault runtime using the provided configuration and prepares the global feature cell registry.
 * This function establishes the required Vault infrastructure and applies the supplied options for core initialization.
 *
 *
 * @param options Configuration options used to initialize the Vault runtime.
 */
export function Vault(options: VaultConfig = {}): void {
  VaultCore(options);
}
