// star-wars-character.state.ts

// Defines the State contract for a Star Wars character.
export interface StarWarsCharacterState {
  /** Unique identifier for the character. */
  id: number;

  /** First name of the character. */
  name: string;

  /** Last name of the character. */
  lastName: string;

  /** Faction associated with the character. */
  faction: string;

  /** Indicates whether the character is a Jedi. */
  isJedi: boolean;
}
