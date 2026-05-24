import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withAes256EncryptBehavior,
  withLocalStoragePersistBehavior,
  withThrottleController
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { VaultErrorService } from '@sdux-vault/shared';
import {
  clearLocalStorage,
  flushVaultPipeline,
  getLocalStorage
} from '@sdux-vault/testing-utils';
import { tap } from 'rxjs';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { fullTestWithEncryptedErrorCallbacksErrorService } from '../services/full-test.with-encrypted-error-callbacks.error.service';
import { f702Snapshot } from './snap-shots/f702-promise.replace.with-error-callbacks.error.snapshot';

describe('f702: Promise - Replace - With ErrorCallbacks and encryption - Error Test', () => {
  const key = 'full-test-with-encrypted-error-callback';
  let testService: fullTestWithEncryptedErrorCallbacksErrorService;
  let errorService: any;
  let stopListening: () => void;

  const emitted: any[] = [];
  const storageKey = `vault::localstorage::${key}::SDUX::Behavior::Persist::LocalStorage`;
  const globalErrors: any[] = [];
  let errorSubscription: any;

  beforeAll(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date('2024-01-01T00:00:00.000Z'));
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  beforeEach(async () => {
    clearLocalStorage(storageKey);
    globalErrors.length = 0;

    await TestBed.configureTestingModule({
      providers: [
        fullTestWithEncryptedErrorCallbacksErrorService,
        provideZonelessChangeDetection(),
        provideVaultTesting({
          devMode: true
        }),
        provideFeatureCell(
          fullTestWithEncryptedErrorCallbacksErrorService,
          {
            key,
            initialState: null,
            insights: { wantsErrors: true, wantsPayload: true } as any
          },
          [withLocalStoragePersistBehavior, withAes256EncryptBehavior],
          [withThrottleController]
        )
      ]
    });

    errorService = VaultErrorService();
    errorSubscription = errorService.error$
      .pipe(tap((error) => globalErrors.push(error)))
      .subscribe();

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(
      fullTestWithEncryptedErrorCallbacksErrorService
    );
    await testService.initialize();
  });

  afterEach(() => {
    stopListening();
    errorSubscription.unsubscribe();
    clearLocalStorage(storageKey);
    testService.clearGlobalErrors();
  });

  it('should errors on a replace through the entire pipe', async () => {
    let state = testService.getState();
    jasmine.clock().tick(1_000);
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(testService.partialErrorAbstract.getErrors()).toEqual([]);
    expect(globalErrors).toEqual([null]);

    testService.vault.replaceState(
      testService.formatPromiseInputAsValue(getBankEmployeeData())
    );
    await vaultSettled(key);
    testService.vault.replaceState(
      testService.formatPromiseInputAsValue(getBankEmployeeData())
    );
    await vaultSettled(key);
    testService.vault.replaceState(
      testService.formatPromiseInputAsValue(getBankEmployeeData(0, true))
    );

    jasmine.clock().tick(1_000);
    await vaultSettled(key);

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'this is a filter error',
        featureCellKey: key,
        details: jasmine.anything(),
        raw: jasmine.anything(),
        timestamp: jasmine.anything()
      })
    );

    expect(testService.partialErrorAbstract.getErrors()).toEqual([
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
      Object({
        message: 'this is a filter error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      })
    ]);

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([]);

    expect(getLocalStorage(storageKey)).toBeNull();

    errorService.clear();
    testService.partialErrorAbstract.clearErrors();

    expect(testService.partialErrorAbstract.getErrors()).toEqual([]);

    expect(globalErrors).toEqual([
      null,
      Object({
        message: 'this is a filter error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      }),
      null
    ]);
  });

  it('should have the correct insight events', async () => {
    jasmine.clock().tick(1_000);
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, f702Snapshot);
  });
});
