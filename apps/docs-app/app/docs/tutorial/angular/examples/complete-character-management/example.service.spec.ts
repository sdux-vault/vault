import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import type { FactoryProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withAes256EncryptBehavior,
  withArrayAppendMergeBehavior,
  withLocalStoragePersistBehavior,
  withStepwiseController,
  withStepwiseFilterBehavior,
  withStepwiseReducerBehavior,
  withStepwiseResolveBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { of } from 'rxjs';
import { VaultPrivateErrorService } from '@sdux-vault/shared';
import { StarWarsCharacterState } from '../../../examples/star-wars-character.state';
import { removeUnknownLastNameFilter } from './example.filter';
import { exampleHydrate } from './example.hydrate';
import { exampleObservable } from './example.observable';
import { examplePromise } from './example.promise';
import {
  EXAMPLE_AES256_SALT,
  EXAMPLE_DELAY_MILLISECONDS,
  EXAMPLE_ENCRYPTED_STORAGE_KEY,
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

  const acceptStepwiseAndSettle = async (
    service: ExampleService
  ): Promise<void> => {
    for (let stage = 0; stage < 4; stage += 1) {
      await new Promise((resolve) => setTimeout(resolve));

      if (service.isStepwiseResolvePending()) {
        service.acceptStepwiseResolve();
        continue;
      }

      if (service.isStepwiseFilterPending()) {
        service.acceptStepwiseFilter();
        continue;
      }

      if (service.isStepwiseReducerPending()) {
        service.acceptStepwiseReducer();
        continue;
      }

      break;
    }

    await vaultSettled(key);
  };

  const configureService = async (
    initialState: readonly StarWarsCharacterState[] | null = initialCharacters,
    deferHydration = false,
    withEncryptedPersistence = false
  ): Promise<ExampleService> => {
    const behaviors = withEncryptedPersistence
      ? [
          withAes256EncryptBehavior,
          withLocalStoragePersistBehavior,
          withArrayAppendMergeBehavior,
          withStepwiseResolveBehavior,
          withStepwiseFilterBehavior,
          withStepwiseReducerBehavior
        ]
      : [
          withArrayAppendMergeBehavior,
          withStepwiseResolveBehavior,
          withStepwiseFilterBehavior,
          withStepwiseReducerBehavior
        ];

    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting(),
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideFeatureCell(ExampleService, { key, initialState }, behaviors, [
          withStepwiseController
        ])
      ]
    });

    if (!deferHydration) {
      spyOn(exampleHydrate, 'getPromise').and.callFake(
        () =>
          Promise.resolve(initialState ?? undefined) as Promise<
            readonly StarWarsCharacterState[]
          >
      );
    }

    const service = TestBed.inject(ExampleService);

    if (!deferHydration) {
      await acceptStepwiseAndSettle(service);
    }

    return service;
  };

  it('should initialize with the configured FeatureCell State', async () => {
    const service = await configureService();

    expect(service.state.hasValue()).toBeTrue();
    expect(service.state.isLoading()).toBeFalse();
    expect(service.state.error()).toBeNull();
    expect(service.characters()).toEqual(initialCharactersWithDisplay);
  });

  it('should hydrate the authoritative initial State through the complete pipeline', async () => {
    const service = await configureService(initialCharacters, true);
    await new Promise((resolve) => setTimeout(resolve));

    expect(service.state.hasValue()).toBeFalse();

    const resolveHydration = exampleHydrate.getResolve();
    expect(resolveHydration).not.toBeNull();
    resolveHydration!();
    await acceptStepwiseAndSettle(service);

    expect(service.state.isLoading()).toBeFalse();
    expect(service.state.error()).toBeNull();
    expect(service.characters()).toEqual([
      {
        id: 302,
        name: 'Jyn',
        lastName: 'Erso',
        faction: 'Rebel Alliance',
        isForceSensitive: false,
        forceSensitiveDisplay: 'No'
      },
      {
        id: 301,
        name: 'Cal',
        lastName: 'Kestis',
        faction: 'Jedi Order',
        isForceSensitive: true,
        forceSensitiveDisplay: 'Yes'
      },
      {
        id: 303,
        name: 'Bo-Katan',
        lastName: 'Kryze',
        faction: 'Mandalorians',
        isForceSensitive: false,
        forceSensitiveDisplay: 'No'
      },
      {
        id: 304,
        name: 'Mace',
        lastName: 'Windu',
        faction: 'Jedi Order',
        isForceSensitive: true,
        forceSensitiveDisplay: 'Yes'
      }
    ]);
    expect(
      service.characters().some(({ lastName }) => lastName === 'unknown')
    ).toBeFalse();
    expect(exampleHydrate.getResolve()).toBeNull();
    expect(exampleHydrate.getReject()).toBeNull();
  });

  it('should expose a rejected hydration without using configured initial State', async () => {
    const service = await configureService(initialCharacters, true);
    await new Promise((resolve) => setTimeout(resolve));

    const rejectHydration = exampleHydrate.getReject();
    expect(rejectHydration).not.toBeNull();
    rejectHydration!();
    await acceptStepwiseAndSettle(service);

    expect(service.state.isLoading()).toBeFalse();
    expect(service.state.hasValue()).toBeFalse();
    expect(service.characters()).toEqual([]);
    expect(service.state.error()?.message).toBe(
      'The character hydration was rejected.'
    );
    expect(exampleHydrate.getResolve()).toBeNull();
    expect(exampleHydrate.getReject()).toBeNull();

    VaultPrivateErrorService().clear();
  });

  it('should capture an empty baseline when a valued snapshot has no value', async () => {
    const featureCellProviders = provideFeatureCell(
      ExampleService,
      { key, initialState: null },
      [
        withArrayAppendMergeBehavior,
        withStepwiseResolveBehavior,
        withStepwiseFilterBehavior,
        withStepwiseReducerBehavior
      ],
      [withStepwiseController]
    );
    const featureCellProvider = featureCellProviders[0] as FactoryProvider;
    const value = signal<readonly StarWarsCharacterState[] | undefined>(
      undefined
    );
    const vault = jasmine.createSpyObj('FeatureCell', [
      'hydrate',
      'withStepwiseResolve',
      'withStepwiseFilter',
      'withStepwiseReducer',
      'operators',
      'filters',
      'beforeTaps',
      'reducers',
      'afterTaps',
      'emitStates',
      'errors',
      'withDelay',
      'setAes256Secret',
      'initialize',
      'replaceState'
    ]);

    Object.assign(vault, {
      state: { value },
      state$: of({ snapshot: { hasValue: true, value: undefined } })
    });
    vault.hydrate.and.returnValue(vault);
    vault.withStepwiseResolve.and.returnValue(vault);
    vault.withStepwiseFilter.and.returnValue(vault);
    vault.withStepwiseReducer.and.returnValue(vault);
    vault.operators.and.returnValue(vault);
    vault.filters.and.returnValue(vault);
    vault.beforeTaps.and.returnValue(vault);
    vault.reducers.and.returnValue(vault);
    vault.afterTaps.and.returnValue(vault);
    vault.emitStates.and.returnValue(vault);
    vault.errors.and.returnValue(vault);
    vault.withDelay.and.returnValue(vault);
    vault.setAes256Secret.and.returnValue(vault);

    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting(),
        provideZonelessChangeDetection(),
        { provide: featureCellProvider.provide, useValue: vault },
        ExampleService
      ]
    });

    const service = TestBed.inject(ExampleService);

    expect(vault.withDelay).toHaveBeenCalledOnceWith({
      millisecondDelay: EXAMPLE_DELAY_MILLISECONDS
    });
    expect(vault.setAes256Secret).toHaveBeenCalledOnceWith({
      aes256Secret: 'sdux-vault-tutorial-only-secret',
      salt: EXAMPLE_AES256_SALT,
      iterations: 250_000
    });
    expect(vault.withStepwiseResolve).toHaveBeenCalledOnceWith({
      stepwiseCallback: jasmine.any(Function)
    });
    expect(vault.withStepwiseFilter).toHaveBeenCalledOnceWith({
      stepwiseCallback: jasmine.any(Function)
    });
    expect(vault.withStepwiseReducer).toHaveBeenCalledOnceWith({
      stepwiseCallback: jasmine.any(Function)
    });
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
    expect(service.emittedError()).toBeUndefined();
  });

  it('should expose and accept a pending Stepwise Resolve request', async () => {
    const service = await configureService();
    const han = service.createCharacter({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });

    await new Promise((resolve) => setTimeout(resolve));

    expect(service.isStepwiseResolvePending()).toBeTrue();
    expect(service.stepwiseResolveRequest()).toEqual({
      current: initialCharactersWithDisplay,
      candidate: [han]
    });

    service.acceptStepwiseResolve();
    expect(service.isStepwiseResolvePending()).toBeFalse();
    await acceptStepwiseAndSettle(service);

    expect(service.characters()).toEqual([
      ...initialCharactersWithDisplay,
      { ...han, forceSensitiveDisplay: 'No' }
    ]);

    service.acceptStepwiseResolve();
    expect(service.isStepwiseResolvePending()).toBeFalse();
  });

  it('should cancel a pending Stepwise Resolve request without committing it', async () => {
    const service = await configureService();

    service.createCharacter({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    await new Promise((resolve) => setTimeout(resolve));

    expect(service.isStepwiseResolvePending()).toBeTrue();

    service.cancelStepwiseResolve();
    expect(service.isStepwiseResolvePending()).toBeFalse();
    await vaultSettled(key);

    expect(service.characters()).toEqual(initialCharactersWithDisplay);

    service.cancelStepwiseResolve();
    expect(service.isStepwiseResolvePending()).toBeFalse();
  });

  it('should expose and accept the filtered Stepwise Filter candidate', async () => {
    const service = await configureService();

    service.fetchWithPromise();
    await new Promise((resolve) => setTimeout(resolve));
    examplePromise.getResolve()!();
    await new Promise((resolve) => setTimeout(resolve));

    expect(service.isStepwiseResolvePending()).toBeTrue();
    expect(
      service
        .stepwiseResolveRequest()!
        .candidate.some(({ lastName }) => lastName === 'unknown')
    ).toBeTrue();

    service.acceptStepwiseResolve();
    await new Promise((resolve) => setTimeout(resolve));

    expect(service.isStepwiseFilterPending()).toBeTrue();
    expect(service.stepwiseFilterRequest()?.current).toEqual(
      initialCharactersWithDisplay
    );
    expect(
      service
        .stepwiseFilterRequest()!
        .candidate.some(({ lastName }) => lastName === 'unknown')
    ).toBeFalse();

    service.acceptStepwiseFilter();
    expect(service.isStepwiseFilterPending()).toBeFalse();
    await acceptStepwiseAndSettle(service);

    expect(service.characters().length).toBeGreaterThan(
      initialCharactersWithDisplay.length
    );

    service.acceptStepwiseFilter();
    expect(service.isStepwiseFilterPending()).toBeFalse();
  });

  it('should cancel a pending Stepwise Filter request without committing it', async () => {
    const service = await configureService();
    const committed = service.characters();

    service.createCharacter({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    await new Promise((resolve) => setTimeout(resolve));
    service.acceptStepwiseResolve();
    await new Promise((resolve) => setTimeout(resolve));

    expect(service.isStepwiseFilterPending()).toBeTrue();

    service.cancelStepwiseFilter();
    expect(service.isStepwiseFilterPending()).toBeFalse();
    await vaultSettled(key);

    expect(service.characters()).toBe(committed);

    service.cancelStepwiseFilter();
    expect(service.isStepwiseFilterPending()).toBeFalse();
  });

  it('should expose and accept the fully reduced Stepwise Reducer candidate', async () => {
    const service = await configureService();
    const han = service.createCharacter({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });

    await new Promise((resolve) => setTimeout(resolve));
    service.acceptStepwiseResolve();
    await new Promise((resolve) => setTimeout(resolve));
    service.acceptStepwiseFilter();
    await new Promise((resolve) => setTimeout(resolve));

    expect(service.isStepwiseReducerPending()).toBeTrue();
    expect(service.stepwiseReducerRequest()).toEqual({
      current: initialCharactersWithDisplay,
      candidate: [
        ...initialCharactersWithDisplay,
        { ...han, forceSensitiveDisplay: 'No' }
      ]
    });

    service.acceptStepwiseReducer();
    expect(service.isStepwiseReducerPending()).toBeFalse();
    await vaultSettled(key);

    expect(service.characters()).toEqual([
      ...initialCharactersWithDisplay,
      { ...han, forceSensitiveDisplay: 'No' }
    ]);

    service.acceptStepwiseReducer();
    expect(service.isStepwiseReducerPending()).toBeFalse();
  });

  it('should cancel a pending Stepwise Reducer request without committing it', async () => {
    const service = await configureService();
    const committed = service.characters();

    service.createCharacter({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    await new Promise((resolve) => setTimeout(resolve));
    service.acceptStepwiseResolve();
    await new Promise((resolve) => setTimeout(resolve));
    service.acceptStepwiseFilter();
    await new Promise((resolve) => setTimeout(resolve));

    expect(service.isStepwiseReducerPending()).toBeTrue();

    service.cancelStepwiseReducer();
    expect(service.isStepwiseReducerPending()).toBeFalse();
    await vaultSettled(key);

    expect(service.characters()).toBe(committed);

    service.cancelStepwiseReducer();
    expect(service.isStepwiseReducerPending()).toBeFalse();
  });

  it('should append new characters and assign IDs after the initial maximum', async () => {
    const service = await configureService();

    const han = service.createCharacter({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    await acceptStepwiseAndSettle(service);

    const chewbacca = service.createCharacter({
      name: 'Chewbacca',
      lastName: 'Wookiee',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    await acceptStepwiseAndSettle(service);

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
    await acceptStepwiseAndSettle(service);

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
    await acceptStepwiseAndSettle(service);

    expect(missing.id).toBe(999);
    expect(service.characters()).toEqual([
      { ...updatedLeia, forceSensitiveDisplay: 'No' },
      initialCharactersWithDisplay[1]!
    ]);
  });

  it('should remove only the requested character', async () => {
    const service = await configureService();

    service.removeCharacter(10);
    await acceptStepwiseAndSettle(service);

    expect(service.characters()).toEqual([initialCharactersWithDisplay[1]!]);

    service.removeCharacter(999);
    await acceptStepwiseAndSettle(service);

    expect(service.characters()).toEqual([initialCharactersWithDisplay[1]!]);
  });

  it('should persist null to clear the current FeatureCell value', async () => {
    const service = await configureService();

    service.persistNullValue();
    await acceptStepwiseAndSettle(service);

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

    const resolvePromise = examplePromise.getResolve();
    expect(resolvePromise).not.toBeNull();
    resolvePromise!();
    await acceptStepwiseAndSettle(service);

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
    expect(examplePromise.getResolve()).toBeNull();
    expect(examplePromise.getReject()).toBeNull();
  });

  it('should clear loading and preserve characters when the deferred Promise rejects', async () => {
    const service = await configureService();

    service.fetchWithPromise();
    await new Promise((resolve) => setTimeout(resolve));

    expect(service.state.isLoading()).toBeTrue();
    expect(service.characters()).toEqual(initialCharactersWithDisplay);

    const rejectPromise = examplePromise.getReject();
    expect(rejectPromise).not.toBeNull();
    rejectPromise!();
    await acceptStepwiseAndSettle(service);

    expect(service.state.isLoading()).toBeFalse();
    expect(service.characters()).toEqual(initialCharactersWithDisplay);
    expect(service.state.error()?.message).toBe(
      'The character request was rejected.'
    );
    expect(service.emittedError()).toEqual({
      error: service.state.error()!,
      state: {
        isLoading: false,
        value: initialCharactersWithDisplay,
        error: service.state.error()!,
        hasValue: true
      }
    });
    expect(examplePromise.getResolve()).toBeNull();
    expect(examplePromise.getReject()).toBeNull();

    VaultPrivateErrorService().clear();
  });

  it('should merge characters emitted by the manually controlled Observable', async () => {
    const service = await configureService();

    service.addByObservable();
    await new Promise((resolve) => setTimeout(resolve));

    expect(service.state.isLoading()).toBeTrue();
    expect(service.characters()).toEqual(initialCharactersWithDisplay);

    const emitObservable = exampleObservable.getEmit();
    expect(emitObservable).not.toBeNull();
    emitObservable!();
    await acceptStepwiseAndSettle(service);

    expect(service.state.isLoading()).toBeFalse();
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
    expect(
      service.characters().some(({ lastName }) => lastName === 'unknown')
    ).toBeFalse();
    expect(exampleObservable.getEmit()).toBeNull();
    expect(exampleObservable.getError()).toBeNull();
  });

  it('should preserve characters when the manually controlled Observable errors', async () => {
    const service = await configureService();

    service.addByObservable();
    await new Promise((resolve) => setTimeout(resolve));

    expect(service.state.isLoading()).toBeTrue();
    expect(service.characters()).toEqual(initialCharactersWithDisplay);

    const errorObservable = exampleObservable.getError();
    expect(errorObservable).not.toBeNull();
    errorObservable!();
    await acceptStepwiseAndSettle(service);

    expect(service.state.isLoading()).toBeFalse();
    expect(service.characters()).toEqual(initialCharactersWithDisplay);
    expect(service.state.error()?.message).toBe(
      'The character request was rejected.'
    );
    expect(service.emittedError()).toEqual({
      error: service.state.error()!,
      state: {
        isLoading: false,
        value: initialCharactersWithDisplay,
        error: service.state.error()!,
        hasValue: true
      }
    });
    expect(exampleObservable.getEmit()).toBeNull();
    expect(exampleObservable.getError()).toBeNull();

    VaultPrivateErrorService().clear();
  });

  it('should replace State with characters resolved from an HTTP resource', async () => {
    const service = await configureService();
    const httpTesting = TestBed.inject(HttpTestingController);

    service.fetchWithHttpResource();
    TestBed.tick();
    await new Promise((resolve) => setTimeout(resolve));

    expect(service.state.isLoading()).toBeTrue();
    expect(service.characters()).toEqual(initialCharactersWithDisplay);

    httpTesting.expectOne('https://swapi.info/api/people').flush([
      {
        name: 'Han Solo',
        url: 'https://swapi.info/api/people/14'
      },
      {
        name: 'Yoda',
        url: 'https://swapi.info/api/people/20'
      },
      {
        name: 'Lando Calrissian',
        url: 'https://swapi.info/api/people/25'
      }
    ]);
    await acceptStepwiseAndSettle(service);

    expect(service.state.isLoading()).toBeFalse();
    expect(service.state.error()).toBeNull();
    expect(service.characters()).toEqual([
      {
        id: 25,
        name: 'Lando',
        lastName: 'Calrissian',
        faction: 'Rebel Alliance',
        isForceSensitive: false,
        forceSensitiveDisplay: 'No'
      },
      {
        id: 14,
        name: 'Han',
        lastName: 'Solo',
        faction: 'Rebel Alliance',
        isForceSensitive: false,
        forceSensitiveDisplay: 'No'
      }
    ]);
    expect(
      service.characters().some(({ lastName }) => lastName === 'unknown')
    ).toBeFalse();
    httpTesting.verify();
  });

  it('should suppress a repeated final-character merge delta', async () => {
    const service = await configureService();
    const rey = {
      id: 501,
      name: 'Rey',
      lastName: 'Skywalker',
      faction: 'Jedi Order',
      isForceSensitive: true,
      forceSensitiveDisplay: 'Yes'
    } as const;

    service.submitSameState();
    await acceptStepwiseAndSettle(service);

    expect(service.characters()).toEqual([
      ...initialCharactersWithDisplay,
      rey
    ]);

    const beforeTapInput = service.beforeTapInput();
    const afterTapInput = service.afterTapInput();

    service.submitSameState();
    await acceptStepwiseAndSettle(service);

    expect(service.characters()).toEqual([
      ...initialCharactersWithDisplay,
      rey
    ]);
    expect(service.beforeTapInput()).toBe(beforeTapInput);
    expect(service.afterTapInput()).toBe(afterTapInput);
  });

  it('should arm, throw, and reset the intentional inline-filter error', async () => {
    const service = await configureService();
    const beforeTapInput = service.beforeTapInput();
    const afterTapInput = service.afterTapInput();

    expect(service.isThrowError()).toBeFalse();

    service.throwFilterError();

    expect(service.isThrowError()).toBeTrue();
    await acceptStepwiseAndSettle(service);

    expect(service.characters()).toEqual(initialCharactersWithDisplay);
    expect(service.state.error()?.message).toBe(
      'The intentional character filter error was thrown.'
    );
    expect(service.beforeTapInput()).toBe(beforeTapInput);
    expect(service.afterTapInput()).toBe(afterTapInput);

    service.resetFilterError();

    expect(service.isThrowError()).toBeFalse();
  });

  it('should merge four unique Jedi and suppress the wrapped identity', async () => {
    const service = await configureService();
    const expectedCharacters = [
      {
        id: 601,
        name: 'Qui-Gon',
        lastName: 'Jinn',
        faction: 'Jedi Order',
        isForceSensitive: true,
        forceSensitiveDisplay: 'Yes'
      },
      {
        id: 602,
        name: 'Plo',
        lastName: 'Koon',
        faction: 'Jedi Order',
        isForceSensitive: true,
        forceSensitiveDisplay: 'Yes'
      },
      {
        id: 603,
        name: 'Aayla',
        lastName: 'Secura',
        faction: 'Jedi Order',
        isForceSensitive: true,
        forceSensitiveDisplay: 'Yes'
      },
      {
        id: 604,
        name: 'Kit',
        lastName: 'Fisto',
        faction: 'Jedi Order',
        isForceSensitive: true,
        forceSensitiveDisplay: 'Yes'
      }
    ] as const;

    let expectedState = [...initialCharactersWithDisplay];

    for (const character of expectedCharacters) {
      service.submitChangedState();
      await acceptStepwiseAndSettle(service);

      expectedState = [...expectedState, character].sort((left, right) =>
        left.lastName.localeCompare(right.lastName)
      );
      expect(service.characters()).toEqual(expectedState);
    }

    const beforeTapInput = service.beforeTapInput();
    const afterTapInput = service.afterTapInput();

    service.submitChangedState();
    await acceptStepwiseAndSettle(service);

    expect(service.characters()).toEqual(expectedState);
    expect(service.beforeTapInput()).toBe(beforeTapInput);
    expect(service.afterTapInput()).toBe(afterTapInput);
  });

  it('should persist an AES-256 envelope while keeping FeatureCell State plaintext', async () => {
    localStorage.removeItem(EXAMPLE_ENCRYPTED_STORAGE_KEY);

    const service = await configureService(initialCharacters, false, true);
    const persisted = localStorage.getItem(EXAMPLE_ENCRYPTED_STORAGE_KEY);

    expect(service.characters()).toEqual(initialCharactersWithDisplay);
    expect(persisted).not.toBeNull();
    expect(JSON.parse(persisted!)).toEqual({
      v: 1,
      alg: 'AES-256-GCM',
      iv: jasmine.any(String),
      data: jasmine.any(String)
    });

    localStorage.removeItem(EXAMPLE_ENCRYPTED_STORAGE_KEY);
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
    await acceptStepwiseAndSettle(service);
    service.createCharacter({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    await acceptStepwiseAndSettle(service);

    const firstCharacter = service.restoreInitialCharacters();
    await acceptStepwiseAndSettle(service);

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
    await acceptStepwiseAndSettle(service);
    service.removeCharacter(1);
    await acceptStepwiseAndSettle(service);
    const firstCharacter = service.restoreInitialCharacters();
    await acceptStepwiseAndSettle(service);

    expect(firstCharacter).toBeNull();
    expect(service.characters()).toEqual([]);
  });
});
