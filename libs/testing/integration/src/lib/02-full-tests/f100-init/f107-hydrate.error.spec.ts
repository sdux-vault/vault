import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withLocalStoragePersistBehavior,
  withThrottleController
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { clearLocalStorage, getLocalStorage } from '@sdux-vault/testing-utils';
import { Subscription } from 'rxjs';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { FullTestService } from '../services/full-test.service';
import { f107Snapshot } from './snap-shots/f107-hydrate.error.snapshot';

/*************************************************
 * Test 1
 *
 * Initial value is getBankEmployees()
 *
 * filters and reducers comes out to be
 *
 * state.value().length = 3
 * beforeTabs.length = 5
 * Local Storage Length = 3 (same as state values)
 *************************************************/

describe('f107: Hydrate - Error Test', () => {
  let testService: FullTestService;
  let stopListening: () => void;

  const emitted: any[] = [];
  const storageKey =
    'vault::localstorage::full-test::SDUX::Behavior::Persist::LocalStorage';
  let stopErrorListening: Subscription;
  const globalErrors: any[] = [];

  beforeAll(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date('2024-01-01T00:00:00.000Z'));
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  beforeEach(async () => {
    clearLocalStorage(storageKey);
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
            key: 'full-test',
            initialState: getBankEmployeeData(),
            insights: { wantsErrors: true, wantsPayload: true } as any
          },
          [withLocalStoragePersistBehavior],
          [withThrottleController]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(FullTestService);
    testService.initializeWithHydrationErrors();

    stopErrorListening = testService.globalError.error$.subscribe((err) => {
      globalErrors.push(err);
    });
  });

  afterEach(() => {
    stopListening();
    clearLocalStorage(storageKey);
    testService.clearGlobalErrors();
    stopErrorListening.unsubscribe();
  });

  it('should load initial values and replace through the entire pipe', async () => {
    const state = testService.getState();
    jasmine.clock().tick(1_000);
    await vaultSettled(testService.vault.key);

    expect(state.value()).toBeUndefined();

    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'this is a hydration error',
        details: jasmine.anything(),
        raw: jasmine.anything(),
        timestamp: jasmine.anything(),
        featureCellKey: 'full-test'
      })
    );
    expect(state.isLoading()).toBeFalse();

    expect(testService.fetches).toEqual([]);

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([]);
    expect(testService.partialAfterTapAbstract.getTaps()).toEqual([]);

    expect(getLocalStorage(storageKey)).toBeNull();

    expect(globalErrors).toEqual([
      null,
      Object({
        message: 'this is a hydration error',
        details: 'this is a hydration error',
        raw: 'this is a hydration error',
        timestamp: 1704067201000,
        featureCellKey: 'full-test'
      })
    ]);
  });

  it('should have the correct insight events', async () => {
    jasmine.clock().tick(1_000);
    await vaultSettled(testService.vault.key);
    expectMonitorSnapshot(emitted, f107Snapshot);
  });
});
