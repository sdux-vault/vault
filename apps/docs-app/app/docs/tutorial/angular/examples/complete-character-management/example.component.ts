import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
import { VaultErrorService, VaultErrorShape } from '@sdux-vault/shared';
import { STAR_WARS_CHARACTERS } from '../../../examples/star-wars-character.constant';
import { StarWarsCharacterState } from '../../../examples/star-wars-character.state';
import { ExampleService } from './example.service';

/**
 * Identifies whether the form is creating a new character or editing an existing one.
 * The mode controls labels, selection behavior, and which service operation runs on save.
 */
type EditorMode = 'create' | 'edit';

/**
 * Limits operation messages to the visual states supported by the template.
 * Each tone also determines the status class and accessibility role rendered to the user.
 */
type FeedbackTone = 'error' | 'info' | 'success';

/**
 * Carries user-facing feedback after a form or collection operation.
 * The template combines the message and tone to present an accessible status update.
 */
interface OperationFeedback {
  /** Text that explains the result of the latest user operation. */
  readonly message: string;

  /** Visual and accessibility category applied to the feedback message. */
  readonly tone: FeedbackTone;
}

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
  /**
   * Provides the component-facing character use cases and reactive collection signal.
   * The component never reaches through this service to access the FeatureCell directly.
   */
  readonly #exampleService = inject(ExampleService);

  /** Provides the singleton stream and controls for application-level Vault errors. */
  readonly #globalErrorService = VaultErrorService();

  /** Creates the non-nullable reactive form used by the character editor. */
  readonly #formBuilder = inject(FormBuilder);

  /** Prevents later collection emissions from replacing the user's current selection. */
  #hasInitializedSelection = false;

  /** Remembers the selected identity so canceling create mode can restore the prior editor. */
  #selectedCharacterBeforeCreate: number | null = null;

  /** Supplies the fixed faction choices rendered by both create and edit modes. */
  protected readonly factions = [
    'Galactic Empire',
    'Jedi Order',
    'Rebel Alliance',
    'Sith Order',
    'Unaffiliated'
  ] as const;

  /**
   * References the service's computed character collection for direct reactive template reads.
   * FeatureCell value changes therefore propagate without a manual subscription in this component.
   */
  protected readonly characters = this.#exampleService.characters;

  /** Exposes the FeatureCell loading signal so the template can cover the current selection. */
  protected readonly state = this.#exampleService.state;

  /** Displays the immutable tutorial constant before any FeatureCell operations modify state. */
  protected readonly originalStateJson = JSON.stringify(
    STAR_WARS_CHARACTERS,
    null,
    2
  );

  /** Displays the executable pure filter source*/
  protected readonly filterSource = `export const removeUnknownLastNameFilter: FilterFunction<readonly StarWarsCharacterState[]> =
  (characters) => characters.filter(({ lastName }) => lastName !== 'unknown');"
 `;

  /** Displays the executable delegating-reducer source */
  protected readonly reducer1Source = `#deriveForceSensitiveDisplay(characters: readonly StarWarsCharacterState[]): readonly StarWarsCharacterState[] {
  return characters.map((character) => ({
    ...character,
    forceSensitiveDisplay: character.isForceSensitive ? 'Yes' : 'No'
  }));
`;

  /** Displays the executable factory-generated reducer source. */
  protected readonly reducer2Source = `export function withCharactersSortedByLastName(): ReducerFunction<readonly StarWarsCharacterState[]> {
  return (characters) =>
    [...characters].sort((left, right) =>
      left.lastName.localeCompare(right.lastName)
    );
}`;

  /** Serializes the filtered candidate observed by the latest Before Tap callback. */
  protected readonly beforeTapInputJson = computed(
    () =>
      JSON.stringify(this.#exampleService.beforeTapInput(), null, 2) ??
      'undefined'
  );

  /** Serializes the transformed candidate observed by the latest After Tap callback. */
  protected readonly afterTapInputJson = computed(
    () =>
      JSON.stringify(this.#exampleService.afterTapInput(), null, 2) ??
      'undefined'
  );

  /** Serializes the finalized StateSnapshot observed by the latest emit-state callback. */
  protected readonly emittedStateJson = computed(() => {
    const snapshot = this.#exampleService.emittedState();

    if (!snapshot) {
      return 'undefined';
    }

    return JSON.stringify(
      {
        ...snapshot,
        value: snapshot.value === undefined ? 'undefined' : snapshot.value
      },
      null,
      2
    );
  });

  /**
   * Serializes the complete FeatureCell StateSnapshot for the Raw StateSnapshot teaching output.
   * Reading each state signal keeps the value, loading, error, and presence fields reactive.
   */
  protected readonly rawStateJson = computed(() => {
    const value = this.state.value();

    return JSON.stringify(
      {
        isLoading: this.state.isLoading(),
        value: value === undefined ? 'undefined' : value,
        error: this.state.error(),
        hasValue: this.state.hasValue()
      },
      null,
      2
    );
  });

  /** Holds the complete serialized StateSnapshot received from the latest FeatureCell `state$` emission. */
  protected readonly rawStateStreamJson = signal('undefined');

  /** Holds the identity currently selected by the character picker, or `null` when none is selected. */
  protected readonly selectedCharacterId = signal<number | null>(null);

  /** Tracks whether the editor should create a character or update the selected character. */
  protected readonly editorMode = signal<EditorMode>('edit');

  /** Exposes the latest operation result for the template's accessible feedback region. */
  protected readonly feedback = signal<OperationFeedback | null>(null);

  /** Holds the active application-level Vault error until the user clears it. */
  protected readonly globalError = signal<VaultErrorShape | null>(null);

  /** Tracks permanent FeatureCell teardown so the UI can explain the required recovery. */
  protected readonly featureCellDestroyed = signal(false);

  /** Tracks the manually controlled request so only its valid next action is visible. */
  protected readonly promisePending = signal(false);

  /** Holds the character awaiting explicit confirmation before removal. */
  protected readonly deleteCandidate = signal<StarWarsCharacterState | null>(
    null
  );

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
    this.#exampleService.state$
      .pipe(takeUntilDestroyed())
      .subscribe(({ snapshot }) => {
        this.rawStateStreamJson.set(
          JSON.stringify(
            {
              ...snapshot,
              value: snapshot.value === undefined ? 'undefined' : snapshot.value
            },
            null,
            2
          )
        );
      });

    this.#globalErrorService.error$
      .pipe(takeUntilDestroyed())
      .subscribe((error: VaultErrorShape | null) => {
        this.globalError.set(
          error && this.#globalErrorService.hasError ? error : null
        );
      });

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
   * Clears the active application-level error after the user acknowledges it.
   * The singleton emits `null`, which also removes the error message from the template.
   * @returns Nothing; the global error service and reactive UI state are cleared.
   */
  protected clearGlobalError(): void {
    this.#globalErrorService.clear();
  }

  /**
   * Creates a validator that trims text before enforcing required, minimum, and maximum lengths.
   * @param minimum - Smallest accepted number of non-whitespace characters.
   * @param maximum - Largest accepted number of non-whitespace characters.
   * @returns An Angular validator that reports the matching validation error or `null`.
   */
  #trimmedTextLength(minimum: number, maximum: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = String(control.value ?? '').trim();

      if (!value) {
        return { required: true };
      }

      if (value.length < minimum) {
        return {
          minlength: { actualLength: value.length, requiredLength: minimum }
        };
      }

      if (value.length > maximum) {
        return {
          maxlength: { actualLength: value.length, requiredLength: maximum }
        };
      }

      return null;
    };
  }

  /**
   * Resolves a picker value to a known character and opens that character in edit mode.
   * Unknown identities are ignored so stale or invalid option values cannot disturb the editor.
   * @param value - Character identity received from the select element.
   * @returns Nothing; selection, form, and feedback signals are updated in place.
   */
  protected selectCharacter(value: string): void {
    const id = Number(value);
    const character = this.characters().find(
      (candidate) => candidate.id === id
    );

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
        this.feedback.set({
          message: 'The new character was discarded.',
          tone: 'info'
        });
        return;
      }
    }

    const character = this.selectedCharacter();

    if (character) {
      this.editorMode.set('edit');
      this.#patchForm(character);
      this.feedback.set({
        message: 'Unsaved changes were discarded.',
        tone: 'info'
      });
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
      this.feedback.set({
        message: 'Correct the highlighted fields before saving.',
        tone: 'error'
      });
      return;
    }

    const formValue = this.characterForm.getRawValue();
    const normalizedCharacter = {
      name: formValue.name.trim(),
      lastName: formValue.lastName.trim(),
      faction: formValue.faction,
      isForceSensitive: formValue.isForceSensitive
    };

    if (this.editorMode() === 'create') {
      const character =
        this.#exampleService.createCharacter(normalizedCharacter);

      this.selectedCharacterId.set(character.id);
      this.#selectedCharacterBeforeCreate = null;
      this.editorMode.set('edit');
      this.#patchForm(character);
      this.feedback.set({
        message: `${this.#displayName(character)} was added and selected.`,
        tone: 'success'
      });
      return;
    }

    const selectedId = this.selectedCharacterId();

    if (selectedId === null) {
      this.feedback.set({
        message: 'Select a character before saving changes.',
        tone: 'error'
      });
      return;
    }

    const updatedCharacter = this.#exampleService.updateCharacter(
      selectedId,
      normalizedCharacter
    );

    this.#patchForm(updatedCharacter);
    this.feedback.set({
      message: `${this.#displayName(updatedCharacter)} was updated.`,
      tone: 'success'
    });
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

    this.feedback.set({
      message: `${this.#displayName(character)} was removed.`,
      tone: 'success'
    });
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
    this.#exampleService.resetState();
    this.#clearCharacterForm();
  }

  /**
   * Starts the deferred Promise merge and exposes its Resolve Promise control.
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
    const resolvePromise = this.#exampleService.getPromiseResolver();

    if (!resolvePromise) {
      return;
    }

    resolvePromise();
    this.promisePending.set(false);
  }

  /**
   * Delegates permanent FeatureCell teardown, clears the form, and exposes the terminal UI state.
   * @returns Nothing; the FeatureCell and its runtime resources are permanently finalized.
   */
  protected destroyFeatureCell(): void {
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

    this.feedback.set({
      message: 'The initial character collection was restored.',
      tone: 'success'
    });
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
   * Exposes character-name formatting to the template without exposing a private helper.
   * @param character - Character whose first and last names should be combined.
   * @returns The display name used in picker options, messages, and headings.
   */
  protected displayName(character: StarWarsCharacterState): string {
    return this.#displayName(character);
  }

  /**
   * Combines the character's name fields into the consistent label used by the component.
   * @param character - Character whose name fields should be formatted.
   * @returns The character's first and last names separated by one space.
   */
  #displayName(character: StarWarsCharacterState): string {
    return `${character.name} ${character.lastName}`;
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
  #patchForm(character: StarWarsCharacterState): void {
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
