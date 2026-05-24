import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  provideFeatureCell,
  provideVaultTesting,
  resetAngularFeatureCellTokenDevMode
} from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { DevMode } from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { Subscription } from 'rxjs';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { getSDuXVaultLicense } from '../../structure/data/sdux-vault.license';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import {
  LicensingTest,
  PartialLicensingService,
  withTestLicensingMerge
} from './partial-licensing.service';
import { p360Snapshot } from './snap-shots/p360-licensing.behavior.snapshot';

/*************************************************
 * Test 1
 *
 * Initial value is []
 *************************************************/

describe('p360: Licensing - Behavior Test', () => {
  const key = 'partial-licensing';
  let testService: PartialLicensingService;
  let stopListening: () => void;
  let stopErrorListening: Subscription;

  const emitted: any[] = [];
  const globalErrors: any[] = [];

  beforeEach(async () => {
    spyOn(console, 'info');
    DevMode.setDevMode(true);
    LicensingTest().isValid = true;
    globalErrors.length = 0;

    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true,
          bypassLicensing: false,
          licenses: [getSDuXVaultLicense()]
        }),
        PartialLicensingService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialLicensingService,
          { key, initialState: [], insights: {} as any },
          [withTestLicensingMerge]
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
    await vaultSettled(key);

    expect(state.value()).toEqual([]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    testService.vault.mergeState({
      value: getBankEmployeeData(1, true) as BankEmployeeShape[]
    });
    await vaultSettled(key);

    expect(state.value()).toEqual([
      Object({
        id: 'be-002',
        firstName: 'Brian',
        lastName: 'Stone',
        role: 'Manager',
        status: 'Vacation',
        salary: 90000,
        hireDate: '2012-09-05',
        birthDate: '1981-04-17',
        phoneNumber: '555-490-3322',
        address: Object({
          street: '54 Ridgeview Ave',
          city: 'Springfield',
          state: 'IL',
          zip: '62711'
        })
      })
    ]);

    expect(globalErrors).toEqual([null]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p360Snapshot);
  });
});
