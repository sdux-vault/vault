import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import type { FactoryProvider } from '@angular/core';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { of } from 'rxjs';
import { ExampleService } from './example.service';
import { StarWarsCharacter } from './star-wars-character.shape';

describe('ExampleService', () => {
  const key = 'star-wars-character';
  const initialCharacters: readonly StarWarsCharacter[] = [
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

  const withDerivedFields = (
    characters: readonly StarWarsCharacter[]
  ): readonly StarWarsCharacter[] =>
    characters.map((character) => ({
      ...character,
      forceSensitiveDisplay: character.isForceSensitive ? 'Yes' : 'No',
      fullName: `${character.name} ${character.lastName}`
    }));

  const configureService = async (
    initialState: readonly StarWarsCharacter[] | null = initialCharacters
  ): Promise<ExampleService> => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting(),
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideFeatureCell(ExampleService, { key, initialState }, [], [])
      ]
    });

    const configuredService = TestBed.inject(ExampleService);
    await vaultSettled(key);

    return configuredService;
  };

  beforeEach(async () => {
    TestBed.resetTestingModule();
  });

  it('should initialize with the configured FeatureCell State', async () => {
    const service = await configureService();

    expect(service.state.value()).toEqual(withDerivedFields(initialCharacters));
    expect(service.state.isLoading()).toBeFalse();
    expect(service.state.error()).toBeNull();
    expect(service.state.hasValue()).toBeTrue();
  });

  it('should capture an empty baseline when a valued snapshot has no value', async () => {
    const featureCellProviders = provideFeatureCell(ExampleService, {
      key,
      initialState: null
    });
    const featureCellProvider = featureCellProviders[0] as FactoryProvider;
    const vault = jasmine.createSpyObj('FeatureCell', [
      'filters',
      'reducers',
      'emitStates',
      'afterTaps',
      'beforeTaps',
      'initialize',
      'replaceState'
    ]);

    Object.assign(vault, {
      state: {
        value: signal<readonly StarWarsCharacter[] | undefined>(undefined)
      },
      state$: of({ snapshot: { hasValue: true, value: undefined } })
    });
    vault.filters.and.returnValue(vault);
    vault.reducers.and.returnValue(vault);
    vault.emitStates.and.returnValue(vault);
    vault.afterTaps.and.returnValue(vault);
    vault.beforeTaps.and.returnValue(vault);

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
    expect(vault.replaceState).toHaveBeenCalledOnceWith({ value: [] });
  });

  it('should submit a new character using the next available id', async () => {
    const service = await configureService();

    const createdCharacter = service.createCharacter({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });

    await vaultSettled(key);

    expect(createdCharacter).toEqual({
      id: 21,
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    expect(service.state.value()).toEqual(
      withDerivedFields([createdCharacter])
    );
  });

  it('should create the first character with id 1 when no value exists', async () => {
    const service = await configureService(null);

    const createdCharacter = service.createCharacter({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });

    await vaultSettled(key);

    expect(createdCharacter).toEqual({
      id: 1,
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    expect(service.state.value()).toEqual(
      withDerivedFields([createdCharacter])
    );
  });

  it('should replace the matching character without changing the others', async () => {
    const service = await configureService();

    const updatedCharacter = service.updateCharacter(10, {
      name: 'General Leia',
      lastName: 'Organa',
      faction: 'Resistance',
      isForceSensitive: false
    });

    await vaultSettled(key);

    expect(updatedCharacter).toEqual({
      id: 10,
      name: 'General Leia',
      lastName: 'Organa',
      faction: 'Resistance',
      isForceSensitive: false
    });
    expect(service.state.value()).toEqual([
      ...withDerivedFields([updatedCharacter, initialCharacters[1]!])
    ]);
  });

  it('should leave the collection unchanged when updating a missing character', async () => {
    const service = await configureService();

    const updatedCharacter = service.updateCharacter(999, {
      name: 'Missing',
      lastName: 'Character',
      faction: 'Unaffiliated',
      isForceSensitive: false
    });

    await vaultSettled(key);

    expect(updatedCharacter).toEqual({
      id: 999,
      name: 'Missing',
      lastName: 'Character',
      faction: 'Unaffiliated',
      isForceSensitive: false
    });
    expect(service.state.value()).toEqual(withDerivedFields(initialCharacters));
  });

  it('should safely update against an empty collection when no value exists', async () => {
    const service = await configureService(null);

    const updatedCharacter = service.updateCharacter(1, {
      name: 'Missing',
      lastName: 'Character',
      faction: 'Unaffiliated',
      isForceSensitive: false
    });

    await vaultSettled(key);

    expect(updatedCharacter).toEqual({
      id: 1,
      name: 'Missing',
      lastName: 'Character',
      faction: 'Unaffiliated',
      isForceSensitive: false
    });
    expect(service.state.value()).toEqual([]);
  });

  it('should remove the matching character from the current collection', async () => {
    const service = await configureService();

    service.removeCharacter(10);

    await vaultSettled(key);

    expect(service.state.value()).toEqual(
      withDerivedFields([initialCharacters[1]!])
    );
  });

  it('should safely remove against an empty collection when no value exists', async () => {
    const service = await configureService(null);

    service.removeCharacter(10);

    await vaultSettled(key);

    expect(service.state.value()).toEqual([]);
  });

  it('should expose the filtered and reduced tap inputs with the emitted snapshot', async () => {
    const service = await configureService();
    const expectedState = withDerivedFields(initialCharacters);

    expect(service.beforeTapInput()).toEqual(initialCharacters);
    expect(service.afterTapInput()).toEqual(expectedState);
    expect(service.emittedState()).toEqual({
      isLoading: false,
      value: expectedState,
      error: null,
      hasValue: true
    });
  });

  it('should restore a detached copy of the captured initial collection', async () => {
    const service = await configureService();

    service.removeCharacter(10);
    await vaultSettled(key);

    const firstCharacter = service.restoreInitialCharacters();
    await vaultSettled(key);

    expect(firstCharacter).toEqual(
      Object({
        id: 10,
        name: 'Leia',
        lastName: 'Organa',
        faction: 'Rebel Alliance',
        isForceSensitive: false,
        forceSensitiveDisplay: 'No',
        fullName: 'Leia Organa'
      })
    );
    expect(service.state.value()).toEqual(withDerivedFields(initialCharacters));
  });

  it('should return null when restoring an empty initial collection', async () => {
    const service = await configureService(null);

    const firstCharacter = service.restoreInitialCharacters();
    await vaultSettled(key);

    expect(firstCharacter).toBeNull();
    expect(service.state.value()).toEqual([]);
  });

  it('should reset the FeatureCell state', async () => {
    const service = await configureService();

    expect(service.state.value()).toBeDefined();

    service.resetState();

    expect(service.state.value()).toBeUndefined();
    expect(service.state.hasValue()).toBeFalse();
  });
});
