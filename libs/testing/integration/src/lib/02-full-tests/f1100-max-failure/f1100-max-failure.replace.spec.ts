import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withMaxFailuresController,
  withReplayGlobalErrorController
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { VaultErrorService } from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { tap } from 'rxjs';
import { getAdditionalBankEmployeeData } from '../../structure/data/bank-employee.additional.data';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { getFilteredAndReducedBankEmployeeData } from '../../structure/data/bank-employee.filtered-and-reduced.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { FullTestService } from '../services/full-test.service';
import { f1100Snapshot } from './snap-shots/f1100-max-failure.replace.snapshot';

/*************************************************
 * Test 1
 *
 * Initial value is null
 *
 * filters and reducers comes out to be
 *
 * state.value() = undefined
 * beforeTaps = []
 * Local Storage = null
 *
 * replace is testService.vault.replaceState(Object({ value: getBankEmployeeData() }));
 * which is getBankEmployees()
 *
 * filters and reducers comes out to be
 *
 * state.value().length = 3
 * beforeTabs.length = 5
 * Local Storage Length = 3 (same as state values)
 *************************************************/

describe('f1100: Value - fromDeferred Replace Test', () => {
  let testService: FullTestService;
  let stopListening: () => void;

  let key = 'full-test';
  const emitted: any[] = [];
  let errorService: any;
  const globalErrors: any[] = [];
  let errorSubscription: any;

  afterEach(() => {
    stopListening();
    testService.unsetError();
    errorSubscription.unsubscribe();
    testService.clearGlobalErrors();
  });

  beforeEach(async () => {
    globalErrors.length = 0;
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        FullTestService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          FullTestService,
          {
            key,
            initialState: getBankEmployeeData(6, true),
            insights: {} as any
          },
          [],
          [withMaxFailuresController, withReplayGlobalErrorController]
        )
      ]
    });

    errorService = VaultErrorService();
    errorSubscription = errorService.error$
      .pipe(tap((error) => globalErrors.push(error)))
      .subscribe();

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(FullTestService);
    testService.initializeMaxFailureErrors();
  });

  it('should start and pause the pipeline with withGlobalErrorPause and maxFailure', async () => {
    const state = testService.getState();
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.value()).toEqual(
      getFilteredAndReducedBankEmployeeData(0, true)
    );
    expect(state.hasValue()).toBeTrue();
    expect(globalErrors).toEqual([null]);

    // Verify the pipeline works
    testService.setError();
    testService.vault.replaceState(
      getBankEmployeeData(7, true) as BankEmployeeShape[]
    );
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'this is a filter error: 1',
        details: jasmine.any(String),
        raw: jasmine.anything(),
        timestamp: jasmine.anything(),
        featureCellKey: key
      })
    );
    expect(state.value()).toEqual(
      getFilteredAndReducedBankEmployeeData(0, true)
    );
    expect(state.hasValue()).toBeTrue();

    expect(globalErrors).toEqual([
      null,
      Object({
        message: 'this is a filter error: 1',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      })
    ]);

    testService.globalError.clear();
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'this is a filter error: 2',
        details: jasmine.any(String),
        raw: jasmine.anything(),
        timestamp: jasmine.anything(),
        featureCellKey: key
      })
    );
    expect(state.value()).toEqual(
      getFilteredAndReducedBankEmployeeData(0, true)
    );
    expect(state.hasValue()).toBeTrue();

    expect(globalErrors).toEqual([
      null,
      Object({
        message: 'this is a filter error: 1',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      }),
      null,
      Object({
        message: 'this is a filter error: 2',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      })
    ]);

    testService.globalError.clear();
    await flushVaultPipeline();
    testService.unsetError();
    testService.vault.replaceState(
      getBankEmployeeData(8, true) as BankEmployeeShape[]
    );
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'this is a filter error: 2',
        details: jasmine.any(String),
        raw: jasmine.anything(),
        timestamp: jasmine.anything(),
        featureCellKey: key
      })
    );
    expect(state.value()).toEqual(
      getFilteredAndReducedBankEmployeeData(2, true)
    );
    expect(state.hasValue()).toBeTrue();

    expect(globalErrors).toEqual([
      null,
      Object({
        message: 'this is a filter error: 1',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      }),
      null,
      Object({
        message: 'this is a filter error: 2',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      }),
      null
    ]);

    // Shutdown the pipeline
    testService.vault.mergeState({
      value: getAdditionalBankEmployeeData(true) as BankEmployeeShape[]
    });
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'this is a filter error: 2',
        details: jasmine.any(String),
        raw: jasmine.anything(),
        timestamp: jasmine.anything(),
        featureCellKey: key
      })
    );

    expect(state.value()).toEqual([
      Object({
        id: 'be-999',
        firstName: 'Victor',
        lastName: 'Ramirez',
        role: 'Manager',
        status: 'Active',
        salary: 120000,
        hireDate: '2022-06-15',
        birthDate: '1988-09-21',
        address: Object({ city: 'New York', state: 'NY', zip: '10001' }),
        phoneNumber: '(212) 555-9012',
        senior: true,
        fullName: 'Victor Ramirez',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
      })
    ]);
    expect(state.hasValue()).toBeTrue();
    expect(globalErrors).toEqual([
      null,
      Object({
        message: 'this is a filter error: 1',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      }),
      null,
      Object({
        message: 'this is a filter error: 2',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      }),
      null
    ]);

    testService.vault.replaceState({
      error: null,
      value: getBankEmployeeData(6, true) as BankEmployeeShape[]
    });
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    expect(state.value()).toEqual([
      Object({
        id: 'be-007',
        firstName: 'Nina',
        lastName: 'Castillo',
        role: 'Manager',
        status: 'Active',
        salary: 90000,
        hireDate: '2021-04-10',
        birthDate: '1989-11-20',
        address: Object({
          street: '501 Madison Ave',
          city: 'New York',
          state: 'NY',
          zip: '10022'
        }),
        phoneNumber: '555-444-1212',
        senior: true,
        fullName: 'Nina Castillo',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
      })
    ]);
    expect(state.hasValue()).toBeTrue();
    expect(globalErrors).toEqual([
      null,
      Object({
        message: 'this is a filter error: 1',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      }),
      null,
      Object({
        message: 'this is a filter error: 2',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      }),
      null
    ]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, f1100Snapshot);
  });
});
