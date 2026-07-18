// example.service.ts
import { computed, Injectable, signal } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import type {
  CoreEmitStateCallback,
  ReducerFunction,
  StateSnapshotShape,
  TapCallback
} from '@sdux-vault/shared';
import { filter, take } from 'rxjs';
import { StarWarsCharacterState } from '../../../examples/star-wars-character.state';
import { removeUnknownLastNameFilter } from './example.filter';
import { examplePromise } from './example.promise';

/**
 * Describes the editable character fields accepted before the service assigns an ID.
 * Omitting identity keeps component forms from choosing or changing the collection key.
 */
export type StarWarsCharacterDraft = Omit<StarWarsCharacterState, 'id'>;

/**
 * Creates a pure reducer that orders characters alphabetically by last name.
 * Returning the reducer from a factory demonstrates reusable pipeline configuration while the
 * cloned array preserves the immutable collection received from the previous reducer.
 * @returns A ReducerFunction that produces a newly sorted character collection.
 */
export function withCharactersSortedByLastName(): ReducerFunction<
  readonly StarWarsCharacterState[]
> {
  return (characters) =>
    [...characters].sort((left, right) =>
      left.lastName.localeCompare(right.lastName)
    );
}

// Teaching point: CRUD Foundation (ex-007)
/**
 * Owns the character collection and exposes domain operations for the tutorial component.
 * The FeatureCell decorator associates this service with a typed state boundary, while
 * `injectVault` provides the reactive state and update methods for that boundary.
 * Create, update, remove, and restore operations all flow through the FeatureCell pipeline.
 * ️**Architectural Boundary:** Components consume this service instead of accessing the
 * FeatureCell directly, keeping state ownership and character rules in one place.
 */
@FeatureCell<readonly StarWarsCharacterState[]>('star-wars-character')
@Injectable({ providedIn: 'root' })
export class ExampleService {
  // Teaching point: Minimal Read-Only FeatureCell (ex-002)
  /**
   * Provides the strongly typed FeatureCell API associated with this decorated service.
   * Every collection update passes through this reference before reactive state changes.
   */
  readonly #vault =
    injectVault<readonly StarWarsCharacterState[]>(ExampleService);

  /**
   * Stores a detached copy of the first resolved character collection.
   * Restore operations use this baseline instead of any later edited state.
   */
  #initialCharacters: readonly StarWarsCharacterState[] = [];

  /**
   * Tracks the identity assigned to the next newly created character.
   * Initialization advances it beyond the largest ID in the initial collection.
   */
  #nextCharacterId = 1;

  /** Stores the latest filtered collection observed immediately before reducer execution. */
  readonly #beforeTapInput = signal<
    readonly StarWarsCharacterState[] | undefined
  >(undefined);

  // Teaching point: Before Taps (ex-031)
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
  readonly #captureBeforeTapInput: TapCallback<
    readonly StarWarsCharacterState[]
  > = (characters) => {
    this.#beforeTapInput.set(characters);
  };

  /** Stores the latest transformed collection observed immediately after reducer execution. */
  readonly #afterTapInput = signal<
    readonly StarWarsCharacterState[] | undefined
  >(undefined);

  // Teaching point: After Taps (ex-032)
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
  readonly #captureAfterTapInput: TapCallback<
    readonly StarWarsCharacterState[]
  > = (characters) => {
    this.#afterTapInput.set(characters);
  };

  /** Stores the latest finalized StateSnapshot observed after state commitment. */
  readonly #emittedState = signal<
    StateSnapshotShape<readonly StarWarsCharacterState[]> | undefined
  >(undefined);

  // Teaching point: State Emission (ex-035)
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
    readonly StarWarsCharacterState[]
  > = (snapshot) => {
    this.#emittedState.set(snapshot);
  };

  // Teaching point: Raw StateSnapshot (ex-013)
  /**
   * Exposes the FeatureCell's Angular signal state for value, loading, error, and presence checks.
   * Consumers can bind to these reactive accessors without subscribing manually.
   */
  readonly state = this.#vault.state;

