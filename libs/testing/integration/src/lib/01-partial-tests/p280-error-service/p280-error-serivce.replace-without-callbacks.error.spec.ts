import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { VaultErrorService } from '@sdux-vault/shared';
import { tap } from 'rxjs';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialErrorWithoutCallbacksService } from './partial-error-without-callbacks.service';
import { p280Snapshot } from './snap-shots/p280-error-serivce.replace-without-callbacks.error.snapshot';

describe('p280: Error Service Replace without Callbacks Test', () => {
  const key = 'partial-error-without-callbacks';
  let testService: PartialErrorWithoutCallbacksService<BankEmployeeShape[]>;
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
        PartialErrorWithoutCallbacksService,
        provideZonelessChangeDetection(),
        provideFeatureCell(PartialErrorWithoutCallbacksService, {
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

    testService = TestBed.inject(PartialErrorWithoutCallbacksService);
    testService.initialize();
  });

  afterEach(() => {
    stopListening();
    errorSubscription.unsubscribe();
    testService.clearGlobalErrors();
  });

  describe('value resolve', () => {
    it('should not replace the bank employees with errors', async () => {
      let state: any;
      state = testService.getState();
      await vaultSettled(key);

      expect(state.isLoading()).toBeFalse();
      expect(state.error()).toBeNull();
      expect(state.value()).toBeUndefined();
      expect(state.hasValue()).toBeFalse();
      expect(testService.getErrors()).toEqual([]);

      expect(globalErrors).toEqual([null]);

      errorService.clear();

      testService.clearErrors();

      testService.vault.replaceState(Object({ value: getBankEmployeeData() }));
      await vaultSettled(key);

      expect(state.value()).toBeUndefined();
      expect(state.hasValue()).toBeFalse();

      expect(state.isLoading()).toBeFalse();
      expect(state.error()).toEqual(
        Object({
          message: 'this is a filter error',
          details: jasmine.any(String),
          raw: jasmine.any(Error),
          timestamp: jasmine.any(Number),
          featureCellKey: 'partial-error-without-callbacks'
        })
      );

      expect(testService.getErrors()).toEqual([]);

      expect(globalErrors).toEqual([
        null,
        null,
        Object({
          message: 'this is a filter error',
          details: jasmine.any(String),
          raw: jasmine.any(Error),
          timestamp: jasmine.any(Number),
          featureCellKey: 'partial-error-without-callbacks'
        })
      ]);

      // Should not reset the global errors
      testService.clearErrors();

      testService.vault.replaceState(Object({ value: getBankEmployeeData() }));
      await vaultSettled(key);

      expect(state.value()).toBeUndefined();
      expect(state.hasValue()).toBeFalse();

      expect(state.isLoading()).toBeFalse();
      expect(state.error()).toEqual(
        Object({
          message: 'this is a filter error',
          details: jasmine.any(String),
          raw: jasmine.any(Error),
          timestamp: jasmine.any(Number),
          featureCellKey: 'partial-error-without-callbacks'
        })
      );

      expect(testService.getErrors()).toEqual([]);

      expect(globalErrors).toEqual([
        null,
        null,
        Object({
          message: 'this is a filter error',
          details: jasmine.any(String),
          raw: jasmine.any(Error),
          timestamp: jasmine.any(Number),
          featureCellKey: 'partial-error-without-callbacks'
        }),
        Object({
          message: 'this is a filter error',
          details: jasmine.any(String),
          raw: jasmine.any(Error),
          timestamp: jasmine.any(Number),
          featureCellKey: 'partial-error-without-callbacks'
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
          featureCellKey: 'partial-error-without-callbacks'
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
          featureCellKey: 'partial-error-without-callbacks'
        }),
        Object({
          message: 'this is a filter error',
          details: jasmine.any(String),
          raw: jasmine.any(Error),
          timestamp: jasmine.any(Number),
          featureCellKey: 'partial-error-without-callbacks'
        }),
        null
      ]);
    });

    it('should have the correct insight events', async () => {
      await vaultSettled(key);
      expectMonitorSnapshot(emitted, p280Snapshot);
    });
  });
});
