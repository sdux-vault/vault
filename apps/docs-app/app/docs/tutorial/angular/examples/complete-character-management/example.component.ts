import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {
  StateEmitTypes,
  type StateEmitType,
  VaultErrorService,
  VaultErrorShape
} from '@sdux-vault/shared';
import {
  EditorMode,
  ExampleCharacterEditor,
  OperationFeedback
} from './example.character-editor';
import { ElapsedTimer } from './example.elapsed-timer';
import { exampleHydrate } from './example.hydrate';
import { exampleObservable } from './example.observable';
import { examplePromise } from './example.promise';
import {
  EXAMPLE_DELAY_MILLISECONDS,
  EXAMPLE_ENCRYPTED_STORAGE_KEY,
  ExampleService
} from './example.service';
import { STAR_WARS_CHARACTERS } from './star-wars-character.constant';
import type { StarWarsCharacter } from './star-wars-character.shape';

/**
 * Coordinates the reactive character editor presented by this tutorial example.
 * It consumes the service's computed character collection and keeps selection, form,
 * confirmation, and feedback state in Angular signals.
 * Computed signals derive the selected character and mode-specific labels for the template.
 * User actions delegate collection changes to `ExampleService`, then reactive state refreshes the view.
 * **Architectural Boundary:** The component owns presentation state while the service owns
 * FeatureCell access and character collection mutations.
 */
