import type { FactoryProvider } from '@angular/core';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import {
  withArrayAppendMergeBehavior,
  withStepwiseController,
  withStepwiseFilterBehavior,
  withStepwiseReducerBehavior,
  withStepwiseResolveBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { TestBed } from '@angular/core/testing';
import { exampleHydrate } from './example.hydrate';
import { ExampleService } from './example.service';
import type { StarWarsCharacter } from './star-wars-character.shape';
import { of } from 'rxjs';

describe('ExampleService', () => {
  const key = 'star-wars-character';
  const initialCharacters: StarWarsCharacter[] = [
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

  const expectedCharacters = (characters: readonly StarWarsCharacter[]) =>
    [...characters]
      .map((character) => ({
        ...character,
        forceSensitiveDisplay: character.isForceSensitive ? 'Yes' : 'No',
        fullName: `${character.name} ${character.lastName}`
      }))
      .sort((left, right) => left.lastName.localeCompare(right.lastName));

  const acceptStepwiseAndSettle = async (
    service: ExampleService
  ): Promise<void> => {
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
        service.acceptStepwiseResolve();
        continue;
      }

      if (service.isStepwiseFilterPending()) {
        service.acceptStepwiseFilter();
        continue;
      }

      if (service.isStepwiseReducerPending()) {
        service.acceptStepwiseReducer();
      }
    }

    await settledPromise;
  };

  const configureService = async (
    initialState: StarWarsCharacter[] | null = initialCharacters
  ): Promise<ExampleService> => {
    await TestBed.configureTestingModule({
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

    spyOn(exampleHydrate, 'getPromise').and.returnValue(
      Promise.resolve(initialState ?? undefined) as Promise<StarWarsCharacter[]>
    );

    const service = TestBed.inject(ExampleService);
    await acceptStepwiseAndSettle(service);
    return service;
  };

  beforeEach(() => TestBed.resetTestingModule());

  it('should initialize and expose reduced FeatureCell State', async () => {
    const service = await configureService();

    expect(service.state.value()).toEqual(
      expectedCharacters(initialCharacters)
    );
    expect(service.state.hasValue()).toBeTrue();
    expect(service.state.error()).toBeNull();
  });

  it('should expose each Stepwise callback request', async () => {
    const service = await configureService();

    expect(service.stepwiseResolveRequest()).toEqual(
      jasmine.objectContaining({ candidate: jasmine.any(Array) })
    );
    expect(service.stepwiseFilterRequest()).toEqual(
      jasmine.objectContaining({ candidate: jasmine.any(Array) })
    );
    expect(service.stepwiseReducerRequest()).toEqual(
      jasmine.objectContaining({ candidate: jasmine.any(Array) })
    );
  });

  it('should safely ignore decisions when no request is pending', async () => {
    const service = await configureService();

    service.acceptStepwiseResolve();
    service.cancelStepwiseResolve();
    service.acceptStepwiseFilter();
    service.cancelStepwiseFilter();
    service.acceptStepwiseReducer();
    service.cancelStepwiseReducer();

    expect(service.isStepwiseResolvePending()).toBeFalse();
    expect(service.isStepwiseFilterPending()).toBeFalse();
    expect(service.isStepwiseReducerPending()).toBeFalse();
  });

  it('should create, update, and remove characters through the FeatureCell', async () => {
    const service = await configureService();
    const created = service.createCharacter({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });

    expect(created.id).toBe(3);
    await acceptStepwiseAndSettle(service);
    service.updateCharacter(3, { ...created, name: 'General Han' });
    await acceptStepwiseAndSettle(service);
    service.removeCharacter(3);
    await acceptStepwiseAndSettle(service);

    expect(service.state.value()).toEqual(
      expectedCharacters(initialCharacters)
    );
  });

  it('should reset and restore the captured initial characters', async () => {
    const service = await configureService();

    service.resetState();
    expect(service.restoreInitialCharacters()).toEqual(
      jasmine.objectContaining({
        id: 2,
        name: 'Leia',
        lastName: 'Organa',
        forceSensitiveDisplay: 'No',
        fullName: 'Leia Organa'
      })
    );
  });

  it('should handle empty initial State in update, remove, and restore flows', async () => {
    const service = await configureService(null);

    service.updateCharacter(3, {
      name: 'Missing',
      lastName: 'Character',
      faction: 'Unaffiliated',
      isForceSensitive: false
    });
    await acceptStepwiseAndSettle(service);

    service.removeCharacter(3);
    await acceptStepwiseAndSettle(service);

    expect(service.state.value()).toEqual([]);
    expect(service.restoreInitialCharacters()).toBeNull();
  });

  it('should capture an empty baseline when a valued snapshot has no value', async () => {
    const featureCellProviders = provideFeatureCell(ExampleService, {
      key,
      initialState: null
    });
    const featureCellProvider = featureCellProviders[0] as FactoryProvider;
    const vault = jasmine.createSpyObj('FeatureCell', [
      'hydrate',
      'withStepwiseResolve',
      'filters',
      'withStepwiseFilter',
      'reducers',
      'withStepwiseReducer',
      'initialize',
      'replaceState'
    ]);

    Object.assign(vault, {
      state: {
        value: signal<StarWarsCharacter[] | undefined>(undefined)
      },
      state$: of({ snapshot: { hasValue: true, value: undefined } })
    });

    vault.hydrate.and.returnValue(vault);
    vault.withStepwiseResolve.and.returnValue(vault);
    vault.filters.and.returnValue(vault);
    vault.withStepwiseFilter.and.returnValue(vault);
    vault.reducers.and.returnValue(vault);
    vault.withStepwiseReducer.and.returnValue(vault);

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
});
