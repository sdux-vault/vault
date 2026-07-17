import type { StarWarsCharacterState } from './star-wars-character.state';

export const STAR_WARS_CHARACTERS: readonly StarWarsCharacterState[] = [
  {
    id: 1,
    name: 'Luke',
    lastName: 'Skywalker',
    faction: 'Rebel Alliance',
    isJedi: true
  },
  {
    id: 2,
    name: 'Leia',
    lastName: 'Organa',
    faction: 'Rebel Alliance',
    isJedi: false
  },
  {
    id: 3,
    name: 'Darth',
    lastName: 'Vader',
    faction: 'Galactic Empire',
    isJedi: false
  },
  {
    id: 4,
    name: 'Obi-Wan',
    lastName: 'Kenobi',
    faction: 'Jedi Order',
    isJedi: true
  }
];
