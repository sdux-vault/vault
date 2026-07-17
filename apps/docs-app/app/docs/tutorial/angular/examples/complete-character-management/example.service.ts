// star-wars-character.service.ts
import { computed, Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { filter, take } from 'rxjs';
import { StarWarsCharacterState } from '../../../examples/star-wars-character.state';

export type StarWarsCharacterDraft = Omit<StarWarsCharacterState, 'id'>;

@FeatureCell<readonly StarWarsCharacterState[]>('star-wars-character')
@Injectable({ providedIn: 'root' })
export class ExampleService {
  readonly #vault =
    injectVault<readonly StarWarsCharacterState[]>(ExampleService);
  #initialCharacters: readonly StarWarsCharacterState[] = [];
  #nextCharacterId = 1;

  readonly state = this.#vault.state;
  readonly characters = computed<readonly StarWarsCharacterState[]>(
    () => this.state.value() ?? []
  );

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

    this.#vault.initialize();
  }

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

  removeCharacter(id: number): void {
    this.#vault.replaceState({
      value: () =>
        this.#vault.state.value()?.filter((character) => character.id !== id) ??
        [],
      loading: false,
      error: null
    });
  }

  restoreInitialCharacters(): StarWarsCharacterState | null {
    const initialCharacters = this.#initialCharacters.map((character) => ({
      ...character
    }));

    this.#replaceCharacters(initialCharacters);

    return initialCharacters[0] ?? null;
  }

  #replaceCharacters(characters: readonly StarWarsCharacterState[]): void {
    this.#vault.replaceState({
      value: characters,
      loading: false,
      error: null
    });
  }
}
