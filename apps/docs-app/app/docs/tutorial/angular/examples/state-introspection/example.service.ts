import { Injectable, signal } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import type {
  CoreEmitStateCallback,
  StateSnapshotShape,
  TapCallback
} from '@sdux-vault/shared';
import { filter } from 'rxjs/internal/operators/filter';
import { take } from 'rxjs/operators';
import {
  cloneCharacters,
  createCharacterState,
  deriveForceSensitiveDisplay,
  deriveFullName,
  getNextCharacterId,
  withCharactersSortedByLastName,
  type StarWarsCharacterDraft
} from './example.character-domain';
import { removeUnknownLastNameFilter } from './example.filter';
import type { StarWarsCharacter } from './star-wars-character.shape';

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

  /**
   * Exposes the FeatureCell's Angular signal state for value, loading, error, and presence checks.
   * Consumers can bind to these reactive accessors without subscribing manually.
   */
  readonly state = this.#vault.state;

  /**
   * Exposes committed FeatureCell snapshots for consumers that teach observable state access.
   * Each emission carries the same state value available through the Angular signal API.
   */
  readonly state$ = this.#vault.state$;

  /**
   * Initializes the FeatureCell for the add/edit tutorial slice.
   */
  constructor() {
    this.#captureInitialCharacters();

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
     * `.emitStates()` registers a
     * `CoreEmitStateCallback<readonly StarWarsCharacter[]>` that receives the
     * finalized `StateSnapshotShape` after the FeatureCell commits and exposes it.
     *
     * The callback publishes that immutable snapshot for the tutorial display and
     * cannot replace state, restart the pipeline, or change the committed result.
     */
    this.#vault.emitStates([this.#captureEmittedState]);

    /*
     * `.afterTaps()` registers a `TapCallback<readonly StarWarsCharacter[]>`
     * that observes the transformed candidate immediately after reducer execution.
     *
     * The callback publishes that immutable reduced candidate for the tutorial display,
     * returns no replacement value, and cannot change the value committed as FeatureCell State.
     */
    this.#vault.afterTaps([this.#captureAfterTapInput]);

    /*
     * `.beforeTaps()` registers a `TapCallback<readonly StarWarsCharacter[]>`
     * that observes the filtered candidate immediately before reducer execution.
     *
     * The callback publishes that immutable pre-reducer candidate for the tutorial display,
     * returns no replacement value, and cannot change the value passed to Reducer 1.
     */
    this.#vault.beforeTaps([this.#captureBeforeTapInput]);

    /*
     * `.initialize()` finalizes the pipeline configuration and activates the
     * FeatureCell. Its initial value and subsequent updates now pass through the
     * registered Filter → Before Tap → Reducer → After Tap stages before becoming committed
     * reactive State, which is then observed by the State Emission callback.
     */
    this.#vault.initialize();
  }

  /**
   * Tracks the identity assigned to the next newly created character.
   * Initialization advances it beyond the largest ID in the initial collection.
   */
  #nextCharacterId = 1;

  #captureInitialCharacters(): void {
    this.#vault.state$
      .pipe(
        filter(({ snapshot }) => snapshot.hasValue),
        take(1)
      )
      .subscribe(({ snapshot }) => {
        this.#initialCharacters = cloneCharacters(snapshot.value ?? []);
        this.#nextCharacterId = getNextCharacterId(this.#initialCharacters);
      });
  }

  /**
   * Stores a detached copy of the first resolved character collection.
   * Restore operations use this baseline instead of any later edited state.
   */
  #initialCharacters: StarWarsCharacter[] = [];

  /**
   * Clones the captured baseline and replaces the current FeatureCell collection with it.
   * Returning the first restored character lets the component restore its selection as well.
   * @returns The first restored character, or `null` when the initial collection was empty.
   */
  restoreInitialCharacters(): StarWarsCharacter | null {
    const initialCharacters = cloneCharacters(this.#initialCharacters);

    this.#vault.replaceState({
      value: initialCharacters
    });

    return initialCharacters[0] ?? null;
  }

  /**
   * Resets the FeatureCell through its dedicated lifecycle API.
   * Consumers observe the cleared value as `undefined` through the reactive state APIs.
   * @returns Nothing; the FeatureCell performs the reset operation internally.
   */
  resetState(): void {
    this.#vault.reset();
  }

  /** Stores the latest filtered collection observed immediately before reducer execution. */
  readonly #beforeTapInput = signal<readonly StarWarsCharacter[] | undefined>(
    undefined
  );

  /**
   * Exposes the latest Before Tap input as a read-only signal for the teaching output.
   * Consumers can inspect this value but cannot use the signal to alter pipeline state.
   */
  readonly beforeTapInput = this.#beforeTapInput.asReadonly();

  /**
   * Observes the filtered candidate immediately before reducers transform it.
   * This TapCallback performs the single intentional side effect of publishing the immutable input
   * for the tutorial display; it returns nothing and leaves pipeline execution unchanged.
   * @param characters - Filtered character collection entering the Before Tap stage.
   * @returns Nothing; the callback only updates the read-only teaching signal.
   */
  readonly #captureBeforeTapInput: TapCallback<readonly StarWarsCharacter[]> = (
    characters
  ) => {
    this.#beforeTapInput.set(characters);
  };

  /** Stores the latest transformed collection observed immediately after reducer execution. */
  readonly #afterTapInput = signal<readonly StarWarsCharacter[] | undefined>(
    undefined
  );

  /**
   * Exposes the latest After Tap input as a read-only signal for the teaching output.
   * Consumers can inspect this value but cannot use the signal to alter pipeline state.
   */
  readonly afterTapInput = this.#afterTapInput.asReadonly();

  /**
   * Observes the transformed candidate immediately after reducers finish processing it.
   * This TapCallback performs the single intentional side effect of publishing the immutable input
   * for the tutorial display; it returns nothing and leaves pipeline execution unchanged.
   * @param characters - Reduced character collection entering the After Tap stage.
   * @returns Nothing; the callback only updates the read-only teaching signal.
   */
  readonly #captureAfterTapInput: TapCallback<readonly StarWarsCharacter[]> = (
    characters
  ) => {
    this.#afterTapInput.set(characters);
  };

  /** Stores the latest finalized StateSnapshot observed after state commitment. */
  readonly #emittedState = signal<
    StateSnapshotShape<readonly StarWarsCharacter[]> | undefined
  >(undefined);

  /**
   * Exposes the latest emit-state callback input as a read-only signal for the teaching output.
   * Consumers can inspect the finalized snapshot but cannot use the signal to alter committed state.
   */
  readonly emittedState = this.#emittedState.asReadonly();

  /**
   * Observes the finalized StateSnapshot after the FeatureCell commits and exposes it.
   * This CoreEmitStateCallback performs the single intentional side effect of publishing the
   * immutable snapshot for the tutorial display; it cannot influence pipeline execution.
   * @param snapshot - Finalized value, loading, error, and presence state after commitment.
   * @returns Nothing; the callback only updates the read-only teaching signal.
   */
  readonly #captureEmittedState: CoreEmitStateCallback<
    readonly StarWarsCharacter[]
  > = (snapshot) => {
    this.#emittedState.set(snapshot);
  };

  /**
   * Assigns an ID and sends the new character through `mergeState` as a one-item array.
   * The configured array-append merge behavior adds that item while preserving existing characters.
   * @param draft - Editable character fields collected from the component form.
   * @returns The character submitted to the FeatureCell with its assigned ID.
   */
  createCharacter(draft: StarWarsCharacterDraft): StarWarsCharacter {
    const character = createCharacterState(this.#nextCharacterId++, draft);

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
