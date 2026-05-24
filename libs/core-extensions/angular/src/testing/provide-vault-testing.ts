import { EnvironmentProviders } from '@angular/core';
import { resetVaultForTests } from '@sdux-vault/engine';
import { DevMode, VaultConfig } from '@sdux-vault/shared';
import { provideVault } from '../lib/providers/vault/provide-vault.provider';

/**
 * Creates Angular environment providers configured for test isolation.
 *
 * @param config - Optional Vault configuration overrides.
 * @returns Angular environment providers for testing.
 */
export function provideVaultTesting(
  config?: VaultConfig
): EnvironmentProviders {
  const finalConfig: VaultConfig = {
    devMode: true,
    bypassLicensing: true,
    logLevel: 'off',
    ...config // overrides defaults
  };

  if (finalConfig?.devMode) {
    DevMode.setDevMode(true);

    resetVaultForTests();
  }

  return provideVault(finalConfig);
}
