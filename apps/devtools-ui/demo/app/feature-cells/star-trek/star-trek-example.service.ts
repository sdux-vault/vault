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
 * FeatureCell service for the Star Trek demo harness.
 *
 * Mirrors the Star Wars example with Star Trek characters,
 * filters and reducers applied at runtime.
 */
@FeatureCell<Example[]>('startrek-feature-cell-key')
@Injectable({ providedIn: 'root' })
export class StarTrekExampleService {
  /** Vault instance managing the `Example[]` state. */
  readonly #vault = injectVault<Example[]>(StarTrekExampleService);

  /** Internal signal controlling whether the reducer throws an error. */
  readonly #isErrorState = signal(false);
  /** Read-only signal exposing the current error-toggle state. */
  readonly hasError = this.#isErrorState.asReadonly();

  /** Reactive state signal exposed from the vault. */
  readonly state = this.#vault.state;

  /**
   * Configures the vault pipeline with filters and reducers, then
   * initializes the FeatureCell.
   */
  constructor() {
    this.#vault
      .filters([
        (examples: Example[]) =>
          examples.filter((example) => example.name !== 'Wesley')
      ])
      .reducers([
        (examples: Example[]) => {
          if (this.#isErrorState()) {
            throw new Error('Example error triggered');
          } else {
            return examples.map((example) => {
              if (example.id === 1) {
                return { ...example, captain: true };
              }
              if (example.id === 3) {
                return { ...example, commander: true };
              }
              return example;
            });
          }
        }
      ])
      .initialize();
  }

  /**
   * Replaces the vault state with the provided example array.
   *
   * @param input - Array of examples to set as the new state value.
   */
  replace(input: Example[]): void {
    this.#vault.replaceState({
      loading: false,
      value: input,
      error: null
    });
  }

  /** Resets the vault to its initial empty state. */
  reset(): void {
    this.#vault.reset();
  }

  /**
   * Merges a single new example into the existing state array.
   *
   * @param entry - The example to append to the current state.
   */
  merge(entry: Example): void {
    const current = this.#vault.state.value() ?? [];
    this.#vault.mergeState({
      value: [...current, entry]
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
