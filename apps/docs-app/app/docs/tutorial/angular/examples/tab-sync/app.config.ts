// app.config.ts
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { withArrayAppendMergeBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVault } from '@sdux-vault/angular';
import {
  withTabSyncController,
  withTabSyncStateBehavior
} from '@sdux-vault/core';
import { ExampleService } from './example.service';
import { STAR_WARS_CHARACTERS } from './star-wars-character.constant';

/**
 * Bootstraps Angular's browser services and initializes the application-scoped
 * Vault runtime before registering the Star Wars character FeatureCell.
 * `provideFeatureCell()` associates the Angular service with a unique Feature
 * key and an empty initial State, preparing that boundary for the service
 * integration added in the next tutorial step.
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
    provideVault(),

    /**
     * Registers the character service and its FeatureCell descriptor with
     * Angular dependency injection. The unique key identifies this FeatureCell,
     * while the initialState property sets the initial character State
     * from a list of constants.
     */
    provideFeatureCell(
      ExampleService,
      {
        key: 'star-wars-character',
        initialState: STAR_WARS_CHARACTERS
      },
      [
        /**
         * `provideFeatureCell()` accepts an optional behaviors array as its third argument.
         * Registering `withArrayAppendMergeBehavior` here changes the Merge stage so
         * `mergeState()` appends the incoming one-item character array to the current
         * collection instead of replacing the entire FeatureCell value.
         */
        withArrayAppendMergeBehavior,

        /**
         * Extends this FeatureCell's State behavior with opt-in browser-tab
         * synchronization. Finalized local snapshots are shared with matching
         * peer tabs, while snapshots received from a peer update this FeatureCell's
         * reactive State so the example presents the same character collection.
         */
        withTabSyncStateBehavior
      ],
      [
        /**
         * Coordinates Tab Sync startup so a newly opened tab can adopt an
         * existing peer snapshot before continuing with its local State. Register
         * this controller with the State behavior to complete the tab-sync pair.
         */
        withTabSyncController
      ]
    )
  ]
};
