import { Injectable } from '@angular/core';
import { withDistinctUntilChanged } from '@sdux-vault/addons';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import {
  createCharacterState,
  deriveForceSensitiveDisplay,
  deriveFullName,
  getDistinctChangedStateCharacter,
  getNextCharacterId,
  withCharactersSortedByLastName,
  type StarWarsCharacterDraft
} from './example.character-domain';
import { removeUnknownLastNameFilter } from './example.filter';
import type {
  RawStarWarsCharacter,
  StarWarsCharacter
} from './star-wars-character.shape';

/** Structurally identical merge delta reconstructed for every Same State request. */
/** Teaching Point: ex-027 */
const DISTINCT_SAME_STATE_CHARACTER: RawStarWarsCharacter = {
  id: 501,
  name: 'Rey',
  lastName: 'Skywalker',
  faction: 'Jedi Order',
  isForceSensitive: true
};

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
     * `.operators()` installs a domain-specific Distinct Until Changed comparator
     * at the Operator stage. Array Append Merge has already materialized the full
     * candidate, so the callback compares stable character identities without relying
     * on array position. A candidate containing no new IDs returns `VAULT_NOOP`, even
     * when a downstream reducer sorted the previously committed collection.
     */
    this.#vault.operators([
      withDistinctUntilChanged<readonly StarWarsCharacter[]>(
        (incoming, previous) =>
          incoming.every(({ id }) =>
            previous.some((character) => character.id === id)
          )
      )
    ]);

    /*
     * `.initialize()` finalizes the pipeline configuration and activates the
     * FeatureCell. Its initial value and subsequent updates now pass through the
     * registered Filter → Before Tap → Reducer → After Tap stages before becoming committed
     * reactive State, which is then observed by the State Emission callback.
     */
    this.#vault.initialize();
  }

  /** Selects the next meaningful Distinct Until Changed replacement. */
  /** Teaching Point: ex-027 */
  #distinctChangedStateIndex = 0;

  /**
   * Reconstructs the same character and submits it through `mergeState`.
   * Array Append Merge combines each newly allocated Rey with current State before
   * the Operator stage. The identity comparison accepts the first candidate and
   * suppresses later candidates that introduce no previously unseen character ID.
   * @returns Nothing; consumers observe the first accepted merged collection reactively.
   */
  submitSameState(): void {
    this.#vault.mergeState([{ ...DISTINCT_SAME_STATE_CHARACTER }]);
  }

  // Teaching point: Distinct Until Changed (ex-027)
  /**
   * Merges the next Jedi into State in a deterministic four-character cycle.
   * Modulo arithmetic advances the index and wraps it to zero after the fourth
   * request. Array Append Merge materializes the complete collection before the
   * Operator accepts new identities and suppresses identities already in State.
   * @returns Nothing; consumers observe accepted merged collections reactively.
   */
  submitChangedState(): void {
    const { character, nextIndex } = getDistinctChangedStateCharacter(
      this.#distinctChangedStateIndex
    );

    this.#distinctChangedStateIndex = nextIndex;

    this.#vault.mergeState([character]);
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
