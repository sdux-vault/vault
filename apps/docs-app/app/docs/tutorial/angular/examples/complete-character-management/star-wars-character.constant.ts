import type { StarWarsCharacter } from './star-wars-character.shape';

export const STAR_WARS_CHARACTERS: readonly StarWarsCharacter[] = [
  {
    id: 1,
    name: 'Luke',
    lastName: 'Skywalker',
    faction: 'Rebel Alliance',
    isForceSensitive: true
  },
  {
    id: 2,
    name: 'Leia',
    lastName: 'Organa',
    faction: 'Rebel Alliance',
    isForceSensitive: false
  },
  {
    id: 3,
    name: 'Darth',
    lastName: 'Vader',
    faction: 'Galactic Empire',
    isForceSensitive: false
  },
  {
    id: 4,
    name: 'Obi-Wan',
    lastName: 'Kenobi',
    faction: 'Jedi Order',
    isForceSensitive: true
  },
  {
    id: 5,
    name: 'Chewbacca',
    lastName: 'unknown',
    faction: 'Rebel Alliance',
    isForceSensitive: false
  }
];
