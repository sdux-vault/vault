import type {
  RawStarWarsCharacter,
  StarWarsCharacter
} from './star-wars-character.shape';

/** Raw characters supplied by the tutorial's authoritative hydration source. */
const HYDRATED_CHARACTERS: readonly RawStarWarsCharacter[] = [
  {
    id: 301,
    name: 'Cal',
    lastName: 'Kestis',
    faction: 'Jedi Order',
    isForceSensitive: true
  },
  {
    id: 302,
    name: 'Jyn',
    lastName: 'Erso',
    faction: 'Rebel Alliance',
    isForceSensitive: false
  },
  {
    id: 303,
    name: 'Bo-Katan',
    lastName: 'Kryze',
    faction: 'Mandalorians',
    isForceSensitive: false
  },
  {
    id: 304,
    name: 'Mace',
    lastName: 'Windu',
    faction: 'Jedi Order',
    isForceSensitive: true
  },
  {
    id: 305,
    name: 'BB-8',
    lastName: 'unknown',
    faction: 'Resistance',
    isForceSensitive: false
  }
];

/** Resolves the pending hydration with its authoritative character collection. */
type CharacterResolver = (characters: StarWarsCharacter[]) => void;

/** Rejects the pending hydration with its simulated initialization failure. */
type CharacterRejecter = (reason: Error) => void;

/**
 * Coordinates the manually settled Promise used by the hydration teaching example.
 * The singleton lets the service register one deferred initialization source while
 * the component controls whether that authoritative source resolves or rejects.
 */
class ExampleHydrate {
  /** Reuses the hydration Promise requested during the active initialization cycle. */
  #pendingPromise: Promise<StarWarsCharacter[]> | null = null;

  /** Holds the native resolver until hydration completes successfully. */
  #resolveCharacters: CharacterResolver | null = null;

  /** Holds the native rejecter until hydration terminates with an Error. */
  #rejectCharacters: CharacterRejecter | null = null;

  /**
   * Creates or returns the deferred source that `hydrate()` evaluates during `initialize()`.
   * @returns The active Promise for the authoritative initial character State.
   */
  getPromise(): Promise<StarWarsCharacter[]> {
    if (!this.#pendingPromise) {
      this.#pendingPromise = new Promise((resolve, reject) => {
        this.#resolveCharacters = resolve;
        this.#rejectCharacters = reject;
      });
    }

    return this.#pendingPromise;
  }

  /**
   * Returns a controller-safe function that successfully completes hydration once.
   * The resolved collection is cloned so the pipeline receives detached teaching data.
   * @returns A zero-argument resolver, or `null` before hydration has started.
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
        HYDRATED_CHARACTERS.map((character) => ({ ...character }))
      );
    };
  }

  /**
   * Returns a controller-safe function that fails the authoritative source once.
   * The rejection enters Vault's initialization Error lifecycle without consulting
   * configured initial State or persistence as a fallback.
   * @returns A zero-argument rejecter, or `null` before hydration has started.
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
      rejectCharacters(new Error('The character hydration was rejected.'));
    };
  }

  /** Releases the completed Promise and both terminal controllers. */
  #clearPendingRequest(): void {
    this.#resolveCharacters = null;
    this.#rejectCharacters = null;
    this.#pendingPromise = null;
  }
}

/** Shared coordinator used by the service and component for the hydration example. */
export const exampleHydrate = new ExampleHydrate();
