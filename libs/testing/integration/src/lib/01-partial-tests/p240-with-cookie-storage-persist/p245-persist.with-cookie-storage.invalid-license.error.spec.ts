import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withCookieStoragePersistBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import {
  clearCookieStorage,
  flushVaultPipeline
} from '@sdux-vault/testing-utils';
import { Subscription } from 'rxjs';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { getSDuXVaultInvalidLicense } from '../../structure/data/sdux-vault.invalid-license';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialWithCookieStorageService } from './partial-persist.with-cookie-storage.service';
import { p245Snapshot } from './snap-shots/p245-persist.with-cookie-storage.invalid-license.error.snapshot';

describe('p245: Persist - Cookie Storage Invalid License Error Test', () => {
  const key = 'partial-persist.with-cookie-storage';
  let testService: PartialWithCookieStorageService;
  let stopListening: () => void;
  let stopErrorListening: Subscription;
  const globalErrors: any[] = [];

  const emitted: any[] = [];
  const storageKey =
    'vault::cookiestorage::partial-persist.with-cookie-storage::SDUX::Behavior::Persist::CookieStorage';

  beforeEach(async () => {
    clearCookieStorage(storageKey);
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true,
          bypassLicensing: false,
          licenseTimeoutMs: 100,
          licenses: [getSDuXVaultInvalidLicense()]
        }),
        PartialWithCookieStorageService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialWithCookieStorageService,
          {
            key,
            initialState: null,
            insights: {} as any
          },
          [withCookieStoragePersistBehavior]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);
    testService = TestBed.inject(PartialWithCookieStorageService);
    testService.initialize();

    stopErrorListening = testService.globalError.error$.subscribe((err) => {
      globalErrors.push(err);
    });
  });

  afterEach(() => {
    stopListening();
    stopErrorListening.unsubscribe();
    testService.clearGlobalErrors();
    clearCookieStorage(storageKey);
  });

  it('should deny the pipeline when the license is invalid', async () => {
    const state = testService.getState();

    testService.vault.replaceState(Object({ value: getBankEmployeeData() }));
    await vaultSettled(key);

    expect(state.error()).toBeNull();
    expect(state.value()).toBeUndefined();

    expect(globalErrors).toEqual([
      null,
      Object({
        message:
          'partial-persist.with-cookie-storage Conductor Decision Engine: The FeatureCell received a "License Denied". Pipeline is disabled.',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      })
    ]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p245Snapshot);
  });
});
