import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withArrayAppendMergeBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { StarWarsCharacterState } from '../../../examples/star-wars-character.state';
import { ExampleService } from './example.service';

describe('ExampleService', () => {
  const key = 'star-wars-character';
  const initialCharacters: readonly StarWarsCharacterState[] = [
    {
      id: 10,
      name: 'Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isJedi: false
    },
    {
      id: 20,
      name: 'Luke',
      lastName: 'Skywalker',
      faction: 'Jedi Order',
      isJedi: true
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
    expect(service.characters()).toEqual(initialCharacters);
  });

  it('should append new characters and assign IDs after the initial maximum', async () => {
    const service = await configureService();

    const han = service.createCharacter({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isJedi: false
    });
    await vaultSettled(key);

    const chewbacca = service.createCharacter({
      name: 'Chewbacca',
      lastName: 'Wookiee',
      faction: 'Rebel Alliance',
      isJedi: false
    });
    await vaultSettled(key);

    expect(han.id).toBe(21);
    expect(chewbacca.id).toBe(22);
    expect(service.characters()).toEqual([
      ...initialCharacters,
      han,
      chewbacca
    ]);
  });

  it('should replace the matching character without changing the others', async () => {
    const service = await configureService();

    const updatedLeia = service.updateCharacter(10, {
      name: 'General Leia',
      lastName: 'Organa',
      faction: 'Resistance',
      isJedi: false
    });
    await vaultSettled(key);

    expect(updatedLeia).toEqual({
      id: 10,
      name: 'General Leia',
      lastName: 'Organa',
      faction: 'Resistance',
      isJedi: false
    });
    expect(service.characters()).toEqual([updatedLeia, initialCharacters[1]!]);

    const missing = service.updateCharacter(999, {
      name: 'Missing',
      lastName: 'Character',
      faction: 'Unaffiliated',
      isJedi: false
    });
    await vaultSettled(key);

    expect(missing.id).toBe(999);
    expect(service.characters()).toEqual([updatedLeia, initialCharacters[1]!]);
  });

  it('should remove only the requested character', async () => {
    const service = await configureService();

    service.removeCharacter(10);
    await vaultSettled(key);

    expect(service.characters()).toEqual([initialCharacters[1]!]);

    service.removeCharacter(999);
    await vaultSettled(key);

    expect(service.characters()).toEqual([initialCharacters[1]!]);
  });

  it('should restore the first emitted State rather than a later value', async () => {
    const service = await configureService();

    service.removeCharacter(10);
    await vaultSettled(key);
    service.createCharacter({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isJedi: false
    });
    await vaultSettled(key);

    const firstCharacter = service.restoreInitialCharacters();
    await vaultSettled(key);

    expect(firstCharacter).toEqual(initialCharacters[0]!);
    expect(service.characters()).toEqual(initialCharacters);
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
      isJedi: false
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
