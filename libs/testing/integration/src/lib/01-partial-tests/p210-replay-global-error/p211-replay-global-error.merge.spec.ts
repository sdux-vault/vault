import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withArrayAppendMergeBehavior,
  withGlobalErrorPauseBehavior,
  withReplayGlobalErrorController
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { Subscription } from 'rxjs';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialReplayGlobalErrorService } from './partial-replay-global-error.service';
import { p211Snapshot } from './snap-shots/p211-replay-global-error.merge.snapshot';

describe('p211: Replay Global Error - Merge Test', () => {
  let testService: PartialReplayGlobalErrorService;
  let stopListening: () => void;
  let stopErrorListening: Subscription;

  const emitted: any[] = [];
  const globalErrors: any[] = [];

  afterAll(async () => {
    testService.globalError.clear();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        PartialReplayGlobalErrorService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialReplayGlobalErrorService,
          {
            key: 'partial-replay-global-error',
            initialState: null,
            insights: {} as any
          },
          [withGlobalErrorPauseBehavior, withArrayAppendMergeBehavior],
          [withReplayGlobalErrorController]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialReplayGlobalErrorService);
    testService.initialize();

    testService.clearGlobalErrors();

    stopErrorListening = testService.globalError.error$.subscribe((err) => {
      globalErrors.push(err);
    });
  });

  afterEach(() => {
    stopListening();
    stopErrorListening.unsubscribe();
    testService.clearGlobalErrors();
  });

  it('should merge the bank employees with global pause and replace', async () => {
    const state = testService.getState();
    await flushVaultPipeline();

    await testService.vault.replaceState({ value: [] });
    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.value()).toEqual([]);

    expect(testService.globalError.hasError).toBeFalse();

    expect(globalErrors).toEqual([null]);

    testService.isError = true;

    await testService.vault.mergeState(getBankEmployeeData(0, true) as any);
    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toEqual(
      Object({
        message: 'Filter error state',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-replay-global-error'
      })
    );
    expect(state.value()).toEqual([]);

    expect(testService.globalError.hasError).toBeTrue();

    expect(globalErrors).toEqual([
      null,
      Object({
        message: 'Filter error state',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-replay-global-error'
      })
    ]);

    await testService.vault.mergeState(
      Object({ value: getBankEmployeeData(1, true) })
    );
    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toEqual(
      Object({
        message: 'Filter error state',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-replay-global-error'
      })
    );
    expect(state.value()).toEqual([]);

    expect(testService.globalError.hasError).toBeTrue();

    expect(globalErrors).toEqual([
      null,
      Object({
        message: 'Filter error state',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-replay-global-error'
      })
    ]);

    testService.isError = false;
    testService.globalError.clear();

    await flushVaultPipeline();
    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toEqual(
      Object({
        message: 'Filter error state',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-replay-global-error'
      })
    );

    expect(state.value()).toEqual([
      Object({
        id: 'be-002',
        firstName: 'Brian',
        lastName: 'Stone',
        role: 'Manager',
        status: 'Vacation',
        salary: 90000,
        hireDate: '2012-09-05',
        birthDate: '1981-04-17',
        phoneNumber: '555-490-3322',
        address: Object({
          street: '54 Ridgeview Ave',
          city: 'Springfield',
          state: 'IL',
          zip: '62711'
        })
      })
    ]);

    expect(testService.globalError.hasError).toBeFalse();

    expect(globalErrors).toEqual([
      null,
      Object({
        message: 'Filter error state',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-replay-global-error'
      }),
      null
    ]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p211Snapshot);
  });
});
