import type { StarWarsCharacterState } from '../../../examples/star-wars-character.state';
import {
  cloneCharacters,
  createCharacterState,
  deriveForceSensitiveDisplay,
  getDistinctChangedStateCharacter,
  getNextCharacterId,
  withCharactersSortedByLastName
} from './example.character-domain';

describe('Character domain', () => {
  const leia: StarWarsCharacterState = {
    id: 10,
    name: 'Leia',
    lastName: 'Organa',
    faction: 'Rebel Alliance',
    isForceSensitive: false
  };
  const luke: StarWarsCharacterState = {
    id: 20,
    name: 'Luke',
    lastName: 'Skywalker',
    faction: 'Jedi Order',
    isForceSensitive: true
  };

  it('should create a character without mutating its draft', () => {
    const draft = {
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    } as const;

    expect(createCharacterState(30, draft)).toEqual({ id: 30, ...draft });
    expect(draft).toEqual({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
  });

  it('should clone both the collection and its character objects', () => {
    const characters = [leia, luke] as const;
    const cloned = cloneCharacters(characters);

    expect(cloned).toEqual(characters);
    expect(cloned).not.toBe(characters);
    expect(cloned[0]).not.toBe(leia);
    expect(cloned[1]).not.toBe(luke);
  });

  it('should calculate the next character identity', () => {
    expect(getNextCharacterId([luke, leia])).toBe(21);
    expect(getNextCharacterId([])).toBe(1);
  });

  it('should derive force sensitivity labels without mutating the input', () => {
    const characters = [leia, luke] as const;
    const derived = deriveForceSensitiveDisplay(characters);

    expect(derived).toEqual([
      { ...leia, forceSensitiveDisplay: 'No' },
      { ...luke, forceSensitiveDisplay: 'Yes' }
    ]);
    expect(derived).not.toBe(characters);
    expect(derived[0]).not.toBe(leia);
    expect(characters).toEqual([leia, luke]);
  });

  it('should create a reducer that sorts a cloned collection by last name', () => {
    const characters = [luke, leia] as const;
    const sorted = withCharactersSortedByLastName()(characters);

    expect(sorted).toEqual([leia, luke]);
    expect(sorted).not.toBe(characters);
    expect(characters).toEqual([luke, leia]);
  });

  it('should cycle Changed State characters and return detached values', () => {
    const first = getDistinctChangedStateCharacter(0);
    const fourth = getDistinctChangedStateCharacter(3);
    const wrapped = getDistinctChangedStateCharacter(4);
    const negative = getDistinctChangedStateCharacter(-1);

    expect(first.character).toEqual(
      jasmine.objectContaining({ id: 601, lastName: 'Jinn' })
    );
    expect(first.nextIndex).toBe(1);
    expect(fourth.character).toEqual(
      jasmine.objectContaining({ id: 604, lastName: 'Fisto' })
    );
    expect(fourth.nextIndex).toBe(0);
    expect(wrapped.character).toEqual(first.character);
    expect(wrapped.character).not.toBe(first.character);
    expect(wrapped.nextIndex).toBe(1);
    expect(negative.character.id).toBe(604);
  });
});
