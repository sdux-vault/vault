import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withThrottleController } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { InsightConfig } from '@sdux-vault/shared';
import {
  clearLocalStorage,
  flushVaultPipeline,
  getLocalStorage
} from '@sdux-vault/testing-utils';
import { tap } from 'rxjs';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { getFilteredAndReducedBankEmployeeData } from '../../structure/data/bank-employee.filtered-and-reduced.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import {
  verifyFullPipelineAfterTaps,
  verifyFullPipelineBeforeTaps,
  verifyFullPipelineEmployees
} from '../../structure/utils/verify-full-pipeline-employees.util';
import { FullTestService } from '../services/full-test.service';
import { f203Snapshot } from './snap-shots/f203-value.throttle.merge.snapshot';

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
 *
 * merge is testService.vault.mergeState(Object({ value: getBankEmployeeData() }));
 * which is getBankEmployees()
 *
 * filters and reducers comes out to be
 *
 * state.value().length = 3
 * beforeTabs.length = 5
 * Local Storage Length = 3 (same as state values)
 *************************************************/

describe('f203: Value - Merge with Throttle Test', () => {
  /**
   * Something is wrong with caching!
   */
  let testService: FullTestService;
  let stopListening: () => void;

  const emitted: any[] = [];
  const storageKey =
    'vault::localstorage::full-test::SDUX::Behavior::Persist::LocalStorage';
  const globalStates: any[] = [];
  let stateSubscription: any;
  let key: string;

  beforeAll(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date('2024-01-01T00:00:00.000Z'));
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  beforeEach(async () => {
    clearLocalStorage(storageKey);
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
            key: 'full-test',
            initialState: null,
            insights: {
              wantsErrors: true,
              wantsPayload: true,
              wantsState: true
            } as InsightConfig
          },
          [],
          [withThrottleController]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(FullTestService);
    testService.initializeWithThrottle();

    key = 'full-test';

    stateSubscription = testService.vault.state$
      .pipe(tap((state) => globalStates.push(state)))
      .subscribe();
  });

  afterEach(() => {
    stopListening();
    stateSubscription.unsubscribe();
  });

  it('should merge through the entire pipe', async () => {
    let state = testService.getState();
    jasmine.clock().tick(1_000);
    await vaultSettled(key);

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([]);
    expect(testService.partialAfterTapAbstract.getTaps()).toEqual([]);

    testService.vault.mergeState(Object({ value: getBankEmployeeData() }));
    await vaultSettled(key);
    testService.vault.mergeState(Object({ value: getBankEmployeeData() }));
    await vaultSettled(key);
    testService.vault.mergeState(
      Object({ value: getBankEmployeeData(0, true) })
    );
    await vaultSettled(key);

    verifyFullPipelineEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();

    verifyFullPipelineBeforeTaps(
      testService.partialBeforeTapAbstract.getTaps()
    );
    verifyFullPipelineAfterTaps(testService.partialAfterTapAbstract.getTaps());

    expect(getLocalStorage(storageKey)).toBeNull();

    testService.partialBeforeTapAbstract.clearTaps();
    testService.partialAfterTapAbstract.clearTaps();

    jasmine.clock().tick(200);
    testService.vault.mergeState(getBankEmployeeData() as BankEmployeeShape[]);
    await vaultSettled(key);

    verifyFullPipelineEmployees(state.value());
    expect(state.hasValue()).toBeTrue();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([]);
    expect(testService.partialAfterTapAbstract.getTaps()).toEqual([]);

    let localStorageData = getLocalStorage(storageKey) as any;
    expect(localStorageData).toBeNull();

    testService.partialBeforeTapAbstract.clearTaps();
    testService.partialAfterTapAbstract.clearTaps();

    jasmine.clock().tick(800);

    testService.vault.mergeState([]);
    await vaultSettled(key);

    expect(state.value()).toEqual([]);
    expect(state.hasValue()).toBeTrue();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([
      Object({ value: [], source: 'partialArrowBeforeTapFunction' }),
      Object({ value: [], source: 'partialInlineBeforeTapFunction' }),
      Object({ value: [], source: 'partialPrivateBeforeTapFunction' }),
      Object({ value: [], source: 'partialAnonymousBeforeTapFunction' }),
      Object({ value: [], source: 'partialPureFunctionBeforeTap' })
    ]);

    expect(testService.partialAfterTapAbstract.getTaps()).toEqual([
      Object({ value: [], source: 'partialArrowAfterTapFunction' }),
      Object({ value: [], source: 'partialInlineAfterTapFunction' }),
      Object({ value: [], source: 'partialPrivateAfterTapFunction' }),
      Object({ value: [], source: 'partialAnonymousAfterTapFunction' }),
      Object({ value: [], source: 'partialPureFunctionAfterTap' })
    ]);

    localStorageData = getLocalStorage(storageKey) as any;
    expect(localStorageData).toBeNull();
    testService.partialBeforeTapAbstract.clearTaps();
    testService.partialAfterTapAbstract.clearTaps();

    testService.vault.mergeState([]);
    await vaultSettled(key);

    expect(state.value()).toEqual([]);
    expect(state.hasValue()).toBeTrue();

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([]);
    expect(testService.partialAfterTapAbstract.getTaps()).toEqual([]);

    localStorageData = getLocalStorage(storageKey) as any;
    expect(localStorageData).toBeNull();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    testService.partialBeforeTapAbstract.clearTaps();
    testService.partialAfterTapAbstract.clearTaps();

    jasmine.clock().tick(1_000);
    testService.partialFilterAbstract.p190MergeEmployeesFilters();
    await vaultSettled(key);

    testService.vault.mergeState(
      Object({ value: getBankEmployeeData(1, true) })
    );
    await vaultSettled(key);

    expect(state.hasValue()).toBeTrue();
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

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([
      Object({
        value: [
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
            phoneNumber: '(212) 555-9012'
          })
        ],
        source: 'partialArrowBeforeTapFunction'
      }),
      Object({
        value: [
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
            phoneNumber: '(212) 555-9012'
          })
        ],
        source: 'partialInlineBeforeTapFunction'
      }),
      Object({
        value: [
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
            phoneNumber: '(212) 555-9012'
          })
        ],
        source: 'partialPrivateBeforeTapFunction'
      }),
      Object({
        value: [
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
            phoneNumber: '(212) 555-9012'
          })
        ],
        source: 'partialAnonymousBeforeTapFunction'
      }),
      Object({
        value: [
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
            phoneNumber: '(212) 555-9012'
          })
        ],
        source: 'partialPureFunctionBeforeTap'
      })
    ]);

    expect(testService.partialAfterTapAbstract.getTaps()).toEqual([
      Object({
        value: [
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
        ],
        source: 'partialArrowAfterTapFunction'
      }),
      Object({
        value: [
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
        ],
        source: 'partialInlineAfterTapFunction'
      }),
      Object({
        value: [
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
        ],
        source: 'partialPrivateAfterTapFunction'
      }),
      Object({
        value: [
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
        ],
        source: 'partialAnonymousAfterTapFunction'
      }),
      Object({
        value: [
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
        ],
        source: 'partialPureFunctionAfterTap'
      })
    ]);
  });

  it('should have the correct insight events', async () => {
    jasmine.clock().tick(1_000);
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, f203Snapshot);
  });

  it('should have the correct global state$ events', async () => {
    expect(globalStates.slice(0, 12)).toEqual([
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: getFilteredAndReducedBankEmployeeData(),
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Abort Controller',
        snapshot: Object({
          isLoading: false,
          value: getFilteredAndReducedBankEmployeeData(),
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Abort Controller',
        snapshot: Object({
          isLoading: false,
          value: getFilteredAndReducedBankEmployeeData(),
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Abort Controller',
        snapshot: Object({
          isLoading: false,
          error: null,
          value: getFilteredAndReducedBankEmployeeData(),
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Abort Controller',
        snapshot: Object({
          isLoading: false,
          value: [],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
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
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Abort Controller',
        snapshot: Object({
          isLoading: false,
          value: [
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
          ],
          error: null,
          hasValue: true
        })
      })
    ]);
  });
});
