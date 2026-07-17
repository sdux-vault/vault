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
import { StarWarsCharacterState } from '../../../examples/star-wars-character.state';
import { ExampleService } from './example.service';

type EditorMode = 'create' | 'edit';
type FeedbackTone = 'error' | 'info' | 'success';

interface OperationFeedback {
  readonly message: string;
  readonly tone: FeedbackTone;
}

@Component({
  selector: 'sdux-star-wars-character-example',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {
  readonly #exampleService = inject(ExampleService);

  readonly #formBuilder = inject(FormBuilder);
  #hasInitializedSelection = false;
  #selectedCharacterBeforeCreate: number | null = null;

  protected readonly factions = [
    'Galactic Empire',
    'Jedi Order',
    'Rebel Alliance',
    'Sith Order',
    'Unaffiliated'
  ] as const;

  protected readonly characters = this.#exampleService.characters;
  protected readonly selectedCharacterId = signal<number | null>(null);
  protected readonly editorMode = signal<EditorMode>('edit');
  protected readonly feedback = signal<OperationFeedback | null>(null);
  protected readonly deleteCandidate = signal<StarWarsCharacterState | null>(
    null
  );

  protected readonly selectedCharacter = computed(() => {
    const selectedId = this.selectedCharacterId();
    return this.characters().find(({ id }) => id === selectedId) ?? null;
  });

  protected readonly editorTitle = computed(() =>
    this.editorMode() === 'create' ? 'Add a character' : 'Update character'
  );

  protected readonly submitLabel = computed(() =>
    this.editorMode() === 'create' ? 'Add character' : 'Save changes'
  );

  protected readonly characterForm = this.#formBuilder.nonNullable.group({
    name: ['', [this.#trimmedTextLength(2, 40)]],
    lastName: ['', [this.#trimmedTextLength(2, 40)]],
    faction: ['', Validators.required],
    isJedi: [false]
  });

  constructor() {
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

  protected startCreate(): void {
    if (this.editorMode() !== 'create') {
      this.#selectedCharacterBeforeCreate = this.selectedCharacterId();
    }

    this.selectedCharacterId.set(null);
    this.editorMode.set('create');
    this.deleteCandidate.set(null);
    this.feedback.set(null);
    this.characterForm.reset({
      name: '',
      lastName: '',
      faction: '',
      isJedi: false
    });
    this.characterForm.markAsPristine();
    this.characterForm.markAsUntouched();
  }

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
      isJedi: formValue.isJedi
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

  protected requestDelete(): void {
    const character = this.selectedCharacter();

    if (character) {
      this.deleteCandidate.set(character);
      this.feedback.set(null);
    }
  }

  protected cancelDelete(): void {
    this.deleteCandidate.set(null);
  }

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
    this.characterForm.reset({
      name: '',
      lastName: '',
      faction: '',
      isJedi: false
    });

    this.feedback.set({
      message: `${this.#displayName(character)} was removed.`,
      tone: 'success'
    });
  }

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

  protected displayName(character: StarWarsCharacterState): string {
    return this.#displayName(character);
  }

  #displayName(character: StarWarsCharacterState): string {
    return `${character.name} ${character.lastName}`;
  }

  #patchForm(character: StarWarsCharacterState): void {
    this.characterForm.setValue({
      name: character.name,
      lastName: character.lastName,
      faction: character.faction,
      isJedi: character.isJedi
    });
    this.characterForm.markAsPristine();
    this.characterForm.markAsUntouched();
  }
}
