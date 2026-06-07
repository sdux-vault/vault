import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withAes256EncryptBehavior,
  withLocalStoragePersistBehavior,
  withStateCacheBehavior
} from '@sdux-vault/addons';
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
import { f201Snapshot } from './snap-shots/f201-value.merge.snapshot';

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
 * merge is testService.vault.replaceState(Object({ value: getBankEmployeeData() }));
 * which is getBankEmployees()
 *
 * filters and reducers comes out to be
 *
 * state.value().length = 3
 * beforeTabs.length = 5
 * Local Storage Length = 3 (same as state values)
 *************************************************/

describe('f201: Value - Merge with Encrypt and Cache Test', () => {
  const key = 'full-test';
  let testService: FullTestService;
  let stopListening: () => void;

  const emitted: any[] = [];
  const storageKey = `vault::localstorage::${key}::SDUX::Behavior::Persist::LocalStorage`;
  const ivs: string[] = [];
  const globalStates: any[] = [];
  let stateSubscription: any;

  beforeAll(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date('2024-01-01T00:00:00.000Z'));
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  beforeEach(async () => {
    clearLocalStorage(storageKey);
    emitted.length = 0;

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
            initialState: null,
            insights: {
              wantsErrors: true,
              wantsPayload: true,
              wantsState: true,
              wantsCandidates: true
            } as InsightConfig
          },
          [
            withLocalStoragePersistBehavior,
            withAes256EncryptBehavior,
            withStateCacheBehavior
          ]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(FullTestService);
    await testService.initializeStateCacheByValue();

    stateSubscription = testService.vault.state$
      .pipe(tap((state) => globalStates.push(state)))
      .subscribe();
  });

  afterEach(() => {
    stopListening();
    stateSubscription.unsubscribe();
    testService.clearGlobalErrors();
  });

  it('should merge through the entire pipe', async () => {
    let state = testService.getState();
    await vaultSettled(key);

    testService.vault.replaceState(Object({ value: getBankEmployeeData() }));
    await vaultSettled(key);

    verifyFullPipelineEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();

    verifyFullPipelineBeforeTaps(
      testService.partialBeforeTapAbstract.getTaps()
    );
    verifyFullPipelineAfterTaps(testService.partialAfterTapAbstract.getTaps());

    testService.vault.replaceState(Object({ value: getBankEmployeeData() }));
    await vaultSettled(key);

    verifyFullPipelineEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();

    verifyFullPipelineBeforeTaps(
      testService.partialBeforeTapAbstract.getTaps()
    );
    verifyFullPipelineAfterTaps(testService.partialAfterTapAbstract.getTaps());

    testService.partialBeforeTapAbstract.clearTaps();
    testService.partialAfterTapAbstract.clearTaps();

    testService.vault.replaceState(
      getBankEmployeeData(0, true) as BankEmployeeShape[]
    );
    await vaultSettled(key);

    expect(state.value()).toEqual([]);
    expect(state.hasValue()).toBeTrue();
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

    let localStorageData = getLocalStorage(storageKey) as any;
    ivs.push(localStorageData.iv);
    expect(localStorageData.data).not.toContain(['Alice']);
    expect(localStorageData.data).not.toContain(['Brian']);
    expect(localStorageData.data).not.toContain(['Carla']);
    expect(localStorageData.data).not.toContain(['Derek']);
    expect(localStorageData.data).not.toContain(['Elena']);
    expect(localStorageData.data).not.toContain(['Frank']);
    expect(localStorageData.data).not.toContain(['Nina']);
    expect(localStorageData.data).not.toContain(['Oscar']);
    expect(localStorageData.data).not.toContain(['Priya']);
    expect(localStorageData).toEqual(
      Object({
        v: 1,
        alg: 'AES-256-GCM',
        iv: jasmine.any(String),
        data: jasmine.any(String)
      })
    );

    testService.partialBeforeTapAbstract.clearTaps();
    testService.partialAfterTapAbstract.clearTaps();

    testService.vault.replaceState(Object({ value: getBankEmployeeData() }));
    await vaultSettled(key);

    verifyFullPipelineEmployees(state.value());
    expect(state.hasValue()).toBeTrue();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    verifyFullPipelineBeforeTaps(
      testService.partialBeforeTapAbstract.getTaps()
    );
    verifyFullPipelineAfterTaps(testService.partialAfterTapAbstract.getTaps());

    localStorageData = getLocalStorage(storageKey) as any;
    expect(ivs).not.toContain(localStorageData.iv);
    ivs.push(localStorageData.iv);
    expect(localStorageData.data).not.toContain(['Alice']);
    expect(localStorageData.data).not.toContain(['Brian']);
    expect(localStorageData.data).not.toContain(['Carla']);
    expect(localStorageData.data).not.toContain(['Derek']);
    expect(localStorageData.data).not.toContain(['Elena']);
    expect(localStorageData.data).not.toContain(['Frank']);
    expect(localStorageData.data).not.toContain(['Nina']);
    expect(localStorageData.data).not.toContain(['Oscar']);
    expect(localStorageData.data).not.toContain(['Priya']);
    expect(localStorageData).toEqual(
      Object({
        v: 1,
        alg: 'AES-256-GCM',
        iv: jasmine.any(String),
        data: jasmine.any(String)
      })
    );

    testService.partialBeforeTapAbstract.clearTaps();
    testService.partialAfterTapAbstract.clearTaps();

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
    expect(ivs).not.toContain(localStorageData.iv);
    ivs.push(localStorageData.iv);
    expect(localStorageData.data).not.toContain(['Alice']);
    expect(localStorageData.data).not.toContain(['Brian']);
    expect(localStorageData.data).not.toContain(['Carla']);
    expect(localStorageData.data).not.toContain(['Derek']);
    expect(localStorageData.data).not.toContain(['Elena']);
    expect(localStorageData.data).not.toContain(['Frank']);
    expect(localStorageData.data).not.toContain(['Nina']);
    expect(localStorageData.data).not.toContain(['Oscar']);
    expect(localStorageData.data).not.toContain(['Priya']);
    expect(localStorageData).toEqual(
      Object({
        v: 1,
        alg: 'AES-256-GCM',
        iv: jasmine.any(String),
        data: jasmine.any(String)
      })
    );

    testService.partialBeforeTapAbstract.clearTaps();
    testService.partialAfterTapAbstract.clearTaps();

    testService.vault.mergeState([]);
    await vaultSettled(key);

    expect(state.value()).toEqual([]);
    expect(state.hasValue()).toBeTrue();

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([]);
    expect(testService.partialAfterTapAbstract.getTaps()).toEqual([]);

    localStorageData = getLocalStorage(storageKey) as any;
    expect(ivs).toContain(localStorageData.iv);
    ivs.push(localStorageData.iv);
    expect(localStorageData.data).not.toContain(['Alice']);
    expect(localStorageData.data).not.toContain(['Brian']);
    expect(localStorageData.data).not.toContain(['Carla']);
    expect(localStorageData.data).not.toContain(['Derek']);
    expect(localStorageData.data).not.toContain(['Elena']);
    expect(localStorageData.data).not.toContain(['Frank']);
    expect(localStorageData.data).not.toContain(['Nina']);
    expect(localStorageData.data).not.toContain(['Oscar']);
    expect(localStorageData.data).not.toContain(['Priya']);
    expect(localStorageData).toEqual(
      Object({
        v: 1,
        alg: 'AES-256-GCM',
        iv: jasmine.any(String),
        data: jasmine.any(String)
      })
    );

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    testService.partialBeforeTapAbstract.clearTaps();
    testService.partialAfterTapAbstract.clearTaps();

    jasmine.clock().tick(30_000);
    await flushVaultPipeline();
    testService.partialFilterAbstract.p190MergeEmployeesFilters();
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

    localStorageData = getLocalStorage(storageKey) as any;
    expect(ivs).not.toContain(localStorageData.iv);
    ivs.push(localStorageData.iv);
    expect(localStorageData.data).not.toContain(['Alice']);
    expect(localStorageData.data).not.toContain(['Brian']);
    expect(localStorageData.data).not.toContain(['Carla']);
    expect(localStorageData.data).not.toContain(['Derek']);
    expect(localStorageData.data).not.toContain(['Elena']);
    expect(localStorageData.data).not.toContain(['Frank']);
    expect(localStorageData.data).not.toContain(['Nina']);
    expect(localStorageData.data).not.toContain(['Oscar']);
    expect(localStorageData.data).not.toContain(['Priya']);
    expect(localStorageData).toEqual(
      Object({
        v: 1,
        alg: 'AES-256-GCM',
        iv: jasmine.any(String),
        data: jasmine.any(String)
      })
    );
    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    // Cache should have refreshed in background
    expect(testService.fetches).toEqual([]);

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

    // Advance time past TTL expiration (1 minute)
    jasmine.clock().tick(30_000);
    await vaultSettled(key);

    // Cache should have refreshed in background
    expect(testService.fetches).toEqual([
      'be-007',
      'found - be-007',
      'be-008',
      'found - be-008',
      'be-009',
      'found - be-009'
    ]);

    // Ensure state was refreshed, not duplicated
    expect(state.value()).toEqual([
      Object({
        id: 'be-009',
        firstName: 'Priya',
        lastName: 'Sharma',
        role: 'Owner',
        status: 'Active',
        salary: 160000,
        hireDate: '2023-01-12',
        birthDate: '1985-10-05',
        address: Object({
          street: '77 Park Ave',
          city: 'New York',
          state: 'NY',
          zip: '10016'
        }),
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
      })
    ]);

    expect(state.hasValue()).toBeTrue();
    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    // Lookup a filter/reducer failure

    let employee: any;

    employee = await testService.vault.cacheLookup!('be-002');
    await vaultSettled(key);

    expect(testService.fetches).toEqual([
      'be-007',
      'found - be-007',
      'be-008',
      'found - be-008',
      'be-009',
      'found - be-009',
      'be-002',
      'found - be-002'
    ]);

    // NOW the pipeline has run
    expect(employee).toBeUndefined();

    expect(state.value()).toEqual([]);

    expect(state.hasValue()).toBeTrue();
    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    // Lookup a filter/reducer Success

    employee = await testService.vault.cacheLookup!('be-007');
    await flushVaultPipeline();

    expect(testService.fetches).toEqual([
      'be-007',
      'found - be-007',
      'be-008',
      'found - be-008',
      'be-009',
      'found - be-009',
      'be-002',
      'found - be-002'
    ]);

    // NOW the pipeline has run
    expect(employee).toEqual(
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
    );

    expect(state.value()).toEqual([]);

    expect(state.hasValue()).toBeTrue();
    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    // expire the cache

    jasmine.clock().tick(90_000);

    expect(testService.fetches).toEqual([
      'be-007',
      'found - be-007',
      'be-008',
      'found - be-008',
      'be-009',
      'found - be-009',
      'be-002',
      'found - be-002',
      'be-999',
      'be-007',
      'found - be-007 auto-fetch',
      'be-008',
      'found - be-008 auto-fetch',
      'be-009',
      'found - be-009 auto-fetch'
      // Not found because it was not distinct
    ]);

    // NOW the pipeline has run
    expect(employee).toEqual(
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
    );

    expect(state.value()).toEqual([]);

    expect(state.hasValue()).toBeTrue();
    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
  });

  it('should have the correct insight events', async () => {
    jasmine.clock().tick(1_000);
    await vaultSettled(key);
    expectMonitorSnapshot(emitted, f201Snapshot);
  });

  it('should have the correct global state$ events', async () => {
    expect(globalStates.slice(0, 12)).toEqual([
      Object({
        snapshot: Object({
          isLoading: false,
          value: getFilteredAndReducedBankEmployeeData(),
          error: null,
          hasValue: true
        }),
        type: 'Finalize Pipeline'
      }),
      Object({
        snapshot: Object({
          isLoading: false,
          value: getFilteredAndReducedBankEmployeeData(),
          error: null,
          hasValue: true
        }),
        type: 'Finalize Pipeline'
      }),
      Object({
        snapshot: Object({
          isLoading: false,
          value: [],
          error: null,
          hasValue: true
        }),
        type: 'Finalize Pipeline'
      }),
      Object({
        snapshot: Object({
          isLoading: false,
          value: getFilteredAndReducedBankEmployeeData(),
          error: null,
          hasValue: true
        }),
        type: 'Finalize Pipeline'
      }),
      Object({
        snapshot: Object({
          isLoading: false,
          value: [],
          error: null,
          hasValue: true
        }),
        type: 'Finalize Pipeline'
      }),
      Object({
        snapshot: Object({
          isLoading: false,
          value: [],
          error: null,
          hasValue: true
        }),
        type: 'Finalize Pipeline'
      }),
      Object({
        snapshot: Object({
          isLoading: false,
          value: [],
          error: null,
          hasValue: true
        }),
        type: 'Incoming Pipeline'
      }),
      Object({
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
        }),
        type: 'Finalize Pipeline'
      }),
      Object({
        snapshot: Object({
          isLoading: false,
          value: [
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
          ],
          error: null,
          hasValue: true
        }),
        type: 'Finalize Pipeline',
        options: Object({ withStateCacheBehavior: Object({ id: 'be-007' }) })
      }),
      Object({
        snapshot: Object({
          isLoading: false,
          value: [
            Object({
              id: 'be-008',
              firstName: 'Oscar',
              lastName: 'Klein',
              role: 'LoanOfficer',
              status: 'Active',
              salary: 110000,
              hireDate: '2020-02-18',
              birthDate: '1992-05-30',
              address: Object({
                street: '12 West 43rd St',
                city: 'New York',
                state: 'NY',
                zip: '10036'
              }),
              phoneNumber: '555-909-8080',
              senior: false,
              fullName: 'Oscar Klein',
              isLoanOfficer: true,
              isSecurity: false,
              isActive: true
            })
          ],
          error: null,
          hasValue: true
        }),
        type: 'Finalize Pipeline',
        options: Object({ withStateCacheBehavior: Object({ id: 'be-008' }) })
      }),
      Object({
        snapshot: Object({
          isLoading: false,
          value: [
            Object({
              id: 'be-009',
              firstName: 'Priya',
              lastName: 'Sharma',
              role: 'Owner',
              status: 'Active',
              salary: 160000,
              hireDate: '2023-01-12',
              birthDate: '1985-10-05',
              address: Object({
                street: '77 Park Ave',
                city: 'New York',
                state: 'NY',
                zip: '10016'
              }),
              phoneNumber: '555-333-2323',
              senior: true,
              fullName: 'Priya Sharma',
              isLoanOfficer: false,
              isSecurity: false,
              isActive: true
            })
          ],
          error: null,
          hasValue: true
        }),
        type: 'Finalize Pipeline',
        options: Object({ withStateCacheBehavior: Object({ id: 'be-009' }) })
      }),
      Object({
        snapshot: Object({
          isLoading: false,
          value: [],
          error: null,
          hasValue: true
        }),
        type: 'Finalize Pipeline',
        options: Object({ withStateCacheBehavior: Object({ id: 'be-002' }) })
      })
    ]);
  });
});
