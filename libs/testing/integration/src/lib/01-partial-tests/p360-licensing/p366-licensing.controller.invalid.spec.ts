import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  provideFeatureCell,
  provideVaultTesting,
  resetAngularFeatureCellTokenDevMode
} from '@sdux-vault/angular';
import { DevMode } from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { Subscription } from 'rxjs';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { getSDuXVaultInvalidLicense } from '../../structure/data/sdux-vault.invalid-license';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import {
  LicensingTest,
  PartialLicensingService,
  withTestLicensingController
} from './partial-licensing.service';
import { p366Snapshot } from './snap-shots/p366-licensing.controller.invalid.snapshot';

/*************************************************
 * Test 1
 *
 * Initial value is []
 *************************************************/

describe('p366: Licensing - Controller Invalid Test', () => {
  let testService: PartialLicensingService;
  let stopListening: () => void;
  let stopErrorListening: Subscription;

  const emitted: any[] = [];
  const globalErrors: any[] = [];

  beforeEach(async () => {
    DevMode.setDevMode(true);
    LicensingTest().isValid = false;
    globalErrors.length = 0;

    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true,
          bypassLicensing: false,
          licenses: [getSDuXVaultInvalidLicense()]
        }),
        PartialLicensingService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialLicensingService,
          { key: 'partial-licensing', initialState: [], insights: {} as any },
          [],
          [withTestLicensingController]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialLicensingService);
    testService.initialize();

    stopErrorListening = testService.globalError.error$.subscribe((err) => {
      globalErrors.push(err);
    });
  });

  afterEach(() => {
    resetAngularFeatureCellTokenDevMode();
    stopListening();
    stopErrorListening.unsubscribe();
    testService.clearGlobalErrors();
  });

  it('should handle validating a license', async () => {
    let state = testService.getState();
    await flushVaultPipeline();

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    testService.vault.mergeState({
      value: getBankEmployeeData(1, true) as BankEmployeeShape[]
    });

    await flushVaultPipeline();

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    expect(globalErrors).toEqual([
      Object({
        message:
          'partial-licensing Conductor Decision Engine: The FeatureCell received a "License Denied". Pipeline is disabled.',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-licensing'
      })
    ]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p366Snapshot);
  });
});
