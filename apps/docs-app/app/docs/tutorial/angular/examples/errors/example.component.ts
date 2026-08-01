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
import {
  EditorMode,
  ExampleCharacterEditor,
  OperationFeedback
} from './example.character-editor';
import { ExampleService } from './example.service';
import type { StarWarsCharacter } from './star-wars-character.shape';

/**
 * Coordinates CRUD interactions and the tutorial's error-observation outputs.
 * The component owns presentation state such as selection, editor mode, form state, feedback,
 * and global error display, while the service remains the only place that mutates Feature State.
 * **Architectural Boundary:** The component owns local UI behavior while the service owns
 * FeatureCell access, pipeline registration, and committed collection State.
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
  /** Exposes shared editor validation, labels, and feedback wording. */
  readonly editor = new ExampleCharacterEditor();

  /**
   * Provides the component-facing character use cases and reactive collection signal.
   * The component never reaches through this service to access the FeatureCell directly.
   */
  readonly #exampleService = inject(ExampleService);

  /** Provides the singleton stream and controls for application-level Vault errors. */
  readonly #globalErrorService = VaultErrorService();

  /** Creates the non-nullable reactive form used by the create and edit flows. */
  readonly #formBuilder = inject(FormBuilder);

  /** Prevents later collection emissions from replacing the user's current selection. */
  #hasInitializedSelection = false;

  /** Remembers the selected identity so canceling create mode can restore the prior editor. */
  #selectedCharacterBeforeCreate: number | null = null;

  /**
   * Projects the current FeatureCell value into a read-only Angular computed signal.
   * The empty-array fallback gives templates a stable collection before a value is available.
   */
  readonly characters = computed<readonly StarWarsCharacter[]>(
    () => this.#exampleService.state.value() ?? []
  );

  /** Holds the identity currently selected by the character picker, or `null` when none is selected. */
  protected readonly selectedCharacterId = signal<number | null>(null);

  /** Tracks whether the editor should create a character or update the selected character. */
  protected readonly editorMode = signal<EditorMode>('edit');

  /** Exposes the latest operation result for the template's accessible feedback region. */
  protected readonly feedback = signal<OperationFeedback | null>(null);

  /**
   * Resolves the selected identity against the latest reactive character collection.
   * Returning `null` keeps the template safe when the character was removed or never existed.
   */
  protected readonly selectedCharacter = computed(() => {
    const selectedId = this.selectedCharacterId();
    return this.characters().find(({ id }) => id === selectedId) ?? null;
  });

  /** Defines the non-nullable form model and validation rules shared by create and edit flows. */
  protected readonly characterForm = this.#formBuilder.nonNullable.group({
    name: ['', [this.#trimmedTextLength(2, 40)]],
    lastName: ['', [this.#trimmedTextLength(2, 40)]],
    faction: ['', Validators.required],
    isForceSensitive: [false]
  });

  /** Watches the reactive collection and selects its first character when initial state arrives. */
  constructor() {
    this.#observeInitialSelection();

    this.#observeGlobalErrors();
  }

  /** Serializes the finalized error and StateSnapshot observed by the latest error callback. */
  protected readonly errorEmissionJson = computed(() =>
    this.editor.serializeErrorEmission(this.#exampleService.emittedError())
  );

  /** Holds the active application-level Vault error until the user clears it. */
  protected readonly globalError = signal<VaultErrorShape | null>(null);

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
   * Clears the active application-level error after the user acknowledges it.
   * The singleton emits `null`, which also removes the error message from the template.
   * @returns Nothing; the global error service and reactive UI state are cleared.
   */
  protected clearGlobalError(): void {
    this.#exampleService.clearEmittedError();
    this.#globalErrorService.clear();
  }

  /** Reflects whether the tutorial's intentional inline-filter failure is armed. */
  protected readonly isThrowError = this.#exampleService.isThrowError;

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
   * Resolves a picker value to a known character identity in the current SDuX-managed collection.
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
    this.feedback.set(null);
    this.#patchForm(character);
  }

  /**
   * Validates and normalizes form values before delegating create or update work to the service.
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
   * Resolves the stable label used in messages and template fallbacks.
   * @param character - Raw or reduced character whose display label should be returned.
   * @returns A stable full-name label composed from the current character fields.
   */
  #characterLabel(character: StarWarsCharacter): string {
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

  /** Holds the character awaiting explicit confirmation before removal. */
  protected readonly deleteCandidate = signal<StarWarsCharacter | null>(null);

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

  /** Derives the editor heading from the current mode so the template stays declarative. */
  protected readonly editorTitle = computed(() =>
    this.editorMode() === 'create' ? 'Add a character' : 'Update character'
  );

  /** Derives the submit-button label from the operation that saving will perform. */
  protected readonly submitLabel = computed(() =>
    this.editorMode() === 'create' ? 'Add character' : 'Save changes'
  );

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
}
