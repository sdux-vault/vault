import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialReducerService } from './partial-reducer.service';
import { p202Snapshot } from './snap-shots/p202-reducer.replace.error.snapshot';

describe('p202: Reducer - Error Tests', () => {
  let testService: PartialReducerService;
  let stopListening: () => void;

  const emitted: any[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        PartialReducerService,
        provideZonelessChangeDetection(),
        provideFeatureCell(PartialReducerService, {
          key: 'partial-reducers',
          initialState: null,
          insights: {
            wantsErrors: true,
            wantsPayload: true,
            wantsState: false
          } as any
        })
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialReducerService);
    await testService.initializeError();
  });

  afterEach(() => {
    stopListening();
    testService.clearGlobalErrors();
  });

  it('should not replace the bank employees with reducers', async () => {
    await flushVaultPipeline();
    testService.vault.replaceState(Object({ value: getBankEmployeeData() }));

    await flushVaultPipeline();

    const state = testService.getState();

    await flushVaultPipeline();

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'this is a reducer error',
        featureCellKey: 'partial-reducers',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number)
      })
    );
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p202Snapshot);
  });
});
