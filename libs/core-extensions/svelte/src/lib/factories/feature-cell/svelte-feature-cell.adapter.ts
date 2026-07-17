import { FeatureCellShape } from '@sdux-vault/engine';
import { SvelteStateTracker } from './svelte-state.tracker';

/**
 * Svelte adapter that augments the existing FeatureCell State getter with
 * Svelte reactive effect tracking.
 *
 * The adapted getter preserves synchronous Snapshot access while allowing
 * Svelte templates, derived values, and effects to react to State changes.
 */
export class SvelteFeatureCellAdapter<T> {
  /** Reads the original core FeatureCell State getter. */
  readonly #readState: () => FeatureCellShape<T>['state'];

  /** Connects reactive State reads to the Svelte effect lifecycle. */
  readonly #stateTracker: SvelteStateTracker<T>;

  /**
   * Creates a SvelteFeatureCellAdapter for the provided core FeatureCell.
   *
   * @param core - The framework-agnostic FeatureCell instance to adapt.
   */
  constructor(private readonly core: FeatureCellShape<T>) {
    const stateDescriptor = Object.getOwnPropertyDescriptor(core, 'state');

    if (!stateDescriptor?.get) {
      throw new Error(
        'SvelteFeatureCellAdapter requires FeatureCell state to be exposed by a getter.'
      );
    }

    this.#readState = stateDescriptor.get.bind(core);
    this.#stateTracker = new SvelteStateTracker(core);
  }

  /**
   * Builds and returns the Svelte-augmented FeatureCell instance.
   *
   * @returns The FeatureCell with a Svelte-reactive State getter.
   */
  build(): FeatureCellShape<T> {
    const cell = this.core;

    Object.defineProperty(cell, 'state', {
      configurable: true,
      enumerable: true,
      get: () => {
        this.#stateTracker.track();

        return this.#readState();
      }
    });

    return cell;
  }
}
