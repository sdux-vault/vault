import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { withArrayPushMergeBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVault } from '@sdux-vault/angular';
import { DEVTOOLS_LOGGING_KEY_CONSTANT } from '@sdux-vault/shared';
import { routes } from './devtools.app.routes';
import { DevtoolsService } from './services/devtools.service';

/**
 * Root application configuration for the Vault DevTools application.
 *
 * This configuration sets up:
 * - Zoneless change detection for improved performance and deterministic signal updates.
 * - Global error listeners for capturing unhandled errors in the DevTools environment.
 * - Client-side routing with hash-based navigation (ensuring Chrome extension compatibility).
 * - Vault configuration with logging disabled (`logLevel: 'off'`) to avoid feedback loops
 *   between DevTools and monitored applications.
 * - A FeatureCell instance (`vault::devtools::feature::cell`) used by the DevTools app
 *   to store internal UI state and event history.
 *
 * This file contains no runtime logic beyond provider registration and must remain
 * structurally stable under the Documentation Canon.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /** Enables global browser error capture for consistency across host environments. */
    provideBrowserGlobalErrorListeners(),

    /** Enables zoneless signal-based change detection throughout the DevTools UI. */
    provideZonelessChangeDetection(),

    /** Registers application routes using hash-based navigation (extension-safe). */
    provideRouter(routes, withHashLocation()),

    /** Configures Vault for the DevTools app with logging disabled. */
    provideVault({ logLevel: 'off' }),

    /**
     * Provides a FeatureCell dedicated to DevTools internal state.
     *
     * - key: Unique DevTools FeatureCell identifier
     * - initialState: Initial empty state array
     * - behaviors: (none) — DevTools maintains its own telemetry pipeline
     */
    provideFeatureCell(
      DevtoolsService,
      {
        key: DEVTOOLS_LOGGING_KEY_CONSTANT,
        initialState: []
      },
      [withArrayPushMergeBehavior]
    )
  ]
};
