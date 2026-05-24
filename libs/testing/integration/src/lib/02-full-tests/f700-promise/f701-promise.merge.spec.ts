import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withLocalStoragePersistBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import {
  clearLocalStorage,
  flushVaultPipeline,
  getLocalStorage
} from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import {
  verifyFullPipelineAfterTaps,
  verifyFullPipelineBeforeTaps,
  verifyFullPipelineEmployees
} from '../../structure/utils/verify-full-pipeline-employees.util';
import { FullTestService } from '../services/full-test.service';
import { f701Snapshot } from './snap-shots/f701-promise.merge.snapshot';

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
 * merge is testService.vault.mergeState({});
 * which is getBankEmployees()
 *
 * filters and reducers comes out to be
 *
 * state.value().length = 3
 * beforeTabs.length = 5
 * Local Storage Length = 3 (same as state values)
 *************************************************/

describe('f700: Promise - Merge Test', () => {
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
          { key, initialState: [], insights: {} as any },
          [withLocalStoragePersistBehavior]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(FullTestService);
    testService.initialize();
  });

  it('should merge through the entire pipe', async () => {
    let state = testService.getState();
    await vaultSettled(key);

    testService.partialAfterTapAbstract.clearTaps();
    testService.partialBeforeTapAbstract.clearTaps();

    testService.vault.mergeState(
      testService.formatPromiseInputAsValue(getBankEmployeeData())
    );
    await vaultSettled(key);

    testService.vault.mergeState(
      testService.formatPromiseInputAsValue(getBankEmployeeData())
    );
    await vaultSettled(key);

    testService.vault.mergeState(
      testService.formatPromiseInputAsValue(getBankEmployeeData(0, true))
    );
    await vaultSettled(key);

    expect(state.value()).toEqual([]);
    expect(state.hasValue()).toBeTrue();
    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    verifyFullPipelineBeforeTaps(
      testService.partialBeforeTapAbstract.getTaps().slice(0, 5)
    );
    expect(testService.partialBeforeTapAbstract.getTaps().slice(5, 10)).toEqual(
      [
        Object({ value: [], source: 'partialArrowBeforeTapFunction' }),
        Object({ value: [], source: 'partialInlineBeforeTapFunction' }),
        Object({ value: [], source: 'partialPrivateBeforeTapFunction' }),
        Object({ value: [], source: 'partialAnonymousBeforeTapFunction' }),
        Object({ value: [], source: 'partialPureFunctionBeforeTap' })
      ]
    );

    verifyFullPipelineAfterTaps(
      testService.partialAfterTapAbstract.getTaps().slice(0, 5)
    );
    expect(testService.partialAfterTapAbstract.getTaps().slice(5, 10)).toEqual([
      Object({ value: [], source: 'partialArrowAfterTapFunction' }),
      Object({ value: [], source: 'partialInlineAfterTapFunction' }),
      Object({ value: [], source: 'partialPrivateAfterTapFunction' }),
      Object({ value: [], source: 'partialAnonymousAfterTapFunction' }),
      Object({ value: [], source: 'partialPureFunctionAfterTap' })
    ]);

    expect(getLocalStorage(storageKey)).toEqual([]);

    testService.partialBeforeTapAbstract.clearTaps();
    testService.partialAfterTapAbstract.clearTaps();

    testService.vault.mergeState(
      testService.formatPromiseInputAsValue(getBankEmployeeData())
    );
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
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, f701Snapshot);
  });
});
