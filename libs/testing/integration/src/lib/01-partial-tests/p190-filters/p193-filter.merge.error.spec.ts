import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialFilterService } from './partial-filter.service';
import { p193Snapshot } from './snap-shots/p193-filter.merge.error.snapshot';

describe('p191: Filter - Merge - Error Test', () => {
  const key = 'partial-filters';
  let testService: PartialFilterService;
  let stopListening: () => void;

  const emitted: any[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        PartialFilterService,
        provideZonelessChangeDetection(),
        provideFeatureCell(PartialFilterService, {
          key,
          initialState: null,
          insights: {} as any
        })
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialFilterService);
    testService.initializeErrors();
  });

  afterEach(() => {
    stopListening();
    testService.clearGlobalErrors();
  });

  it('should merge the bank employees and bankers with filters', async () => {
    const state = testService.getState();
    await vaultSettled(key);

    testService.vault.mergeState(Object({ value: getBankEmployeeData() }));
    await vaultSettled(key);

    // Assert — both filters applied in order
    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'this is a filter error',
        featureCellKey: 'partial-filters',
        details: jasmine.any(String),
        raw: jasmine.any(Object),
        timestamp: jasmine.any(Number)
      })
    );
    testService.p190MergeEmployeesFilters();
    await vaultSettled(key);

    // Assert — both filters applied in order
    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'this is a filter error',
        featureCellKey: 'partial-filters',
        details: jasmine.any(String),
        raw: jasmine.any(Object),
        timestamp: jasmine.any(Number)
      })
    );
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p193Snapshot);
  });
});
