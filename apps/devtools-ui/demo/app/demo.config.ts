import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { withArrayPushMergeBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVault } from '@sdux-vault/angular';
import { DEVTOOLS_LOGGING_KEY_CONSTANT } from '@sdux-vault/shared';
import { DevtoolsService } from '../../src/app/services/devtools.service';
import { EXTENSION_VERSION } from '../../src/app/splash-page/devtools-splash-page.component';
import { DemoExampleService } from './demo-example.service';

/**
 * Application configuration for the DevTools demo harness.
 *
 * Provides a real Vault runtime with a FeatureCell so pipeline events
 * flow through the EventBus and are captured by the DevtoolsService.
 */
export const demoConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    { provide: EXTENSION_VERSION, useValue: '0.0.0-demo' },

    provideVault({ devMode: true, logLevel: 'error' }),

    provideFeatureCell(
      DevtoolsService,
      { key: DEVTOOLS_LOGGING_KEY_CONSTANT, initialState: [] },
      [withArrayPushMergeBehavior]
    ),

    provideFeatureCell(DemoExampleService, {
      key: 'demo-example-feature-cell-key',
      initialState: []
    })
  ]
};
