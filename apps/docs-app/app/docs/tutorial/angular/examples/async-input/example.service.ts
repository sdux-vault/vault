import { inject, Injectable, Injector, signal } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import type {
  StateSnapshotShape,
  VaultErrorCallback,
  VaultErrorShape
} from '@sdux-vault/shared';
import {
  createCharacterState,
  deriveForceSensitiveDisplay,
  deriveFullName,
  getNextCharacterId,
  withCharactersSortedByLastName,
  type StarWarsCharacterDraft
} from './example.character-domain';
import { removeUnknownLastNameFilter } from './example.filter';
import { exampleHttpResource } from './example.http-resource';
import { exampleHydrate } from './example.hydrate';
import { exampleObservable } from './example.observable';
import { examplePromise } from './example.promise';
import type { StarWarsCharacter } from './star-wars-character.shape';

/** Inputs observed by the tutorial's finalized error callback. */
interface ErrorEmission {
  /** Normalized Vault error committed by the Error stage. */
  readonly error: VaultErrorShape;

  /** Immutable FeatureCell snapshot associated with the finalized error. */
  readonly state: Readonly<StateSnapshotShape<readonly StarWarsCharacter[]>>;
}

/**
 * Owns the character collection and exposes domain operations for the tutorial component.
 * The FeatureCell decorator associates this service with a typed state boundary, while
 * `injectVault` provides the reactive state and update methods for that boundary.
 * ️**Architectural Boundary:** Components consume this service instead of accessing the
 * FeatureCell directly, keeping state ownership and character rules in one place.
 */
@FeatureCell<readonly StarWarsCharacter[]>('star-wars-character')
@Injectable({ providedIn: 'root' })
export class ExampleService {
  /**
   * Provides the strongly typed FeatureCell API associated with this decorated service.
   * Every collection update passes through this reference before reactive state changes.
   */
  readonly #vault = injectVault<readonly StarWarsCharacter[]>(ExampleService);

  /** Supplies the Angular injection context required to create an HTTP resource. */
  readonly #injector = inject(Injector);

  /**
   * Exposes the FeatureCell's Angular signal state for value, loading, error, and presence checks.
   * Consumers can bind to these reactive accessors without subscribing manually.
   */
  readonly state = this.#vault.state;

