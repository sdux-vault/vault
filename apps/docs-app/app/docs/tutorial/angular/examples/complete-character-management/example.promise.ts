import type {
  RawStarWarsCharacter,
  StarWarsCharacter
} from './star-wars-character.shape';

/** Raw characters returned by the tutorial's simulated asynchronous request. */
const PROMISE_CHARACTERS: readonly RawStarWarsCharacter[] = [
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
type CharacterResolver = (characters: readonly StarWarsCharacter[]) => void;

/** Rejects the pending request with its simulated failure. */
type CharacterRejecter = (reason: Error) => void;

/**
 * Coordinates one manually resolved Promise for the Promise teaching example.
 * The singleton separates creation of the pending Promise from the user action
 * that resolves it, making the FeatureCell loading interval visible in the UI.
 */
class ExamplePromise {
  /** Reuses the active Promise when the request has already started. */
  #pendingPromise: Promise<readonly StarWarsCharacter[]> | null = null;

  /** Holds the native Promise resolver until the simulated request completes. */
  #resolveCharacters: CharacterResolver | null = null;

  /** Holds the native Promise rejecter until the simulated request completes. */
  #rejectCharacters: CharacterRejecter | null = null;

  /**
   * Creates or returns the request that the FeatureCell Promise stage will await.
   * @returns The active Promise for the simulated character response.
   */
  getPromise(): Promise<readonly StarWarsCharacter[]> {
    if (!this.#pendingPromise) {
      this.#pendingPromise = new Promise((resolve, reject) => {
        this.#resolveCharacters = resolve;
        this.#rejectCharacters = reject;
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

      this.#clearPendingRequest();
      resolveCharacters(
        PROMISE_CHARACTERS.map((character) => ({ ...character }))
      );
    };
  }

  /**
   * Returns a controller-safe function for failing the active request.
   * Rejecting throws through the Promise Resolve stage so Vault can normalize
   * the error, preserve the current value, and complete the loading lifecycle.
   * @returns A zero-argument rejecter, or `null` before a Promise has been requested.
   */
  getReject(): (() => void) | null {
    const rejectCharacters = this.#rejectCharacters;

    if (!rejectCharacters) {
      return null;
    }

    return () => {
      if (this.#rejectCharacters !== rejectCharacters) {
        return;
      }

      this.#clearPendingRequest();
      rejectCharacters(new Error('The character request was rejected.'));
    };
  }

  /** Clears both terminal callbacks and releases the completed Promise. */
  #clearPendingRequest(): void {
    this.#resolveCharacters = null;
    this.#rejectCharacters = null;
    this.#pendingPromise = null;
  }
}

/** Shared coordinator used by the service and component for the Promise example. */
export const examplePromise = new ExamplePromise();
