import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withSessionStoragePersistBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import {
  clearSessionStorage,
  flushVaultPipeline
} from '@sdux-vault/testing-utils';
import { Subscription } from 'rxjs';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { getSDuXVaultInvalidLicense } from '../../structure/data/sdux-vault.invalid-license';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialWithSessionStorageService } from './partial-persist.with-session-storage.service';
import { p234Snapshot } from './snap-shots/p234-persist.with-session-storage.invalid-license.error.snapshot';

describe('p234: Persist - Session Storage Invalid License Error Test', () => {
  const key = 'partial-persist.with-session-storage';
  let testService: PartialWithSessionStorageService;
  let stopListening: () => void;
  let stopErrorListening: Subscription;
  const globalErrors: any[] = [];

  const emitted: any[] = [];
  const storageKey = `vault::sessionstorage::${key}::SDUX::Behavior::Persist::SessionStorage`;

  beforeEach(async () => {
    clearSessionStorage(storageKey);
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true,
          bypassLicensing: false,
          licenseTimeoutMs: 100,
          licenses: [getSDuXVaultInvalidLicense()]
        }),
        PartialWithSessionStorageService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialWithSessionStorageService,
          {
            key,
            initialState: null,
            insights: {} as any
          },
          [withSessionStoragePersistBehavior]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);
    testService = TestBed.inject(PartialWithSessionStorageService);
    testService.initialize();

    stopErrorListening = testService.globalError.error$.subscribe((err) => {
      globalErrors.push(err);
    });
  });

  afterEach(() => {
    stopListening();
    stopErrorListening.unsubscribe();
    testService.clearGlobalErrors();
    clearSessionStorage(storageKey);
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
          'partial-persist.with-session-storage Conductor Decision Engine: The FeatureCell received a "License Denied". Pipeline is disabled.',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      })
    ]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p234Snapshot);
  });
});
