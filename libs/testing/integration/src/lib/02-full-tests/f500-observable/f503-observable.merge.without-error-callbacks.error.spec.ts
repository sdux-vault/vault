import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withLocalStoragePersistBehavior,
  withThrottleController
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { VaultErrorService } from '@sdux-vault/shared';
import {
  clearLocalStorage,
  flushVaultPipeline,
  getLocalStorage
} from '@sdux-vault/testing-utils';
import { of, tap } from 'rxjs';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { FullTestService } from '../services/full-test.service';
import { f503Snapshot } from './snap-shots/f503-observable.merge.without-error-callbacks.error.snapshot';

describe('f503: Value - Merge - Without ErrorCallbacks - Error Test', () => {
  const key = 'full-test';
  let testService: FullTestService;
  let errorService: any;
  let stopListening: () => void;

  const emitted: any[] = [];
  const storageKey = `vault::localstorage::${key}::SDUX::Behavior::Persist::LocalStorage`;
  const globalErrors: any[] = [];
  let errorSubscription: any;

  beforeAll(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date('2024-01-01T00:00:00.000Z'));
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  beforeEach(async () => {
    clearLocalStorage(storageKey);
    globalErrors.length = 0;

    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        FullTestService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          FullTestService,
          {
            key,
            initialState: null,
            insights: { wantsErrors: true, wantsPayload: true } as any
          },
          [withLocalStoragePersistBehavior],
          [withThrottleController]
        )
      ]
    });

    errorService = VaultErrorService();
    errorSubscription = errorService.error$
      .pipe(tap((error) => globalErrors.push(error)))
      .subscribe();

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(FullTestService);
    testService.initializeErrorsWithThrottle();
  });

  afterEach(() => {
    stopListening();
    errorSubscription.unsubscribe();
    testService.clearGlobalErrors();
  });

  it('should merge through the entire pipe', async () => {
    let state = testService.getState();
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(testService.partialErrorAbstract.getErrors()).toEqual([]);
    expect(globalErrors).toEqual([null]);

    testService.vault.replaceState(
      of(getBankEmployeeData() as BankEmployeeShape[])
    );
    await vaultSettled(key);
    testService.vault.replaceState(
      of(getBankEmployeeData() as BankEmployeeShape[])
    );
    await vaultSettled(key);
    testService.vault.replaceState(
      of(getBankEmployeeData(0, true) as BankEmployeeShape[])
    );
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(testService.partialErrorAbstract.getErrors()).toEqual([]);
    expect(globalErrors).toEqual([null]);

    jasmine.clock().tick(999);

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(testService.partialErrorAbstract.getErrors()).toEqual([]);
    expect(globalErrors).toEqual([null]);

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([]);
    expect(testService.partialAfterTapAbstract.getTaps()).toEqual([]);

    expect(getLocalStorage(storageKey)).toBeNull();

    testService.partialBeforeTapAbstract.clearTaps();
    testService.partialAfterTapAbstract.clearTaps();

    jasmine.clock().tick(1);
    testService.vault.replaceState(
      of(getBankEmployeeData() as BankEmployeeShape[])
    );
    await vaultSettled(key);

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'this is a filter error',
        featureCellKey: key,
        details: jasmine.any(String),
        raw: jasmine.any(Object),
        timestamp: jasmine.any(Number)
      })
    );

    expect(testService.partialErrorAbstract.getErrors()).toEqual([]);
    expect(globalErrors).toEqual([
      null,
      Object({
        message: 'this is a filter error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      })
    ]);

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([]);
    expect(testService.partialAfterTapAbstract.getTaps()).toEqual([]);

    expect(getLocalStorage(storageKey)).toBeNull();

    testService.partialBeforeTapAbstract.clearTaps();
    testService.partialAfterTapAbstract.clearTaps();

    jasmine.clock().tick(1_000);
    testService.vault.mergeState([]);
    await vaultSettled(key);

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'this is a distinct until change error',
        featureCellKey: key,
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number)
      })
    );

    expect(testService.partialErrorAbstract.getErrors()).toEqual([]);
    expect(globalErrors).toEqual([
      null,
      Object({
        message: 'this is a filter error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      }),
      Object({
        message: 'this is a distinct until change error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      })
    ]);

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([]);
    expect(testService.partialAfterTapAbstract.getTaps()).toEqual([]);

    expect(getLocalStorage(storageKey)).toBeNull();

    testService.partialBeforeTapAbstract.clearTaps();
    testService.partialAfterTapAbstract.clearTaps();

    jasmine.clock().tick(1000);
    testService.vault.mergeState([]);
    await vaultSettled(key);

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        featureCellKey: key,
        message: 'this is a distinct until change error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number)
      })
    );

    expect(testService.partialErrorAbstract.getErrors()).toEqual([]);
    expect(globalErrors).toEqual([
      null,
      Object({
        message: 'this is a filter error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      }),
      Object({
        message: 'this is a distinct until change error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      }),
      Object({
        message: 'this is a distinct until change error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      })
    ]);

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([]);
    expect(testService.partialAfterTapAbstract.getTaps()).toEqual([]);

    expect(getLocalStorage(storageKey)).toBeNull();

    testService.partialBeforeTapAbstract.clearTaps();
    testService.partialAfterTapAbstract.clearTaps();

    jasmine.clock().tick(1000);
    testService.partialFilterAbstract.p190MergeEmployeesFilters();
    await vaultSettled(key);

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'this is a distinct until change error',
        featureCellKey: key,
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number)
      })
    );

    expect(testService.partialErrorAbstract.getErrors()).toEqual([]);
    expect(globalErrors).toEqual([
      null,
      Object({
        message: 'this is a filter error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      }),
      Object({
        message: 'this is a distinct until change error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      }),
      Object({
        message: 'this is a distinct until change error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      }),
      Object({
        message: 'this is a distinct until change error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      })
    ]);

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([]);
    expect(testService.partialAfterTapAbstract.getTaps()).toEqual([]);

    expect(getLocalStorage(storageKey)).toBeNull();

    errorService.clear();
    testService.partialErrorAbstract.clearErrors();

    expect(testService.partialErrorAbstract.getErrors()).toEqual([]);
    expect(globalErrors).toEqual([
      null,
      Object({
        message: 'this is a filter error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      }),
      Object({
        message: 'this is a distinct until change error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      }),
      Object({
        message: 'this is a distinct until change error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      }),
      Object({
        message: 'this is a distinct until change error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      }),
      null
    ]);

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([]);
    expect(testService.partialAfterTapAbstract.getTaps()).toEqual([]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, f503Snapshot);
  });
});
