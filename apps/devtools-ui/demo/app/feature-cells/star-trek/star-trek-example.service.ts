import { Injectable, signal } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';

/**
 * Shape representing a single example entity in the FeatureCell state.
 */
export interface Example {
  /** Unique numeric identifier. */
  id: number;
  /** First name of the entity. */
  name: string;
  /** Last name of the entity. */
  lastName: string;
  /** Whether the entity is a captain; assigned by the reducer. */
  captain?: boolean;
  /** Whether the entity is a commander; assigned by the reducer. */
  commander?: boolean;
}

/**
 * Object-shaped state keyed by character ID.
 * Used with withObjectDeepMergeBehavior to demonstrate deep merge
 * behavior with nested objects containing arrays.
 */
export interface StarTrekState {
  /** Characters keyed by string ID. */
  [id: string]: Example;
}

/**
 * FeatureCell service for the Star Trek demo harness.
 *
 * Uses withObjectDeepMergeBehavior to demonstrate how deep merge
 * handles nested object structures. Arrays within the state are
 * replaced (not appended) during merge operations.
 */
@FeatureCell<StarTrekState>('startrek-feature-cell-key')
@Injectable({ providedIn: 'root' })
export class StarTrekExampleService {
  /** Vault instance managing the `StarTrekState` state. */
  readonly #vault = injectVault<StarTrekState>(StarTrekExampleService);

  /** Internal signal controlling whether the reducer throws an error. */
  readonly #isErrorState = signal(false);
  /** Read-only signal exposing the current error-toggle state. */
  readonly hasError = this.#isErrorState.asReadonly();

  /** Reactive state signal exposed from the vault. */
  readonly state = this.#vault.state;

  /**
   * Configures the vault pipeline with reducers, then
   * initializes the FeatureCell.
   */
  constructor() {
    this.#vault
      .reducers([
        (state: StarTrekState) => {
          if (this.#isErrorState()) {
            throw new Error('Example error triggered');
          }
          const result: StarTrekState = {};
          for (const [id, entry] of Object.entries(state)) {
            if (entry.name === 'Wesley') continue;
            if (entry.id === 1) {
              result[id] = { ...entry, captain: true };
            } else if (entry.id === 3) {
              result[id] = { ...entry, commander: true };
            } else {
              result[id] = entry;
            }
          }
          return result;
        }
      ])
      .withThrottle?.({ millisecondThrottle: 1_000 })
      .initialize();
  }

  /**
   * Replaces the vault state with the provided examples as an object map.
   *
   * @param input - Array of examples to convert and set as the new state.
   */
  replace(input: Example[]): void {
    const value: StarTrekState = {};
    for (const entry of input) {
      value[String(entry.id)] = entry;
    }
    this.#vault.replaceState({
      loading: false,
      value,
      error: null
    });
  }

  /** Resets the vault to its initial empty state. */
  reset(): void {
    this.#vault.reset();
  }

  /**
   * Deep-merges a single new example into the existing state object.
   *
   * @param entry - The example to merge into the current state.
   */
  merge(entry: Example): void {
    this.#vault.mergeState({
      loading: false,
      value: { [String(entry.id)]: entry },
      error: null
    });
  }

  /**
   * Sets the vault loading flag.
   *
   * @param isLoading - Whether the vault should be in a loading state.
   */
  toggleLoading(isLoading: boolean): void {
    this.#vault.replaceState({
      loading: isLoading
    });
  }

  /** Toggles the error flag so the reducer throws on the next pipeline cycle. */
  toggleError(): void {
    this.#isErrorState.update((v) => !v);
  }
}
