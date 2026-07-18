// example.filter.ts
import { FilterFunction } from '@sdux-vault/shared';
import { StarWarsCharacterState } from '../../../examples/star-wars-character.state';

/**
 * Removes characters whose last name is exactly `"unknown"` without mutating the candidate collection.
 * @param characters - Candidate character collection entering the Filter stage.
 * @returns A new collection containing every character with a known last name.
 */
export const removeUnknownLastNameFilter: FilterFunction<
  readonly StarWarsCharacterState[]
> = (characters) => characters.filter(({ lastName }) => lastName !== 'unknown');
