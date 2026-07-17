import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { withArrayAppendMergeBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { StarWarsCharacterState } from '../../../examples/star-wars-character.state';
import { ExampleComponent } from './example.component';
import { ExampleService } from './example.service';

describe('ExampleComponent', () => {
  const key = 'star-wars-character';
  const initialCharacters: readonly StarWarsCharacterState[] = [
    {
      id: 1,
      name: 'Luke',
      lastName: 'Skywalker',
      faction: 'Jedi Order',
      isJedi: true
    },
    {
      id: 2,
      name: 'Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isJedi: false
    }
  ];

  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;
  let service: ExampleService;

  const configureComponent = async (
    initialState: readonly StarWarsCharacterState[] = initialCharacters
  ): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ExampleComponent],
      providers: [
        provideVaultTesting(),
        provideZonelessChangeDetection(),
        provideFeatureCell(ExampleService, { key, initialState }, [
          withArrayAppendMergeBehavior
        ])
      ]
    })
      .overrideComponent(ExampleComponent, {
        set: { template: '' }
      })
      .compileComponents();

    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ExampleService);
    fixture.detectChanges();
    await vaultSettled(key);
    await fixture.whenStable();
    fixture.detectChanges();
  };

  const setValidForm = (
    values: Partial<{
      name: string;
      lastName: string;
      faction: string;
      isJedi: boolean;
    }> = {}
  ): void => {
    component['characterForm'].setValue({
      name: values.name ?? 'Han',
      lastName: values.lastName ?? 'Solo',
      faction: values.faction ?? 'Rebel Alliance',
      isJedi: values.isJedi ?? false
    });
  };

  it('should initialize its read model and editor from the first character', async () => {
    await configureComponent();

    expect(component['characters']()).toEqual(initialCharacters);
    expect(component['selectedCharacterId']()).toBe(1);
    expect(component['selectedCharacter']()).toEqual(initialCharacters[0]!);
    expect(component['editorMode']()).toBe('edit');
    expect(component['editorTitle']()).toBe('Update character');
    expect(component['submitLabel']()).toBe('Save changes');
    expect(component['characterForm'].getRawValue()).toEqual({
      name: 'Luke',
      lastName: 'Skywalker',
      faction: 'Jedi Order',
      isJedi: true
    });
    expect(component['displayName'](initialCharacters[0]!)).toBe(
      'Luke Skywalker'
    );
  });

  it('should select a valid character and ignore an unknown ID', async () => {
    await configureComponent();
    component['deleteCandidate'].set(initialCharacters[0]!);
    component['feedback'].set({ message: 'Existing', tone: 'info' });

    component['selectCharacter']('999');

    expect(component['selectedCharacterId']()).toBe(1);

    component['selectCharacter']('2');

    expect(component['selectedCharacterId']()).toBe(2);
    expect(component['selectedCharacter']()).toEqual(initialCharacters[1]!);
    expect(component['editorMode']()).toBe('edit');
    expect(component['deleteCandidate']()).toBeNull();
    expect(component['feedback']()).toBeNull();
    expect(component['characterForm'].getRawValue()).toEqual({
      name: 'Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isJedi: false
    });
  });

  it('should enter create mode and restore the previous selection on cancel', async () => {
    await configureComponent();

    component['startCreate']();
    component['startCreate']();

    expect(component['selectedCharacterId']()).toBeNull();
    expect(component['selectedCharacter']()).toBeNull();
    expect(component['editorMode']()).toBe('create');
    expect(component['editorTitle']()).toBe('Add a character');
    expect(component['submitLabel']()).toBe('Add character');
    expect(component['characterForm'].getRawValue()).toEqual({
      name: '',
      lastName: '',
      faction: '',
      isJedi: false
    });
    expect(component['characterForm'].pristine).toBeTrue();
    expect(component['characterForm'].untouched).toBeTrue();

    component['cancelEdit']();

    expect(component['selectedCharacterId']()).toBe(1);
    expect(component['editorMode']()).toBe('edit');
    expect(component['feedback']()).toEqual({
      message: 'The new character was discarded.',
      tone: 'info'
    });
  });

  it('should discard edits to an existing character', async () => {
    await configureComponent();
    component['characterForm'].patchValue({ name: 'Changed' });
    component['characterForm'].markAsDirty();

    component['cancelEdit']();

    expect(component['characterForm'].controls.name.value).toBe('Luke');
    expect(component['characterForm'].pristine).toBeTrue();
    expect(component['feedback']()).toEqual({
      message: 'Unsaved changes were discarded.',
      tone: 'info'
    });
  });

  it('should validate required, minimum, and maximum form values', async () => {
    await configureComponent();
    component['startCreate']();

    component['saveCharacter']();

    expect(component['characterForm'].touched).toBeTrue();
    expect(component['feedback']()).toEqual({
      message: 'Correct the highlighted fields before saving.',
      tone: 'error'
    });
    expect(
      component['characterForm'].controls.name.hasError('required')
    ).toBeTrue();
    expect(
      component['characterForm'].controls.faction.hasError('required')
    ).toBeTrue();

    component['characterForm'].controls.name.setValue(' A ');
    expect(
      component['characterForm'].controls.name.hasError('minlength')
    ).toBeTrue();

    component['characterForm'].controls.name.setValue('A'.repeat(41));
    expect(
      component['characterForm'].controls.name.hasError('maxlength')
    ).toBeTrue();
  });

  it('should create a normalized character and select it', async () => {
    await configureComponent();
    component['startCreate']();
    setValidForm({ name: '  Han  ', lastName: '  Solo  ' });

    component['saveCharacter']();
    await vaultSettled(key);

    const createdCharacter = service.characters()[2];

    expect(createdCharacter).toEqual({
      id: 3,
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isJedi: false
    });
    expect(component['selectedCharacterId']()).toBe(3);
    expect(component['editorMode']()).toBe('edit');
    expect(component['characterForm'].getRawValue()).toEqual({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isJedi: false
    });
    expect(component['feedback']()).toEqual({
      message: 'Han Solo was added and selected.',
      tone: 'success'
    });
  });

  it('should update the selected character', async () => {
    await configureComponent();
    component['selectCharacter']('2');
    setValidForm({
      name: '  General Leia ',
      lastName: ' Organa  ',
      faction: 'Rebel Alliance'
    });

    component['saveCharacter']();
    await vaultSettled(key);

    expect(service.characters()[1]).toEqual({
      id: 2,
      name: 'General Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isJedi: false
    });
    expect(component['feedback']()).toEqual({
      message: 'General Leia Organa was updated.',
      tone: 'success'
    });
  });

  it('should reject an edit when no character is selected', async () => {
    await configureComponent();
    setValidForm();
    component['selectedCharacterId'].set(null);
    component['editorMode'].set('edit');

    component['saveCharacter']();

    expect(component['feedback']()).toEqual({
      message: 'Select a character before saving changes.',
      tone: 'error'
    });
  });

  it('should request, cancel, and confirm character removal', async () => {
    await configureComponent();

    component['cancelDelete']();
    component['confirmDelete']();
    component['requestDelete']();

    expect(component['deleteCandidate']()).toEqual(initialCharacters[0]!);
    expect(component['feedback']()).toBeNull();

    component['cancelDelete']();
    expect(component['deleteCandidate']()).toBeNull();

    component['requestDelete']();
    component['confirmDelete']();
    await vaultSettled(key);

    expect(service.characters()).toEqual([initialCharacters[1]!]);
    expect(component['deleteCandidate']()).toBeNull();
    expect(component['selectedCharacterId']()).toBeNull();
    expect(component['editorMode']()).toBe('create');
    expect(component['characterForm'].getRawValue()).toEqual({
      name: '',
      lastName: '',
      faction: '',
      isJedi: false
    });
    expect(component['feedback']()).toEqual({
      message: 'Luke Skywalker was removed.',
      tone: 'success'
    });

    component['requestDelete']();
    expect(component['deleteCandidate']()).toBeNull();

    component['cancelEdit']();
    expect(component['editorMode']()).toBe('create');
  });

  it('should restore the initial collection and select its first character', async () => {
    await configureComponent();
    component['requestDelete']();
    component['confirmDelete']();
    await vaultSettled(key);

    component['restoreInitialCharacters']();
    await vaultSettled(key);

    expect(service.characters()).toEqual(initialCharacters);
    expect(component['selectedCharacterId']()).toBe(1);
    expect(component['editorMode']()).toBe('edit');
    expect(component['deleteCandidate']()).toBeNull();
    expect(component['characterForm'].controls.name.value).toBe('Luke');
    expect(component['feedback']()).toEqual({
      message: 'The initial character collection was restored.',
      tone: 'success'
    });
  });

  it('should remain in create mode when restoring an empty initial collection', async () => {
    await configureComponent([]);

    expect(component['selectedCharacterId']()).toBeNull();
    expect(component['selectedCharacter']()).toBeNull();

    component['restoreInitialCharacters']();
    await vaultSettled(key);

    expect(component['characters']()).toEqual([]);
    expect(component['selectedCharacterId']()).toBeNull();
    expect(component['editorMode']()).toBe('create');
    expect(component['feedback']()).toEqual({
      message: 'The initial character collection was restored.',
      tone: 'success'
    });
  });
});
