import { FeatureCellShape } from '@sdux-vault/engine';
import { createSubscriber } from 'svelte/reactivity';

/** Factory signature used to create a Svelte reactive subscriber. */
type SvelteSubscriberFactory = typeof createSubscriber;

/** FeatureCell surface consumed by Svelte State tracking. */
type StateStreamContext<T> = Pick<FeatureCellShape<T>, 'state$'>;

/**
 * Connects FeatureCell State emissions to Svelte's reactive effect lifecycle.
 *
 * The tracker starts and stops the State subscription according to the active
 * Svelte effects that read the adapted State getter.
 */
export class SvelteStateTracker<T> {
  /** Registers the current Svelte effect as a State consumer. */
  readonly #track: () => void;

  /**
   * Creates a State tracker for the provided FeatureCell context.
   *
   * @param core - FeatureCell State surfaces consumed by the tracker.
   * @param subscriberFactory - Svelte subscriber factory used to own effect cleanup.
   */
  constructor(
    core: StateStreamContext<T>,
    subscriberFactory: SvelteSubscriberFactory = createSubscriber
  ) {
    this.#track = subscriberFactory((update) => {
      const subscription = core.state$.subscribe(() => update());

      return () => subscription.unsubscribe();
    });
  }

  /** Registers a reactive read of the current FeatureCell State. */
  track(): void {
    this.#track();
  }
}
