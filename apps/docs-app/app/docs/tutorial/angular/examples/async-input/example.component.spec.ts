import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { ExampleComponent } from './example.component';
import { exampleHydrate } from './example.hydrate';
import { ExampleService } from './example.service';
import { StarWarsCharacter } from './star-wars-character.shape';

describe('ExampleComponent', () => {
  const key = 'star-wars-character';
  const initialCharacters: readonly StarWarsCharacter[] = [
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

  const withDerivedFields = (
    characters: readonly StarWarsCharacter[]
  ): readonly StarWarsCharacter[] =>
    [...characters]
      .map((character) => ({
        ...character,
        forceSensitiveDisplay: character.isForceSensitive ? 'Yes' : 'No',
        fullName: `${character.name} ${character.lastName}`
      }))
      .sort((left, right) => left.lastName.localeCompare(right.lastName));

  const reducedCharacters = withDerivedFields(initialCharacters);

  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;
  let service: ExampleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleComponent],
      providers: [
        provideVaultTesting(),
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideFeatureCell(ExampleService, {
          key,
          initialState: initialCharacters
        })
      ]
    }).compileComponents();

    spyOn(exampleHydrate, 'getPromise').and.resolveTo([...initialCharacters]);

    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ExampleService);
    fixture.detectChanges();
  });

  it('should expose the latest character collection from the service', async () => {
    expect(component.characters()).toEqual([]);
    await vaultSettled(key);
    expect(component.characters()).toEqual(reducedCharacters);
  });

  it('should expose no selected character before a valid selection is made', async () => {
    await vaultSettled(key);
    expect(component['selectedCharacterId']()).toBeNull();
    expect(component['selectedCharacter']()).toBeNull();
  });

  it('should select a known character id and resolve the selected character', async () => {
    await vaultSettled(key);
    component['selectCharacter']('2');

    expect(component['selectedCharacterId']()).toBe(2);
    expect(component['selectedCharacter']()).toEqual(reducedCharacters[0]);
  });

  it('should ignore an unknown character id', async () => {
    await vaultSettled(key);
    component['selectCharacter']('999');

    expect(component['selectedCharacterId']()).toBeNull();
    expect(component['selectedCharacter']()).toBeNull();
  });

  it('should keep the empty state when a selected id is not found', async () => {
    await vaultSettled(key);
    component['selectCharacter']('3');

    expect(component['selectedCharacterId']()).toBeNull();
    expect(component['selectedCharacter']()).toBeNull();
  });

  it('should render the initially selected character details after state loads', async () => {
    await vaultSettled(key);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const detailsPanel = host.querySelector(
      '.character-details'
    ) as HTMLElement;

    expect(detailsPanel.textContent).toContain('Leia Organa');
    expect(detailsPanel.textContent).toContain('Rebel Alliance');
    expect(detailsPanel.textContent).not.toContain('No character selected');
  });

  it('should render the selected character details after selection', async () => {
    await vaultSettled(key);
    component['selectCharacter']('2');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;

    expect(host.textContent).toContain('Leia');
    expect(host.textContent).toContain('Rebel Alliance');
    expect(host.textContent).not.toContain('No character selected');
  });

  it('should enter create mode and clear the form', async () => {
    await vaultSettled(key);
    fixture.detectChanges();

    component['startCreate']();

    expect(component['editorMode']()).toBe('create');
    expect(component['editorTitle']()).toBe('Add a character');
    expect(component['submitLabel']()).toBe('Add character');
    expect(component['selectedCharacterId']()).toBeNull();
    expect(component['characterForm'].getRawValue()).toEqual({
      name: '',
      lastName: '',
      faction: '',
      isForceSensitive: false
    });
    expect(component['characterForm'].pristine).toBeTrue();
    expect(component['characterForm'].untouched).toBeTrue();
  });

  it('should restore the previous selection when canceling create mode', async () => {
    await vaultSettled(key);
    fixture.detectChanges();
    component['startCreate']();
    component['characterForm'].setValue({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });

    component['cancelEdit']();

    expect(component['editorMode']()).toBe('edit');
    expect(component['selectedCharacterId']()).toBe(2);
    expect(component['characterForm'].getRawValue()).toEqual({
      name: 'Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    expect(component['feedback']()).toEqual(
      component.editor.feedback['newCharacterDiscarded']
    );
  });

  it('should restore the selected character form when canceling edit mode', async () => {
    await vaultSettled(key);
    fixture.detectChanges();
    component['selectCharacter']('2');
    component['characterForm'].setValue({
      name: 'General Leia',
      lastName: 'Organa',
      faction: 'Resistance',
      isForceSensitive: false
    });

    component['cancelEdit']();

    expect(component['editorMode']()).toBe('edit');
    expect(component['selectedCharacterId']()).toBe(2);
    expect(component['characterForm'].getRawValue()).toEqual({
      name: 'Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    expect(component['feedback']()).toEqual(
      component.editor.feedback['unsavedChangesDiscarded']
    );
  });

  it('should fall back to create mode when canceling without a selected character', async () => {
    await vaultSettled(key);
    component['selectedCharacterId'].set(null);
    component['editorMode'].set('edit');
    component['characterForm'].setValue({
      name: 'Temp',
      lastName: 'Character',
      faction: 'Unaffiliated',
      isForceSensitive: false
    });

    component['cancelEdit']();

    expect(component['editorMode']()).toBe('create');
    expect(component['selectedCharacterId']()).toBeNull();
    expect(component['characterForm'].getRawValue()).toEqual({
      name: '',
      lastName: '',
      faction: '',
      isForceSensitive: false
    });
    expect(component['feedback']()).toBeNull();
  });

  it('should show invalid-form feedback when save is attempted with invalid values', async () => {
    await vaultSettled(key);
    fixture.detectChanges();
    component['startCreate']();

    component['saveCharacter']();

    expect(component['feedback']()).toEqual(
      component.editor.feedback['invalidForm']
    );
    expect(component['characterForm'].controls.name.touched).toBeTrue();
    expect(component['characterForm'].controls.lastName.touched).toBeTrue();
    expect(component['characterForm'].controls.faction.touched).toBeTrue();
  });

  it('should create a character from normalized form values', async () => {
    await vaultSettled(key);
    fixture.detectChanges();
    const createdCharacter: StarWarsCharacter = {
      id: 30,
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    };
    const createCharacterSpy = spyOn(
      service,
      'createCharacter'
    ).and.returnValue(createdCharacter);

    component['startCreate']();
    component['characterForm'].setValue({
      name: '  Han  ',
      lastName: '  Solo  ',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });

    component['saveCharacter']();

    expect(createCharacterSpy).toHaveBeenCalledOnceWith({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    expect(component['selectedCharacterId']()).toBe(30);
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

  it('should require a selected character before saving an edit', async () => {
    await vaultSettled(key);
    fixture.detectChanges();
    const updateCharacterSpy = spyOn(service, 'updateCharacter');

    component['selectedCharacterId'].set(null);
    component['editorMode'].set('edit');
    component['characterForm'].setValue({
      name: 'Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });

    component['saveCharacter']();

    expect(updateCharacterSpy).not.toHaveBeenCalled();
    expect(component['feedback']()).toEqual(
      component.editor.feedback['selectBeforeSave']
    );
  });

  it('should update the selected character from normalized form values', async () => {
    await vaultSettled(key);
    fixture.detectChanges();
    const updatedCharacter: StarWarsCharacter = {
      id: 2,
      name: 'General Leia',
      lastName: 'Organa',
      faction: 'Resistance',
      isForceSensitive: false
    };
    const updateCharacterSpy = spyOn(
      service,
      'updateCharacter'
    ).and.returnValue(updatedCharacter);

    component['selectCharacter']('2');
    component['characterForm'].setValue({
      name: '  General Leia  ',
      lastName: '  Organa  ',
      faction: 'Resistance',
      isForceSensitive: false
    });

    component['saveCharacter']();

    expect(updateCharacterSpy).toHaveBeenCalledOnceWith(2, {
      name: 'General Leia',
      lastName: 'Organa',
      faction: 'Resistance',
      isForceSensitive: false
    });
    expect(component['characterForm'].getRawValue()).toEqual({
      name: 'General Leia',
      lastName: 'Organa',
      faction: 'Resistance',
      isForceSensitive: false
    });
    expect(component['feedback']()).toEqual({
      message: 'General Leia Organa was updated.',
      tone: 'success'
    });
  });

  it('should open delete confirmation for the selected character and clear feedback', async () => {
    await vaultSettled(key);
    fixture.detectChanges();

    component['feedback'].set({
      message: 'Old feedback',
      tone: 'info'
    });
    component['selectCharacter']('2');

    component['requestDelete']();

    expect(component['deleteCandidate']()).toEqual(reducedCharacters[0]);
    expect(component['feedback']()).toBeNull();
  });

  it('should ignore delete requests when no character is selected', async () => {
    await vaultSettled(key);
    fixture.detectChanges();

    component['selectedCharacterId'].set(null);
    component['deleteCandidate'].set(null);

    component['requestDelete']();

    expect(component['deleteCandidate']()).toBeNull();
  });

  it('should clear the pending delete candidate when delete is canceled', async () => {
    await vaultSettled(key);
    fixture.detectChanges();

    component['deleteCandidate'].set(initialCharacters[0]!);

    component['cancelDelete']();

    expect(component['deleteCandidate']()).toBeNull();
  });

  it('should ignore confirm delete when there is no pending candidate', async () => {
    await vaultSettled(key);
    fixture.detectChanges();
    const removeCharacterSpy = spyOn(service, 'removeCharacter');

    component['deleteCandidate'].set(null);

    component['confirmDelete']();

    expect(removeCharacterSpy).not.toHaveBeenCalled();
    expect(component['editorMode']()).toBe('edit');
  });

  it('should remove the pending character and reset the editor after delete confirmation', async () => {
    await vaultSettled(key);
    fixture.detectChanges();
    const removeCharacterSpy = spyOn(
      service,
      'removeCharacter'
    ).and.callThrough();

    component['selectCharacter']('2');
    component['requestDelete']();

    component['confirmDelete']();
    await vaultSettled(key);

    expect(removeCharacterSpy).toHaveBeenCalledOnceWith(2);
    expect(component['deleteCandidate']()).toBeNull();
    expect(component['selectedCharacterId']()).toBeNull();
    expect(component['editorMode']()).toBe('create');
    expect(component['characterForm'].getRawValue()).toEqual({
      name: '',
      lastName: '',
      faction: '',
      isForceSensitive: false
    });
    expect(component['characterForm'].pristine).toBeTrue();
    expect(component['characterForm'].untouched).toBeTrue();
    expect(component['feedback']()).toEqual({
      message: 'Leia Organa was removed.',
      tone: 'success'
    });
    expect(component.characters()).toEqual(
      withDerivedFields([initialCharacters[0]!])
    );
  });

  it('should coordinate hydration resolve and reject controls', () => {
    exampleHydrate.getResolve()?.();

    component['resolveHydration']();
    component['rejectHydration']();

    const resolveHydration = jasmine.createSpy('resolveHydration');
    const rejectHydration = jasmine.createSpy('rejectHydration');

    spyOn(exampleHydrate, 'getResolve').and.returnValue(resolveHydration);
    spyOn(exampleHydrate, 'getReject').and.returnValue(rejectHydration);

    component['resolveHydration']();
    component['rejectHydration']();

    expect(resolveHydration).toHaveBeenCalledOnceWith();
    expect(rejectHydration).toHaveBeenCalledOnceWith();
    expect(component['hydrationSettled']()).toBeTrue();
  });

  it('should coordinate Promise fetch, resolve, and reject controls', async () => {
    component['resolvePromise']();
    component['rejectPromise']();

    component['fetchWithPromise']();
    component['resolvePromise']();
    await vaultSettled(key);

    expect(component['promisePending']()).toBeFalse();
    component['fetchWithPromise']();
    component['rejectPromise']();
    await vaultSettled(key);

    expect(component['promisePending']()).toBeFalse();
  });

  it('should coordinate Observable add, emit, and error controls', async () => {
    component['emitObservable']();
    component['errorObservable']();

    component['addByObservable']();
    component['emitObservable']();
    await vaultSettled(key);

    expect(component['observablePending']()).toBeFalse();
    component['addByObservable']();
    component['errorObservable']();
    await vaultSettled(key);

    expect(component['observablePending']()).toBeFalse();
  });

  it('should process HTTP Resource requests and clear global errors', async () => {
    const httpTesting = TestBed.inject(HttpTestingController);

    component['fetchWithHttpResource']();
    await TestBed.tick();

    httpTesting.expectOne('https://swapi.info/api/people').flush([
      {
        name: 'Han Solo',
        url: 'https://swapi.info/api/people/14/'
      },
      {
        name: 'Yoda',
        url: 'https://swapi.info/api/people/20/'
      },
      {
        name: 'Lando Calrissian',
        url: 'https://swapi.info/api/people/25/'
      }
    ]);

    await TestBed.tick();
    await vaultSettled(key);
    component['clearGlobalError']();

    expect(component['globalError']()).toBeNull();
    httpTesting.verify();
  });
});
