import { StarWarsCharacterState } from '../../../examples/star-wars-character.state';

/** Characters returned by the tutorial's simulated asynchronous request. */
const PROMISE_CHARACTERS: readonly StarWarsCharacterState[] = [
  {
    id: 101,
    name: 'Ahsoka',
    lastName: 'Tano',
    faction: 'Jedi Order',
    isForceSensitive: true
  },
  {
    id: 102,
    name: 'Din',
    lastName: 'Djarin',
    faction: 'Unaffiliated',
    isForceSensitive: false
  },
  {
    id: 103,
    name: 'Grogu',
    lastName: 'unknown',
    faction: 'Jedi Order',
    isForceSensitive: true
  }
];

/** Resolves the pending request with its character collection. */
type CharacterResolver = (
  characters: readonly StarWarsCharacterState[]
) => void;

/**
 * Coordinates one manually resolved Promise for the Promise teaching example.
 * The singleton separates creation of the pending Promise from the user action
 * that resolves it, making the FeatureCell loading interval visible in the UI.
 */
class ExamplePromise {
  /** Reuses the active Promise when the request has already started. */
  #pendingPromise: Promise<readonly StarWarsCharacterState[]> | null = null;

  /** Holds the native Promise resolver until the simulated request completes. */
  #resolveCharacters: CharacterResolver | null = null;

  /**
   * Creates or returns the request that the FeatureCell Promise stage will await.
   * @returns The active Promise for the simulated character response.
   */
  getPromise(): Promise<readonly StarWarsCharacterState[]> {
    if (!this.#pendingPromise) {
      this.#pendingPromise = new Promise((resolve) => {
        this.#resolveCharacters = resolve;
      });
    }

    return this.#pendingPromise;
  }

  /**
   * Returns a controller-safe function for completing the active request.
   * The returned closure is idempotent and clears the singleton for the next request.
   * @returns A zero-argument resolver, or `null` before a Promise has been requested.
   */
  getResolve(): (() => void) | null {
    const resolveCharacters = this.#resolveCharacters;

    if (!resolveCharacters) {
      return null;
    }

    return () => {
      if (this.#resolveCharacters !== resolveCharacters) {
        return;
      }

      this.#resolveCharacters = null;
      this.#pendingPromise = null;
      resolveCharacters(
        PROMISE_CHARACTERS.map((character) => ({ ...character }))
      );
    };
  }
}

/** Shared coordinator used by the service and component for the Promise example. */
export const examplePromise = new ExamplePromise();
