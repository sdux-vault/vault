import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  withArrayAppendMergeBehavior,
  withStepwiseController,
  withStepwiseFilterBehavior,
  withStepwiseReducerBehavior,
  withStepwiseResolveBehavior
} from '@sdux-vault/addons';
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
import { exampleHydrate } from './example.hydrate';
import { exampleObservable } from './example.observable';
import { examplePromise } from './example.promise';
import {
  EXAMPLE_ENCRYPTED_STORAGE_KEY,
  ExampleService
} from './example.service';

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

  const acceptStepwiseAndSettle = async (): Promise<void> => {
    let settled = false;
    const settledPromise = vaultSettled(key).then(() => {
      settled = true;
    });

    while (!settled) {
      await Promise.race([
        settledPromise,
        new Promise<void>((resolve) => setTimeout(resolve))
      ]);

      if (service.isStepwiseResolvePending()) {
        component['acceptStepwiseResolve']();
        continue;
      }

      if (service.isStepwiseFilterPending()) {
        component['acceptStepwiseFilter']();
        continue;
      }

      if (service.isStepwiseReducerPending()) {
        component['acceptStepwiseReducer']();
      }
    }

    await settledPromise;
  };

  const configureComponent = async (
    initialState: readonly StarWarsCharacterState[] = initialCharacters,
    renderTemplate = false,
    deferHydration = false
  ): Promise<void> => {
    const testingModule = TestBed.configureTestingModule({
      imports: [ExampleComponent],
      providers: [
        provideVaultTesting(),
        provideZonelessChangeDetection(),
        provideFeatureCell(
          ExampleService,
          { key, initialState },
          [
            withArrayAppendMergeBehavior,
            withStepwiseResolveBehavior,
            withStepwiseFilterBehavior,
            withStepwiseReducerBehavior
          ],
          [withStepwiseController]
        )
      ]
    });

    if (!renderTemplate) {
      testingModule.overrideComponent(ExampleComponent, {
        set: { template: '' }
      });
    }

    await testingModule.compileComponents();

    if (!deferHydration) {
      spyOn(exampleHydrate, 'getPromise').and.resolveTo(initialState);
    }

    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ExampleService);
    fixture.detectChanges();

    if (!deferHydration) {
      await acceptStepwiseAndSettle();
      await fixture.whenStable();
    }

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

  it('should expose the State, filter, reducer, and comparison teaching sources', async () => {
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
    expect(replaceNewLines(component['comparisonFunctionSource'])).toBe(
      replaceNewLines(`withDistinctUntilChanged<readonly StarWarsCharacterState[]>(
  (incoming, previous) =>
    incoming.every(({ id }) =>
      previous.some((character) => character.id === id)
    )
)`)
    );
  });

  it('should display and control the active Stepwise Resolve callback', async () => {
    await configureComponent(initialCharacters, true);
    const element = fixture.nativeElement as HTMLElement;
    const resolveColumn =
      element.querySelector<HTMLElement>('.stepwise-column')!;
    const buttons = Array.from(resolveColumn.querySelectorAll('button'));
    const acceptButton = buttons.find(
      ({ textContent }) => textContent?.trim() === 'Accept'
    )!;
    const cancelButton = buttons.find(
      ({ textContent }) => textContent?.trim() === 'Cancel'
    )!;
    const output = resolveColumn.querySelector<HTMLTextAreaElement>(
      '[aria-label="Stepwise Resolve output"]'
    )!;

    expect(acceptButton.disabled).toBeTrue();
    expect(cancelButton.disabled).toBeTrue();
    expect(output.value).not.toBe('');
    expect(element.textContent).not.toContain(
      'Stepwise Resolve is awaiting confirmation.'
    );

    const han = service.createCharacter({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    await new Promise((resolve) => setTimeout(resolve));
    fixture.detectChanges();

    expect(acceptButton.disabled).toBeFalse();
    expect(cancelButton.disabled).toBeFalse();
    expect(JSON.parse(output.value)).toEqual({
      current: initialCharactersWithDisplay,
      candidate: [...initialCharactersWithDisplay, han]
    });
    expect(element.textContent).toContain(
      'Stepwise Resolve is awaiting confirmation.'
    );

    acceptButton.click();
    await acceptStepwiseAndSettle();
    fixture.detectChanges();

    expect(acceptButton.disabled).toBeTrue();
    expect(cancelButton.disabled).toBeTrue();
    expect(element.textContent).not.toContain(
      'Stepwise Resolve is awaiting confirmation.'
    );
    expect(service.characters()).toContain(
      jasmine.objectContaining({ id: han.id, forceSensitiveDisplay: 'No' })
    );

    const committed = service.characters();
    service.createCharacter({
      name: 'Chewbacca',
      lastName: 'Wookiee',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    await new Promise((resolve) => setTimeout(resolve));
    fixture.detectChanges();

    cancelButton.click();
    await vaultSettled(key);
    fixture.detectChanges();

    expect(service.characters()).toEqual(committed);
    expect(acceptButton.disabled).toBeTrue();
    expect(cancelButton.disabled).toBeTrue();
  });

  it('should display and control the active Stepwise Filter callback', async () => {
    await configureComponent(initialCharacters, true);
    const element = fixture.nativeElement as HTMLElement;
    const filterColumn =
      element.querySelectorAll<HTMLElement>('.stepwise-column')[1]!;
    const buttons = Array.from(filterColumn.querySelectorAll('button'));
    const acceptButton = buttons.find(
      ({ textContent }) => textContent?.trim() === 'Accept'
    )!;
    const cancelButton = buttons.find(
      ({ textContent }) => textContent?.trim() === 'Cancel'
    )!;
    const output = filterColumn.querySelector<HTMLTextAreaElement>(
      '[aria-label="Stepwise Filter output"]'
    )!;

    expect(acceptButton.disabled).toBeTrue();
    expect(cancelButton.disabled).toBeTrue();
    expect(element.textContent).not.toContain(
      'Stepwise Filter is awaiting confirmation.'
    );

    const han = service.createCharacter({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    await new Promise((resolve) => setTimeout(resolve));
    component['acceptStepwiseResolve']();
    await new Promise((resolve) => setTimeout(resolve));
    fixture.detectChanges();

    expect(acceptButton.disabled).toBeFalse();
    expect(cancelButton.disabled).toBeFalse();
    expect(JSON.parse(output.value)).toEqual({
      current: initialCharactersWithDisplay,
      candidate: [...initialCharactersWithDisplay, han]
    });
    expect(element.textContent).toContain(
      'Stepwise Filter is awaiting confirmation.'
    );

    acceptButton.click();
    await acceptStepwiseAndSettle();
    fixture.detectChanges();

    expect(service.characters()).toContain(
      jasmine.objectContaining({ id: han.id, forceSensitiveDisplay: 'No' })
    );
    expect(acceptButton.disabled).toBeTrue();
    expect(cancelButton.disabled).toBeTrue();
    expect(element.textContent).not.toContain(
      'Stepwise Filter is awaiting confirmation.'
    );

    const committed = service.characters();
    service.createCharacter({
      name: 'Chewbacca',
      lastName: 'Wookiee',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    await new Promise((resolve) => setTimeout(resolve));
    component['acceptStepwiseResolve']();
    await new Promise((resolve) => setTimeout(resolve));
    fixture.detectChanges();

    cancelButton.click();
    await vaultSettled(key);
    fixture.detectChanges();

    expect(service.characters()).toEqual(committed);
    expect(acceptButton.disabled).toBeTrue();
    expect(cancelButton.disabled).toBeTrue();
  });

  it('should display and control the active Stepwise Reducer callback', async () => {
    await configureComponent(initialCharacters, true);
    const element = fixture.nativeElement as HTMLElement;
    const reducerColumn =
      element.querySelectorAll<HTMLElement>('.stepwise-column')[2]!;
    const buttons = Array.from(reducerColumn.querySelectorAll('button'));
    const acceptButton = buttons.find(
      ({ textContent }) => textContent?.trim() === 'Accept'
    )!;
    const cancelButton = buttons.find(
      ({ textContent }) => textContent?.trim() === 'Cancel'
    )!;
    const output = reducerColumn.querySelector<HTMLTextAreaElement>(
      '[aria-label="Stepwise Reducer output"]'
    )!;

    expect(acceptButton.disabled).toBeTrue();
    expect(cancelButton.disabled).toBeTrue();
    expect(element.textContent).not.toContain(
      'Stepwise Reducer is awaiting confirmation.'
    );

    const han = service.createCharacter({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    await new Promise((resolve) => setTimeout(resolve));
    component['acceptStepwiseResolve']();
    await new Promise((resolve) => setTimeout(resolve));
    component['acceptStepwiseFilter']();
    await new Promise((resolve) => setTimeout(resolve));
    fixture.detectChanges();

    expect(acceptButton.disabled).toBeFalse();
    expect(cancelButton.disabled).toBeFalse();
    expect(JSON.parse(output.value)).toEqual({
      current: initialCharactersWithDisplay,
      candidate: [
        ...initialCharactersWithDisplay,
        { ...han, forceSensitiveDisplay: 'No' }
      ]
    });
    expect(element.textContent).toContain(
      'Stepwise Reducer is awaiting confirmation.'
    );

    acceptButton.click();
    await vaultSettled(key);
    fixture.detectChanges();

    expect(service.characters()).toEqual([
      ...initialCharactersWithDisplay,
      { ...han, forceSensitiveDisplay: 'No' }
    ]);
    expect(acceptButton.disabled).toBeTrue();
    expect(cancelButton.disabled).toBeTrue();
    expect(element.textContent).not.toContain(
      'Stepwise Reducer is awaiting confirmation.'
    );

    const committed = service.characters();
    service.createCharacter({
      name: 'Chewbacca',
      lastName: 'Wookiee',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    await new Promise((resolve) => setTimeout(resolve));
    component['acceptStepwiseResolve']();
    await new Promise((resolve) => setTimeout(resolve));
    component['acceptStepwiseFilter']();
    await new Promise((resolve) => setTimeout(resolve));
    fixture.detectChanges();

    cancelButton.click();
    await vaultSettled(key);
    fixture.detectChanges();

    expect(service.characters()).toEqual(committed);
    expect(acceptButton.disabled).toBeTrue();
    expect(cancelButton.disabled).toBeTrue();
  });

  it('should display the comparison function source in its textarea', async () => {
    await configureComponent(initialCharacters, true);
    const comparisonOutput = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLTextAreaElement>(
      '[aria-label="Comparison Function output"]'
    );

    expect(comparisonOutput).not.toBeNull();
    expect(comparisonOutput!.value).toBe(component['comparisonFunctionSource']);
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
    await acceptStepwiseAndSettle();

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
    await acceptStepwiseAndSettle();

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
    expect(component['errorEmissionJson']()).toBe('undefined');
  });

  it('should serialize an absent state value as undefined', async () => {
    await configureComponent();

    service.persistNullValue();
    await acceptStepwiseAndSettle();

    expect(JSON.parse(component['rawStateJson']())).toEqual(
      jasmine.objectContaining({
        isLoading: false,
        value: 'undefined',
        error: null,
        hasValue: false
      })
    );
    expect(JSON.parse(component['rawStateStreamJson']())).toEqual(
      jasmine.objectContaining({
        isLoading: false,
        value: 'undefined',
        error: null,
        hasValue: false
      })
    );
    expect(JSON.parse(component['emittedStateJson']())).toEqual(
      jasmine.objectContaining({
        isLoading: false,
        value: 'undefined',
        hasValue: false
      })
    );
    expect(component['errorEmissionJson']()).toBe('undefined');
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
    await acceptStepwiseAndSettle();

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
    await acceptStepwiseAndSettle();

    expect(service.characters()[0]).toEqual({
      id: 2,
      name: 'Leia',
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
    await acceptStepwiseAndSettle();

    expect(service.characters()).toEqual(initialCharactersWithDisplay);
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
    await acceptStepwiseAndSettle();

    component['restoreInitialCharacters']();
    await acceptStepwiseAndSettle();

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
    await acceptStepwiseAndSettle();

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

  it('should display only Resolve and Reject controls for pending hydration', async () => {
    await configureComponent(initialCharacters, true, true);
    await new Promise((resolve) => setTimeout(resolve));
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const hydrateControls = element.querySelector(
      '.hydrate-controls'
    ) as HTMLElement;
    const buttons = Array.from(hydrateControls.querySelectorAll('button'));

    expect(buttons.map(({ textContent }) => textContent?.trim())).toEqual([
      'Resolve',
      'Reject'
    ]);
    expect(buttons.every(({ disabled }) => !disabled)).toBeTrue();
    expect(hydrateControls.textContent).not.toContain('Hydrate Model');
    expect(element.textContent).toContain(
      'The initial state hydrate method is awaiting resolve or reject in the Action section'
    );

    buttons[0]!.click();
    fixture.detectChanges();

    expect(buttons.every(({ disabled }) => disabled)).toBeTrue();
    expect(element.textContent).not.toContain(
      'The initial state hydrate method is awaiting resolve or reject in the Action section'
    );

    await acceptStepwiseAndSettle();
    await fixture.whenStable();

    expect(service.state.isLoading()).toBeFalse();
    expect(service.state.error()).toBeNull();
    expect(service.state.hasValue()).toBeTrue();
  });

  it('should reject the pending hydration through its controller', async () => {
    await configureComponent(initialCharacters, false, true);
    await new Promise((resolve) => setTimeout(resolve));

    component['rejectHydration']();
    await acceptStepwiseAndSettle();

    expect(component['hydrationSettled']()).toBeTrue();
    expect(service.state.isLoading()).toBeFalse();
    expect(service.state.hasValue()).toBeFalse();
    expect(service.state.error()?.message).toBe(
      'The character hydration was rejected.'
    );

    VaultPrivateErrorService().clear();
  });

  it('should safely ignore unavailable hydration controllers', async () => {
    await configureComponent();
    spyOn(exampleHydrate, 'getResolve').and.returnValue(null);
    spyOn(exampleHydrate, 'getReject').and.returnValue(null);

    expect(() => component['resolveHydration']()).not.toThrow();
    expect(() => component['rejectHydration']()).not.toThrow();
    expect(component['hydrationSettled']()).toBeFalse();
  });

  it('should delegate Promise request and resolution while tracking its pending state', async () => {
    await configureComponent();
    const fetchWithPromise = spyOn(service, 'fetchWithPromise');
    const resolve = jasmine.createSpy('resolvePromise');
    const getResolve = spyOn(examplePromise, 'getResolve').and.returnValue(
      resolve
    );

    component['fetchWithPromise']();

    expect(fetchWithPromise).toHaveBeenCalledOnceWith();
    expect(component['promisePending']()).toBeTrue();

    component['resolvePromise']();

    expect(getResolve).toHaveBeenCalledOnceWith();
    expect(resolve).toHaveBeenCalledOnceWith();
    expect(component['promisePending']()).toBeFalse();
  });

  it('should delegate Promise rejection while tracking its pending state', async () => {
    await configureComponent();
    const reject = jasmine.createSpy('rejectPromise');
    const getReject = spyOn(examplePromise, 'getReject').and.returnValue(
      reject
    );
    component['promisePending'].set(true);

    component['rejectPromise']();

    expect(getReject).toHaveBeenCalledOnceWith();
    expect(reject).toHaveBeenCalledOnceWith();
    expect(component['promisePending']()).toBeFalse();
  });

  it('should keep the Resolve Promise action visible when no resolver is available', async () => {
    await configureComponent();
    spyOn(examplePromise, 'getResolve').and.returnValue(null);
    component['promisePending'].set(true);

    component['resolvePromise']();

    expect(component['promisePending']()).toBeTrue();
  });

  it('should keep the Promise actions visible when no rejecter is available', async () => {
    await configureComponent();
    spyOn(examplePromise, 'getReject').and.returnValue(null);
    component['promisePending'].set(true);

    component['rejectPromise']();

    expect(component['promisePending']()).toBeTrue();
  });

  it('should keep timing through Promise loading and stop on finalization', async () => {
    await configureComponent();
    const requestAnimationFrame = spyOn(
      window,
      'requestAnimationFrame'
    ).and.returnValue(42);
    const cancelAnimationFrame = spyOn(window, 'cancelAnimationFrame');

    component['fetchWithPromise']();
    await new Promise((resolve) => setTimeout(resolve));

    expect(requestAnimationFrame).toHaveBeenCalledTimes(2);
    expect(service.state.isLoading()).toBeTrue();
    expect(cancelAnimationFrame).toHaveBeenCalledWith(42);

    examplePromise.getResolve()!();
    await acceptStepwiseAndSettle();

    expect(service.state.isLoading()).toBeFalse();
    expect(cancelAnimationFrame).toHaveBeenCalledWith(42);
  });

  it('should delegate the Observable request and emission while tracking its pending state', async () => {
    await configureComponent();
    const addByObservable = spyOn(service, 'addByObservable');
    const emit = jasmine.createSpy('emitObservable');
    const getEmit = spyOn(exampleObservable, 'getEmit').and.returnValue(emit);

    component['addByObservable']();

    expect(addByObservable).toHaveBeenCalledOnceWith();
    expect(component['observablePending']()).toBeTrue();

    component['emitObservable']();

    expect(getEmit).toHaveBeenCalledOnceWith();
    expect(emit).toHaveBeenCalledOnceWith();
    expect(component['observablePending']()).toBeFalse();
  });

  it('should delegate the Observable error while tracking its pending state', async () => {
    await configureComponent();
    const error = jasmine.createSpy('errorObservable');
    const getError = spyOn(exampleObservable, 'getError').and.returnValue(
      error
    );
    component['observablePending'].set(true);

    component['errorObservable']();

    expect(getError).toHaveBeenCalledOnceWith();
    expect(error).toHaveBeenCalledOnceWith();
    expect(component['observablePending']()).toBeFalse();
  });

  it('should keep the Observable actions visible when no emitter is available', async () => {
    await configureComponent();
    spyOn(exampleObservable, 'getEmit').and.returnValue(null);
    component['observablePending'].set(true);

    component['emitObservable']();

    expect(component['observablePending']()).toBeTrue();
  });

  it('should keep the Observable actions visible when no error controller is available', async () => {
    await configureComponent();
    spyOn(exampleObservable, 'getError').and.returnValue(null);
    component['observablePending'].set(true);

    component['errorObservable']();

    expect(component['observablePending']()).toBeTrue();
  });

  it('should delegate the HTTP resource request and stop timing after state$ emits', async () => {
    await configureComponent(initialCharacters, true);
    const fetchWithHttpResource = spyOn(service, 'fetchWithHttpResource');
    const requestAnimationFrame = spyOn(
      window,
      'requestAnimationFrame'
    ).and.returnValue(42);
    const cancelAnimationFrame = spyOn(window, 'cancelAnimationFrame');
    const buttons = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('button')
    );
    const fetchButton = buttons.find(
      ({ textContent }) => textContent?.trim() === 'Replace with httpResource'
    );

    expect(fetchButton).toBeDefined();
    fetchButton!.click();

    expect(fetchWithHttpResource).toHaveBeenCalledOnceWith();
    expect(requestAnimationFrame).toHaveBeenCalledTimes(2);

    service.createCharacter({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    await acceptStepwiseAndSettle();

    expect(cancelAnimationFrame).toHaveBeenCalledWith(42);
  });

  it('should display the configured delay and elapsed timer in milliseconds', async () => {
    await configureComponent(initialCharacters, true);
    const element = fixture.nativeElement as HTMLElement;
    const delayInput = element.querySelector<HTMLInputElement>(
      '[aria-label="Configured delay in milliseconds"]'
    )!;
    const timerInput = element.querySelector<HTMLInputElement>(
      '[aria-label="Elapsed delay timer in milliseconds"]'
    )!;

    expect(delayInput.readOnly).toBeTrue();
    expect(delayInput.valueAsNumber).toBe(3_000);
    expect(timerInput.readOnly).toBeTrue();
    expect(timerInput.valueAsNumber).toBe(0);

    component['delayTimerMilliseconds'].set(1_275);
    fixture.detectChanges();

    expect(timerInput.valueAsNumber).toBe(1_275);
  });

  it('should start timing from each requested pipeline action', async () => {
    await configureComponent(initialCharacters, true);
    const persistNullValue = spyOn(service, 'persistNullValue');
    const fetchWithPromise = spyOn(service, 'fetchWithPromise');
    const addByObservable = spyOn(service, 'addByObservable');
    const fetchWithHttpResource = spyOn(service, 'fetchWithHttpResource');
    const restoreInitialCharacters = spyOn(
      service,
      'restoreInitialCharacters'
    ).and.returnValue(initialCharactersWithDisplay[0]!);
    const requestAnimationFrame = spyOn(
      window,
      'requestAnimationFrame'
    ).and.returnValue(42);
    const buttons = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('button')
    );
    const clickAction = (label: string): void => {
      const button = buttons.find(
        ({ textContent }) => textContent?.trim() === label
      );

      expect(button).withContext(label).toBeDefined();
      button!.click();
    };

    clickAction('Persist Null Value');
    clickAction('Fetch with Promise');
    clickAction('Add by Observable');
    clickAction('Replace with httpResource');
    clickAction('Restore Initial Data');

    expect(persistNullValue).toHaveBeenCalledOnceWith();
    expect(fetchWithPromise).toHaveBeenCalledOnceWith();
    expect(addByObservable).toHaveBeenCalledOnceWith();
    expect(fetchWithHttpResource).toHaveBeenCalledOnceWith();
    expect(restoreInitialCharacters).toHaveBeenCalledOnceWith();
    expect(requestAnimationFrame).toHaveBeenCalledTimes(6);
  });

  it('should delegate both Distinct Until Changed button clicks', async () => {
    await configureComponent(initialCharacters, true);
    const submitSameState = spyOn(service, 'submitSameState');
    const submitChangedState = spyOn(service, 'submitChangedState');
    spyOn(window, 'requestAnimationFrame').and.returnValue(42);
    const buttons = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('button')
    );
    const sameButton = buttons.find(
      ({ textContent }) => textContent?.trim() === 'Submit Same State'
    );
    const changedButton = buttons.find(
      ({ textContent }) => textContent?.trim() === 'Submit Changed State'
    );

    expect(sameButton).toBeDefined();
    expect(changedButton).toBeDefined();

    sameButton!.click();
    changedButton!.click();

    expect(submitSameState).toHaveBeenCalledOnceWith();
    expect(submitChangedState).toHaveBeenCalledOnceWith();
  });

  it('should switch the Throw Error action to Reset Error and disarm it', async () => {
    const globalErrorService = VaultErrorService();
    const clear = spyOn(globalErrorService, 'clear').and.callThrough();
    spyOn(window, 'requestAnimationFrame').and.returnValue(42);
    await configureComponent(initialCharacters, true);
    const errorButton = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('button')
    ).find(({ textContent }) => textContent?.trim() === 'Throw Error');

    expect(errorButton).toBeDefined();

    errorButton!.click();
    fixture.detectChanges();

    expect(service.isThrowError()).toBeTrue();
    expect(errorButton!.textContent?.trim()).toBe('Reset Error');

    await acceptStepwiseAndSettle();
    errorButton!.click();
    fixture.detectChanges();

    expect(service.isThrowError()).toBeFalse();
    expect(clear).toHaveBeenCalledOnceWith();
    expect(errorButton!.textContent?.trim()).toBe('Throw Error');
  });

  it('should refresh the encrypted State output after state$ emits', async () => {
    await configureComponent(initialCharacters, true);
    const encryptedEnvelope = JSON.stringify({
      v: 1,
      alg: 'AES-256-GCM',
      iv: [1, 2, 3],
      data: [4, 5, 6]
    });
    const encryptedOutput = (
      fixture.nativeElement as HTMLElement
    ).querySelector<HTMLTextAreaElement>(
      '[aria-label="Encrypted State output"]'
    )!;

    localStorage.setItem(EXAMPLE_ENCRYPTED_STORAGE_KEY, encryptedEnvelope);
    service.createCharacter({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    await acceptStepwiseAndSettle();
    fixture.detectChanges();

    expect(component['encryptedState']()).toBe(encryptedEnvelope);
    expect(encryptedOutput.value).toBe(encryptedEnvelope);

    localStorage.removeItem(EXAMPLE_ENCRYPTED_STORAGE_KEY);
  });

  it('should switch Promise buttons and display the spinner until resolution', async () => {
    await configureComponent(initialCharacters, true);
    const element = fixture.nativeElement as HTMLElement;
    const promiseControls = element.querySelector(
      '.promise-controls'
    ) as HTMLElement;
    const promiseButtons = Array.from(
      promiseControls.querySelectorAll('button')
    );
    const fetchButton = promiseButtons.find(
      ({ textContent }) => textContent?.trim() === 'Fetch with Promise'
    )!;
    const resolveButton = promiseButtons.find(
      ({ textContent }) => textContent?.trim() === 'Resolve'
    )!;
    const rejectButton = promiseButtons.find(
      ({ textContent }) => textContent?.trim() === 'Reject'
    )!;

    expect(fetchButton.hidden).toBeFalse();
    expect(resolveButton.hidden).toBeTrue();
    expect(rejectButton.hidden).toBeTrue();

    fetchButton.click();
    await new Promise((resolve) => setTimeout(resolve));
    fixture.detectChanges();

    expect(fetchButton.hidden).toBeTrue();
    expect(resolveButton.hidden).toBeFalse();
    expect(rejectButton.hidden).toBeFalse();
    expect(resolveButton.getBoundingClientRect().width).toBe(122.5);
    expect(rejectButton.getBoundingClientRect().width).toBe(122.5);
    expect(rejectButton.classList).toContain('danger');
    expect(promiseControls.getBoundingClientRect().width).toBe(
      promiseControls.parentElement!.getBoundingClientRect().width
    );
    expect(getComputedStyle(promiseControls).justifyContent).toBe(
      'space-between'
    );
    expect(service.state.isLoading()).toBeTrue();
    expect(
      element.querySelector('[aria-label="Loading characters"]')
    ).not.toBeNull();

    resolveButton.click();
    fixture.detectChanges();

    expect(fetchButton.hidden).toBeFalse();
    expect(resolveButton.hidden).toBeTrue();
    expect(rejectButton.hidden).toBeTrue();

    await acceptStepwiseAndSettle();
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

  it('should reject a pending Promise, clear the spinner, and expose the error', async () => {
    VaultPrivateErrorService().clear();
    await configureComponent(initialCharacters, true);
    const element = fixture.nativeElement as HTMLElement;
    const promiseButtons = Array.from(
      element.querySelectorAll<HTMLButtonElement>('.promise-controls button')
    );
    const fetchButton = promiseButtons.find(
      ({ textContent }) => textContent?.trim() === 'Fetch with Promise'
    )!;
    const resolveButton = promiseButtons.find(
      ({ textContent }) => textContent?.trim() === 'Resolve'
    )!;
    const rejectButton = promiseButtons.find(
      ({ textContent }) => textContent?.trim() === 'Reject'
    )!;

    fetchButton.click();
    await new Promise((resolve) => setTimeout(resolve));
    fixture.detectChanges();

    expect(service.state.isLoading()).toBeTrue();
    expect(fetchButton.hidden).toBeTrue();
    expect(resolveButton.hidden).toBeFalse();
    expect(rejectButton.hidden).toBeFalse();

    rejectButton.click();
    fixture.detectChanges();

    expect(fetchButton.hidden).toBeFalse();
    expect(resolveButton.hidden).toBeTrue();
    expect(rejectButton.hidden).toBeTrue();

    await acceptStepwiseAndSettle();
    fixture.detectChanges();

    expect(service.state.isLoading()).toBeFalse();
    expect(service.characters()).toEqual(initialCharactersWithDisplay);
    expect(service.state.error()?.message).toBe(
      'The character request was rejected.'
    );
    expect(component['globalError']()?.message).toBe(
      'The character request was rejected.'
    );
    expect(JSON.parse(component['errorEmissionJson']())).toEqual({
      error: jasmine.objectContaining({
        message: 'The character request was rejected.'
      }),
      state: {
        isLoading: false,
        value: initialCharactersWithDisplay,
        error: jasmine.objectContaining({
          message: 'The character request was rejected.'
        }),
        hasValue: true
      }
    });
    expect(
      (
        element.querySelector(
          '[aria-label="Error Emission output"]'
        ) as HTMLTextAreaElement
      ).value
    ).toBe(component['errorEmissionJson']());
    expect(
      element.querySelector('[aria-label="Loading characters"]')
    ).toBeNull();

    VaultPrivateErrorService().clear();
  });

  it('should switch Observable buttons until the source emits characters', async () => {
    await configureComponent(initialCharacters, true);
    const element = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(element.querySelectorAll('button'));
    const addButton = buttons.find(
      ({ textContent }) => textContent?.trim() === 'Add by Observable'
    )!;
    const emitButton = buttons.find(
      ({ textContent }) => textContent?.trim() === 'Emit'
    )!;
    const errorButton = buttons.find(
      ({ textContent }) => textContent?.trim() === 'Error'
    )!;
    const observableControls = element.querySelector(
      '.observable-controls'
    ) as HTMLElement;

    expect(addButton.hidden).toBeFalse();
    expect(emitButton.hidden).toBeTrue();
    expect(errorButton.hidden).toBeTrue();

    addButton.click();
    await new Promise((resolve) => setTimeout(resolve));
    fixture.detectChanges();

    expect(addButton.hidden).toBeTrue();
    expect(emitButton.hidden).toBeFalse();
    expect(errorButton.hidden).toBeFalse();
    expect(emitButton.getBoundingClientRect().width).toBe(122.5);
    expect(errorButton.getBoundingClientRect().width).toBe(122.5);
    expect(errorButton.classList).toContain('danger');
    expect(observableControls.getBoundingClientRect().width).toBe(
      observableControls.parentElement!.getBoundingClientRect().width
    );
    expect(getComputedStyle(observableControls).justifyContent).toBe(
      'space-between'
    );
    expect(service.state.isLoading()).toBeTrue();
    expect(
      element.querySelector('[aria-label="Loading characters"]')
    ).not.toBeNull();

    emitButton.click();
    fixture.detectChanges();

    expect(addButton.hidden).toBeFalse();
    expect(emitButton.hidden).toBeTrue();
    expect(errorButton.hidden).toBeTrue();

    await acceptStepwiseAndSettle();
    fixture.detectChanges();

    expect(service.state.isLoading()).toBeFalse();
    expect(
      element.querySelector('[aria-label="Loading characters"]')
    ).toBeNull();
    expect(service.characters()).toEqual([
      {
        id: 201,
        name: 'Ezra',
        lastName: 'Bridger',
        faction: 'Jedi Order',
        isForceSensitive: true,
        forceSensitiveDisplay: 'Yes'
      },
      ...initialCharactersWithDisplay,
      {
        id: 202,
        name: 'Hera',
        lastName: 'Syndulla',
        faction: 'Rebel Alliance',
        isForceSensitive: false,
        forceSensitiveDisplay: 'No'
      }
    ]);
  });

  it('should error a pending Observable and expose the pipeline error', async () => {
    VaultPrivateErrorService().clear();
    await configureComponent(initialCharacters, true);
    const element = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(element.querySelectorAll('button'));
    const addButton = buttons.find(
      ({ textContent }) => textContent?.trim() === 'Add by Observable'
    )!;
    const emitButton = buttons.find(
      ({ textContent }) => textContent?.trim() === 'Emit'
    )!;
    const errorButton = buttons.find(
      ({ textContent }) => textContent?.trim() === 'Error'
    )!;

    addButton.click();
    await new Promise((resolve) => setTimeout(resolve));
    fixture.detectChanges();

    expect(addButton.hidden).toBeTrue();
    expect(emitButton.hidden).toBeFalse();
    expect(errorButton.hidden).toBeFalse();
    expect(service.state.isLoading()).toBeTrue();
    expect(
      element.querySelector('[aria-label="Loading characters"]')
    ).not.toBeNull();

    errorButton.click();
    fixture.detectChanges();

    expect(addButton.hidden).toBeFalse();
    expect(emitButton.hidden).toBeTrue();
    expect(errorButton.hidden).toBeTrue();

    await acceptStepwiseAndSettle();
    fixture.detectChanges();

    expect(service.state.isLoading()).toBeFalse();
    expect(
      element.querySelector('[aria-label="Loading characters"]')
    ).toBeNull();
    expect(service.characters()).toEqual(initialCharactersWithDisplay);
    expect(service.state.error()?.message).toBe(
      'The character request was rejected.'
    );
    expect(component['globalError']()?.message).toBe(
      'The character request was rejected.'
    );
    expect(JSON.parse(component['errorEmissionJson']())).toEqual({
      error: jasmine.objectContaining({
        message: 'The character request was rejected.'
      }),
      state: {
        isLoading: false,
        value: initialCharactersWithDisplay,
        error: jasmine.objectContaining({
          message: 'The character request was rejected.'
        }),
        hasValue: true
      }
    });

    VaultPrivateErrorService().clear();
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
