// example.service.ts
import { inject, Injectable, Injector, signal } from '@angular/core';
import { type StepwiseBehaviorDecisionShape } from '@sdux-vault/addons';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { filter, take } from 'rxjs';
import {
  cloneCharacters,
  createCharacterState,
  deriveForceSensitiveDisplay,
  deriveFullName,
  getNextCharacterId,
  type StarWarsCharacterDraft,
  withCharactersSortedByLastName
} from './example.character-domain';
import { removeUnknownLastNameFilter } from './example.filter';
import { exampleHydrate } from './example.hydrate';
import type { StarWarsCharacter } from './star-wars-character.shape';

/** Values exposed while a Resolve-stage candidate awaits a tutorial decision. */
/** Teaching Point: ex-038 */
export interface StepwiseResolveRequest {
  /** Last value committed before the pending pipeline attempt began. */
  readonly current: StarWarsCharacter[] | undefined;

  /** Fully resolved pre-filter candidate waiting for an explicit continue or block decision. */
  readonly candidate: StarWarsCharacter[];
}

/** Values exposed while a filtered candidate awaits a tutorial decision. */
/** Teaching Point: ex-039 */
export interface StepwiseFilterRequest {
  /** Last value committed before the pending pipeline attempt began. */
  readonly current: StarWarsCharacter[] | undefined;

  /** Candidate produced by the Filter stage and awaiting policy approval. */
  readonly candidate: StarWarsCharacter[];
}

/** Values exposed while a reduced candidate awaits a tutorial decision. */
/** Teaching Point: ex-040 */
export interface StepwiseReducerRequest {
  /** Last value committed before the pending pipeline attempt began. */
  readonly current: StarWarsCharacter[] | undefined;

  /** Candidate produced by all reducers and awaiting policy approval. */
  readonly candidate: StarWarsCharacter[];
}

// Teaching point: CRUD Foundation (ex-007)
/**
 * Owns the character collection and exposes domain operations for the tutorial component.
 * The FeatureCell decorator associates this service with a typed state boundary, while
 * `injectVault` provides the reactive state and update methods for that boundary.
 * Create, update, remove, and restore operations all flow through the FeatureCell pipeline.
 * ️**Architectural Boundary:** Components consume this service instead of accessing the
 * FeatureCell directly, keeping state ownership and character rules in one place.
 */
@FeatureCell<StarWarsCharacter[]>('star-wars-character')
@Injectable({ providedIn: 'root' })
export class ExampleService {
  /**
   * Provides the strongly typed FeatureCell API associated with this decorated service.
   * Every collection update passes through this reference before reactive state changes.
   */
  readonly #vault = injectVault<StarWarsCharacter[]>(ExampleService);

  /** Supplies the Angular injection context required to create an HTTP resource. */
  readonly #injector = inject(Injector);

  /**
   * Stores a detached copy of the first resolved character collection.
   * Restore operations use this baseline instead of any later edited state.
   */
  #initialCharacters: StarWarsCharacter[] = [];

  /**
   * Tracks the identity assigned to the next newly created character.
   * Initialization advances it beyond the largest ID in the initial collection.
   */
  #nextCharacterId = 1;

