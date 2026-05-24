import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withLocalStoragePersistBehavior,
  withThrottleController
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { StateInputShape } from '@sdux-vault/shared';
import { clearLocalStorage, getLocalStorage } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import {
  verifyFullPipelineAfterTaps,
  verifyFullPipelineBeforeTaps,
  verifyFullPipelineEmployees
} from '../../structure/utils/verify-full-pipeline-employees.util';
import { FullTestService } from '../services/full-test.service';
import { f1000Snapshot } from './snap-shots/f1000-from-deferred.replace.snapshot';

/*************************************************
 * Test 1
 *
 * Initial value is null
 *
 * filters and reducers comes out to be
 *
 * state.value() = undefined
 * beforeTaps = []
 * Local Storage = null
 *
 * replace is testService.vault.replaceState(Object({ value: getBankEmployeeData() }));
 * which is getBankEmployees()
 *
 * filters and reducers comes out to be
 *
 * state.value().length = 3
 * beforeTabs.length = 5
 * Local Storage Length = 3 (same as state values)
 *************************************************/

describe('f1000: Value - fromDeferred Replace Test', () => {
  let testService: FullTestService;
  let stopListening: () => void;

  let key = 'full-test';
  const emitted: any[] = [];
  const storageKey = `vault::localstorage::${key}::SDUX::Behavior::Persist::LocalStorage`;

  beforeAll(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date('2024-01-01T00:00:00.000Z'));
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  afterEach(() => {
    stopListening();
    clearLocalStorage(storageKey);
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
          { key, initialState: null, insights: {} as any },
          [withLocalStoragePersistBehavior],
          [withThrottleController]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(FullTestService);
    testService.initializeWithThrottle();
  });

  it('should replace through the entire pipe', async () => {
    const state = testService.getState();
    await vaultSettled(key);

    testService.vault.fromDeferred!({
      value: () => Promise.resolve(getBankEmployeeData() as any)
    }).then((vaultInput: StateInputShape<BankEmployeeShape[]>): void => {
      testService.vault.replaceState(vaultInput);
    });
    await vaultSettled(key);

    testService.vault.fromDeferred!({
      value: () => Promise.resolve(getBankEmployeeData() as any)
    }).then((vaultInput: StateInputShape<BankEmployeeShape[]>): void => {
      testService.vault.replaceState(vaultInput);
    });
    await vaultSettled(key);

    testService.vault.fromDeferred!({
      value: () => Promise.resolve(getBankEmployeeData(0, true) as any)
    }).then((vaultInput: StateInputShape<BankEmployeeShape[]>): void => {
      testService.vault.replaceState(vaultInput);
    });
    await vaultSettled(key);

    jasmine.clock().tick(900);

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([]);
    expect(testService.partialAfterTapAbstract.getTaps()).toEqual([]);

    expect(getLocalStorage(storageKey)).toBeNull();

    testService.partialBeforeTapAbstract.clearTaps();

    jasmine.clock().tick(1000);
    testService.vault.fromDeferred!({
      value: () => Promise.resolve(getBankEmployeeData() as any)
    }).then((vaultInput: StateInputShape<BankEmployeeShape[]>): void => {
      testService.vault.replaceState(vaultInput);
    });
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    verifyFullPipelineEmployees(state.value());
    verifyFullPipelineBeforeTaps(
      testService.partialBeforeTapAbstract.getTaps()
    );
    verifyFullPipelineAfterTaps(testService.partialAfterTapAbstract.getTaps());

    verifyFullPipelineEmployees(getLocalStorage(storageKey));
  });

  it('should have the correct insight events', async () => {
    jasmine.clock().tick(1000);
    await vaultSettled(key);
    expectMonitorSnapshot(emitted, f1000Snapshot);
  });
});
