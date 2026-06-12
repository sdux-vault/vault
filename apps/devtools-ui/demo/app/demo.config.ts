import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import {
  withAes256EncryptBehavior,
  withArrayAppendMergeBehavior,
  withArrayPushMergeBehavior,
  withDelayController,
  withLocalStoragePersistBehavior,
  withLookupBehavior,
  withQueryBehavior,
  withStepwiseController,
  withThrottleController
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVault } from '@sdux-vault/angular';
import {
  DEVTOOLS_AGGREGATE_KEY_CONSTANT,
  DEVTOOLS_LOGGING_KEY_CONSTANT
} from '@sdux-vault/shared';
import { withTabSyncController } from '../../../../libs/core/src/public-api';
import { routes } from '../../src/app/devtools.app.routes';
import { DevtoolsAggregateService } from '../../src/app/services/devtools-aggregate.service';
import { DevtoolsLoggingService } from '../../src/app/services/devtools-logging.service';
import { EXTENSION_VERSION } from '../../src/app/splash-page/devtools-splash-page.component';
import { environment } from '../environments/environment';
import { StarTrekExampleService } from './feature-cells/star-trek/star-trek-example.service';
import { StarWarsService } from './feature-cells/star-wars/service/star-wars.service';

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

    provideVault({
      devMode: true,
      logLevel: 'error',
      bypassLicensing: false,
      licenses: [
        Object({
          licenseId: environment.licenseId,
          payload: environment.licensePayload
        })
      ]
    }),

    provideFeatureCell(
      DevtoolsLoggingService,
      {
        key: DEVTOOLS_LOGGING_KEY_CONSTANT,
        initialState: []
      },
      [withArrayPushMergeBehavior]
    ),

    provideFeatureCell(
      DevtoolsAggregateService,
      {
        key: DEVTOOLS_AGGREGATE_KEY_CONSTANT,
        initialState: []
      },
      [withArrayPushMergeBehavior, withQueryBehavior]
    ),

    provideFeatureCell(
      StarWarsService,
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
      [withArrayAppendMergeBehavior],
      [withThrottleController]
    )
  ]
};
