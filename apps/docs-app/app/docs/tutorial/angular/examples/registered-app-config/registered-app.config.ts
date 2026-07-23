// app.config.ts
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import {
  withAes256EncryptBehavior,
  withArrayAppendMergeBehavior,
  withDelayController,
  withLocalStoragePersistBehavior,
  withStepwiseController,
  withStepwiseFilterBehavior,
  withStepwiseReducerBehavior,
  withStepwiseResolveBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVault } from '@sdux-vault/angular';
import {
  withTabSyncController,
  withTabSyncStateBehavior
} from '@sdux-vault/core';
import { StarWarsCharacterService } from './example.service';

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
     * while the empty array establishes its initial character State.
     */
    provideFeatureCell(
      StarWarsCharacterService,
      {
        key: 'star-wars-character',
        initialState: []
      },
      [
        /**
         * Protects the finalized character collection at the persistence boundary
         * with authenticated AES-256-GCM encryption. In-memory FeatureCell State
         * remains plaintext for normal application use; only the value handed to
         * Persist behaviors becomes a versioned ciphertext envelope. During startup,
         * the same behavior validates and decrypts a persisted envelope before that
         * value can re-enter the pipeline. Its secret, stable salt, and PBKDF2 work
         * factor must be configured with `.setAes256Secret()` before initialization.
         */
        withAes256EncryptBehavior,

        /**
         * Persists the encrypted envelope under a deterministic, FeatureCell-scoped
         * localStorage key after upstream computation and encryption complete. The
         * behavior supplies durable browser-session recovery without transforming
         * live State, and removes its entry when the finalized value is undefined.
         * Pairing it after AES-256 ensures storage never receives the plaintext
         * character collection from this FeatureCell.
         */
        withLocalStoragePersistBehavior,

        /**
         * Establishes an explicit approval boundary after asynchronous inputs
         * resolve but before downstream filters and reducers can commit State.
         * The service configures its callback with `.withStepwiseResolve()`, then
         * exposes the callback's current and candidate values to the tutorial UI.
         * Each suspended request must receive exactly one decision: Continue lets
         * the candidate proceed, while Block terminates that attempt as a safe no-op.
         */
        withStepwiseResolveBehavior,

        /**
         * Adds an independent approval boundary immediately after registered
         * filters produce their candidate. The service's `.withStepwiseFilter()`
         * callback exposes the committed and filtered values without modifying
         * either snapshot. Continue admits that candidate to downstream taps and
         * reducers; Block suppresses only the active attempt and preserves State.
         * The shared Stepwise Controller correlates this decision after any earlier
         * Resolve-stage decision has completed.
         */
        withStepwiseFilterBehavior,

        /**
         * Establishes the final approval boundary after every configured reducer
         * has produced the candidate that would otherwise proceed toward State
         * commitment. The service's `.withStepwiseReducer()` callback exposes the
         * committed and reduced values as isolated snapshots. Continue admits the
         * completed transformation; Block suppresses that attempt without rolling
         * back or mutating existing State. The shared Stepwise Controller preserves
         * ordering after the Resolve and Filter decisions for the same pipeline.
         */
        withStepwiseReducerBehavior,

        /**
         * Extends core State commitment with opt-in synchronization across
         * browser tabs. Finalized local snapshots are shared with peer tabs,
         * and received snapshots update this FeatureCell's reactive State.
         */
        withTabSyncStateBehavior,

        withArrayAppendMergeBehavior
      ],
      [
        /**
         * Attaches the Delay Controller as a Policy-stage execution authority.
         * Registration installs `.withDelay()` on this FeatureCell's fluent API
         * so its service can configure a deterministic interval during pipeline
         * initialization. For every attempt, the controller pauses that trace and
         * then releases the original candidate unchanged. It does not debounce,
         * throttle, coalesce, reorder, or transform State, so every accepted request
         * retains its identity and eventually continues through the normal Resolve,
         * Filter, Tap, and Reducer stages.
         */
        withDelayController,

        /**
         * Serializes Stepwise requests and correlates each UI decision with the
         * pipeline attempt that is currently waiting. Registering this controller
         * structurally is essential: the Resolve behavior publishes requests, while
         * the controller guarantees FIFO coordination and releases the pipeline only
         * after the matching Continue or Block response is received.
         */
        withStepwiseController,

        /**
         * Coordinates Tab Sync startup so a newly opened tab can adopt an
         * existing peer snapshot before continuing with normal local updates.
         * Registering it with the State behavior completes the Tab Sync pair.
         */
        withTabSyncController
      ]
    )
  ]
};
