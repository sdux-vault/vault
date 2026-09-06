// star-wars-character.shape.ts

// Defines the raw pre-reducer State contract for a Star Wars character.
export interface RawStarWarsCharacter {
  /** Unique identifier for the character. */
  id: number;

  /** First name of the character. */
  name: string;

  /** Last name of the character. */
  lastName: string;

  /** Faction associated with the character. */
  faction: string;

  /** Indicates whether the character is force-sensitive. */
  isForceSensitive: boolean;
}

// Defines the display-only fields derived by the reducer stage.
export interface StarWarsCharacterDisplayFields {
  /** Full name derived from the raw `name` and `lastName` fields. */
  fullName: string;

  /** Translated display value for force-sensitive status. */
  forceSensitiveDisplay: string;
}

// Defines the committed tutorial State contract, which may include reducer-derived display fields.
export type StarWarsCharacter = RawStarWarsCharacter &
  Partial<StarWarsCharacterDisplayFields>;
