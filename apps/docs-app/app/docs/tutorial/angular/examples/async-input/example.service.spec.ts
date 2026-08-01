import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { exampleHydrate } from './example.hydrate';
import { exampleObservable } from './example.observable';
import { examplePromise } from './example.promise';
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

    spyOn(exampleHydrate, 'getPromise').and.callFake(
      () =>
        Promise.resolve(initialState ?? undefined) as Promise<
          StarWarsCharacter[]
        >
    );

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

  it('should merge a resolved Promise through the FeatureCell pipeline', async () => {
    const service = await configureService();

    service.fetchWithPromise();

    expect(service.state.isLoading()).toBeTrue();
    examplePromise.getResolve()!();
    await vaultSettled(key);

    expect(service.state.value()).toEqual(
      withDerivedFields([
        {
          id: 102,
          name: 'Din',
          lastName: 'Djarin',
          faction: 'Unaffiliated',
          isForceSensitive: false
        },
        {
          id: 101,
          name: 'Ahsoka',
          lastName: 'Tano',
          faction: 'Jedi Order',
          isForceSensitive: true
        }
      ])
    );
    expect(service.state.isLoading()).toBeFalse();
  });

  it('should merge the first emitted Observable value through the pipeline', async () => {
    const service = await configureService();

    service.addByObservable();

    expect(service.state.isLoading()).toBeTrue();
    exampleObservable.getEmit()!();
    await vaultSettled(key);

    expect(service.state.value()).toEqual(
      withDerivedFields([
        {
          id: 201,
          name: 'Ezra',
          lastName: 'Bridger',
          faction: 'Jedi Order',
          isForceSensitive: true
        },
        {
          id: 202,
          name: 'Hera',
          lastName: 'Syndulla',
          faction: 'Rebel Alliance',
          isForceSensitive: false
        }
      ])
    );
    expect(service.state.isLoading()).toBeFalse();
  });

  it('should replace the collection from an HTTP Resource', async () => {
    const service = await configureService();
    const httpTesting = TestBed.inject(HttpTestingController);

    service.fetchWithHttpResource();
    await TestBed.tick();

    const request = httpTesting.expectOne('https://swapi.info/api/people');
    request.flush([
      {
        name: 'Han Solo',
        url: 'https://swapi.info/api/people/14/'
      },
      {
        name: 'Lando Calrissian',
        url: 'https://swapi.info/api/people/25/'
      },
      {
        name: 'Yoda',
        url: 'https://swapi.info/api/people/20/'
      },
      {
        name: 'Luke Skywalker',
        url: 'https://swapi.info/api/people/1/'
      }
    ]);

    await TestBed.tick();
    await vaultSettled(key);

    expect(service.state.value()).toEqual(
      withDerivedFields([
        {
          id: 25,
          name: 'Lando',
          lastName: 'Calrissian',
          faction: 'Rebel Alliance',
          isForceSensitive: false
        },
        {
          id: 14,
          name: 'Han',
          lastName: 'Solo',
          faction: 'Rebel Alliance',
          isForceSensitive: false
        }
      ])
    );
    expect(service.state.isLoading()).toBeFalse();
    httpTesting.verify();
  });

  it('should capture and clear a finalized asynchronous error', async () => {
    const service = await configureService();

    service.fetchWithPromise();
    examplePromise.getReject()!();
    await vaultSettled(key);

    expect(service.emittedError()?.error.message).toBe(
      'The character request was rejected.'
    );
    expect(service.emittedError()?.state.value).toEqual(
      withDerivedFields(initialCharacters)
    );

    service.clearEmittedError();

    expect(service.emittedError()).toBeUndefined();
  });
});
