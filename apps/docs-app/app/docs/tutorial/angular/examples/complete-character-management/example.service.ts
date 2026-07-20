// example.service.ts
import { computed, inject, Injectable, Injector, signal } from '@angular/core';
import {
  type StepwiseBehaviorDecisionShape,
  withDistinctUntilChanged
} from '@sdux-vault/addons';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import type {
  CoreEmitStateCallback,
  ReducerFunction,
  StateSnapshotShape,
  TapCallback,
  VaultErrorCallback,
  VaultErrorShape
} from '@sdux-vault/shared';
import { filter, take } from 'rxjs';
import { StarWarsCharacterState } from '../../../examples/star-wars-character.state';
import { removeUnknownLastNameFilter } from './example.filter';
import { exampleHydrate } from './example.hydrate';
import { exampleHttpResource } from './example.http-resource';
import { exampleObservable } from './example.observable';
import { examplePromise } from './example.promise';

/**
 * Describes the editable character fields accepted before the service assigns an ID.
 * Omitting identity keeps component forms from choosing or changing the collection key.
 */
export type StarWarsCharacterDraft = Omit<StarWarsCharacterState, 'id'>;

/** Fixed Policy-stage hold applied to every tutorial pipeline attempt. */
export const EXAMPLE_DELAY_MILLISECONDS = 3_000;

/** Stable tutorial salt required to decrypt persisted State across reloads. */
export const EXAMPLE_AES256_SALT = new Uint8Array([
  0x53, 0x44, 0x75, 0x58, 0x2d, 0x56, 0x61, 0x75, 0x6c, 0x74, 0x2d, 0x54, 0x75,
  0x74, 0x6f, 0x72
]);

/** Namespaced key written by the Local Storage Persist behavior. */
export const EXAMPLE_ENCRYPTED_STORAGE_KEY =
  'vault::localstorage::star-wars-character::SDUX::Behavior::Persist::LocalStorage';

/** Structurally identical merge delta reconstructed for every Same State request. */
const DISTINCT_SAME_STATE_CHARACTER: StarWarsCharacterState = {
  id: 501,
  name: 'Rey',
  lastName: 'Skywalker',
  faction: 'Jedi Order',
  isForceSensitive: true
};

/** Four meaningful merge deltas cycled by the Changed State teaching action. */
const DISTINCT_CHANGED_STATE_CHARACTERS: readonly StarWarsCharacterState[] = [
  {
    id: 601,
    name: 'Qui-Gon',
    lastName: 'Jinn',
    faction: 'Jedi Order',
    isForceSensitive: true
  },
  {
    id: 602,
    name: 'Plo',
    lastName: 'Koon',
    faction: 'Jedi Order',
    isForceSensitive: true
  },
  {
    id: 603,
    name: 'Aayla',
    lastName: 'Secura',
    faction: 'Jedi Order',
    isForceSensitive: true
  },
  {
    id: 604,
    name: 'Kit',
    lastName: 'Fisto',
    faction: 'Jedi Order',
    isForceSensitive: true
  }
];

/** Inputs observed by the tutorial's finalized error callback. */
interface ErrorEmission {
  /** Normalized Vault error committed by the Error stage. */
  readonly error: VaultErrorShape;

  /** Immutable FeatureCell snapshot associated with the finalized error. */
  readonly state: Readonly<
    StateSnapshotShape<readonly StarWarsCharacterState[]>
  >;
}

/** Values exposed while a Resolve-stage candidate awaits a tutorial decision. */
export interface StepwiseResolveRequest {
  /** Last value committed before the pending pipeline attempt began. */
  readonly current: readonly StarWarsCharacterState[] | undefined;

  /** Fully resolved candidate waiting for an explicit continue or block decision. */
  readonly candidate: readonly StarWarsCharacterState[];
}

