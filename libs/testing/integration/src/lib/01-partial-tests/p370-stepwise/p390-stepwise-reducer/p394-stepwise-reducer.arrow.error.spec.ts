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
import { PartialStepwiseReducerService } from './partial-stepwise-reducer.service';
import { p394Snapshot } from './snap-shots/p394-stepwise-reducer.arrow.error.snapshot';

describe('p394: Stepwise Reducer - Error - Arrow Method Test', () => {
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
    await testService.initializeArrowMethodError();
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
    expect(state.error()).toEqual(
      Object({
        message: 'this is a stepwise-reducer error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-stepwise-reducer'
      })
    );
    expect(state.value()).toBeUndefined();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p394Snapshot);
  });
});
