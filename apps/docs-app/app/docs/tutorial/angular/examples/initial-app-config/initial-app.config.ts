// app.config.ts
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideVault } from '@sdux-vault/angular';

/**
 * Bootstraps Angular's browser services and initializes the application-scoped
 * Vault runtime. Keeping this configuration at the application boundary makes
 * Vault available to FeatureCell providers added in later tutorial steps while
 * leaving Feature State ownership with those features.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    /**
     * Initializes Vault with its default runtime configuration. This provider
     * must appear before FeatureCell providers so they can use the established
     * application-scoped runtime.
     */
    provideVault()
  ]
};
