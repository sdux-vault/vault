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
import { PartialStepwiseFilterService } from './partial-stepwise-filter.service';
import { p384Snapshot } from './snap-shots/p384-stepwise-filter.arrow.error.snapshot';

describe('p384: Stepwise Filter - Error - Arrow Method Test', () => {
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
        message: 'this is a stepwise-filter error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-stepwise-filter'
      })
    );
    expect(state.value()).toBeUndefined();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p384Snapshot);
  });
});
