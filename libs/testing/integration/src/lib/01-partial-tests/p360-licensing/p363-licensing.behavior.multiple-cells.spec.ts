import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  provideFeatureCell,
  provideVaultTesting,
  resetAngularFeatureCellTokenDevMode
} from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { Subscription } from 'rxjs';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { getSDuXVaultLicense } from '../../structure/data/sdux-vault.license';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialInvalidLicensingService } from './partial-invalid-licensing.service';
import {
  PartialLicensingService,
  withCustomNoopBehavior,
  withTestLicensingMerge
} from './partial-licensing.service';
import { p363Snapshot } from './snap-shots/p363-licensing.behavior.multiple-cells.snapshot';

/*************************************************
 * Test 1
 *
 * Initial value is []
 *************************************************/

describe('p363: Licensing - Multiple Cells Test', () => {
  const key = 'partial-licensing';
  const invalidKey = 'partial-invalid-licensing';
  let testService: PartialLicensingService;
  let invalidTestService: PartialInvalidLicensingService;
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
          licenses: [
            getSDuXVaultLicense(),
            Object({
              licenseId: 'second-license',
              payload: 'some-license-token'
            })
          ]
        }),
        PartialLicensingService,
        PartialInvalidLicensingService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialLicensingService,
          { key, initialState: [], insights: {} as any },
          [withTestLicensingMerge as any]
        ),
        provideFeatureCell(
          PartialInvalidLicensingService,
          { key: invalidKey, initialState: [], insights: {} as any },
          [withCustomNoopBehavior as any]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialLicensingService);
    testService.initialize();

    invalidTestService = TestBed.inject(PartialInvalidLicensingService);
    invalidTestService.initialize();

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

    expect(globalErrors).toEqual([
      Object({
        message:
          'partial-invalid-licensing Conductor Decision Engine: The FeatureCell received a "License Denied". Pipeline is disabled.',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-invalid-licensing'
      })
    ]);

    let invalidState = invalidTestService.getState();
    await flushVaultPipeline();

    expect(invalidState.value()).toBeUndefined();
    expect(invalidState.hasValue()).toBeFalse();
    expect(invalidState.error()).toBeNull();
    expect(invalidState.isLoading()).toBeFalse();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p363Snapshot);
  });
});
