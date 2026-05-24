import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withStepwiseController,
  withStepwiseResolveBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../../structure/utils/expect-monitor-snapshot.util';
import { verifyAllEmployees } from '../../../structure/utils/verify-all-employees.util';
import { PartialStepwiseResolveService } from './partial-stepwise-resolve.service';
import { p370Snapshot } from './snap-shots/p370-stepwise-resolve.arrow.replace.snapshot';

describe('p370: Stepwise Resolve - Replace - Arrow Method Test', () => {
  let testService: PartialStepwiseResolveService;
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
        PartialStepwiseResolveService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialStepwiseResolveService,
          {
            key: 'partial-stepwise-resolve',
            initialState: null,
            insights: {} as any
          },
          [withStepwiseResolveBehavior],
          [withStepwiseController]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialStepwiseResolveService);
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
    expect(testService.getStage()).toBe('resolve');

    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    verifyAllEmployees(state.value());

    expect(testService.getCurrent()).toBeUndefined();
    expect(testService.getType()).toBe('arrow method');
    expect(testService.getStage()).toBeUndefined();
    expect(testService.getDecision()).toBeUndefined();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p370Snapshot);
  });
});
