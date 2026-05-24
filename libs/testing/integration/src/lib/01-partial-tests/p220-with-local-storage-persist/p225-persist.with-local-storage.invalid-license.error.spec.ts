import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withLocalStoragePersistBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { VaultConfig } from '@sdux-vault/shared';
import { Subscription } from 'rxjs';
import { flushVaultPipeline } from '../../../../../utils/src/public-api';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { getSDuXVaultInvalidLicense } from '../../structure/data/sdux-vault.invalid-license';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialWithLocalStorageService } from './partial-persist.with-local-storage.service';
import { p225Snapshot } from './snap-shots/p225-persist.with-local-storage.invalid-license.error.snapshot';

describe('p225: Persist - Local Storage Invalid License Error', () => {
  const key = 'partial-persist.with-local-storage';
  let testService: PartialWithLocalStorageService;
  const emitted: any[] = [];
  let stopListening: () => void;
  let stopErrorListening: Subscription;
  const globalErrors: any[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true,
          bypassLicensing: false,
          licenseTimeoutMs: 100,
          licenses: [getSDuXVaultInvalidLicense()]
        } as VaultConfig),
        PartialWithLocalStorageService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialWithLocalStorageService,
          {
            key,
            initialState: null,
            insights: {} as any
          },
          [withLocalStoragePersistBehavior]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialWithLocalStorageService);
    testService.initialize();

    stopErrorListening = testService.globalError.error$.subscribe((err) => {
      globalErrors.push(err);
    });
  });

  afterEach(() => {
    stopListening();
    stopErrorListening.unsubscribe();
    testService.clearGlobalErrors();
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
          'partial-persist.with-local-storage Conductor Decision Engine: The FeatureCell received a "License Denied". Pipeline is disabled.',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      })
    ]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p225Snapshot);
  });
});