  // Teaching point: Raw StateSnapshot$ (ex-014)
  /**
   * Exposes committed FeatureCell snapshots for consumers that teach observable state access.
   * Each emission carries the same state value available through the Angular signal API.
   */
  readonly state$ = this.#vault.state$;

  /**
   * Projects the current FeatureCell value into a read-only Angular computed signal.
   * The empty-array fallback gives templates a stable collection before a value is available.
   */
  readonly characters = computed<readonly StarWarsCharacterState[]>(
    () => this.state.value() ?? []
  );

  /**
   * Captures the first committed collection, then configures and initializes the FeatureCell pipeline.
   */
  constructor() {
    this.#vault.state$
      .pipe(
        filter(({ snapshot }) => snapshot.hasValue),
        take(1)
      )
      .subscribe(({ snapshot }) => {
        this.#initialCharacters =
          snapshot.value?.map((character) => ({ ...character })) ?? [];
        this.#nextCharacterId =
          Math.max(...this.#initialCharacters.map(({ id }) => id), 0) + 1;
      });

    this.#vault
      // Teaching point: Filter (ex-016)
      /*
       * `.filters()` registers `removeUnknownLastNameFilter` as a
       * `FilterFunction<readonly StarWarsCharacterState[]>`.
       *
       * This pure function runs before reducers and returns a new candidate
       * collection without characters whose last name is exactly `unknown`.
       */
      .filters([removeUnknownLastNameFilter])

      // Teaching point: Before Taps (ex-031)
      /*
       * `.beforeTaps()` registers a `TapCallback<readonly StarWarsCharacterState[]>`
       * that observes the filtered candidate immediately before reducer execution.
       *
       * The callback publishes that immutable input for the tutorial display, returns
       * no replacement value, and cannot change the value passed to Reducer 1.
       */
      .beforeTaps([this.#captureBeforeTapInput])

      // Teaching point: Reducer 1 (ex-017)
      /*
       * The first `.reducers()` entry is a delegating
       * `ReducerFunction<readonly StarWarsCharacterState[]>`.
       *
       * After filtering, this pure function delegates its immutable transformation
       * to `#deriveForceSensitiveDisplay()`, producing a new collection in which
       * every retained character has a `Yes` or `No` display value.
       */

      // Teaching point: Reducer 2 (ex-018)
      /*
       * The second entry uses a factory-generated pure reducer, a different function
       * pattern that still returns the same `ReducerFunction` contract.
       *
       * It runs after Reducer 1, clones the transformed collection, and sorts characters
       * alphabetically by `lastName` without mutating the incoming array.
       */
      .reducers([
        (characters) => this.#deriveForceSensitiveDisplay(characters),
        withCharactersSortedByLastName()
      ])

      // Teaching point: After Taps (ex-032)
      /*
       * `.afterTaps()` registers a `TapCallback<readonly StarWarsCharacterState[]>`
       * that observes the transformed candidate immediately after reducer execution.
       *
       * The callback publishes that immutable input for the tutorial display, returns
       * no replacement value, and cannot change the value committed as FeatureCell State.
       */
      .afterTaps([this.#captureAfterTapInput])

      // Teaching point: State Emission (ex-035)
      /*
       * `.emitStates()` registers a
       * `CoreEmitStateCallback<readonly StarWarsCharacterState[]>` that receives the
       * finalized `StateSnapshotShape` after the FeatureCell commits and exposes it.
       *
       * The callback publishes that immutable snapshot for the tutorial display and
       * cannot replace state, restart the pipeline, or change the committed result.
       */
      .emitStates([this.#captureEmittedState])

      /*
       * `.initialize()` finalizes the pipeline configuration and activates the
       * FeatureCell. Its initial value and subsequent updates now pass through the
       * registered Filter → Before Tap → Reducer → After Tap stages before becoming committed
       * reactive State, which is then observed by the State Emission callback.
       */
      .initialize();
  }

  // Teaching point: Create (ex-009)
  /**
   * Assigns an ID and sends the new character through `mergeState` as a one-item array.
   * The configured array-append merge behavior adds that item while preserving existing characters.
   * @param draft - Editable character fields collected from the component form.
   * @returns The character submitted to the FeatureCell with its assigned ID.
   */
  createCharacter(draft: StarWarsCharacterDraft): StarWarsCharacterState {
    const character: StarWarsCharacterState = {
      id: this.#nextCharacterId++,
      ...draft
    };

    this.#vault.mergeState({
      value: [character],
      loading: false,
      error: null
    });

    return character;
  }

  // Teaching point: Create / Update (ex-010)
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
  ): StarWarsCharacterState {
    const updatedCharacter: StarWarsCharacterState = { id, ...changes };

    this.#vault.replaceState({
      value: () =>
        this.#vault.state
          .value()
          ?.map((character) =>
            character.id === id ? updatedCharacter : character
          ),
      loading: false,
      error: null
    });

    return updatedCharacter;
  }

  // Teaching point: Remove (ex-006)
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
        [],
      loading: false,
      error: null
    });
  }

  // Teaching point: Persist Null (ex-020)
  /**
   * Persists `null` through `replaceState` to clear the FeatureCell's current value.
   * The resulting state value resolves to `undefined` for consumers of the read model.
   * @returns Nothing; consumers observe the cleared value through the reactive state APIs.
   */
  persistNullValue(): void {
    this.#vault.replaceState({ value: null });
  }

  // Teaching point: Reset (ex-021)
  /**
   * Resets the FeatureCell through its dedicated lifecycle API.
   * Consumers observe the cleared value as `undefined` through the reactive state APIs.
   * @returns Nothing; the FeatureCell performs the reset operation internally.
   */
  resetState(): void {
    this.#vault.reset();
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

  /**
   * Retrieves the controller action that completes the active simulated request.
   * Keeping resolution separate from request creation lets the tutorial hold the
   * FeatureCell in its loading state until the user explicitly resolves the Promise.
   * @returns The active Promise resolver, or `null` when no request is pending.
   */
  getPromiseResolver(): (() => void) | null {
    return examplePromise.getResolve();
  }

  // Teaching point: FeatureCell destruction (ex-005)
  /**
   * Permanently tears down the FeatureCell and releases its runtime resources.
   * Destruction completes its streams and prevents any further pipeline execution.
   * @returns Nothing; the FeatureCell lifecycle is permanently finalized.
   */
  destroyFeatureCell(): void {
    this.#vault.destroy();
  }

  // Teaching point: Restore (ex-022)
  /**
   * Clones the captured baseline and replaces the current FeatureCell collection with it.
   * Returning the first restored character lets the component restore its selection as well.
   * @returns The first restored character, or `null` when the initial collection was empty.
   */
  restoreInitialCharacters(): StarWarsCharacterState | null {
    const initialCharacters = this.#initialCharacters.map((character) => ({
      ...character
    }));

    this.#replaceCharacters(initialCharacters);

    return initialCharacters[0] ?? null;
  }

  /**
   * Derives a display-friendly force-sensitivity label for every character.
   * Delegating the reducer to this pure method keeps registration concise while
   * preserving the incoming collection and character objects.
   * @param characters - Current character collection supplied by the reducer stage.
   * @returns A new collection whose characters display force sensitivity as Yes or No.
   */
  #deriveForceSensitiveDisplay(
    characters: readonly StarWarsCharacterState[]
  ): readonly StarWarsCharacterState[] {
    return characters.map((character) => ({
      ...character,
      forceSensitiveDisplay: character.isForceSensitive ? 'Yes' : 'No'
    }));
  }

  /**
   * Sends a complete character collection through `replaceState` and clears transient status fields.
   * @param characters - Read-only collection that should become the FeatureCell value.
   * @returns Nothing; the FeatureCell exposes the resulting value through reactive state.
   */
  #replaceCharacters(characters: readonly StarWarsCharacterState[]): void {
    this.#vault.replaceState({
      value: characters,
      loading: false,
      error: null
    });
  }
}
