// app.config.ts
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import {
  withAes256EncryptBehavior,
  withArrayByIdMergeBehavior,
  withSessionStoragePersistBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVault } from '@sdux-vault/angular';
import { ExampleService } from './example.service';
import { STAR_WARS_CHARACTERS } from './star-wars-character.constant';

/**
 * Bootstraps Angular's browser services and initializes the application-scoped
 * Vault runtime before registering the Star Wars character FeatureCell.
 * `provideFeatureCell()` associates the Angular service with a unique Feature
 * key and the tutorial's initial character State, then adds array merging,
 * AES-256-GCM encryption, and sessionStorage persistence to the pipeline.
 * Together, the encryption and persistence behaviors restore encrypted State
 * within the browser tab while keeping the service as the FeatureCell boundary.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    /**
     * Initializes Vault with its default runtime configuration. This provider
     * must appear before FeatureCell providers so they can use the established
     * application-scoped runtime.
     * devMode enables development mode for the Vault runtime.
     * bypassLicensing allows bypassing the licensing checks for development purposes.
     */
    provideVault({
      devMode: true,
      bypassLicensing: true
    }),

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
         * Registers identifier-based array merging for this FeatureCell. During
         * the Merge stage, matching character identifiers are updated, new
         * identifiers are appended, and merge requests configured for deletion
         * remove the matching records from the committed collection.
         */
        withArrayByIdMergeBehavior,

        /**
         * Encrypts persisted FeatureCell values with AES-256-GCM and decrypts
         * them when State is restored. The service supplies the secret, stable
         * salt, and key-derivation iterations through `setAes256Secret()`
         * before initialization, so this behavior protects the value written
         * by the persistence stage rather than changing the in-memory State.
         */
        withAes256EncryptBehavior,

        /**
         * Persists the FeatureCell's State in browser sessionStorage and loads
         * it during restoration. The stored value lasts for the current browser
         * tab, while the companion encryption behavior ensures the persisted
         * representation is encrypted before it is written and decrypted when
         * it is read back.
         */
        withSessionStoragePersistBehavior
      ]
    )
  ]
};
