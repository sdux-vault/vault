import { provideZonelessChangeDetection, signal } from '@angular/core';
import type { FactoryProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withArrayAppendMergeBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { of } from 'rxjs';
import { StarWarsCharacterState } from '../../../examples/star-wars-character.state';
import { removeUnknownLastNameFilter } from './example.filter';
import {
  ExampleService,
  withCharactersSortedByLastName
} from './example.service';

describe('ExampleService', () => {
  const key = 'star-wars-character';
  const initialCharacters: readonly StarWarsCharacterState[] = [
    {
      id: 10,
      name: 'Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    },
    {
      id: 20,
      name: 'Luke',
      lastName: 'Skywalker',
      faction: 'Jedi Order',
      isForceSensitive: true
    }
  ];
  const initialCharactersWithDisplay: readonly StarWarsCharacterState[] = [
    {
      ...initialCharacters[0]!,
      forceSensitiveDisplay: 'No'
    },
    {
      ...initialCharacters[1]!,
      forceSensitiveDisplay: 'Yes'
    }
  ];

  const configureService = async (
    initialState: readonly StarWarsCharacterState[] | null = initialCharacters
  ): Promise<ExampleService> => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting(),
        provideZonelessChangeDetection(),
        provideFeatureCell(ExampleService, { key, initialState }, [
          withArrayAppendMergeBehavior
        ])
      ]
    });

    const service = TestBed.inject(ExampleService);
    await vaultSettled(key);

    return service;
  };

  it('should initialize with the configured FeatureCell State', async () => {
    const service = await configureService();

    expect(service.state.hasValue()).toBeTrue();
    expect(service.state.isLoading()).toBeFalse();
    expect(service.state.error()).toBeNull();
    expect(service.characters()).toEqual(initialCharactersWithDisplay);
  });

  it('should capture an empty baseline when a valued snapshot has no value', async () => {
    const featureCellProviders = provideFeatureCell(
      ExampleService,
      { key, initialState: null },
      [withArrayAppendMergeBehavior]
    );
    const featureCellProvider = featureCellProviders[0] as FactoryProvider;
    const value = signal<readonly StarWarsCharacterState[] | undefined>(
      undefined
    );
    const vault = jasmine.createSpyObj('FeatureCell', [
      'filters',
      'beforeTaps',
      'reducers',
      'afterTaps',
      'emitStates',
      'initialize',
      'replaceState'
    ]);

    Object.assign(vault, {
      state: { value },
      state$: of({ snapshot: { hasValue: true, value: undefined } })
    });
    vault.filters.and.returnValue(vault);
    vault.beforeTaps.and.returnValue(vault);
    vault.reducers.and.returnValue(vault);
    vault.afterTaps.and.returnValue(vault);
    vault.emitStates.and.returnValue(vault);

    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting(),
        provideZonelessChangeDetection(),
        { provide: featureCellProvider.provide, useValue: vault },
        ExampleService
      ]
    });

    const service = TestBed.inject(ExampleService);

    expect(service.restoreInitialCharacters()).toBeNull();
    expect(vault.replaceState).toHaveBeenCalledWith({
      value: [],
      loading: false,
      error: null
    });
  });

  it('should purely filter characters whose last name is exactly unknown', async () => {
    const unknownCharacter: StarWarsCharacterState = {
      id: 30,
      name: 'Unknown',
      lastName: 'unknown',
      faction: 'Unaffiliated',
      isForceSensitive: false
    };
    const retainedCharacter: StarWarsCharacterState = {
      id: 31,
      name: 'Captain',
      lastName: 'Unknown',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    };
    const candidate = [unknownCharacter, retainedCharacter] as const;

    const filtered = removeUnknownLastNameFilter(candidate);
    const service = await configureService(candidate);

    expect(filtered).toEqual([retainedCharacter]);
    expect(filtered).not.toBe(candidate);
    expect(candidate).toEqual([unknownCharacter, retainedCharacter]);
    expect(service.characters()).toEqual([
      { ...retainedCharacter, forceSensitiveDisplay: 'No' }
    ]);
  });

  it('should derive force sensitivity display labels without mutating the input', async () => {
    const candidate = initialCharacters.map((character) => ({ ...character }));

    const service = await configureService(candidate);

    expect(service.characters()).toEqual(initialCharactersWithDisplay);
    expect(service.characters()).not.toBe(candidate);
    expect(candidate).toEqual(initialCharacters);
  });

  it('should create a pure reducer that sorts characters by last name', async () => {
    const candidate = [initialCharacters[1]!, initialCharacters[0]!] as const;

    const sorted = withCharactersSortedByLastName()(candidate);
    const service = await configureService(candidate);

    expect(sorted).toEqual(initialCharacters);
    expect(sorted).not.toBe(candidate);
    expect(candidate).toEqual([initialCharacters[1]!, initialCharacters[0]!]);
    expect(service.characters()).toEqual(initialCharactersWithDisplay);
  });

  it('should expose the filtered candidate observed before reducer execution', async () => {
    const unknownCharacter: StarWarsCharacterState = {
      id: 30,
      name: 'Unknown',
      lastName: 'unknown',
      faction: 'Unaffiliated',
      isForceSensitive: false
    };
    const candidate = [
      initialCharacters[1]!,
      unknownCharacter,
      initialCharacters[0]!
    ];

    const service = await configureService(candidate);

    expect(service.beforeTapInput()).toEqual([
      initialCharacters[1]!,
      initialCharacters[0]!
    ]);
    expect(service.characters()).toEqual(initialCharactersWithDisplay);
    expect(candidate).toEqual([
      initialCharacters[1]!,
      unknownCharacter,
      initialCharacters[0]!
    ]);
  });

  it('should expose the transformed candidate observed after reducer execution', async () => {
    const candidate = [initialCharacters[1]!, initialCharacters[0]!] as const;

    const service = await configureService(candidate);

    expect(service.afterTapInput()).toEqual(initialCharactersWithDisplay);
    expect(service.afterTapInput()).toEqual(service.characters());
    expect(candidate).toEqual([initialCharacters[1]!, initialCharacters[0]!]);
  });

  it('should expose the finalized StateSnapshot observed after commitment', async () => {
    const service = await configureService();

    expect(service.emittedState()).toEqual({
      isLoading: false,
      value: initialCharactersWithDisplay,
      error: null,
      hasValue: true
    });
    expect(service.emittedState()?.value).toEqual(service.afterTapInput());
    expect(service.emittedState()?.value).toEqual(service.characters());
  });

  it('should append new characters and assign IDs after the initial maximum', async () => {
    const service = await configureService();

    const han = service.createCharacter({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    await vaultSettled(key);

    const chewbacca = service.createCharacter({
      name: 'Chewbacca',
      lastName: 'Wookiee',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    await vaultSettled(key);

    expect(han.id).toBe(21);
    expect(chewbacca.id).toBe(22);
    expect(service.characters()).toEqual([
      ...initialCharactersWithDisplay,
      { ...han, forceSensitiveDisplay: 'No' },
      { ...chewbacca, forceSensitiveDisplay: 'No' }
    ]);
  });

  it('should replace the matching character without changing the others', async () => {
    const service = await configureService();

    const updatedLeia = service.updateCharacter(10, {
      name: 'General Leia',
      lastName: 'Organa',
      faction: 'Resistance',
      isForceSensitive: false
    });
    await vaultSettled(key);

    expect(updatedLeia).toEqual({
      id: 10,
      name: 'General Leia',
      lastName: 'Organa',
      faction: 'Resistance',
      isForceSensitive: false
    });
    expect(service.characters()).toEqual([
      { ...updatedLeia, forceSensitiveDisplay: 'No' },
      initialCharactersWithDisplay[1]!
    ]);

    const missing = service.updateCharacter(999, {
      name: 'Missing',
      lastName: 'Character',
      faction: 'Unaffiliated',
      isForceSensitive: false
    });
    await vaultSettled(key);

    expect(missing.id).toBe(999);
    expect(service.characters()).toEqual([
      { ...updatedLeia, forceSensitiveDisplay: 'No' },
      initialCharactersWithDisplay[1]!
    ]);
  });

  it('should remove only the requested character', async () => {
    const service = await configureService();

    service.removeCharacter(10);
    await vaultSettled(key);

    expect(service.characters()).toEqual([initialCharactersWithDisplay[1]!]);

    service.removeCharacter(999);
    await vaultSettled(key);

    expect(service.characters()).toEqual([initialCharactersWithDisplay[1]!]);
  });

  it('should persist null to clear the current FeatureCell value', async () => {
    const service = await configureService();

    service.persistNullValue();
    await vaultSettled(key);

    expect(service.state.value()).toBeUndefined();
    expect(service.state.hasValue()).toBeFalse();
    expect(service.characters()).toEqual([]);
  });

  it('should reset the FeatureCell state through the reset API', async () => {
    const service = await configureService();

    service.resetState();

    expect(service.state.value()).toBeUndefined();
    expect(service.state.hasValue()).toBeFalse();
    expect(service.characters()).toEqual([]);
  });

  it('should remain loading until the deferred Promise resolves through the pipeline', async () => {
    const service = await configureService();

    service.fetchWithPromise();
    await new Promise((resolve) => setTimeout(resolve));

    expect(service.state.isLoading()).toBeTrue();
    expect(service.characters()).toEqual(initialCharactersWithDisplay);

    const resolvePromise = service.getPromiseResolver();
    expect(resolvePromise).not.toBeNull();
    resolvePromise!();
    await vaultSettled(key);

    expect(service.state.isLoading()).toBeFalse();
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
    expect(
      service.characters().some(({ lastName }) => lastName === 'unknown')
    ).toBeFalse();
    expect(service.getPromiseResolver()).toBeNull();
  });

  it('should complete the state stream when destroying the FeatureCell', async () => {
    const service = await configureService();
    let stateStreamCompleted = false;

    service.state$.subscribe({
      complete: () => {
        stateStreamCompleted = true;
      }
    });

    service.destroyFeatureCell();

    expect(stateStreamCompleted).toBeTrue();
  });

  it('should restore the first emitted State rather than a later value', async () => {
    const service = await configureService();

    service.removeCharacter(10);
    await vaultSettled(key);
    service.createCharacter({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    await vaultSettled(key);

    const firstCharacter = service.restoreInitialCharacters();
    await vaultSettled(key);

    expect(firstCharacter).toEqual(initialCharactersWithDisplay[0]!);
    expect(service.characters()).toEqual(initialCharactersWithDisplay);
    expect(service.characters()).not.toBe(initialCharacters);
    expect(service.characters()[0]).not.toBe(initialCharacters[0]!);
  });

  it('should safely update, remove, and restore when no initial value exists', async () => {
    const service = await configureService(null);

    expect(service.characters()).toEqual([]);

    service.updateCharacter(1, {
      name: 'Missing',
      lastName: 'Character',
      faction: 'Unaffiliated',
      isForceSensitive: false
    });
    await vaultSettled(key);
    service.removeCharacter(1);
    await vaultSettled(key);
    const firstCharacter = service.restoreInitialCharacters();
    await vaultSettled(key);

    expect(firstCharacter).toBeNull();
    expect(service.characters()).toEqual([]);
  });
});
