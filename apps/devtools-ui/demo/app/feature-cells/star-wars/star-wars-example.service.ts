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
  /** Whether the entity is a Jedi; assigned by the reducer. */
  jedi?: boolean;
  /** Whether the entity is a senator; assigned by the reducer. */
  senator?: boolean;
}

/**
 * FeatureCell service for the demo harness.
 *
 * Mirrors the stackblitz basic-filter-reducer-example with
 * filters and reducers applied at runtime.
 */
@FeatureCell<Example[]>('starwars-feature-cell-key')
@Injectable({ providedIn: 'root' })
export class StarWarsExampleService {
  /** Vault instance managing the `Example[]` state. */
  readonly #vault = injectVault<Example[]>(StarWarsExampleService);

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
      .withDelay?.({ millisecondDelay: 500 })
      .filters([
        (examples: Example[]) =>
          examples.filter((example) => example.name !== 'Han')
      ])
      .reducers([
        (examples: Example[]) => {
          if (this.#isErrorState()) {
            throw new Error('Example error triggered');
          } else {
            return examples.map((example) => {
              if (example.id === 11) {
                return { ...example, jedi: true };
              }
              if (example.id === 38) {
                return { ...example, senator: true };
              }
              return example;
            });
          }
        }
      ])
      .setAes256Secret?.({
        aes256Secret: 'my-super-secret-key',
        salt: Uint8Array.from('vault::aes256::salt'),
        iterations: 100_000
      })
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

  /**
   * Merges a single new example into the existing state array.
   *
   * @param entry - The example to append to the current state.
   */
  merge(entry: Example): void {
    const current = this.#vault.state.value() ?? [];
    this.#vault.mergeState({
      loading: false,
      value: [...current, entry],
      error: null
    });
  }

  /** Resets the vault to its initial empty state. */
  reset(): void {
    this.#vault.reset();
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
