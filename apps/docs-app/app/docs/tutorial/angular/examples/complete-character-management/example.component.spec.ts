import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { withArrayAppendMergeBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import {
  VaultErrorService,
  VaultPrivateErrorService
} from '@sdux-vault/shared';
import type { VaultErrorShape } from '@sdux-vault/shared';
import { STAR_WARS_CHARACTERS } from '../../../examples/star-wars-character.constant';
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
      isForceSensitive: true
    },
    {
      id: 2,
      name: 'Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    }
  ];
  const initialCharactersWithDisplay: readonly StarWarsCharacterState[] = [
    {
      ...initialCharacters[1]!,
      forceSensitiveDisplay: 'No'
    },
    {
      ...initialCharacters[0]!,
      forceSensitiveDisplay: 'Yes'
    }
  ];

  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;
  let service: ExampleService;

  const configureComponent = async (
    initialState: readonly StarWarsCharacterState[] = initialCharacters,
    renderTemplate = false
  ): Promise<void> => {
    const testingModule = TestBed.configureTestingModule({
      imports: [ExampleComponent],
      providers: [
        provideVaultTesting(),
        provideZonelessChangeDetection(),
        provideFeatureCell(ExampleService, { key, initialState }, [
          withArrayAppendMergeBehavior
        ])
      ]
    });

    if (!renderTemplate) {
      testingModule.overrideComponent(ExampleComponent, {
        set: { template: '' }
      });
    }

    await testingModule.compileComponents();

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
      isForceSensitive: boolean;
    }> = {}
  ): void => {
    component['characterForm'].setValue({
      name: values.name ?? 'Han',
      lastName: values.lastName ?? 'Solo',
      faction: values.faction ?? 'Rebel Alliance',
      isForceSensitive: values.isForceSensitive ?? false
    });
  };

  const expectClearedForm = (): void => {
    expect(component['characterForm'].getRawValue()).toEqual({
      name: '',
      lastName: '',
      faction: '',
      isForceSensitive: false
    });
    expect(component['characterForm'].pristine).toBeTrue();
    expect(component['characterForm'].untouched).toBeTrue();
  };

  it('should initialize its read model and editor from the first character', async () => {
    await configureComponent();

    expect(component['characters']()).toEqual(initialCharactersWithDisplay);
    expect(component['selectedCharacterId']()).toBe(2);
    expect(component['selectedCharacter']()).toEqual(
      initialCharactersWithDisplay[0]!
    );
    expect(component['editorMode']()).toBe('edit');
    expect(component['editorTitle']()).toBe('Update character');
    expect(component['submitLabel']()).toBe('Save changes');
    expect(component['characterForm'].getRawValue()).toEqual({
      name: 'Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    expect(component['displayName'](initialCharacters[0]!)).toBe(
      'Luke Skywalker'
    );
  });

  it('should expose the original State, filter, and reducer teaching sources', async () => {
    await configureComponent();
    const replaceNewLines = (value: string): string =>
      value.replace(/\r?\n/g, ' ');

    expect(replaceNewLines(component['originalStateJson'])).toBe(
      replaceNewLines(JSON.stringify(STAR_WARS_CHARACTERS, null, 2))
    );
    expect(replaceNewLines(component['filterSource'])).toBe(
      replaceNewLines(`export const removeUnknownLastNameFilter: FilterFunction<readonly StarWarsCharacterState[]> =
  (characters) => characters.filter(({ lastName }) => lastName !== 'unknown');"
 `)
    );
    expect(replaceNewLines(component['reducer1Source'])).toBe(
      replaceNewLines(`#deriveForceSensitiveDisplay(characters: readonly StarWarsCharacterState[]): readonly StarWarsCharacterState[] {
  return characters.map((character) => ({
    ...character,
    forceSensitiveDisplay: character.isForceSensitive ? 'Yes' : 'No'
  }));
`)
    );
    expect(replaceNewLines(component['reducer2Source'])).toBe(
      replaceNewLines(`export function withCharactersSortedByLastName(): ReducerFunction<readonly StarWarsCharacterState[]> {
  return (characters) =>
    [...characters].sort((left, right) =>
      left.lastName.localeCompare(right.lastName)
    );
}`)
    );
  });

  it('should recompute the serialized raw state after a state change', async () => {
    await configureComponent();

    expect(JSON.parse(component['rawStateJson']())).toEqual({
      isLoading: false,
      value: initialCharactersWithDisplay,
      error: null,
      hasValue: true
    });

    const character = service.createCharacter({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    await vaultSettled(key);

    expect(JSON.parse(component['rawStateJson']())).toEqual({
      isLoading: false,
      value: [
        ...initialCharactersWithDisplay,
        { ...character, forceSensitiveDisplay: 'No' }
      ],
      error: null,
      hasValue: true
    });
  });

  it('should update the serialized raw state from state$ emissions', async () => {
    await configureComponent();

    const character = service.createCharacter({
      name: 'Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isForceSensitive: true
    });
    await vaultSettled(key);

    expect(JSON.parse(component['rawStateStreamJson']())).toEqual({
      isLoading: false,
      value: [
        initialCharactersWithDisplay[0]!,
        { ...character, forceSensitiveDisplay: 'Yes' },
        initialCharactersWithDisplay[1]!
      ],
      error: null,
      hasValue: true
    });
  });

  it('should display the filtered Before Tap input before reducers transform it', async () => {
    await configureComponent();

    expect(JSON.parse(component['beforeTapInputJson']())).toEqual(
      initialCharacters
    );
    expect(component['characters']()).toEqual(initialCharactersWithDisplay);
  });

  it('should display the transformed After Tap input after reducers finish', async () => {
    await configureComponent();

    expect(JSON.parse(component['afterTapInputJson']())).toEqual(
      initialCharactersWithDisplay
    );
    expect(component['characters']()).toEqual(initialCharactersWithDisplay);
  });

  it('should display the finalized StateSnapshot from state emission', async () => {
    await configureComponent();

    expect(JSON.parse(component['emittedStateJson']())).toEqual({
      isLoading: false,
      value: initialCharactersWithDisplay,
      error: null,
      hasValue: true
    });
  });

  it('should serialize an absent state value as undefined', async () => {
    await configureComponent();

    service.persistNullValue();
    await vaultSettled(key);

    expect(JSON.parse(component['rawStateJson']())).toEqual(
      jasmine.objectContaining({
        isLoading: false,
        value: 'undefined',
        error: jasmine.objectContaining({
          message:
            '[vault] Reducer stage received undefined state in FeatureCell "star-wars-character", but reducers are registered.',
          featureCellKey: key
        }),
        hasValue: false
      })
    );
    expect(JSON.parse(component['rawStateStreamJson']())).toEqual(
      jasmine.objectContaining({
        isLoading: false,
        value: 'undefined',
        error: jasmine.objectContaining({
          message:
            '[vault] Reducer stage received undefined state in FeatureCell "star-wars-character", but reducers are registered.',
          featureCellKey: key
        }),
        hasValue: false
      })
    );
  });

  it('should display and clear an active global error', async () => {
    const privateErrorService = VaultPrivateErrorService();
    const globalErrorService = VaultErrorService();
    const clear = spyOn(globalErrorService, 'clear').and.callThrough();
    const error: VaultErrorShape = {
      message: 'The pipeline failed.',
      featureCellKey: key,
      timestamp: Date.now(),
      raw: new Error('The pipeline failed.')
    };

    privateErrorService.clear();
    await configureComponent();
    privateErrorService.setError(error);

    expect(component['globalError']()).toBe(error);

    component['clearGlobalError']();

    expect(clear).toHaveBeenCalledOnceWith();
    expect(component['globalError']()).toBeNull();
  });

  it('should select a valid character and ignore an unknown ID', async () => {
    await configureComponent();
    component['deleteCandidate'].set(initialCharacters[0]!);
    component['feedback'].set({ message: 'Existing', tone: 'info' });

    component['selectCharacter']('999');

    expect(component['selectedCharacterId']()).toBe(2);

    component['selectCharacter']('2');

    expect(component['selectedCharacterId']()).toBe(2);
    expect(component['selectedCharacter']()).toEqual(
      initialCharactersWithDisplay[0]!
    );
    expect(component['editorMode']()).toBe('edit');
    expect(component['deleteCandidate']()).toBeNull();
    expect(component['feedback']()).toBeNull();
    expect(component['characterForm'].getRawValue()).toEqual({
      name: 'Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isForceSensitive: false
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
      isForceSensitive: false
    });
    expect(component['characterForm'].pristine).toBeTrue();
    expect(component['characterForm'].untouched).toBeTrue();

    component['cancelEdit']();

    expect(component['selectedCharacterId']()).toBe(2);
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

    expect(component['characterForm'].controls.name.value).toBe('Leia');
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

    component['characterForm'].controls.name.setValue(
      null as unknown as string
    );
    expect(
      component['characterForm'].controls.name.hasError('required')
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
      isForceSensitive: false,
      forceSensitiveDisplay: 'No'
    });
    expect(component['selectedCharacterId']()).toBe(3);
    expect(component['editorMode']()).toBe('edit');
    expect(component['characterForm'].getRawValue()).toEqual({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
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

    expect(service.characters()[0]).toEqual({
      id: 2,
      name: 'General Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isForceSensitive: false,
      forceSensitiveDisplay: 'No'
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

    expect(component['deleteCandidate']()).toEqual(
      initialCharactersWithDisplay[0]!
    );
    expect(component['feedback']()).toBeNull();

    component['cancelDelete']();
    expect(component['deleteCandidate']()).toBeNull();

    component['requestDelete']();
    component['confirmDelete']();
    await vaultSettled(key);

    expect(service.characters()).toEqual([initialCharactersWithDisplay[1]!]);
    expect(component['deleteCandidate']()).toBeNull();
    expect(component['selectedCharacterId']()).toBeNull();
    expect(component['editorMode']()).toBe('create');
    expect(component['characterForm'].getRawValue()).toEqual({
      name: '',
      lastName: '',
      faction: '',
      isForceSensitive: false
    });
    expect(component['feedback']()).toEqual({
      message: 'Leia Organa was removed.',
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

    expect(service.characters()).toEqual(initialCharactersWithDisplay);
    expect(component['selectedCharacterId']()).toBe(2);
    expect(component['editorMode']()).toBe('edit');
    expect(component['deleteCandidate']()).toBeNull();
    expect(component['characterForm'].controls.name.value).toBe('Leia');
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

  it('should delegate persisting null to the service', async () => {
    await configureComponent();
    const persistNullValue = spyOn(service, 'persistNullValue');
    setValidForm();

    component['persistNullValue']();

    expect(persistNullValue).toHaveBeenCalledOnceWith();
    expectClearedForm();
  });

  it('should delegate resetting state to the service', async () => {
    await configureComponent();
    const resetState = spyOn(service, 'resetState');
    setValidForm();

    component['resetState']();

    expect(resetState).toHaveBeenCalledOnceWith();
    expectClearedForm();
  });

  it('should delegate Promise request and resolution while tracking its pending state', async () => {
    await configureComponent();
    const fetchWithPromise = spyOn(service, 'fetchWithPromise');
    const resolve = jasmine.createSpy('resolvePromise');
    const getPromiseResolver = spyOn(
      service,
      'getPromiseResolver'
    ).and.returnValue(resolve);

    component['fetchWithPromise']();

    expect(fetchWithPromise).toHaveBeenCalledOnceWith();
    expect(component['promisePending']()).toBeTrue();

    component['resolvePromise']();

    expect(getPromiseResolver).toHaveBeenCalledOnceWith();
    expect(resolve).toHaveBeenCalledOnceWith();
    expect(component['promisePending']()).toBeFalse();
  });

  it('should keep the Resolve Promise action visible when no resolver is available', async () => {
    await configureComponent();
    spyOn(service, 'getPromiseResolver').and.returnValue(null);
    component['promisePending'].set(true);

    component['resolvePromise']();

    expect(component['promisePending']()).toBeTrue();
  });

  it('should switch Promise buttons and display the spinner until resolution', async () => {
    await configureComponent(initialCharacters, true);
    const element = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(element.querySelectorAll('button'));
    const fetchButton = buttons.find(
      ({ textContent }) => textContent?.trim() === 'Fetch with Promise'
    )!;
    const resolveButton = buttons.find(
      ({ textContent }) => textContent?.trim() === 'Resolve Promise'
    )!;

    expect(fetchButton.hidden).toBeFalse();
    expect(resolveButton.hidden).toBeTrue();

    fetchButton.click();
    await new Promise((resolve) => setTimeout(resolve));
    fixture.detectChanges();

    expect(fetchButton.hidden).toBeTrue();
    expect(resolveButton.hidden).toBeFalse();
    expect(service.state.isLoading()).toBeTrue();
    expect(
      element.querySelector('[aria-label="Loading characters"]')
    ).not.toBeNull();

    resolveButton.click();
    fixture.detectChanges();

    expect(fetchButton.hidden).toBeFalse();
    expect(resolveButton.hidden).toBeTrue();

    await vaultSettled(key);
    fixture.detectChanges();

    expect(service.state.isLoading()).toBeFalse();
    expect(
      element.querySelector('[aria-label="Loading characters"]')
    ).toBeNull();
    expect(service.characters()).toEqual([
      {
        id: 102,
        name: 'Din',
        lastName: 'Djarin',
        faction: 'Unaffiliated',
        isForceSensitive: false,
        forceSensitiveDisplay: 'No'
      },
      ...initialCharactersWithDisplay,
      {
        id: 101,
        name: 'Ahsoka',
        lastName: 'Tano',
        faction: 'Jedi Order',
        isForceSensitive: true,
        forceSensitiveDisplay: 'Yes'
      }
    ]);
  });

  it('should delegate FeatureCell destruction to the service', async () => {
    await configureComponent();
    const destroyFeatureCell = spyOn(service, 'destroyFeatureCell');
    setValidForm();

    component['destroyFeatureCell']();

    expect(destroyFeatureCell).toHaveBeenCalledOnceWith();
    expectClearedForm();
    expect(component['featureCellDestroyed']()).toBeTrue();
  });

  it('should open the Tab Sync example in a new browser tab', async () => {
    await configureComponent();
    const open = spyOn(window, 'open');

    component['viewTabSync']();

    expect(open).toHaveBeenCalledOnceWith(
      window.location.href,
      '_blank',
      'noopener'
    );
  });
});
