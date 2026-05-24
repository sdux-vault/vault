import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialFilterService } from './partial-filter.service';
import { p192Snapshot } from './snap-shots/p192-filter.replace.error.snapshot';

describe('p192: Filter - Replace - Error Tests', () => {
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
        PartialFilterService,
        provideZonelessChangeDetection(),
        provideFeatureCell(PartialFilterService, {
          key,
          initialState: undefined,
          insights: {
            wantsErrors: true,
            wantsPayload: true,
            wantsState: false
          } as any
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

  it('should not replace the bank employees with filters', async () => {
    const state = testService.getState();
    await vaultSettled(key);

    testService.vault.replaceState(Object({ value: getBankEmployeeData() }));
    await vaultSettled(key);

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
    expectMonitorSnapshot(emitted, p192Snapshot);
  });
});
