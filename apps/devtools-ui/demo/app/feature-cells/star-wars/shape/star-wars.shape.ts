/**
 * Shape representing a single example entity in the FeatureCell state.
 */
export interface StarWarsShape {
  /** Unique numeric identifier. */
  id: number;
  /** First name of the entity. */
  name: string;
  /** Last name of the entity. */
  lastName: string;
  /** Whether the entity is a Jedi; assigned by the reducer. */
  jedi?: boolean;
  /** Whether the entity is a senator; assigned by the reducer. */
  senator?: boolean;
  /** Whether the entity is a sith; assigned by the reducer. */
  sith?: boolean;
  /** If the entity is a sith add their previous name; assigned by the reducer. */
  previousName?: string;
}
