import { VaultConfig } from '@sdux-vault/shared';

/**
 * Stub replacement for the VaultCore initializer used in tests.
 *
 * @param _config - Optional Vault configuration object.
 */
export function VaultCore(_config: VaultConfig = {}): void {}

/** Resets all Vault state for a clean test environment. */
export function resetVaultForTests(): void {}
