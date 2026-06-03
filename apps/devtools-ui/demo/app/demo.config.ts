import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import {
  withAes256EncryptBehavior,
  withArrayPushMergeBehavior,
  withDelayController,
  withLocalStoragePersistBehavior,
  withLookupBehavior,
  withStepwiseController
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVault } from '@sdux-vault/angular';
import { DEVTOOLS_LOGGING_KEY_CONSTANT } from '@sdux-vault/shared';
import { withTabSyncController } from '../../../../libs/core/src/public-api';
import { routes } from '../../src/app/devtools.app.routes';
import { DevtoolsService } from '../../src/app/services/devtools.service';
import { EXTENSION_VERSION } from '../../src/app/splash-page/devtools-splash-page.component';
import { StarTrekExampleService } from './feature-cells/star-trek/star-trek-example.service';
import { StarWarsExampleService } from './feature-cells/star-wars/star-wars-example.service';

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

    provideRouter(routes, withHashLocation()),

    provideVault({ devMode: true, logLevel: 'error', bypassLicensing: true }),

    provideFeatureCell(
      DevtoolsService,
      {
        key: DEVTOOLS_LOGGING_KEY_CONSTANT,
        initialState: []
      },
      [withArrayPushMergeBehavior]
    ),

    provideFeatureCell(
      StarWarsExampleService,
      {
        key: 'starwars-feature-cell-key',
        initialState: []
      },
      [
        withLookupBehavior,
        withLocalStoragePersistBehavior,
        withAes256EncryptBehavior
      ],
      [withDelayController, withStepwiseController, withTabSyncController]
    ),

    provideFeatureCell(
      StarTrekExampleService,
      {
        key: 'startrek-feature-cell-key',
        initialState: []
      },
      [],
      []
    )
  ]
};
