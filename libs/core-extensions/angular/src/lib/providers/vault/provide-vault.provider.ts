import { EnvironmentProviders, provideAppInitializer } from '@angular/core';
import { VaultCore } from '@sdux-vault/engine';
import { VaultConfig } from '@sdux-vault/shared';

/**
 * Registers and initializes the SDuX Vault core within an Angular application.
 *
 * This function sets up the global FeatureCell registry and returns Angular
 * environment providers that ensure Vault core initialization occurs during
 * application bootstrap using the supplied configuration.
 *
 * @param config - Optional Vault configuration used to initialize core services.
 * @returns Angular environment providers that perform Vault initialization at app startup.
 */
export function provideVault(config: VaultConfig = {}): EnvironmentProviders {
  return provideAppInitializer(() => {
    VaultCore(config);
  });
}
