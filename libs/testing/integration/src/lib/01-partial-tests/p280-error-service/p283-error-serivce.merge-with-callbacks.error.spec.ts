import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { VaultErrorService } from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { tap } from 'rxjs';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { partialErrorWithCallbacksService } from './partial-error-with-callbacks.service';
import { p283Snapshot } from './snap-shots/p283-error-serivce.merge-with-callbacks.error.snapshot';

describe('p283: Error Service Merge with Callbacks Test', () => {
  const key = 'partial-error-with-callbacks';
  let testService: partialErrorWithCallbacksService<BankEmployeeShape[]>;
  const errorService = VaultErrorService();
  let stopListening: () => void;

  const emitted: any[] = [];
  const globalErrors: any[] = [];
  let errorSubscription: any;

  beforeEach(async () => {
    globalErrors.length = 0;
    errorService.clear();

    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        partialErrorWithCallbacksService,
        provideZonelessChangeDetection(),
        provideFeatureCell(partialErrorWithCallbacksService, {
          key,
          initialState: null,
          insights: {
            wantsErrors: true,
            wantsPayload: true
          } as any
        })
      ]
    });

    errorSubscription = errorService.error$
      .pipe(tap((error) => globalErrors.push(error)))
      .subscribe();

    stopListening = createTestInsightListener(emitted);
    testService = TestBed.inject(partialErrorWithCallbacksService);
  });

  afterEach(() => {
    stopListening();
    errorSubscription.unsubscribe();
    testService.clearGlobalErrors();
  });

  it('should not merge the bank employees with errors', async () => {
    let state: any;
    state = testService.getState();
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    expect(state.value()).toBeUndefined();

    expect(testService.getErrors()).toEqual([]);

    expect(globalErrors).toEqual([null]);

    errorService.clear();
    testService.clearErrors();

    testService.vault.mergeState(Object({ value: getBankEmployeeData() }));
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'this is a filter error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-error-with-callbacks'
      })
    );

    expect(state.value()).toBeUndefined();

    expect(testService.getErrors()).toEqual([
      'inline-this is a filter error',
      '{"isLoading":false,"error":"this is a normalized error string for testing","hasValue":false}',
      'arrow-this is a filter error',
      '{"isLoading":false,"error":"this is a normalized error string for testing","hasValue":false}',
      'bound-this is a filter error',
      '{"isLoading":false,"error":"this is a normalized error string for testing","hasValue":false}',
      'private-this is a filter error',
      '{"isLoading":false,"error":"this is a normalized error string for testing","hasValue":false}',
      'pure callback-this is a filter error',
      '{"isLoading":false,"error":"this is a normalized error string for testing","hasValue":false}'
    ]);

    expect(globalErrors).toEqual([
      null,
      null,
      Object({
        message: 'this is a filter error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-error-with-callbacks'
      })
    ]);

    // Should not reset the global errors
    testService.clearErrors();

    testService.vault.mergeState(Object({ value: getBankEmployeeData() }));
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'this is a filter error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-error-with-callbacks'
      })
    );

    expect(state.value()).toBeUndefined();

    expect(
      testService.getErrors().filter((_, i) => i % 2 === 0) // keep only odd indexes
    ).toEqual([
      'inline-this is a filter error',
      'arrow-this is a filter error',
      'bound-this is a filter error',
      'private-this is a filter error',
      'pure callback-this is a filter error'
    ]);

    expect(
      testService
        .getErrors()
        .filter((_, i) => i % 2 === 1) // keep only odd indexes
        .map((e) => JSON.parse(e))
    ).toEqual([
      Object({
        isLoading: false,
        error: 'this is a normalized error string for testing',
        hasValue: false
      }),
      Object({
        isLoading: false,
        error: 'this is a normalized error string for testing',
        hasValue: false
      }),
      Object({
        isLoading: false,
        error: 'this is a normalized error string for testing',
        hasValue: false
      }),
      Object({
        isLoading: false,
        error: 'this is a normalized error string for testing',
        hasValue: false
      }),
      Object({
        isLoading: false,
        error: 'this is a normalized error string for testing',
        hasValue: false
      })
    ]);

    expect(globalErrors).toEqual([
      null,
      null,
      Object({
        message: 'this is a filter error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-error-with-callbacks'
      }),
      Object({
        message: 'this is a filter error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-error-with-callbacks'
      })
    ]);

    // Should clear the global errors and not affect the local errors
    testService.clearErrors();
    errorService.clear();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'this is a filter error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-error-with-callbacks'
      })
    );

    expect(state.value()).toBeUndefined();

    expect(testService.getErrors()).toEqual([]);

    expect(globalErrors).toEqual([
      null,
      null,
      Object({
        message: 'this is a filter error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-error-with-callbacks'
      }),
      Object({
        message: 'this is a filter error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-error-with-callbacks'
      }),
      null
    ]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p283Snapshot);
  });
});
