import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withStepwiseController,
  withStepwiseFilterBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../../structure/utils/expect-monitor-snapshot.util';
import { verifyAllEmployees } from '../../../structure/utils/verify-all-employees.util';
import { PartialStepwiseFilterService } from './partial-stepwise-filter.service';
import { p380Snapshot } from './snap-shots/p380-stepwise-filter.arrow.replace.snapshot';

describe('p380: Stepwise Filter - Replace - Arrow Method Test', () => {
  let testService: PartialStepwiseFilterService;
  let stopListening: () => void;

  const emitted: any[] = [];

  afterAll(async () => {
    testService.globalError.clear();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        PartialStepwiseFilterService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialStepwiseFilterService,
          {
            key: 'partial-stepwise-filter',
            initialState: null,
            insights: {} as any
          },
          [withStepwiseFilterBehavior],
          [withStepwiseController]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialStepwiseFilterService);
    await testService.initializeArrowMethod();
  });

  afterEach(() => {
    stopListening();
  });

  it('should replace the bank employees with stepwise continue and replace', async () => {
    const state = testService.getState();

    testService.vault.replaceState(Object({ value: getBankEmployeeData() }));
    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.value()).toBeUndefined();

    verifyAllEmployees(testService.getCandidate());
    expect(testService.getCurrent()).toBeUndefined();

    const decisions = testService.getDecision();
    decisions.continue();

    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    verifyAllEmployees(state.value());

    expect(testService.getCurrent()).toBeUndefined();
    expect(testService.getType()).toBe('arrow method');
    expect(testService.getStage()).toBe('filter');
    expect(testService.getDecision()).toBeUndefined();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p380Snapshot);
  });
});
