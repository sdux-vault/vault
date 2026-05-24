import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withLocalStoragePersistBehavior,
  withThrottleController
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import {
  clearLocalStorage,
  flushVaultPipeline,
  getLocalStorage
} from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { getFilteredAndReducedBankEmployeeData } from '../../structure/data/bank-employee.filtered-and-reduced.data';
import { getFilteredBankEmployeeData } from '../../structure/data/bank-employee.filtered.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { verifyFullPipelineEmployees } from '../../structure/utils/verify-full-pipeline-employees.util';
import { FullTestService } from '../services/full-test.service';
import { f103Snapshot } from './snap-shots/f103-init.non-standard.snapshot';

/*************************************************
 * Test 1
 *
 * Initial value is -1
 *
 * filters and reducers comes out to be
 *
 * state.value() = undefined
 * beforeTaps = []
 * Local Storage = null
 *
 * replace is getBankEmployees()
 *
 * filters and reducers comes out to be
 *
 * state.value().length = 3
 * beforeTabs.length = 5
 * Local Storage Length = 3 (same as state values)
 *************************************************/

describe('f103: Non-standard Initial Values Test', () => {
  const key = 'full-test';
  let testService: FullTestService;
  let stopListening: () => void;

  const emitted: any[] = [];
  const storageKey = `vault::localstorage::${key}::SDUX::Behavior::Persist::LocalStorage`;

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
            key,
            insights: { wantsErrors: true } as any,
            initialState: -1
          } as any,
          [withLocalStoragePersistBehavior],
          [withThrottleController]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(FullTestService);
    testService.initialize();
  });

  afterEach(() => {
    stopListening();
    clearLocalStorage(storageKey);
    testService.clearGlobalErrors();
  });

  it('should replace through the entire pipe', async () => {
    const state = testService.getState();
    jasmine.clock().tick(1_000);
    await vaultSettled(key);

    // There is not value because it get filtered and reduced out
    expect(state.value()).toBeUndefined();

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([]);
    expect(getLocalStorage(storageKey)).toBeNull();

    testService.partialBeforeTapAbstract.clearTaps();

    jasmine.clock().tick(1_000);
    testService.vault.replaceState(
      getBankEmployeeData() as BankEmployeeShape[]
    );
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    verifyFullPipelineEmployees(state.value());

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([
      Object({
        value: getFilteredBankEmployeeData(),
        source: 'partialArrowBeforeTapFunction'
      }),
      Object({
        value: getFilteredBankEmployeeData(),
        source: 'partialInlineBeforeTapFunction'
      }),
      Object({
        value: getFilteredBankEmployeeData(),
        source: 'partialPrivateBeforeTapFunction'
      }),
      Object({
        value: getFilteredBankEmployeeData(),
        source: 'partialAnonymousBeforeTapFunction'
      }),
      Object({
        value: getFilteredBankEmployeeData(),
        source: 'partialPureFunctionBeforeTap'
      })
    ]);

    expect(testService.partialAfterTapAbstract.getTaps()).toEqual([
      Object({
        value: getFilteredAndReducedBankEmployeeData(),
        source: 'partialArrowAfterTapFunction'
      }),
      Object({
        value: getFilteredAndReducedBankEmployeeData(),
        source: 'partialInlineAfterTapFunction'
      }),
      Object({
        value: getFilteredAndReducedBankEmployeeData(),
        source: 'partialPrivateAfterTapFunction'
      }),
      Object({
        value: getFilteredAndReducedBankEmployeeData(),
        source: 'partialAnonymousAfterTapFunction'
      }),
      Object({
        value: getFilteredAndReducedBankEmployeeData(),
        source: 'partialPureFunctionAfterTap'
      })
    ]);

    verifyFullPipelineEmployees(getLocalStorage(storageKey));
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, f103Snapshot);
  });
});
