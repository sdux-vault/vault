import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
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

    expect(service.state.value()).toEqual(initialCharacters);
    expect(service.state.isLoading()).toBeFalse();
    expect(service.state.error()).toBeNull();
    expect(service.state.hasValue()).toBeTrue();
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
    expect(service.state.value()).toEqual([createdCharacter]);
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
    expect(service.state.value()).toEqual([{ ...createdCharacter }]);
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
      updatedCharacter,
      initialCharacters[1]!
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
    expect(service.state.value()).toEqual(initialCharacters);
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

    expect(service.state.value()).toEqual([initialCharacters[1]!]);
  });

  it('should safely remove against an empty collection when no value exists', async () => {
    const service = await configureService(null);

    service.removeCharacter(10);

    await vaultSettled(key);

    expect(service.state.value()).toEqual([]);
  });

  it('should persist a null lifecycle value through replaceState', async () => {
    const service = await configureService();

    service.persistNullValue();

    await vaultSettled(key);

    expect(service.state.value()).toBeUndefined();
    expect(service.state.hasValue()).toBeFalse();
    expect(service.state.error()).toBeNull();
  });

  it('should reset the lifecycle state to an undefined value', async () => {
    const service = await configureService();

    service.resetState();

    expect(service.state.value()).toBeUndefined();
    expect(service.state.hasValue()).toBeFalse();
    expect(service.state.error()).toBeNull();
  });

  it('should finalize the FeatureCell lifecycle with destroy()', async () => {
    const service = await configureService();

    expect(() => service.destroyFeatureCell()).not.toThrow();
  });
});
