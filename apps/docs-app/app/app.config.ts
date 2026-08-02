import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions
} from '@angular/material/form-field';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import {
  // withAes256EncryptBehavior,
  withArrayAppendMergeBehavior
  // withDelayController
  // withSessionStoragePersistBehavior
  // withStepwiseController,
  // withStepwiseFilterBehavior,
  // withStepwiseReducerBehavior,
  // withStepwiseResolveBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVault } from '@sdux-vault/angular';
import {
  withTabSyncController,
  withTabSyncStateBehavior
} from '@sdux-vault/core';
import {
  ANALYTICS_ENABLED,
  SDUX_BRAND_NAME,
  SDUX_CATCH_PHRASE,
  SDUX_FEATURE_CELL_BRAND_NAME,
  SDUX_PACKAGE_NAME,
  SDUX_VAULT_BRAND_NAME,
  WINDOW,
  windowFactory
} from '@sdux-vault/ui/web-components';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { environment } from '../environments/environment';
import { InMemoryDataService } from '../testing/in-memory-db/in-memory-data.service';
import { PIPELINE_BUILDER_ALL_BEHAVIOR_CONSTANT } from './builder/constants/stages/all-stage-behavior.constant';
import { PIPELINE_BUILDER_ALL_STAGE_CONSTANT } from './builder/constants/stages/all-stage.constant';
import { PIPELINE_BUILDER_BEHAVIOR_TOKEN } from './builder/tokens/pipeline-builder-behaviors.token';
import { PIPELINE_BUILDER_STAGE_TOKEN } from './builder/tokens/pipeline-builder-stages.token';
import { FeatureCellInvocations } from './cells/feature-cells';
import { SduxHttpClientInterceptor } from './dashboard/utils/sdux-http-client.interceptor';
import { ExampleService } from './docs/tutorial/angular/examples/complete-character-management/example.service';
import { STAR_WARS_CHARACTERS } from './docs/tutorial/angular/examples/complete-character-management/star-wars-character.constant';
import { routes } from './vault.routes';

const appearance: MatFormFieldDefaultOptions = {
  subscriptSizing: 'dynamic',
  appearance: 'outline'
};

export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Registers global error handlers for browser-level exceptions.
     * Captures unhandled errors and rejections for improved diagnostics.
     */
    provideBrowserGlobalErrorListeners(),

    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    },

    /**
     * Enables zoneless change detection mode for a signal-driven application.
     * Eliminates Zone.js overhead by relying entirely on Signals reactivity.
     */
    provideZonelessChangeDetection(),

    /** Enables analytics only for environments that explicitly opt in. */
    {
      provide: ANALYTICS_ENABLED,
      useValue: environment.analyticsEnabled
    },

    /**
     * Configures application routing and registers route definitions.
     */
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled'
      })
    ),

    /**
     * Application-level provider for the global SDUX catch phrase.
     *
     * This value supplies the string consumed by the `<catch-phrase>` component
     * and any other UI elements that display a branding tagline. The token is
     * defined in the SDUX UI library and must be provided by the application so
     * that libraries do not hard-code brand text or visual identity.
     *
     * Applications may override or localize this value as needed.
     */
    {
      provide: SDUX_CATCH_PHRASE,
      useValue: 'Plain TypeScript, Zero Magic'
      // useValue: 'Secure State. Reactive by Design.'
    },

    {
      provide: SDUX_PACKAGE_NAME,
      useValue: '@sdux-vault'
    },

    /**
     * Application-level provider for the global SDUX brand name.
     *
     * This value supplies the string consumed by UI elements, services, and
     * accessibility attributes that reference the product or application brand.
     * The token is defined by the SDUX web-components library, but the actual
     * brand name must be provided by the hosting application so that UI elements
     * do not hard-code product identity.
     *
     * Applications may override or localize this value depending on context.
     */
    { provide: SDUX_BRAND_NAME, useValue: 'SDuX' },

    { provide: SDUX_VAULT_BRAND_NAME, useValue: 'SDuX Vault' },

    { provide: SDUX_FEATURE_CELL_BRAND_NAME, useValue: 'FeatureCell' },

    /**
     * Configures the Vault runtime for the application.
     *
     * The `provideVault()` factory registers all core Vault services, including
     * orchestrator execution, behavior resolution, monitoring, and global signal
     * management. Passing `{ logLevel: 'off' }` disables debug and diagnostic
     * logging, resulting in a silent runtime suitable for production usage or
     * noise-free testing.
     *
     * Additional configuration options may be supplied depending on environment
     * needs (debugging, custom monitors, devtools integration, etc.).
     */
    provideVault({
      logLevel: 'off',
      devMode: environment.devMode,
      bypassLicensing: environment.bypassLicensing,
      licenses: [environment.license]
    }),

    /**
     * Registers the 'user' feature state using the UserStateService.
     * Seeds the feature with its initial state object.
     */
    FeatureCellInvocations,

    {
      provide: WINDOW,
      useFactory: windowFactory
    },

    /**
     * Configures Angular's built-in **HttpClient** with dependency-injected interceptors.
     *
     * - Registers the HttpClient globally for all services and components.
     * - Enables the use of interceptors defined via Angular's DI system.
     * - Required for the in-memory API and for all backend communication.
     *
     * @see https://angular.dev/api/common/http/provideHttpClient
     * @see https://angular.dev/guide/http
     */
    provideHttpClient(withInterceptorsFromDi()),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: SduxHttpClientInterceptor,
      multi: true
    },

    ...(environment.useInMemoryApi
      ? [
          importProvidersFrom(
            HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
              delay: 300,
              passThruUnknownUrl: true // allow real APIs too
            })
          )
        ]
      : []),

    {
      provide: PIPELINE_BUILDER_STAGE_TOKEN,
      useValue: PIPELINE_BUILDER_ALL_STAGE_CONSTANT
    },
    {
      provide: PIPELINE_BUILDER_BEHAVIOR_TOKEN,
      useValue: PIPELINE_BUILDER_ALL_BEHAVIOR_CONSTANT
    },
    provideFeatureCell(
      ExampleService,
      {
        key: 'star-wars-character',
        initialState: STAR_WARS_CHARACTERS
      },
      [
        withArrayAppendMergeBehavior,
        // withAes256EncryptBehavior,
        // withSessionStoragePersistBehavior
        // withStepwiseResolveBehavior,
        // withStepwiseFilterBehavior,
        // withStepwiseReducerBehavior,
        withTabSyncStateBehavior
      ],
      [
        // withDelayController
        //  withStepwiseController,
        withTabSyncController
      ]
    )
  ]
};