@Component({
  selector: 'sdux-star-wars-character-example',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {
  // Reactive state: shared services and framework utilities.

  /** Exposes the character editor instance for template and internal use. */
  readonly editor = new ExampleCharacterEditor();

  /**
   * Provides the component-facing character use cases and reactive collection signal.
   * The component never reaches through this service to access the FeatureCell directly.
   */
  readonly #exampleService = inject(ExampleService);

  /** Provides the singleton stream and controls for application-level Vault errors. */
  /** Teaching Point: Global Error Service: Ex-011 */
  readonly #globalErrorService = VaultErrorService();

  /** Creates the non-nullable reactive form used by the character editor. */
  readonly #formBuilder = inject(FormBuilder);

  // Lifecycle guards: one-time selection and one-prompt-per-request coordination.

  /** Prevents later collection emissions from replacing the user's current selection. */
  #hasInitializedSelection = false;

  /** Prevents duplicate native confirm prompts for the same pending Stepwise Resolve request. */
  #hasPromptedStepwiseResolve = false;

  /** Prevents duplicate native confirm prompts for the same pending Stepwise Filter request. */
  #hasPromptedStepwiseFilter = false;

  /** Prevents duplicate native confirm prompts for the same pending Stepwise Reducer request. */
  #hasPromptedStepwiseReducer = false;

  /** Remembers the selected identity so canceling create mode can restore the prior editor. */
  #selectedCharacterBeforeCreate: number | null = null;

  // Reactive state: direct service projections consumed by the template.

  /**
   * Projects the current FeatureCell value into a read-only Angular computed signal.
   * The empty-array fallback gives templates a stable collection before a value is available.
   */
  /** Teaching Point: ex-001 */
  readonly characters = computed<readonly StarWarsCharacter[]>(
    () => this.state.value() ?? []
  );

  /** Exposes the FeatureCell loading signal so the template can cover the current selection. */
  protected readonly state = this.#exampleService.state;

  /** Reflects whether the tutorial's intentional inline-filter failure is enabled. */
  protected readonly isThrowError = this.#exampleService.isThrowError;

  /** Enables Stepwise controls only while the Resolve callback awaits a decision. */
  protected readonly isStepwiseResolvePending =
    this.#exampleService.isStepwiseResolvePending;

  /** Enables Filter controls only while its Stepwise callback awaits a decision. */
  protected readonly isStepwiseFilterPending =
    this.#exampleService.isStepwiseFilterPending;

  /** Enables Reducer controls only while its Stepwise callback awaits a decision. */
  protected readonly isStepwiseReducerPending =
    this.#exampleService.isStepwiseReducerPending;

  // Derived teaching outputs: serialized pipeline snapshots for the tutorial UI.

  /** Displays the immutable tutorial constant before any FeatureCell operations modify state. */
  protected readonly originalStateJson = JSON.stringify(
    STAR_WARS_CHARACTERS,
    null,
    2
  );

  /** Serializes the current and candidate values supplied to the Stepwise Resolve callback. */
  protected readonly stepwiseResolveRequestJson = computed(() =>
    this.editor.serializeStepwiseRequest(
      this.#exampleService.stepwiseResolveRequest()
    )
  );

  /** Serializes the current and filtered candidate values from Stepwise Filter. */
  protected readonly stepwiseFilterRequestJson = computed(() =>
    this.editor.serializeStepwiseRequest(
      this.#exampleService.stepwiseFilterRequest()
    )
  );

  /** Serializes the current and fully reduced candidate from Stepwise Reducer. */
  protected readonly stepwiseReducerRequestJson = computed(() =>
    this.editor.serializeStepwiseRequest(
      this.#exampleService.stepwiseReducerRequest()
    )
  );

  /** Serializes the filtered candidate observed by the latest Before Tap callback. */
  protected readonly beforeTapInputJson = computed(() =>
    this.editor.serializeTapInput(this.#exampleService.beforeTapInput())
  );

  /** Serializes the transformed candidate observed by the latest After Tap callback. */
  protected readonly afterTapInputJson = computed(() =>
    this.editor.serializeTapInput(this.#exampleService.afterTapInput())
  );

  /** Serializes the finalized StateSnapshot observed by the latest emit-state callback. */
  protected readonly emittedStateJson = computed(() =>
    this.editor.serializeSnapshot(this.#exampleService.emittedState())
  );

  /** Serializes the finalized error and StateSnapshot observed by the latest error callback. */
  protected readonly errorEmissionJson = computed(() =>
    this.editor.serializeErrorEmission(this.#exampleService.emittedError())
  );

  /**
   * Serializes the complete FeatureCell StateSnapshot for the Raw StateSnapshot teaching output.
   * Reading each state signal keeps the value, loading, error, and presence fields reactive.
   */
  protected readonly rawStateJson = computed(() =>
    this.editor.serializeRawState({
      isLoading: this.state.isLoading(),
      value: this.state.value(),
      error: this.state.error(),
      hasValue: this.state.hasValue()
    })
  );

  /** Holds the complete serialized StateSnapshot received from the latest FeatureCell `state$` emission. */
  protected readonly rawStateStreamJson = signal('undefined');

  // Local presentation state: editor selection, mode, feedback, and teaching toggles.

  /** Holds the identity currently selected by the character picker, or `null` when none is selected. */
  protected readonly selectedCharacterId = signal<number | null>(null);

  /** Tracks whether the editor should create a character or update the selected character. */
  protected readonly editorMode = signal<EditorMode>('edit');

  /** Exposes the latest operation result for the template's accessible feedback region. */
  protected readonly feedback = signal<OperationFeedback | null>(null);

  /** Holds the active application-level Vault error until the user clears it. */
  protected readonly globalError = signal<VaultErrorShape | null>(null);

  /** Holds the readMe display until the user clears it. */
  protected readonly readMeDisplay = signal<boolean>(true);

  /** Tracks permanent FeatureCell teardown so the UI can explain the required recovery. */
  protected readonly featureCellDestroyed = signal(false);

  /** Prevents the one-time hydration source from being settled more than once. */
  protected readonly hydrationSettled = signal(false);

  /** Tracks the manually controlled request so only its valid next action is visible. */
  protected readonly promisePending = signal(false);

  /** Tracks the manually controlled Observable so only its valid next action is visible. */
  protected readonly observablePending = signal(false);

  // Teaching point: Delay (ex-033)
  // Delay Controller teaching state.

  /** Displays the fixed controller configuration beside the live elapsed timer. */
  protected readonly delayMilliseconds = EXAMPLE_DELAY_MILLISECONDS;

  /** Publishes whole elapsed milliseconds for the Delay Timer teaching output. */
  protected readonly delayTimerMilliseconds = signal(0);

  // Teaching point: Encryption (ex-034)
  /** Displays the exact encrypted envelope persisted by the latest finalized State. */
  protected readonly encryptedState = signal('undefined');

  /** Measures elapsed wall-clock time from each user-initiated pipeline request. */
  readonly #delayTimer = new ElapsedTimer((milliseconds) => {
    this.delayTimerMilliseconds.set(Math.floor(milliseconds));
  });

  /** Holds the character awaiting explicit confirmation before removal. */
  protected readonly deleteCandidate = signal<StarWarsCharacter | null>(null);

  // Derived presentation state: selected record and mode-specific labels.

  /**
   * Resolves the selected identity against the latest reactive character collection.
   * Returning `null` keeps the template safe when the character was removed or never existed.
   */
  protected readonly selectedCharacter = computed(() => {
    const selectedId = this.selectedCharacterId();
    return this.characters().find(({ id }) => id === selectedId) ?? null;
  });

  /** Derives the editor heading from the current mode so the template stays declarative. */
  protected readonly editorTitle = computed(() =>
    this.editorMode() === 'create' ? 'Add a character' : 'Update character'
  );

  /** Derives the submit-button label from the operation that saving will perform. */
  protected readonly submitLabel = computed(() =>
    this.editorMode() === 'create' ? 'Add character' : 'Save changes'
  );

  /**
   * Defines the non-nullable form model and validation rules shared by create and edit flows.
   * Name fields validate trimmed lengths while faction selection remains required.
   */
  protected readonly characterForm = this.#formBuilder.nonNullable.group({
    name: ['', [this.#trimmedTextLength(2, 40)]],
    lastName: ['', [this.#trimmedTextLength(2, 40)]],
    faction: ['', Validators.required],
    isForceSensitive: [false]
  });

  /**
   * Watches the reactive collection and selects its first character when initial state arrives.
   * The one-time guard preserves later user selections and does not interrupt create mode.
   */
  constructor() {
    inject(DestroyRef).onDestroy(() => this.#delayTimer.destroy());

    this.#observeStateStream();
    this.#observeGlobalErrors();
    this.#observeInitialSelection();
    this.#observeStepwisePromptEffects();
  }

  /**
   * Watches FeatureCell emissions and projects each snapshot into the
   * diagnostic output used by the tutorial. It also starts the elapsed timer
   * when a delayed attempt is observed and stops it when the pipeline
   * finalizes or reports an error; the subscription ends with the component.
   * @returns Nothing; the subscription updates snapshot, encryption, and timer
   * signals.
   */
  #observeStateStream(): void {
    this.#exampleService.state$
      .pipe(takeUntilDestroyed())
      .subscribe(({ snapshot, type }) => {
        this.rawStateStreamJson.set(this.editor.serializeSnapshot(snapshot));
        this.encryptedState.set(
          localStorage.getItem(EXAMPLE_ENCRYPTED_STORAGE_KEY) ?? 'undefined'
        );

        this.handleDelayStateEmission(type);
      });
  }

  /**
   * Synchronizes the elapsed display with Delay Controller state emissions.
   * @param type - State emission type used to start or stop the display timer.
   * @returns Nothing; the timer updates its local elapsed-time signal.
   */
  protected handleDelayStateEmission(type: StateEmitType): void {
    if (!this.#delayTimer.running && type === StateEmitTypes.DenyController) {
      this.#delayTimer.reset();
      this.#delayTimer.start();
    }

    if (
      this.#delayTimer.running &&
      (type === StateEmitTypes.FinalizePipeline ||
        type === StateEmitTypes.PipelineError)
    ) {
      this.#delayTimer.stop();
    }
  }

  /**
   * Subscribes to the application-level Vault error stream and mirrors its
   * current error into the component's accessible feedback state. Clearing the
   * service error removes the message from the rendered example without
   * changing the FeatureCell collection.
   * @returns Nothing; the subscription updates the global error signal.
   */
  #observeGlobalErrors(): void {
    this.#globalErrorService.error$
      .pipe(takeUntilDestroyed())
      .subscribe((error: VaultErrorShape | null) => {
        this.globalError.set(
          error && this.#globalErrorService.hasError ? error : null
        );
      });
  }

  /**
   * Selects and patches the first character when the reactive collection first
   * becomes available. The one-time guard preserves later user selections and
   * prevents asynchronous state emissions from interrupting create mode.
   * @returns Nothing; the effect updates local selection and form state.
   */
  #observeInitialSelection(): void {
    effect(() => {
      const characters = this.characters();

      if (
        !this.#hasInitializedSelection &&
        this.editorMode() === 'edit' &&
        this.selectedCharacterId() === null &&
        characters.length > 0
      ) {
        const firstCharacter = characters[0]!;

        this.#hasInitializedSelection = true;
        this.selectedCharacterId.set(firstCharacter.id);
        this.#patchForm(firstCharacter);
      }
    });
  }

  /**
   * Watches the three stepwise request signals and forwards each pending
   * request to its matching presentation method. This keeps Resolve, Filter,
   * and Reducer approval prompts in the component layer while the service and
   * pipeline retain ownership of FeatureCell State.
   * @returns Nothing; the effects coordinate the component's stepwise prompt state.
   */
  #observeStepwisePromptEffects(): void {
    effect(() => {
      this.processStepwiseResolvePending(this.isStepwiseResolvePending());
    });

    effect(() => {
      this.processStepwiseFilterPending(this.isStepwiseFilterPending());
    });

    effect(() => {
      this.processStepwiseReducerPending(this.isStepwiseReducerPending());
    });
  }

  /**
   * Clears the active application-level error after the user acknowledges it.
   * The singleton emits `null`, which also removes the error message from the template.
   * @returns Nothing; the global error service and reactive UI state are cleared.
   */
  /** Teaching Point: Global Error Service: Ex-011 */
  protected clearGlobalError(): void {
    this.#exampleService.clearEmittedError();
    this.#globalErrorService.clear();
  }

  /**
   * Clears the readMe display after the user acknowledges it.
   */
  protected clearReadMeDisplay(): void {
    this.readMeDisplay.set(false);
  }

  /**
   * Creates a validator that trims text before enforcing required, minimum, and maximum lengths.
   * @param minimum - Smallest accepted number of non-whitespace characters.
   * @param maximum - Largest accepted number of non-whitespace characters.
   * @returns An Angular validator that reports the matching validation error or `null`.
   */
  #trimmedTextLength(minimum: number, maximum: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      this.editor.validateTrimmedText(control.value, minimum, maximum);
  }

  /**
   * Resolves a picker value to a known character and opens that character in edit mode.
   * Unknown identities are ignored so stale or invalid option values cannot disturb the editor.
   * @param value - Character identity received from the select element.
   * @returns Nothing; selection, form, and feedback signals are updated in place.
   */
  protected selectCharacter(value: string): void {
    const character =
      this.characters().find((character) => character.id === Number(value)) ??
      null;

    if (!character) {
      return;
    }

    this.selectedCharacterId.set(character.id);
    this.#selectedCharacterBeforeCreate = null;
    this.editorMode.set('edit');
    this.deleteCandidate.set(null);
    this.feedback.set(null);
    this.#patchForm(character);
  }

  /**
   * Enters create mode, remembers the prior selection, and resets the form to clean defaults.
   * Repeated calls preserve the original selection so cancel can still return to it.
   * @returns Nothing; the editor signals and form state are reset in place.
   */
  protected startCreate(): void {
    if (this.editorMode() !== 'create') {
      this.#selectedCharacterBeforeCreate = this.selectedCharacterId();
    }

    this.selectedCharacterId.set(null);
    this.editorMode.set('create');
    this.deleteCandidate.set(null);
    this.feedback.set(null);
    this.#clearCharacterForm();
  }

  /**
   * Discards current edits and restores the character selected before editing or creating began.
   * When no valid selection exists, it falls back to a clean create form.
   * @returns Nothing; editor mode, form values, and feedback are updated in place.
   */
  protected cancelEdit(): void {
    if (this.editorMode() === 'create') {
      const character = this.characters().find(
        ({ id }) => id === this.#selectedCharacterBeforeCreate
      );

      if (character) {
        this.selectedCharacterId.set(character.id);
        this.#selectedCharacterBeforeCreate = null;
        this.editorMode.set('edit');
        this.#patchForm(character);
        this.feedback.set(this.editor.feedback['newCharacterDiscarded']);
        return;
      }
    }

    const character = this.selectedCharacter();

    if (character) {
      this.editorMode.set('edit');
      this.#patchForm(character);
      this.feedback.set(this.editor.feedback['unsavedChangesDiscarded']);
      return;
    }

    this.startCreate();
  }

  /**
   * Validates and normalizes form values before delegating create or update work to the service.
   * The flow is form submission → service use case → FeatureCell pipeline → reactive collection update.
   * Invalid input or a missing edit selection produces feedback without changing collection state.
   * @returns Nothing; the selected identity, form, and feedback reflect the submitted operation.
   */
  protected saveCharacter(): void {
    if (this.characterForm.invalid) {
      this.characterForm.markAllAsTouched();
      this.feedback.set(this.editor.feedback['invalidForm']);
      return;
    }

    const formValue = this.characterForm.getRawValue();
    const normalizedCharacter = this.editor.normalizeCharacterDraft(formValue);

    if (this.editorMode() === 'create') {
      const character =
        this.#exampleService.createCharacter(normalizedCharacter);

      this.selectedCharacterId.set(character.id);
      this.#selectedCharacterBeforeCreate = null;
      this.editorMode.set('edit');
      this.#patchForm(character);
      this.feedback.set(
        this.editor.characterAddedFeedback(this.#characterLabel(character))
      );
      return;
    }

    const selectedId = this.selectedCharacterId();

    if (selectedId === null) {
      this.feedback.set(this.editor.feedback['selectBeforeSave']);
      return;
    }

    const updatedCharacter = this.#exampleService.updateCharacter(
      selectedId,
      normalizedCharacter
    );

    this.#patchForm(updatedCharacter);
    this.feedback.set(
      this.editor.characterUpdatedFeedback(
        this.#characterLabel(updatedCharacter)
      )
    );
  }

  /**
   * Opens the confirmation state for the currently selected character.
   * No confirmation is shown when the selection cannot resolve to a character.
   * @returns Nothing; the delete candidate and feedback signals are updated in place.
   */
  protected requestDelete(): void {
    const character = this.selectedCharacter();

    if (character) {
      this.deleteCandidate.set(character);
      this.feedback.set(null);
    }
  }

  /**
   * Closes the removal confirmation without changing the character collection.
   * @returns Nothing; the pending delete candidate is cleared.
   */
  protected cancelDelete(): void {
    this.deleteCandidate.set(null);
  }

  /**
   * Delegates confirmed removal to the service, then resets the component to create mode.
   * The flow is confirmation → service removal → FeatureCell pipeline → reactive collection update.
   * @returns Nothing; selection, form, confirmation, and feedback state are updated in place.
   */
  protected confirmDelete(): void {
    const character = this.deleteCandidate();

    if (!character) {
      return;
    }

    this.#exampleService.removeCharacter(character.id);

    this.deleteCandidate.set(null);
    this.selectedCharacterId.set(null);
    this.#selectedCharacterBeforeCreate = null;
    this.editorMode.set('create');
    this.#clearCharacterForm();

    this.feedback.set(
      this.editor.characterRemovedFeedback(this.#characterLabel(character))
    );
  }

  /**
   * Delegates a null replacement to the service and clears the character form.
   * @returns Nothing; the resulting undefined value is exposed through the reactive state APIs.
   */
  protected persistNullValue(): void {
    this.#exampleService.persistNullValue();
    this.#clearCharacterForm();
  }

  /**
   * Delegates FeatureCell reset behavior to the service and clears the character form.
   * @returns Nothing; the cleared state propagates through the reactive state APIs.
   */
  protected resetState(): void {
    this.#delayTimer.reset();
    this.#exampleService.resetState();
    this.#clearCharacterForm();
  }

  /**
   * Resolves the authoritative hydration source and completes FeatureCell initialization.
   * A missing resolver preserves the pending UI because no hydration cycle was completed.
   * @returns Nothing; the hydrated characters continue through the full pipeline automatically.
   */
  protected resolveHydration(): void {
    const resolveHydration = exampleHydrate.getResolve();

    if (!resolveHydration) {
      return;
    }

    resolveHydration();
    this.hydrationSettled.set(true);
  }

  /**
   * Rejects the authoritative hydration source and completes initialization with an Error.
   * Vault exposes the failure without evaluating configured initial State as a fallback.
   * @returns Nothing; loading and Error State update through pipeline finalization.
   */
  protected rejectHydration(): void {
    const rejectHydration = exampleHydrate.getReject();

    if (!rejectHydration) {
      return;
    }

    rejectHydration();
    this.hydrationSettled.set(true);
  }

  /**
   * Starts the deferred Promise merge and exposes its Resolve and Reject controls.
   * Vault owns the corresponding StateSnapshot loading state while the Promise is pending.
   * @returns Nothing; button visibility and FeatureCell state update reactively.
   */
  protected fetchWithPromise(): void {
    this.promisePending.set(true);
    this.#exampleService.fetchWithPromise();
  }

  /**
   * Completes the active Promise request and restores the Fetch with Promise control.
   * A missing resolver leaves the pending UI intact because no request was completed.
   * @returns Nothing; the resolved characters continue through the pipeline automatically.
   */
  protected resolvePromise(): void {
    const resolvePromise = examplePromise.getResolve();

    if (!resolvePromise) {
      return;
    }

    resolvePromise();
    this.promisePending.set(false);
  }

  /**
   * Rejects the active Promise request and restores the Fetch with Promise control.
   * Vault normalizes the thrown rejection into error state and preserves the collection.
   * @returns Nothing; loading and error state update through pipeline finalization.
   */
  protected rejectPromise(): void {
    const rejectPromise = examplePromise.getReject();

    if (!rejectPromise) {
      return;
    }

    rejectPromise();
    this.promisePending.set(false);
  }

  /**
   * Starts the Observable merge and exposes its Emit and Error controls.
   * Vault owns the corresponding StateSnapshot loading state until the user
   * explicitly selects the source's terminal outcome.
   * @returns Nothing; button visibility and FeatureCell state update reactively.
   */
  protected addByObservable(): void {
    this.observablePending.set(true);
    this.#exampleService.addByObservable();
  }

  /**
   * Emits the active Observable character collection and restores the Add control.
   * A missing emitter leaves the pending UI intact because no source was completed.
   * @returns Nothing; emitted characters continue through the pipeline automatically.
   */
  protected emitObservable(): void {
    const emitObservable = exampleObservable.getEmit();

    if (!emitObservable) {
      return;
    }

    emitObservable();
    this.observablePending.set(false);
  }

  /**
   * Errors the active Observable and restores the Add control.
   * Vault normalizes the source error and preserves the current character collection.
   * @returns Nothing; the error continues through pipeline finalization.
   */
  protected errorObservable(): void {
    const errorObservable = exampleObservable.getError();

    if (!errorObservable) {
      return;
    }

    errorObservable();
    this.observablePending.set(false);
  }

  /**
   * Delegates the remote character request to the FeatureCell service.
   * Angular owns the HTTP resource lifecycle while the component reacts to the
   * FeatureCell's existing loading, value, and error signals.
   * @returns Nothing; the resolved collection is rendered from reactive State.
   */
  protected fetchWithHttpResource(): void {
    this.selectedCharacterId.set(null);
    this.#selectedCharacterBeforeCreate = null;
    this.editorMode.set('create');
    this.#clearCharacterForm();
    this.#exampleService.fetchWithHttpResource();
  }

  /**
   * Arms and executes the intentional filter failure, or resets it after demonstration.
   * Resetting also clears the application-level error without submitting another State request.
   * @returns Nothing; the service signal drives the button's next available action.
   */
  protected toggleFilterError(): void {
    if (this.isThrowError()) {
      this.#exampleService.resetFilterError();
      this.#globalErrorService.clear();
      return;
    }

    this.#exampleService.throwFilterError();
  }

  /**
   * Starts timing and merges a newly allocated instance of the same character.
   * @returns Nothing; Distinct Until Changed decides whether downstream stages execute.
   */
  protected submitSameState(): void {
    this.#exampleService.submitSameState();
  }

  /**
   * Starts timing and merges the next Jedi in the service's four-value cycle.
   * @returns Nothing; the accepted collection is exposed through reactive State.
   */
  protected submitChangedState(): void {
    this.#exampleService.submitChangedState();
  }

  /**
   * Accepts the pending Stepwise Resolve candidate and resumes its pipeline.
   * @returns Nothing; the resulting State arrives through the existing reactive stream.
   */
  protected acceptStepwiseResolve(): void {
    this.#exampleService.acceptStepwiseResolve();
  }

  /**
   * Blocks the pending Stepwise Resolve candidate and preserves committed State.
   * @returns Nothing; the suspended pipeline terminates as a controlled no-op.
   */
  protected cancelStepwiseResolve(): void {
    this.#exampleService.cancelStepwiseResolve();
  }

  /**
   * Accepts the candidate produced by the Filter stage and resumes its pipeline.
   * @returns Nothing; downstream reducers and State commitment remain reactive.
   */
  protected acceptStepwiseFilter(): void {
    this.#exampleService.acceptStepwiseFilter();
  }

  /**
   * Blocks the candidate produced by the Filter stage and preserves committed State.
   * @returns Nothing; the suspended attempt terminates as a controlled no-op.
   */
  protected cancelStepwiseFilter(): void {
    this.#exampleService.cancelStepwiseFilter();
  }

  /**
   * Accepts the fully reduced candidate and allows State commitment to continue.
   * @returns Nothing; the finalized State arrives through the reactive stream.
   */
  protected acceptStepwiseReducer(): void {
    this.#exampleService.acceptStepwiseReducer();
  }

  /**
   * Blocks the fully reduced candidate and preserves committed State.
   * @returns Nothing; the suspended pipeline terminates as a controlled no-op.
   */
  protected cancelStepwiseReducer(): void {
    this.#exampleService.cancelStepwiseReducer();
  }

  /**
   * Delegates permanent FeatureCell teardown, clears the form, and exposes the terminal UI state.
   * @returns Nothing; the FeatureCell and its runtime resources are permanently finalized.
   */
  protected destroyFeatureCell(): void {
    this.#delayTimer.destroy();
    this.#exampleService.destroyFeatureCell();
    this.#clearCharacterForm();
    this.featureCellDestroyed.set(true);
  }

  /**
   * Requests the service's captured baseline and aligns the editor with its first character.
   * An empty baseline leaves the component in create mode while still reporting a successful restore.
   * @returns Nothing; collection restoration occurs through the service and editor state is synchronized.
   */
  protected restoreInitialCharacters(): void {
    const firstCharacter = this.#exampleService.restoreInitialCharacters();

    this.selectedCharacterId.set(firstCharacter?.id ?? null);
    this.#selectedCharacterBeforeCreate = null;
    this.editorMode.set(firstCharacter ? 'edit' : 'create');
    this.deleteCandidate.set(null);

    if (firstCharacter) {
      this.#patchForm(firstCharacter);
    }

    this.feedback.set(this.editor.feedback['initialCollectionRestored']);
  }

  /**
   * Opens the current example URL in a new browser tab for a Tab Sync demonstration.
   * The direct click preserves browser popup permissions while `noopener` isolates tab contexts.
   * @returns Nothing; opening the tab is delegated to the browser when a window is available.
   */
  protected viewTabSync(): void {
    /* istanbul ignore else -- This Angular component runs only in a browser. */
    if (typeof window !== 'undefined') {
      window.open(window.location.href, '_blank', 'noopener');
    }
  }

  /**
   * Reports whether a pending Stepwise stage should open its native confirmation prompt.
   * @param isPending - Whether the current Stepwise stage is awaiting a decision.
   * @param hasPrompted - Whether this pending request has already shown its dialog.
   * @returns True when a browser prompt can be shown for the pending request.
   */
  protected shouldPromptForPendingStepwise(
    isPending: boolean,
    hasPrompted: boolean
  ): boolean {
    return isPending && !hasPrompted && typeof window !== 'undefined';
  }

  /** Processes the current Stepwise Resolve pending state and opens its prompt at most once. */
  protected processStepwiseResolvePending(isPending: boolean): void {
    if (!isPending) {
      this.#hasPromptedStepwiseResolve = false;
      return;
    }

    if (
      !this.shouldPromptForPendingStepwise(
        isPending,
        this.#hasPromptedStepwiseResolve
      )
    ) {
      return;
    }

    this.#hasPromptedStepwiseResolve = true;
    this.handleStepwiseResolvePrompt();
  }

  /** Processes the current Stepwise Filter pending state and opens its prompt at most once. */
  protected processStepwiseFilterPending(isPending: boolean): void {
    if (!isPending) {
      this.#hasPromptedStepwiseFilter = false;
      return;
    }

    if (
      !this.shouldPromptForPendingStepwise(
        isPending,
        this.#hasPromptedStepwiseFilter
      )
    ) {
      return;
    }

    this.#hasPromptedStepwiseFilter = true;
    this.handleStepwiseFilterPrompt();
  }

  /** Processes the current Stepwise Reducer pending state and opens its prompt at most once. */
  protected processStepwiseReducerPending(isPending: boolean): void {
    if (!isPending) {
      this.#hasPromptedStepwiseReducer = false;
      return;
    }

    if (
      !this.shouldPromptForPendingStepwise(
        isPending,
        this.#hasPromptedStepwiseReducer
      )
    ) {
      return;
    }

    this.#hasPromptedStepwiseReducer = true;
    this.handleStepwiseReducerPrompt();
  }

  /** Opens the native confirmation flow for a pending Stepwise Resolve request. */
  protected handleStepwiseResolvePrompt(): void {
    if (
      window.confirm(
        'Stepwise Resolve is pending. Press OK to accept or Cancel to block the candidate.'
      )
    ) {
      this.acceptStepwiseResolve();
      return;
    }

    this.cancelStepwiseResolve();
  }

  /** Opens the native confirmation flow for a pending Stepwise Filter request. */
  protected handleStepwiseFilterPrompt(): void {
    if (
      window.confirm(
        'Stepwise Filter is pending. Press OK to accept or Cancel to block the candidate.'
      )
    ) {
      this.acceptStepwiseFilter();
      return;
    }

    this.cancelStepwiseFilter();
  }

  /** Opens the native confirmation flow for a pending Stepwise Reducer request. */
  protected handleStepwiseReducerPrompt(): void {
    if (
      window.confirm(
        'Stepwise Reducer is pending. Press OK to accept or Cancel to block the candidate.'
      )
    ) {
      this.acceptStepwiseReducer();
      return;
    }

    this.cancelStepwiseReducer();
  }

  /**
   * Resolves the stable label used in messages and template fallbacks.
   * @param character - Raw or reduced character whose display label should be returned.
   * @returns The post-reducer full name when present, otherwise a local fallback.
   */
  #characterLabel(character: StarWarsCharacter): string {
    return character.fullName ?? `${character.name} ${character.lastName}`;
  }

  /**
   * Clears every editable character field and restores clean form metadata.
   * @returns Nothing; the existing reactive form is reset in place.
   */
  #clearCharacterForm(): void {
    this.characterForm.reset({
      name: '',
      lastName: '',
      faction: '',
      isForceSensitive: false
    });
    this.characterForm.markAsPristine();
    this.characterForm.markAsUntouched();
  }

  /**
   * Copies a character into the form and resets dirty and touched metadata for a clean edit state.
   * @param character - Character whose values should populate the editor.
   * @returns Nothing; the existing reactive form is updated in place.
   */
  #patchForm(character: StarWarsCharacter): void {
    this.characterForm.setValue({
      name: character.name,
      lastName: character.lastName,
      faction: character.faction,
      isForceSensitive: character.isForceSensitive
    });
    this.characterForm.markAsPristine();
    this.characterForm.markAsUntouched();
  }
}
