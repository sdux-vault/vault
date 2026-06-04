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
  withQueryBehavior,
  withStepwiseController
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

    provideVault({
      devMode: true,
      logLevel: 'error',
      bypassLicensing: false,
      licenses: [
        Object({
          licenseId: 'sdux-vault',
          payload: `eyJvcmdhbml6YXRpb24iOiJTRHVYIFZhdWx0IERldmVsb3BtZW50IiwiZG9tYWluIjoic2R1eC12YXVsdC5jb20iLCJsaWNlbnNlVHlwZSI6ImRldmVsb3BtZW50IiwiaXNzdWVkQXQiOjE3Nzg0MjQ2NzgxMjcsImV4cGlyZXMiOiJmb3JldmVyIn0=.dXS4vMugXu4mfI/QPPh5iDvtiy5033kRCG2R445HZtCb7778K1cuvg68GiX5GKBwMLMB5HOBoZFXwJbrwVzoMV4Ikm3VNvMtJ9EWe9TM0U0kQQnzukJqkLoI/p0ZhdD/RJhhzzOBqqMDYC5LXCbKDj4oAQQZHOthVo9vV5BGLJH7+C13HPzWOlWs8qrtKsQ1Jn96bMUul9X80Cjznt8l+NRG8eVJYq1gpRIp78ukDgOHz0xeSf7e/TC5vMdN9AAIn+RGYDUkA8/+MRDYEzojRyiwreVeF6duSBCI76mQKZoOtoG0KdGWzdMF86b+z+o2pXP2BBaOS9cx2wxs/X+Sp36ly9lXhaFrPjj3Res/bTQvVEtavAcqAmlEn9j1VO1XJdYGOxaL9pnvdPJBdal+Ojpyu9SFMxeZPhh7+5kgL8QNqZOikURpODipX9t1pwu/CFWYWkLlAugzqJfjh1UcPNtylRQh78tQJmMukAg9nrNEm+gaEhmIGRInazkJ3AfiaKC4S9jR0WulNIMw9vYK0OomIKL+3S9LWFqOuj9OIuJGY5An5moXLuSxky8K8mQvoZnvfVAImC+n1OMzSRRqo91FvDoyO1IIJfrIuppCk7uP6/Ib0KfAA98unyEf63iAQNwc/0jWOIoWiOXyWrclwKWfWdBw87uUJfO6Zug4l3k=`
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
