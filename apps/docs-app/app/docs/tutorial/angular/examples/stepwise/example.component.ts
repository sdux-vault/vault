import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {
  EditorMode,
  ExampleCharacterEditor,
  OperationFeedback
} from './example.character-editor';
import { exampleHydrate } from './example.hydrate';
import { ExampleService } from './example.service';
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

  /** Enables Stepwise controls only while the Resolve callback awaits a decision. */
  protected readonly isStepwiseResolvePending =
    this.#exampleService.isStepwiseResolvePending;

  /** Enables Filter controls only while its Stepwise callback awaits a decision. */
  protected readonly isStepwiseFilterPending =
    this.#exampleService.isStepwiseFilterPending;

  /** Enables Reducer controls only while its Stepwise callback awaits a decision. */
  protected readonly isStepwiseReducerPending =
    this.#exampleService.isStepwiseReducerPending;

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

  /** Holds the identity currently selected by the character picker, or `null` when none is selected. */
  protected readonly selectedCharacterId = signal<number | null>(null);

  /** Tracks whether the editor should create a character or update the selected character. */
  protected readonly editorMode = signal<EditorMode>('edit');

  /** Exposes the latest operation result for the template's accessible feedback region. */
  protected readonly feedback = signal<OperationFeedback | null>(null);

  /** Prevents the one-time hydration source from being settled more than once. */
  protected readonly hydrationSettled = signal(false);

  /** Holds the character awaiting explicit confirmation before removal. */
  protected readonly deleteCandidate = signal<StarWarsCharacter | null>(null);

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
    this.#observeInitialSelection();
    this.#observeStepwisePromptEffects();
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
   * Delegates FeatureCell reset behavior to the service and clears the character form.
   * @returns Nothing; the cleared state propagates through the reactive state APIs.
   */
  protected resetState(): void {
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
