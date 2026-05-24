import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withStepwiseController,
  withStepwiseReducerBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../../structure/utils/expect-monitor-snapshot.util';
import { verifyAllEmployees } from '../../../structure/utils/verify-all-employees.util';
import { PartialStepwiseReducerService } from './partial-stepwise-reducer.service';
import { p391Snapshot } from './snap-shots/p391-stepwise-reducer.bound.merge.snapshot';

describe('p391: Stepwise Reducer - Merge - Bound Method Test', () => {
  let testService: PartialStepwiseReducerService;
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
        PartialStepwiseReducerService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialStepwiseReducerService,
          {
            key: 'partial-stepwise-reducer',
            initialState: null,
            insights: {} as any
          },
          [withStepwiseReducerBehavior],
          [withStepwiseController]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialStepwiseReducerService);
    await testService.initializeBoundMethod();
  });

  afterEach(() => {
    stopListening();
  });

  it('should not replace the bank employees with stepwise clear state and merge', async () => {
    const state = testService.getState();

    testService.vault.replaceState(Object({ value: getBankEmployeeData() }));
    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.value()).toBeUndefined();

    expect(testService.getCurrent()).toBeUndefined();
    verifyAllEmployees(testService.getCandidate());

    let decisions = testService.getDecision();
    decisions.continue();

    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    verifyAllEmployees(state.value());

    expect(testService.getCurrent()).toBeUndefined();
    expect(testService.getType()).toBe('bound method');
    expect(testService.getStage()).toBe('reducer');
    expect(testService.getDecision()).toBeUndefined();

    testService.vault.mergeState(
      Object({ value: getBankEmployeeData(0, true) })
    );
    await flushVaultPipeline();

    decisions = testService.getDecision();

    decisions.clear();
    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.value()).toBeUndefined();

    expect(testService.getType()).toBe('bound method');
    expect(testService.getStage()).toBe('reducer');

    verifyAllEmployees(testService.getCurrent());

    expect(testService.getCandidate()).toEqual([
      Object({
        id: 'be-001',
        firstName: 'Alice',
        lastName: 'Wells',
        role: 'Teller',
        status: 'Active',
        salary: 48000,
        hireDate: '2018-03-12',
        birthDate: '1992-07-22',
        phoneNumber: '555-201-8899',
        address: Object({
          street: '101 Maple St',
          city: 'Springfield',
          state: 'IL',
          zip: '62704'
        })
      })
    ]);

    expect(testService.getCurrent()).toBeUndefined();
    expect(testService.getDecision()).toBeUndefined();
    expect(testService.getType()).toBeUndefined();
    expect(testService.getStage()).toBeUndefined();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p391Snapshot);
  });
});
