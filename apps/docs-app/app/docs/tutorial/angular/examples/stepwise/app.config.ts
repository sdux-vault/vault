// app.config.ts
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import {
  withArrayAppendMergeBehavior,
  withStepwiseController,
  withStepwiseFilterBehavior,
  withStepwiseReducerBehavior,
  withStepwiseResolveBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVault } from '@sdux-vault/angular';
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
         * Preserves the example's collection-oriented merge behavior so a newly
         * created character can be appended to the existing FeatureCell State.
         * The behavior runs during the pipeline's Merge stage and keeps the
         * service focused on describing the update rather than combining arrays.
         */
        withArrayAppendMergeBehavior,

        /**
         * Adds an approval boundary after the Resolve stage. The service exposes
         * the resolved candidate and waits for the example UI to accept or reject
         * it before the candidate continues through the pipeline.
         */
        withStepwiseResolveBehavior,

        /**
         * Adds an approval boundary after filtering. The filtered candidate is
         * made available to the service callback so the UI can accept it and let
         * reducers continue, or reject it and preserve the committed State.
         */
        withStepwiseFilterBehavior,

        /**
         * Adds an approval boundary after all reducers finish. The service can
         * expose the reduced candidate for inspection and decide whether it may
         * become the next committed FeatureCell State.
         */
        withStepwiseReducerBehavior
      ],
      [
        /**
         * Connects the three Stepwise behavior boundaries to the controller that
         * can pause each candidate until the service supplies an accept or reject
         * decision. Without this controller, the callbacks cannot hold the
         * pipeline for the interactive approval demonstrated by the example.
         */
        withStepwiseController
      ]
    )
  ]
};