  /**
   * Initializes the FeatureCell for the add/edit tutorial slice.
   */
  constructor() {
    /*
     * `.filters()` registers `removeUnknownLastNameFilter` as a
     * `FilterFunction<readonly StarWarsCharacter[]>`.
     *
     * This pure function runs before reducers and returns a new candidate
     * collection without characters whose last name is exactly `unknown`.
     * The inline second filter normally returns that collection unchanged. When
     * the teaching flag is enabled, it throws deliberately so the example can show
     * pipeline error normalization without allowing the candidate to commit.
     */
    this.#vault.filters([
      removeUnknownLastNameFilter,
      (characters) => {
        return characters;
      }
    ]);

    /*
     * The first `.reducers()` entry is a delegating
     * `ReducerFunction<readonly StarWarsCharacter[]>`.
     *
     * After filtering, this imported pure function performs an immutable transformation
     * through `deriveForceSensitiveDisplay()`, producing a new collection in which
     * every retained character has a `Yes` or `No` display value.
     */

    /*
     * The second entry uses a factory-generated pure reducer, a different function
     * pattern that still returns the same `ReducerFunction` contract.
     *
     * It runs after Reducer 1, clones the transformed collection, and sorts characters
     * alphabetically by `lastName` without mutating the incoming array.
     */

    /*
     * The third entry is another delegating pure reducer.
     *
     * It runs after sorting and derives a display-ready `fullName` from the existing
     * `name` and `lastName` fields so every view can reuse the same post-pipeline label.
     */
    this.#vault.reducers([
      deriveForceSensitiveDisplay,
      withCharactersSortedByLastName(),
      deriveFullName
    ]);

    /*
     * `.errors()` registers a
     * `VaultErrorCallback<readonly StarWarsCharacter[]>` that receives the
     * finalized Vault error and immutable StateSnapshot after error commitment.
     *
     * The callback publishes both observational inputs for the tutorial display;
     * it cannot transform the error, replace state, or alter pipeline control.
     */
    this.#vault.errors([this.#captureEmittedError]);

    /*
     * `.hydrate()` registers a deferred factory as the authoritative source for
     * this FeatureCell's initial State. The factory is declared before
     * `.initialize()` but does not execute until initialization begins.
     *
     * Resolving the Promise sends the hydrated collection through the complete
     * Replace → Resolve → Filter → Tap → Reducer → Emit pipeline. Rejecting it
     * emits an initialization Error without falling back to configured initial
     * State or persistence because hydration has the highest precedence.
     */
    this.#vault.hydrate(() => exampleHydrate.getPromise());

    this.#vault.initialize();
  }

  // Teaching point: Promise (ex-024)
  /**
   * Merges a deferred Promise factory into the FeatureCell pipeline.
   * The factory is invoked by the Promise Resolve stage, which marks state as loading,
   * awaits the manually controlled response, and forwards its characters through the
   * configured filter, taps, and reducers before the collection is committed.
   * @returns Nothing; consumers observe loading and the eventual collection reactively.
   */
  fetchWithPromise(): void {
    const deferredPromise = examplePromise.getPromise();

    this.#vault.mergeState({
      value: () => deferredPromise
    });
  }

  // Teaching point: Observable (ex-025)
  /**
   * Merges a manually controlled Observable into the FeatureCell pipeline.
   * The Observable Resolve stage awaits its first emitted character collection,
   * then forwards that value through the configured filter, taps, and reducers
   * before committing the transformed collection to reactive state.
   * @returns Nothing; consumers observe loading and the eventual collection reactively.
   */
  addByObservable(): void {
    this.#vault.mergeState(exampleObservable.getObservable());
  }

  // Teaching point: HTTP Resource (ex-026)
  /**
   * Replaces the current collection from an Angular `HttpResourceRef`.
   * The example adapter owns the remote endpoint and converts its untrusted JSON
   * response into `StarWarsCharacter`; Vault's HTTP Resource Resolve stage
   * then represents loading, awaits the resource, and forwards the parsed value
   * through the configured filter, taps, and reducers before State commitment.
   * @returns Nothing; consumers observe loading, data, and errors reactively.
   */
  fetchWithHttpResource(): void {
    this.#vault.replaceState(exampleHttpResource.getResource(this.#injector));
  }

  /**
   * Observes a finalized Vault error after it has been normalized and committed to state.
   * This VaultErrorCallback records both immutable inputs for the tutorial display and returns
   * no value, so it cannot transform the error, recover the pipeline, or mutate state.
   * @param error - Finalized Vault error produced by the Error stage.
   * @param state - Immutable FeatureCell snapshot at the time of the error.
   * @returns Nothing; the callback only updates the read-only teaching signal.
   */
  /** Teaching Point: ex-036 */
  readonly #captureEmittedError: VaultErrorCallback<
    readonly StarWarsCharacter[]
  > = (error, state) => {
    this.#emittedError.set({ error, state });
  };

  /** Stores the latest finalized error and associated FeatureCell snapshot. */
  /** Teaching Point: ex-036 */
  readonly #emittedError = signal<ErrorEmission | undefined>(undefined);

  /**
   * Exposes the latest error-callback inputs as a read-only signal for the teaching output.
   * Consumers can inspect the finalized error and snapshot without influencing either one.
   */
  /** Teaching Point: ex-036 */
  readonly emittedError = this.#emittedError.asReadonly();

  /** Clears the latest captured error-emission teaching output. */
  clearEmittedError(): void {
    this.#emittedError.set(undefined);
  }

  /**
   * Assigns an ID and sends the new character through `mergeState` as a one-item array.
   * The configured array-append merge behavior adds that item while preserving existing characters.
   * @param draft - Editable character fields collected from the component form.
   * @returns The character submitted to the FeatureCell with its assigned ID.
   */
  createCharacter(draft: StarWarsCharacterDraft): StarWarsCharacter {
    const nextCharacterId = getNextCharacterId(this.#vault.state.value() ?? []);
    const character = createCharacterState(nextCharacterId, draft);

    this.#vault.mergeState({
      value: [character]
    });

    return character;
  }

  /**
   * Builds a replacement character and maps it into the latest collection through `replaceState`.
   * A matching ID is replaced while every other character retains its existing value.
   * @param id - Identity of the character to replace.
   * @param changes - Complete editable fields that should accompany the preserved identity.
   * @returns The replacement character submitted to the FeatureCell.
   */
  updateCharacter(
    id: number,
    changes: StarWarsCharacterDraft
  ): StarWarsCharacter {
    const updatedCharacter = createCharacterState(id, changes);

    this.#vault.replaceState({
      value: () =>
        this.#vault.state
          .value()
          ?.map((character) =>
            character.id === id ? updatedCharacter : character
          ) ?? []
    });

    return updatedCharacter;
  }

  /**
   * Filters the requested identity from the latest collection through `replaceState`.
   * An unknown ID leaves the visible collection unchanged.
   * @param id - Identity of the character to remove.
   * @returns Nothing; consumers observe the resulting collection through `characters`.
   */
  removeCharacter(id: number): void {
    this.#vault.replaceState({
      value: () =>
        this.#vault.state.value()?.filter((character) => character.id !== id) ??
        []
    });
  }
}
