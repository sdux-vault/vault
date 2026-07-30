import { Observable, ReplaySubject } from 'rxjs';
import type { StarWarsCharacter } from './star-wars-character.shape';

/** Characters emitted by the tutorial's simulated asynchronous source. */
const OBSERVABLE_CHARACTERS: readonly StarWarsCharacter[] = [
  {
    id: 201,
    name: 'Ezra',
    lastName: 'Bridger',
    faction: 'Jedi Order',
    isForceSensitive: true
  },
  {
    id: 202,
    name: 'Hera',
    lastName: 'Syndulla',
    faction: 'Rebel Alliance',
    isForceSensitive: false
  },
  {
    id: 203,
    name: 'R2-D2',
    lastName: 'unknown',
    faction: 'Rebel Alliance',
    isForceSensitive: false
  }
];

/** Emits or errors the pending Observable through its active Subject. */
type CharacterSubject = ReplaySubject<readonly StarWarsCharacter[]>;

/**
 * Coordinates one manually controlled Observable for the Observable teaching example.
 * The singleton separates creation of the pending Observable from the user action
 * that emits or errors it, making the asynchronous Resolve stage visible in the UI.
 */
class ExampleObservable {
  /** Reuses the active Observable until its Subject reaches a terminal state. */
  #pendingObservable: Observable<readonly StarWarsCharacter[]> | null = null;

  /** Holds the replaying Subject that controls the active Observable subscription. */
  #characterSubject: CharacterSubject | null = null;

  /**
   * Creates or returns the source that the FeatureCell Observable stage will await.
   * @returns The active Observable for the simulated character response.
   */
  getObservable(): Observable<readonly StarWarsCharacter[]> {
    if (!this.#pendingObservable) {
      this.#characterSubject = new ReplaySubject<readonly StarWarsCharacter[]>(
        1
      );
      this.#pendingObservable = this.#characterSubject.asObservable();
    }

    return this.#pendingObservable;
  }

  /**
   * Returns a controller-safe function for emitting the active response.
   * The returned closure is idempotent and completes the source for the next request.
   * @returns A zero-argument emitter, or `null` before an Observable has been requested.
   */
  getEmit(): (() => void) | null {
    const characterSubject = this.#characterSubject;

    if (!characterSubject) {
      return null;
    }

    return () => {
      if (this.#characterSubject !== characterSubject) {
        return;
      }

      this.#clearPendingRequest();
      characterSubject.next(
        OBSERVABLE_CHARACTERS.map((character) => ({ ...character }))
      );
      characterSubject.complete();
    };
  }

  /**
   * Returns a controller-safe function for erroring the active source.
   * The error travels through the Observable Resolve stage so Vault can normalize
   * it, preserve the current value, and finalize the pipeline error lifecycle.
   * @returns A zero-argument error controller, or `null` before an Observable is requested.
   */
  getError(): (() => void) | null {
    const characterSubject = this.#characterSubject;

    if (!characterSubject) {
      return null;
    }

    return () => {
      if (this.#characterSubject !== characterSubject) {
        return;
      }

      this.#clearPendingRequest();
      characterSubject.error(new Error('The character request was rejected.'));
    };
  }

  /** Clears the terminal controller and releases the completed Observable. */
  #clearPendingRequest(): void {
    this.#characterSubject = null;
    this.#pendingObservable = null;
  }
}

/** Shared coordinator used by the service and component for the Observable example. */
export const exampleObservable = new ExampleObservable();
