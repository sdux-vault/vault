import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
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
  flushVaultPipeline
} from '@sdux-vault/testing-utils';
import { tap } from 'rxjs';
import { getLocalStorage } from '../../../../../utils/src/public-api';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { FullTestService } from '../services/full-test.service';
import { f1304Snapshot } from './snap-shots/f1304-http-resource.replace.error.snapshot';

describe('f1304: HttpResource - Replace - With encryption - Error Test', () => {
  const key = 'full-test';
  let testService: FullTestService;
  let errorService: any;
  let stopListening: () => void;
  let httpMock: HttpTestingController;

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
        FullTestService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideVaultTesting({
          devMode: true
        }),
        provideFeatureCell(
          FullTestService,
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

    httpMock = TestBed.inject(HttpTestingController);
    testService = TestBed.inject(FullTestService);
    testService.initializeWithEncrypt();
  });

  afterEach(() => {
    stopListening();
    errorSubscription.unsubscribe();
    httpMock.verify();
    clearLocalStorage(storageKey);
    testService.clearGlobalErrors();
  });

  it('should errors on a replace through the entire pipe', async () => {
    let state = testService.getState();
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(testService.partialErrorAbstract.getErrors()).toEqual([]);
    expect(globalErrors).toEqual([null]);

    testService.vault.replaceState(testService.createHttpResourceRef() as any);
    await TestBed.tick();
    httpMock
      .expectOne(PrimaryPartialAbstractClass.HTTP_RESOURCE_URL)
      .flush(getBankEmployeeData());
    await vaultSettled(key);
    testService.vault.replaceState(testService.createHttpResourceRef() as any);
    await TestBed.tick();
    httpMock
      .expectOne(PrimaryPartialAbstractClass.HTTP_RESOURCE_URL)
      .flush(getBankEmployeeData());
    await vaultSettled(key);
    testService.vault.replaceState(testService.createHttpResourceRef() as any);
    await TestBed.tick();
    httpMock
      .expectOne(PrimaryPartialAbstractClass.HTTP_RESOURCE_URL)
      .flush(getBankEmployeeData(0, true));
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(testService.partialErrorAbstract.getErrors()).toEqual([]);
    expect(globalErrors).toEqual([null]);

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([]);

    expect(getLocalStorage(storageKey)).toBeNull();

    testService.partialBeforeTapAbstract.clearTaps();

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(testService.partialErrorAbstract.getErrors()).toEqual([]);
    expect(globalErrors).toEqual([null]);

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([]);

    expect(getLocalStorage(storageKey)).toBeNull();

    jasmine.clock().tick(1_000);
    testService.vault.replaceState(testService.createHttpResourceRef() as any);
    await TestBed.tick();
    httpMock
      .expectOne(PrimaryPartialAbstractClass.HTTP_RESOURCE_URL)
      .flush('The reject error', { status: 500, statusText: 'Server Error' });
    await vaultSettled(key);

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'Unexpected error',
        featureCellKey: key,
        details: Object({
          message: `Resource is currently in an error state (see Error.cause for details): Http failure response for ${PrimaryPartialAbstractClass.HTTP_RESOURCE_URL}: 500 Server Error`,
          featureCellKey: key,
          details: jasmine.any(String),
          raw: jasmine.any(Error),
          timestamp: jasmine.any(Number)
        }),
        raw: jasmine.any(Object),
        timestamp: jasmine.any(Number)
      })
    );

    expect(testService.partialErrorAbstract.getErrors()).toEqual([]);
    expect(globalErrors).toEqual([
      null,
      Object({
        message: 'Unexpected error',
        featureCellKey: key,
        details: Object({
          message: `Resource is currently in an error state (see Error.cause for details): Http failure response for ${PrimaryPartialAbstractClass.HTTP_RESOURCE_URL}: 500 Server Error`,
          featureCellKey: key,
          details: jasmine.any(String),
          raw: jasmine.any(Error),
          timestamp: jasmine.any(Number)
        }),
        raw: jasmine.any(Object),
        timestamp: jasmine.any(Number)
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
        message: 'Unexpected error',
        featureCellKey: key,
        details: Object({
          message: `Resource is currently in an error state (see Error.cause for details): Http failure response for ${PrimaryPartialAbstractClass.HTTP_RESOURCE_URL}: 500 Server Error`,
          featureCellKey: key,
          details: jasmine.any(String),
          raw: jasmine.any(Error),
          timestamp: jasmine.any(Number)
        }),
        raw: jasmine.any(Object),
        timestamp: jasmine.any(Number)
      }),
      null
    ]);
  });

  it('should have the correct insight events', async () => {
    jasmine.clock().tick(1_000);
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, f1304Snapshot);
  });
});
