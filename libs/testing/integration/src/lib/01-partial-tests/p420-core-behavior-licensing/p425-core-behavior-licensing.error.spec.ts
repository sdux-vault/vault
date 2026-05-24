import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { VaultConfig } from '@sdux-vault/shared';
import { Subscription } from 'rxjs';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { getSDuXVaultInvalidLicense } from '../../structure/data/sdux-vault.invalid-license';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialCoreBehaviorLicenseService } from './partial-core-behavior-license.service';
import { p425Snapshot } from './snap-shots/p425-core-behavior-licensing.error.snapshot';

describe('p425: Core Behavior License - Validation Error ', () => {
  const key = 'partial-core-behavior-license';
  let testService: PartialCoreBehaviorLicenseService;
  let stopListening: () => void;
  let stopErrorListening: Subscription;

  const emitted: any[] = [];
  const globalErrors: any[] = [];

  beforeEach(async () => {
    globalErrors.length = 0;
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true,
          bypassLicensing: false,
          licenses: [getSDuXVaultInvalidLicense()],
          licenseTimeoutMs: 100
        } as VaultConfig),
        PartialCoreBehaviorLicenseService,
        provideZonelessChangeDetection(),
        provideFeatureCell(PartialCoreBehaviorLicenseService, {
          key,
          initialState: null,
          insights: {} as any
        })
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialCoreBehaviorLicenseService);
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
          'partial-core-behavior-license Conductor Decision Engine: The FeatureCell received a "License Denied". Pipeline is disabled.',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      })
    ]);
  });

  it('should have the correct insight events', async () => {
    expectMonitorSnapshot(emitted, p425Snapshot);
  });
});
