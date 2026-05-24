import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import {
  withTabSyncController,
  withTabSyncStateBehavior
} from '@sdux-vault/core';
import { vaultSettled } from '@sdux-vault/engine';
import { VaultConfig } from '@sdux-vault/shared';
import { Subscription } from 'rxjs';
import { flushVaultPipeline } from '../../../../../utils/src/public-api';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { getSDuXVaultInvalidLicense } from '../../structure/data/sdux-vault.invalid-license';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialTabSyncService } from './partial-tab-sync.service';
import { p438Snapshot } from './snap-shots/p438-tab-sync.invalid-license.error.snapshot';

describe('p438: Tab Sync - Invalid License', () => {
  const key = 'partial-tab-sync';
  let testService: PartialTabSyncService;
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
        PartialTabSyncService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialTabSyncService,
          {
            key,
            initialState: null,
            insights: {} as any
          },
          [withTabSyncStateBehavior],
          [withTabSyncController]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialTabSyncService);
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
          'partial-tab-sync Conductor Decision Engine: The FeatureCell received a "License Denied". Pipeline is disabled.',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      })
    ]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p438Snapshot);
  });
});
