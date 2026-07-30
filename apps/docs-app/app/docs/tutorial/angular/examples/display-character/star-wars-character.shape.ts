// star-wars-character.shape.ts

// Defines the State contract for a Star Wars character.
export interface StarWarsCharacter {
  /** Unique identifier for the character. */
  id: number;

  /** First name of the character. */
  name: string;

  /** Last name of the character. */
  lastName: string;

  /** The First and last name of the character derived from a reducer. */
  fullName?: string;

  /** Faction associated with the character. */
  faction: string;

  /** Indicates whether the character is force-sensitive. */
  isForceSensitive: boolean;

  /** Translated display value for force-sensitive status. */
  forceSensitiveDisplay?: string;
}