  /** Retains the latest Resolve-stage comparison shown by the tutorial. */
  /** Teaching Point: ex-038 */
  readonly #stepwiseResolveRequest = signal<StepwiseResolveRequest | undefined>(
    undefined
  );

  // Teaching point: Stepwise Resolve (ex-038)
  /** Exposes the current and candidate values supplied to the Stepwise callback. */
  /** Teaching Point: ex-038 */
  readonly stepwiseResolveRequest = this.#stepwiseResolveRequest.asReadonly();

  /** Tracks whether the active callback is waiting for a user decision. */
  /** Teaching Point: ex-038 */
  readonly #isStepwiseResolvePending = signal(false);

  /** Enables the Accept and Cancel controls only while a callback is suspended. */
  /** Teaching Point: ex-038 */
  readonly isStepwiseResolvePending =
    this.#isStepwiseResolvePending.asReadonly();

  /** Holds the one-use decision functions for the active Stepwise request. */
  /** Teaching Point: ex-038 */
  #stepwiseResolveDecisions: StepwiseBehaviorDecisionShape | undefined;

  /**
   * Suspends the Resolve stage and publishes both callback values for inspection.
   * The pipeline remains paused until the component delegates either an Accept
   * (`continue`) or Cancel (`block`) decision back to this service.
   */
  /** Teaching Point: ex-038 */
  readonly #captureStepwiseResolve = (
    current: StarWarsCharacter[] | undefined,
    candidate: StarWarsCharacter[],
    decisions: StepwiseBehaviorDecisionShape
  ): void => {
    this.#stepwiseResolveRequest.set({ current, candidate });
    this.#stepwiseResolveDecisions = decisions;
    this.#isStepwiseResolvePending.set(true);
  };

  /** Retains the latest filtered candidate comparison shown by the tutorial. */
  /** Teaching Point: ex-039 */
  readonly #stepwiseFilterRequest = signal<StepwiseFilterRequest | undefined>(
    undefined
  );

  // Teaching point: Stepwise Filter (ex-039)
  /** Exposes the current and filtered candidate values supplied to the callback. */
  /** Teaching Point: ex-039 */
  readonly stepwiseFilterRequest = this.#stepwiseFilterRequest.asReadonly();

  /** Tracks whether the Filter-stage callback is waiting for a user decision. */
  /** Teaching Point: ex-039 */
  readonly #isStepwiseFilterPending = signal(false);

  /** Enables the Filter Accept and Cancel controls only while the stage is suspended. */
  /** Teaching Point: ex-039 */
  readonly isStepwiseFilterPending = this.#isStepwiseFilterPending.asReadonly();

  /** Holds the one-use decision functions for the active Filter-stage request. */
  /** Teaching Point: ex-039 */
  #stepwiseFilterDecisions: StepwiseBehaviorDecisionShape | undefined;

  /**
   * Suspends the filtered candidate and publishes both callback values for inspection.
   * The pipeline remains paused until the component delegates an explicit decision.
   */
  /** Teaching Point: ex-039 */
  readonly #captureStepwiseFilter = (
    current: StarWarsCharacter[] | undefined,
    candidate: StarWarsCharacter[],
    decisions: StepwiseBehaviorDecisionShape
  ): void => {
    this.#stepwiseFilterRequest.set({ current, candidate });
    this.#stepwiseFilterDecisions = decisions;
    this.#isStepwiseFilterPending.set(true);
  };

  /** Retains the latest reduced candidate comparison shown by the tutorial. */
  /** Teaching Point: ex-040 */
  readonly #stepwiseReducerRequest = signal<StepwiseReducerRequest | undefined>(
    undefined
  );

  // Teaching point: Stepwise Reducer (ex-040)
  /** Exposes the current and reduced candidate values supplied to the callback. */
  /** Teaching Point: ex-040 */
  readonly stepwiseReducerRequest = this.#stepwiseReducerRequest.asReadonly();

  /** Tracks whether the Reducer-stage callback is waiting for a user decision. */
  /** Teaching Point: ex-040 */
  readonly #isStepwiseReducerPending = signal(false);

  /** Enables Reducer controls only while the stage is suspended. */
  /** Teaching Point: ex-040 */
  readonly isStepwiseReducerPending =
    this.#isStepwiseReducerPending.asReadonly();

  /** Holds the one-use decision functions for the active Reducer-stage request. */
  /** Teaching Point: ex-040 */
  #stepwiseReducerDecisions: StepwiseBehaviorDecisionShape | undefined;

  /**
   * Suspends the reduced candidate and publishes both callback values for inspection.
   * The pipeline remains paused until the component delegates an explicit decision.
   */
  /** Teaching Point: ex-040 */
  readonly #captureStepwiseReducer = (
    current: StarWarsCharacter[] | undefined,
    candidate: StarWarsCharacter[],
    decisions: StepwiseBehaviorDecisionShape
  ): void => {
    this.#stepwiseReducerRequest.set({ current, candidate });
    this.#stepwiseReducerDecisions = decisions;
    this.#isStepwiseReducerPending.set(true);
  };

  // Teaching point: Raw StateSnapshot (ex-016)
  /**
   * Exposes the FeatureCell's Angular signal state for value, loading, error, and presence checks.
   * Consumers can bind to these reactive accessors without subscribing manually.
   */
  /** Teaching Point: ex-016 */
  readonly state = this.#vault.state;

  // Teaching point: Raw StateSnapshot$ (ex-017)
  /**
   * Exposes committed FeatureCell snapshots for consumers that teach observable state access.
   * Each emission carries the same state value available through the Angular signal API.
   */
  /** Teaching Point: ex-017 */
  readonly state$ = this.#vault.state$;

  /**
   * Captures the first committed collection, then configures and initializes the FeatureCell pipeline.
   */
  constructor() {
    this.#captureInitialCharacters();

    /*
     * `.hydrate()` registers a deferred factory as the authoritative source for
     * this FeatureCell's initial State. The factory is declared before
     * `.initialize()` but does not execute until initialization begins.
     *
     * Resolving the Promise sends the hydrated collection through the complete
     * Replace → Resolve → Filter → Tap → Reducer → Emit pipeline. Rejecting it
     * emits an initialization Error without falling back to configured initial
     * State or persistence because hydration has the highest precedence.
     */
    this.#vault.hydrate(() => exampleHydrate.getPromise());

    // Teaching point: Stepwise Resolve (ex-038)
    /*
     * `.withStepwiseResolve()` installs an explicit approval boundary at the
     * Resolve stage. Its `StepwiseFunction` receives the last committed State,
     * the fully resolved candidate, and a one-use decision contract.
     *
     * This callback deliberately makes no immediate decision. It publishes both
     * values for inspection and leaves the pipeline suspended until the tutorial
     * UI calls `continue()` through Accept or `block()` through Cancel. Exactly
     * one terminal decision is consumed for each pending request.
     */
    this.#vault.withStepwiseResolve!({
      stepwiseCallback: this.#captureStepwiseResolve
    });

    /*
     * `.filters()` registers `removeUnknownLastNameFilter` as a
     * `FilterFunction<readonly StarWarsCharacter[]>`.
     *
     * This pure function runs before reducers and returns a new candidate
     * collection without characters whose last name is exactly `unknown`.
     * The inline second filter normally returns that collection unchanged. When
     * the teaching flag is enabled, it throws deliberately so the example can show
     * pipeline error normalization without allowing the candidate to commit.
     */
    this.#vault.filters([removeUnknownLastNameFilter]);

    // Teaching point: Stepwise Filter (ex-039)
    /*
     * `.withStepwiseFilter()` installs a second explicit approval boundary
     * immediately after the Filter stage. Its `StepwiseFunction` receives the
     * last committed State, the already-filtered candidate, and the same
     * one-use decision contract demonstrated by Stepwise Resolve.
     *
     * The callback publishes its isolated inputs without mutating them. Accept
     * invokes `continue()` so reducers may process the filtered candidate;
     * Cancel invokes `block()` so the attempt ends without changing State.
     */
    this.#vault.withStepwiseFilter!({
      stepwiseCallback: this.#captureStepwiseFilter
    });

    /*
     * The first `.reducers()` entry is a delegating
     * `ReducerFunction<readonly StarWarsCharacter[]>`.
     *
     * After filtering, this imported pure function performs an immutable transformation
     * through `deriveForceSensitiveDisplay()`, producing a new collection in which
     * every retained character has a `Yes` or `No` display value.
     */

    /*
     * The second entry uses a factory-generated pure reducer, a different function
     * pattern that still returns the same `ReducerFunction` contract.
     *
     * It runs after Reducer 1, clones the transformed collection, and sorts characters
     * alphabetically by `lastName` without mutating the incoming array.
     */

    /*
     * The third entry is another delegating pure reducer.
     *
     * It runs after sorting and derives a display-ready `fullName` from the existing
     * `name` and `lastName` fields so every view can reuse the same post-pipeline label.
     */
    this.#vault.reducers([
      deriveForceSensitiveDisplay,
      withCharactersSortedByLastName(),
      deriveFullName
    ]);

    /*
     * `.withStepwiseReducer()` installs the final approval boundary after all
     * reducers have completed. Its `StepwiseFunction` receives the last committed
     * State and the fully reduced candidate, including the derived force display
     * values, deterministic last-name ordering, and display-ready full names
     * produced above.
     *
     * Accept invokes `continue()` so the reduced candidate may proceed toward
     * commitment; Cancel invokes `block()` so the attempt ends without replacing
     * the current State. The callback observes isolated inputs and mutates neither.
     */
    this.#vault.withStepwiseReducer!({
      stepwiseCallback: this.#captureStepwiseReducer
    });

    /*
     * `.initialize()` finalizes the pipeline configuration and activates the
     * FeatureCell. Its initial value and subsequent updates now pass through the
     * registered Filter → Before Tap → Reducer → After Tap stages before becoming committed
     * reactive State, which is then observed by the State Emission callback.
     */
    this.#vault.initialize();
  }

  #captureInitialCharacters(): void {
    this.#vault.state$
      .pipe(
        filter(({ snapshot }) => snapshot.hasValue),
        take(1)
      )
      .subscribe(({ snapshot }) => {
        this.#initialCharacters = cloneCharacters(snapshot.value ?? []);
        this.#nextCharacterId = getNextCharacterId(this.#initialCharacters);
      });
  }

  /**
   * Accepts the active Resolve-stage candidate and resumes its pipeline.
   * A call made without a pending callback is safely ignored.
   */
  /** Teaching point: Accept Stepwise Resolve (ex-038) */
  acceptStepwiseResolve(): void {
    this.#completeStepwiseResolve('continue');
  }

  /**
   * Cancels the active Resolve-stage candidate while preserving committed State.
   * A call made without a pending callback is safely ignored.
   */
  /** Teaching point: Accept Stepwise Resolve (ex-038) */
  cancelStepwiseResolve(): void {
    this.#completeStepwiseResolve('block');
  }

  /** Accepts the active filtered candidate and allows reducers to continue. */
  /** Teaching point: Accept Stepwise Filter (ex-039) */
  acceptStepwiseFilter(): void {
    this.#completeStepwiseFilter('continue');
  }

  /** Cancels the active filtered candidate while preserving committed State. */
  /** Teaching point: Cancel Stepwise Filter (ex-039) */
  cancelStepwiseFilter(): void {
    this.#completeStepwiseFilter('block');
  }

  /** Accepts the fully reduced candidate and allows commitment to continue. */
  /** Teaching point: Accept Stepwise Reducer (ex-040) */
  acceptStepwiseReducer(): void {
    this.#completeStepwiseReducer('continue');
  }

  /** Cancels the fully reduced candidate while preserving committed State. */
  /** Teaching point: Cancel Stepwise Reducer (ex-040) */
  cancelStepwiseReducer(): void {
    this.#completeStepwiseReducer('block');
  }

  /** Consumes exactly one pending decision before allowing another request. */
  /** Teaching point: Complete Stepwise Resolve (ex-038) */
  #completeStepwiseResolve(decision: 'continue' | 'block'): void {
    const decisions = this.#stepwiseResolveDecisions;

    if (!decisions) {
      return;
    }

    this.#stepwiseResolveDecisions = undefined;
    this.#isStepwiseResolvePending.set(false);
    decisions[decision]();
  }

  /** Consumes exactly one pending Filter-stage decision. */
  /** Teaching point: Complete Stepwise Filter (ex-039) */
  #completeStepwiseFilter(decision: 'continue' | 'block'): void {
    const decisions = this.#stepwiseFilterDecisions;

    if (!decisions) {
      return;
    }

    this.#stepwiseFilterDecisions = undefined;
    this.#isStepwiseFilterPending.set(false);
    decisions[decision]();
  }

  /** Teaching point: Complete Stepwise Reducer (ex-040) */
  /** Consumes exactly one pending Reducer-stage decision. */
  #completeStepwiseReducer(decision: 'continue' | 'block'): void {
    const decisions = this.#stepwiseReducerDecisions;

    if (!decisions) {
      return;
    }

    this.#stepwiseReducerDecisions = undefined;
    this.#isStepwiseReducerPending.set(false);
    decisions[decision]();
  }

  // Teaching point: Create (ex-009)
  /**
   * Assigns an ID and sends the new character through `mergeState` as a one-item array.
   * The configured array-append merge behavior adds that item while preserving existing characters.
   * @param draft - Editable character fields collected from the component form.
   * @returns The character submitted to the FeatureCell with its assigned ID.
   */
  createCharacter(draft: StarWarsCharacterDraft): StarWarsCharacter {
    const character = createCharacterState(this.#nextCharacterId++, draft);

    this.#vault.mergeState({
      value: [character]
    });

    return character;
  }

  // Teaching point: Create / Update (ex-010)
  /**
   * Builds a replacement character and maps it into the latest collection through `replaceState`.
   * A matching ID is replaced while every other character retains its existing value.
   * @param id - Identity of the character to replace.
   * @param changes - Complete editable fields that should accompany the preserved identity.
   * @returns The replacement character submitted to the FeatureCell.
   */
  updateCharacter(
    id: number,
    changes: StarWarsCharacterDraft
  ): StarWarsCharacter {
    const updatedCharacter = createCharacterState(id, changes);

    this.#vault.replaceState({
      value: () =>
        this.#vault.state
          .value()
          ?.map((character) =>
            character.id === id ? updatedCharacter : character
          )
    });

    return updatedCharacter;
  }

  // Teaching point: Remove (ex-006)
  /**
   * Filters the requested identity from the latest collection through `replaceState`.
   * An unknown ID leaves the visible collection unchanged.
   * @param id - Identity of the character to remove.
   * @returns Nothing; consumers observe the resulting collection through `characters`.
   */
  removeCharacter(id: number): void {
    this.#vault.replaceState({
      value: () =>
        this.#vault.state.value()?.filter((character) => character.id !== id) ??
        []
    });
  }

  // Teaching point: Reset (ex-021)
  /**
   * Resets the FeatureCell through its dedicated lifecycle API.
   * Consumers observe the cleared value as `undefined` through the reactive state APIs.
   * @returns Nothing; the FeatureCell performs the reset operation internally.
   */
  resetState(): void {
    this.#vault.reset();
  }

  // Teaching point: Restore (ex-022)
  /**
   * Clones the captured baseline and replaces the current FeatureCell collection with it.
   * Returning the first restored character lets the component restore its selection as well.
   * @returns The first restored character, or `null` when the initial collection was empty.
   */
  restoreInitialCharacters(): StarWarsCharacter | null {
    const initialCharacters = cloneCharacters(this.#initialCharacters);

    this.#vault.replaceState({
      value: initialCharacters
    });

    return initialCharacters[0] ?? null;
  }
}
