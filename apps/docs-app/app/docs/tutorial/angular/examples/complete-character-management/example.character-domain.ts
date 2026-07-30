import type { ReducerFunction } from '@sdux-vault/shared';
import type { StarWarsCharacter } from './star-wars-character.shape';

/** Editable character fields accepted before application code assigns an ID. */
export type StarWarsCharacterDraft = Omit<StarWarsCharacter, 'id'>;

/** Characters cycled by the Changed State teaching action. */
const DISTINCT_CHANGED_STATE_CHARACTERS: readonly StarWarsCharacter[] = [
  {
    id: 601,
    name: 'Qui-Gon',
    lastName: 'Jinn',
    faction: 'Jedi Order',
    isForceSensitive: true
  },
  {
    id: 602,
    name: 'Plo',
    lastName: 'Koon',
    faction: 'Jedi Order',
    isForceSensitive: true
  },
  {
    id: 603,
    name: 'Aayla',
    lastName: 'Secura',
    faction: 'Jedi Order',
    isForceSensitive: true
  },
  {
    id: 604,
    name: 'Kit',
    lastName: 'Fisto',
    faction: 'Jedi Order',
    isForceSensitive: true
  }
];

/** Creates a character without mutating the supplied draft. */
export function createCharacterState(
  id: number,
  draft: StarWarsCharacterDraft
): StarWarsCharacter {
  return { id, ...draft };
}

/** Produces a detached collection and detached character objects. */
export function cloneCharacters(
  characters: readonly StarWarsCharacter[]
): readonly StarWarsCharacter[] {
  return characters.map((character) => ({ ...character }));
}

/** Returns the first integer ID greater than every identity in the collection. */
export function getNextCharacterId(
  characters: readonly StarWarsCharacter[]
): number {
  return Math.max(...characters.map(({ id }) => id), 0) + 1;
}

/** Derives display-friendly force sensitivity labels without mutating the input. */
export function deriveForceSensitiveDisplay(
  characters: readonly StarWarsCharacter[]
): readonly StarWarsCharacter[] {
  return characters.map((character) => ({
    ...character,
    forceSensitiveDisplay: character.isForceSensitive ? 'Yes' : 'No'
  }));
}

/** Creates a pure reducer that orders a cloned collection by last name. */
export function withCharactersSortedByLastName(): ReducerFunction<
  readonly StarWarsCharacter[]
> {
  return (characters) =>
    [...characters].sort((left, right) =>
      left.lastName.localeCompare(right.lastName)
    );
}

/** Returns the current Changed State character and the wrapped next index. */
export function getDistinctChangedStateCharacter(index: number): {
  readonly character: StarWarsCharacter;
  readonly nextIndex: number;
} {
  const normalizedIndex =
    ((index % DISTINCT_CHANGED_STATE_CHARACTERS.length) +
      DISTINCT_CHANGED_STATE_CHARACTERS.length) %
    DISTINCT_CHANGED_STATE_CHARACTERS.length;

  return {
    character: { ...DISTINCT_CHANGED_STATE_CHARACTERS[normalizedIndex]! },
    nextIndex: (normalizedIndex + 1) % DISTINCT_CHANGED_STATE_CHARACTERS.length
  };
}
