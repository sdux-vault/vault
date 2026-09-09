import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import {
  createCharacterState,
  getNextCharacterId,
  type StarWarsCharacterDraft
} from './example.character-domain';
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
   * Initializes the FeatureCell for the lifecycletutorial slice.
   */
  constructor() {
    /**
     * Initializes identifier-based array merge behavior.
     */
    this.#vault?.withArrayMergeId?.({ idKey: 'id' }).initialize();
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
   * Builds a replacement character and submits it through `mergeState`.
   * The configured array-by-ID merge behavior replaces a matching ID while every other character remains unchanged.
   * @param id - Identity of the character to replace.
   * @param changes - Complete editable fields that should accompany the preserved identity.
   * @returns The replacement character submitted to the FeatureCell.
   */
  updateCharacter(
    id: number,
    changes: StarWarsCharacterDraft
  ): StarWarsCharacter {
    const updatedCharacter = createCharacterState(id, changes);

    this.#vault.mergeState({
      value: [updatedCharacter]
    });

    return updatedCharacter;
  }

  /**
   * Submits the requested identity through `mergeState` with deletion enabled.
   * The configured array-by-ID merge behavior removes the matching record, while an unknown ID leaves the collection equivalent.
   * @param id - Identity of the character to remove.
   * @returns Nothing; consumers observe the resulting collection through `characters`.
   */
  removeCharacter(id: number): void {
    this.#vault.mergeState(
      {
        value: [{ id } as StarWarsCharacter]
      },
      { isDelete: true }
    );
  }

  /**
   * Permanently tears down the FeatureCell and releases its runtime resources.
   * Destruction completes its streams and prevents any further pipeline execution.
   * @returns Nothing; the FeatureCell lifecycle is permanently finalized.
   */
  destroyFeatureCell(): void {
    this.#vault.destroy();
  }

  /**
   * Resets the FeatureCell through its dedicated lifecycle API.
   * Consumers observe the cleared value as `undefined` through the reactive state APIs.
   * @returns Nothing; the FeatureCell performs the reset operation internally.
   */
  resetState(): void {
    this.#vault.reset();
  }

  /**
   * Persists `null` through `replaceState` to clear the FeatureCell's current value.
   * The resulting state value resolves to `undefined` for consumers of the read model.
   * @returns Nothing; consumers observe the cleared value through the reactive state APIs.
   */
  persistNullValue(): void {
    this.#vault.replaceState({ value: null });
  }
}