/** Values exposed while a filtered candidate awaits a tutorial decision. */
export interface StepwiseFilterRequest {
  /** Last value committed before the pending pipeline attempt began. */
  readonly current: readonly StarWarsCharacterState[] | undefined;

  /** Candidate produced by the Filter stage and awaiting policy approval. */
  readonly candidate: readonly StarWarsCharacterState[];
}

/** Values exposed while a reduced candidate awaits a tutorial decision. */
export interface StepwiseReducerRequest {
  /** Last value committed before the pending pipeline attempt began. */
  readonly current: readonly StarWarsCharacterState[] | undefined;

  /** Candidate produced by all reducers and awaiting policy approval. */
  readonly candidate: readonly StarWarsCharacterState[];
}

/**
 * Creates a pure reducer that orders characters alphabetically by last name.
 * Returning the reducer from a factory demonstrates reusable pipeline configuration while the
 * cloned array preserves the immutable collection received from the previous reducer.
 * @returns A ReducerFunction that produces a newly sorted character collection.
 */
export function withCharactersSortedByLastName(): ReducerFunction<
  readonly StarWarsCharacterState[]
> {
  return (characters) =>
    [...characters].sort((left, right) =>
      left.lastName.localeCompare(right.lastName)
    );
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
@FeatureCell<readonly StarWarsCharacterState[]>('star-wars-character')
@Injectable({ providedIn: 'root' })
export class ExampleService {
  // Teaching point: Minimal Read-Only FeatureCell (ex-002)
  /**
   * Provides the strongly typed FeatureCell API associated with this decorated service.
   * Every collection update passes through this reference before reactive state changes.
   */
  readonly #vault =
    injectVault<readonly StarWarsCharacterState[]>(ExampleService);

  /** Supplies the Angular injection context required to create an HTTP resource. */
  readonly #injector = inject(Injector);

  /**
   * Stores a detached copy of the first resolved character collection.
   * Restore operations use this baseline instead of any later edited state.
   */
  #initialCharacters: readonly StarWarsCharacterState[] = [];

  /**
   * Tracks the identity assigned to the next newly created character.
   * Initialization advances it beyond the largest ID in the initial collection.
   */
  #nextCharacterId = 1;

  /** Selects the next meaningful Distinct Until Changed replacement. */
  #distinctChangedStateIndex = 0;

  /** Arms the tutorial's intentional inline-filter failure. */
  readonly #isThrowError = signal(false);

  /** Exposes whether the intentional filter failure is currently armed. */
  readonly isThrowError = this.#isThrowError.asReadonly();

  /** Retains the latest Resolve-stage comparison shown by the tutorial. */
  readonly #stepwiseResolveRequest = signal<StepwiseResolveRequest | undefined>(
    undefined
  );

  // Teaching point: Stepwise Resolve (ex-038)
  /** Exposes the current and candidate values supplied to the Stepwise callback. */
  readonly stepwiseResolveRequest = this.#stepwiseResolveRequest.asReadonly();

  /** Tracks whether the active callback is waiting for a user decision. */
  readonly #isStepwiseResolvePending = signal(false);

  /** Enables the Accept and Cancel controls only while a callback is suspended. */
  readonly isStepwiseResolvePending =
    this.#isStepwiseResolvePending.asReadonly();

  /** Holds the one-use decision functions for the active Stepwise request. */
  #stepwiseResolveDecisions: StepwiseBehaviorDecisionShape | undefined;

  /**
   * Suspends the Resolve stage and publishes both callback values for inspection.
   * The pipeline remains paused until the component delegates either an Accept
   * (`continue`) or Cancel (`block`) decision back to this service.
   */
  readonly #captureStepwiseResolve = (
    current: readonly StarWarsCharacterState[] | undefined,
    candidate: readonly StarWarsCharacterState[],
    decisions: StepwiseBehaviorDecisionShape
  ): void => {
    this.#stepwiseResolveRequest.set({ current, candidate });
    this.#stepwiseResolveDecisions = decisions;
    this.#isStepwiseResolvePending.set(true);
  };

  /** Retains the latest filtered candidate comparison shown by the tutorial. */
  readonly #stepwiseFilterRequest = signal<StepwiseFilterRequest | undefined>(
    undefined
  );

  // Teaching point: Stepwise Filter (ex-039)
  /** Exposes the current and filtered candidate values supplied to the callback. */
  readonly stepwiseFilterRequest = this.#stepwiseFilterRequest.asReadonly();

  /** Tracks whether the Filter-stage callback is waiting for a user decision. */
  readonly #isStepwiseFilterPending = signal(false);

  /** Enables the Filter Accept and Cancel controls only while the stage is suspended. */
  readonly isStepwiseFilterPending = this.#isStepwiseFilterPending.asReadonly();

  /** Holds the one-use decision functions for the active Filter-stage request. */
  #stepwiseFilterDecisions: StepwiseBehaviorDecisionShape | undefined;

  /**
   * Suspends the filtered candidate and publishes both callback values for inspection.
   * The pipeline remains paused until the component delegates an explicit decision.
   */
  readonly #captureStepwiseFilter = (
    current: readonly StarWarsCharacterState[] | undefined,
    candidate: readonly StarWarsCharacterState[],
    decisions: StepwiseBehaviorDecisionShape
  ): void => {
    this.#stepwiseFilterRequest.set({ current, candidate });
    this.#stepwiseFilterDecisions = decisions;
    this.#isStepwiseFilterPending.set(true);
  };

  /** Retains the latest reduced candidate comparison shown by the tutorial. */
  readonly #stepwiseReducerRequest = signal<StepwiseReducerRequest | undefined>(
    undefined
  );

  // Teaching point: Stepwise Reducer (ex-040)
  /** Exposes the current and reduced candidate values supplied to the callback. */
  readonly stepwiseReducerRequest = this.#stepwiseReducerRequest.asReadonly();

  /** Tracks whether the Reducer-stage callback is waiting for a user decision. */
  readonly #isStepwiseReducerPending = signal(false);

  /** Enables Reducer controls only while the stage is suspended. */
  readonly isStepwiseReducerPending =
    this.#isStepwiseReducerPending.asReadonly();

  /** Holds the one-use decision functions for the active Reducer-stage request. */
  #stepwiseReducerDecisions: StepwiseBehaviorDecisionShape | undefined;

  /**
   * Suspends the reduced candidate and publishes both callback values for inspection.
   * The pipeline remains paused until the component delegates an explicit decision.
   */
  readonly #captureStepwiseReducer = (
    current: readonly StarWarsCharacterState[] | undefined,
    candidate: readonly StarWarsCharacterState[],
    decisions: StepwiseBehaviorDecisionShape
  ): void => {
    this.#stepwiseReducerRequest.set({ current, candidate });
    this.#stepwiseReducerDecisions = decisions;
    this.#isStepwiseReducerPending.set(true);
  };

  /** Stores the latest filtered collection observed immediately before reducer execution. */
  readonly #beforeTapInput = signal<
    readonly StarWarsCharacterState[] | undefined
  >(undefined);

  // Teaching point: Before Taps (ex-031)
  /**
   * Exposes the latest Before Tap input as a read-only signal for the teaching output.
   * Consumers can inspect this value but cannot use the signal to alter pipeline state.
   */
  readonly beforeTapInput = this.#beforeTapInput.asReadonly();

  /**
   * Observes the filtered candidate immediately before reducers transform it.
   * This TapCallback performs the single intentional side effect of publishing the immutable input
   * for the tutorial display; it returns nothing and leaves pipeline execution unchanged.
   * @param characters - Filtered character collection entering the Before Tap stage.
   * @returns Nothing; the callback only updates the read-only teaching signal.
   */
  readonly #captureBeforeTapInput: TapCallback<
    readonly StarWarsCharacterState[]
  > = (characters) => {
    this.#beforeTapInput.set(characters);
  };

  /** Stores the latest transformed collection observed immediately after reducer execution. */
  readonly #afterTapInput = signal<
    readonly StarWarsCharacterState[] | undefined
  >(undefined);

  // Teaching point: After Taps (ex-032)
  /**
   * Exposes the latest After Tap input as a read-only signal for the teaching output.
   * Consumers can inspect this value but cannot use the signal to alter pipeline state.
   */
  readonly afterTapInput = this.#afterTapInput.asReadonly();

  /**
   * Observes the transformed candidate immediately after reducers finish processing it.
   * This TapCallback performs the single intentional side effect of publishing the immutable input
   * for the tutorial display; it returns nothing and leaves pipeline execution unchanged.
   * @param characters - Reduced character collection entering the After Tap stage.
   * @returns Nothing; the callback only updates the read-only teaching signal.
   */
  readonly #captureAfterTapInput: TapCallback<
    readonly StarWarsCharacterState[]
  > = (characters) => {
    this.#afterTapInput.set(characters);
  };

  /** Stores the latest finalized StateSnapshot observed after state commitment. */
  readonly #emittedState = signal<
    StateSnapshotShape<readonly StarWarsCharacterState[]> | undefined
  >(undefined);

  // Teaching point: State Emission (ex-035)
  /**
   * Exposes the latest emit-state callback input as a read-only signal for the teaching output.
   * Consumers can inspect the finalized snapshot but cannot use the signal to alter committed state.
   */
  readonly emittedState = this.#emittedState.asReadonly();

  /**
   * Observes the finalized StateSnapshot after the FeatureCell commits and exposes it.
   * This CoreEmitStateCallback performs the single intentional side effect of publishing the
   * immutable snapshot for the tutorial display; it cannot influence pipeline execution.
   * @param snapshot - Finalized value, loading, error, and presence state after commitment.
   * @returns Nothing; the callback only updates the read-only teaching signal.
   */
  readonly #captureEmittedState: CoreEmitStateCallback<
    readonly StarWarsCharacterState[]
  > = (snapshot) => {
    this.#emittedState.set(snapshot);
  };

  /** Stores the latest finalized error and associated FeatureCell snapshot. */
  readonly #emittedError = signal<ErrorEmission | undefined>(undefined);

  // Teaching point: Error Emission (ex-036)
  /**
   * Exposes the latest error-callback inputs as a read-only signal for the teaching output.
   * Consumers can inspect the finalized error and snapshot without influencing either one.
   */
  readonly emittedError = this.#emittedError.asReadonly();

  /**
   * Observes a finalized Vault error after it has been normalized and committed to state.
   * This VaultErrorCallback records both immutable inputs for the tutorial display and returns
   * no value, so it cannot transform the error, recover the pipeline, or mutate state.
   * @param error - Finalized Vault error produced by the Error stage.
   * @param state - Immutable FeatureCell snapshot at the time of the error.
   * @returns Nothing; the callback only updates the read-only teaching signal.
   */
  readonly #captureEmittedError: VaultErrorCallback<
    readonly StarWarsCharacterState[]
  > = (error, state) => {
    this.#emittedError.set({ error, state });
  };

  // Teaching point: Raw StateSnapshot (ex-013)
  /**
   * Exposes the FeatureCell's Angular signal state for value, loading, error, and presence checks.
   * Consumers can bind to these reactive accessors without subscribing manually.
   */
  readonly state = this.#vault.state;

  // Teaching point: Raw StateSnapshot$ (ex-014)
  /**
   * Exposes committed FeatureCell snapshots for consumers that teach observable state access.
   * Each emission carries the same state value available through the Angular signal API.
   */
  readonly state$ = this.#vault.state$;

  /**
   * Projects the current FeatureCell value into a read-only Angular computed signal.
   * The empty-array fallback gives templates a stable collection before a value is available.
   */
  readonly characters = computed<readonly StarWarsCharacterState[]>(
    () => this.state.value() ?? []
  );

  /**
   * Captures the first committed collection, then configures and initializes the FeatureCell pipeline.
   */
  constructor() {
    this.#vault.state$
      .pipe(
        filter(({ snapshot }) => snapshot.hasValue),
        take(1)
      )
      .subscribe(({ snapshot }) => {
        this.#initialCharacters =
          snapshot.value?.map((character) => ({ ...character })) ?? [];
        this.#nextCharacterId =
          Math.max(...this.#initialCharacters.map(({ id }) => id), 0) + 1;
      });

    // Teaching point: Delay (ex-033)
    /*
     * `.withDelay()` configures the registered Delay Controller to pause every
     * pipeline attempt for exactly three seconds at the Policy stage.
     *
     * The controller changes execution timing only: it preserves every candidate,
     * performs no value transformation, and releases each trace unchanged after
     * its deterministic hold expires.
     */
    this.#vault.withDelay?.({
      millisecondDelay: EXAMPLE_DELAY_MILLISECONDS
    });

    // Teaching point: Encryption (ex-034)
    /*
     * `.setAes256Secret()` configures the registered AES-256-GCM behavior before
     * initialization. The stable salt allows ciphertext persisted in one browser
     * session to be authenticated and decrypted during a later hydration cycle.
     *
     * This client-visible secret is intentionally tutorial-only. Production
     * applications must obtain secret material from an appropriate secure design
     * rather than treating bundled JavaScript as a confidential key store.
     */
    this.#vault.setAes256Secret?.({
      aes256Secret: 'sdux-vault-tutorial-only-secret',
      salt: EXAMPLE_AES256_SALT,
      iterations: 250_000
    });

    /*
     * Local Storage Persist has no fluent configuration. Registering the
     * behavior is sufficient: after AES-256 produces its authenticated envelope,
     * the Persist stage writes that envelope under the FeatureCell-scoped key.
     */

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
    // Teaching point: Stepwise Reducer (ex-040)
    /*
     * `.withStepwiseReducer()` installs the final approval boundary after all
     * reducers have completed. Its `StepwiseFunction` receives the last committed
     * State and the fully reduced candidate, including the derived force display
     * values and deterministic last-name ordering produced above.
     *
     * Accept invokes `continue()` so the reduced candidate may proceed toward
     * commitment; Cancel invokes `block()` so the attempt ends without replacing
     * the current State. The callback observes isolated inputs and mutates neither.
     */
    this.#vault
      // Teaching point: Hydration (ex-023)
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
      .hydrate(() => exampleHydrate.getPromise()).withStepwiseResolve!({
      stepwiseCallback: this.#captureStepwiseResolve
    })
      // Teaching point: Distinct Until Changed (ex-027)
      /*
       * `.operators()` installs a domain-specific Distinct Until Changed comparator
       * at the Operator stage. Array Append Merge has already materialized the full
       * candidate, so the callback compares stable character identities without relying
       * on array position. A candidate containing no new IDs returns `VAULT_NOOP`, even
       * when a downstream reducer sorted the previously committed collection.
       */
      .operators([
        withDistinctUntilChanged<readonly StarWarsCharacterState[]>(
          (incoming, previous) =>
            incoming.every(({ id }) =>
              previous.some((character) => character.id === id)
            )
        )
      ])

      // Teaching point: Filter (ex-016)
      /*
       * `.filters()` registers `removeUnknownLastNameFilter` as a
       * `FilterFunction<readonly StarWarsCharacterState[]>`.
       *
       * This pure function runs before reducers and returns a new candidate
       * collection without characters whose last name is exactly `unknown`.
       * The inline second filter normally returns that collection unchanged. When
       * the teaching flag is armed, it throws deliberately so the example can show
       * pipeline error normalization without allowing the candidate to commit.
       */
      .filters([
        removeUnknownLastNameFilter,
        (characters) => {
          if (this.#isThrowError()) {
            throw new Error(
              'The intentional character filter error was thrown.'
            );
          }

          return characters;
        }
      ]).withStepwiseFilter!({
      stepwiseCallback: this.#captureStepwiseFilter
    })
      // Teaching point: Before Taps (ex-031)
      /*
       * `.beforeTaps()` registers a `TapCallback<readonly StarWarsCharacterState[]>`
       * that observes the filtered candidate immediately before reducer execution.
       *
       * The callback publishes that immutable input for the tutorial display, returns
       * no replacement value, and cannot change the value passed to Reducer 1.
       */
      .beforeTaps([this.#captureBeforeTapInput])

      // Teaching point: Reducer 1 (ex-017)
      /*
       * The first `.reducers()` entry is a delegating
       * `ReducerFunction<readonly StarWarsCharacterState[]>`.
       *
       * After filtering, this pure function delegates its immutable transformation
       * to `#deriveForceSensitiveDisplay()`, producing a new collection in which
       * every retained character has a `Yes` or `No` display value.
       */

      // Teaching point: Reducer 2 (ex-018)
      /*
       * The second entry uses a factory-generated pure reducer, a different function
       * pattern that still returns the same `ReducerFunction` contract.
       *
       * It runs after Reducer 1, clones the transformed collection, and sorts characters
       * alphabetically by `lastName` without mutating the incoming array.
       */
      .reducers([
        (characters) => this.#deriveForceSensitiveDisplay(characters),
        withCharactersSortedByLastName()
      ]).withStepwiseReducer!({
      stepwiseCallback: this.#captureStepwiseReducer
    })
      // Teaching point: After Taps (ex-032)
      /*
       * `.afterTaps()` registers a `TapCallback<readonly StarWarsCharacterState[]>`
       * that observes the transformed candidate immediately after reducer execution.
       *
       * The callback publishes that immutable input for the tutorial display, returns
       * no replacement value, and cannot change the value committed as FeatureCell State.
       */
      .afterTaps([this.#captureAfterTapInput])

      // Teaching point: State Emission (ex-035)
      /*
       * `.emitStates()` registers a
       * `CoreEmitStateCallback<readonly StarWarsCharacterState[]>` that receives the
       * finalized `StateSnapshotShape` after the FeatureCell commits and exposes it.
       *
       * The callback publishes that immutable snapshot for the tutorial display and
       * cannot replace state, restart the pipeline, or change the committed result.
       */
      .emitStates([this.#captureEmittedState])

      // Teaching point: Error Emission (ex-036)
      /*
       * `.errors()` registers a
       * `VaultErrorCallback<readonly StarWarsCharacterState[]>` that receives the
       * finalized Vault error and immutable StateSnapshot after error commitment.
       *
       * The callback publishes both observational inputs for the tutorial display;
       * it cannot transform the error, replace state, or alter pipeline control.
       */
      .errors([this.#captureEmittedError])

      /*
       * `.initialize()` finalizes the pipeline configuration and activates the
       * FeatureCell. Its initial value and subsequent updates now pass through the
       * registered Filter → Before Tap → Reducer → After Tap stages before becoming committed
       * reactive State, which is then observed by the State Emission callback.
       */
      .initialize();
  }

  /**
   * Accepts the active Resolve-stage candidate and resumes its pipeline.
   * A call made without a pending callback is safely ignored.
   */
  acceptStepwiseResolve(): void {
    this.#completeStepwiseResolve('continue');
  }

  /**
   * Cancels the active Resolve-stage candidate while preserving committed State.
   * A call made without a pending callback is safely ignored.
   */
  cancelStepwiseResolve(): void {
    this.#completeStepwiseResolve('block');
  }

  /** Accepts the active filtered candidate and allows reducers to continue. */
  acceptStepwiseFilter(): void {
    this.#completeStepwiseFilter('continue');
  }

  /** Cancels the active filtered candidate while preserving committed State. */
  cancelStepwiseFilter(): void {
    this.#completeStepwiseFilter('block');
  }

  /** Accepts the fully reduced candidate and allows commitment to continue. */
  acceptStepwiseReducer(): void {
    this.#completeStepwiseReducer('continue');
  }

  /** Cancels the fully reduced candidate while preserving committed State. */
  cancelStepwiseReducer(): void {
    this.#completeStepwiseReducer('block');
  }

  /** Consumes exactly one pending decision before allowing another request. */
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
  #completeStepwiseFilter(decision: 'continue' | 'block'): void {
    const decisions = this.#stepwiseFilterDecisions;

    if (!decisions) {
      return;
    }

    this.#stepwiseFilterDecisions = undefined;
    this.#isStepwiseFilterPending.set(false);
    decisions[decision]();
  }

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
  createCharacter(draft: StarWarsCharacterDraft): StarWarsCharacterState {
    const character: StarWarsCharacterState = {
      id: this.#nextCharacterId++,
      ...draft
    };

    this.#vault.mergeState({
      value: [character],
      loading: false,
      error: null
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
  ): StarWarsCharacterState {
    const updatedCharacter: StarWarsCharacterState = { id, ...changes };

    this.#vault.replaceState({
      value: () =>
        this.#vault.state
          .value()
          ?.map((character) =>
            character.id === id ? updatedCharacter : character
          ),
      loading: false,
      error: null
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
        [],
      loading: false,
      error: null
    });
  }

  // Teaching point: Persist Null (ex-020)
  /**
   * Persists `null` through `replaceState` to clear the FeatureCell's current value.
   * The resulting state value resolves to `undefined` for consumers of the read model.
   * @returns Nothing; consumers observe the cleared value through the reactive state APIs.
   */
  persistNullValue(): void {
    this.#vault.replaceState({ value: null });
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

  // Teaching point: Promise (ex-024)
  /**
   * Merges a deferred Promise factory into the FeatureCell pipeline.
   * The factory is invoked by the Promise Resolve stage, which marks state as loading,
   * awaits the manually controlled response, and forwards its characters through the
   * configured filter, taps, and reducers before the collection is committed.
   * @returns Nothing; consumers observe loading and the eventual collection reactively.
   */
  fetchWithPromise(): void {
    const deferredPromise = examplePromise.getPromise();

    this.#vault.mergeState({
      value: () => deferredPromise
    });
  }

  // Teaching point: Observable (ex-025)
  /**
   * Merges a manually controlled Observable into the FeatureCell pipeline.
   * The Observable Resolve stage awaits its first emitted character collection,
   * then forwards that value through the configured filter, taps, and reducers
   * before committing the transformed collection to reactive state.
   * @returns Nothing; consumers observe loading and the eventual collection reactively.
   */
  addByObservable(): void {
    this.#vault.mergeState(exampleObservable.getObservable());
  }

  // Teaching point: HTTP Resource (ex-026)
  /**
   * Replaces the current collection from an Angular `HttpResourceRef`.
   * The example adapter owns the remote endpoint and converts its untrusted JSON
   * response into `StarWarsCharacterState`; Vault's HTTP Resource Resolve stage
   * then represents loading, awaits the resource, and forwards the parsed value
   * through the configured filter, taps, and reducers before State commitment.
   * @returns Nothing; consumers observe loading, data, and errors reactively.
   */
  fetchWithHttpResource(): void {
    this.#vault.replaceState(exampleHttpResource.getResource(this.#injector));
  }

  // Teaching point: Errors (ex-004)
  /**
   * Arms the intentional inline-filter error and submits an uncommitted replacement.
   * A fresh identity ensures Distinct Until Changed admits every demonstration attempt;
   * the armed filter then throws before taps, reducers, persistence, or State commitment.
   * @returns Nothing; consumers observe the normalized failure through reactive error APIs.
   */
  throwFilterError(): void {
    this.#isThrowError.set(true);
    this.#vault.replaceState([
      {
        id: this.#nextCharacterId++,
        name: 'Darth',
        lastName: 'Maul',
        faction: 'Sith Order',
        isForceSensitive: true
      }
    ]);
  }

  /**
   * Disarms the intentional inline-filter failure without starting a pipeline request.
   * @returns Nothing; subsequent State changes pass through the filter normally.
   */
  resetFilterError(): void {
    this.#isThrowError.set(false);
  }

  // Teaching point: Distinct Until Changed (ex-027)
  /**
   * Reconstructs the same character and submits it through `mergeState`.
   * Array Append Merge combines each newly allocated Rey with current State before
   * the Operator stage. The identity comparison accepts the first candidate and
   * suppresses later candidates that introduce no previously unseen character ID.
   * @returns Nothing; consumers observe the first accepted merged collection reactively.
   */
  submitSameState(): void {
    this.#vault.mergeState([{ ...DISTINCT_SAME_STATE_CHARACTER }]);
  }

  // Teaching point: Distinct Until Changed (ex-027)
  /**
   * Merges the next Jedi into State in a deterministic four-character cycle.
   * Modulo arithmetic advances the index and wraps it to zero after the fourth
   * request. Array Append Merge materializes the complete collection before the
   * Operator accepts new identities and suppresses identities already in State.
   * @returns Nothing; consumers observe accepted merged collections reactively.
   */
  submitChangedState(): void {
    const character =
      DISTINCT_CHANGED_STATE_CHARACTERS[this.#distinctChangedStateIndex]!;

    this.#distinctChangedStateIndex =
      (this.#distinctChangedStateIndex + 1) %
      DISTINCT_CHANGED_STATE_CHARACTERS.length;

    this.#vault.mergeState([{ ...character }]);
  }

  // Teaching point: FeatureCell destruction (ex-005)
  /**
   * Permanently tears down the FeatureCell and releases its runtime resources.
   * Destruction completes its streams and prevents any further pipeline execution.
   * @returns Nothing; the FeatureCell lifecycle is permanently finalized.
   */
  destroyFeatureCell(): void {
    this.#vault.destroy();
  }

  // Teaching point: Restore (ex-022)
  /**
   * Clones the captured baseline and replaces the current FeatureCell collection with it.
   * Returning the first restored character lets the component restore its selection as well.
   * @returns The first restored character, or `null` when the initial collection was empty.
   */
  restoreInitialCharacters(): StarWarsCharacterState | null {
    const initialCharacters = this.#initialCharacters.map((character) => ({
      ...character
    }));

    this.#replaceCharacters(initialCharacters);

    return initialCharacters[0] ?? null;
  }

  /**
   * Derives a display-friendly force-sensitivity label for every character.
   * Delegating the reducer to this pure method keeps registration concise while
   * preserving the incoming collection and character objects.
   * @param characters - Current character collection supplied by the reducer stage.
   * @returns A new collection whose characters display force sensitivity as Yes or No.
   */
  #deriveForceSensitiveDisplay(
    characters: readonly StarWarsCharacterState[]
  ): readonly StarWarsCharacterState[] {
    return characters.map((character) => ({
      ...character,
      forceSensitiveDisplay: character.isForceSensitive ? 'Yes' : 'No'
    }));
  }

  /**
   * Sends a complete character collection through `replaceState` and clears transient status fields.
   * @param characters - Read-only collection that should become the FeatureCell value.
   * @returns Nothing; the FeatureCell exposes the resulting value through reactive state.
   */
  #replaceCharacters(characters: readonly StarWarsCharacterState[]): void {
    this.#vault.replaceState({
      value: characters,
      loading: false,
      error: null
    });
  }
}
