import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withAes256EncryptBehavior,
  withLocalStoragePersistBehavior,
  withStateCacheBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import {
  clearLocalStorage,
  flushVaultPipeline,
  getLocalStorage
} from '@sdux-vault/testing-utils';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { FullTestService } from '../services/full-test.service';
import { f800Snapshot } from './snap-shots/f800-cache.merge.snapshot';

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
 * merge is testService.vault.replaceState(Promise.resolve(getBankEmployeeData() as BankEmployeeShape[]));
 * which is getBankEmployees()
 *
 * filters and reducers comes out to be
 *
 * state.value().length = 3
 * beforeTabs.length = 5
 * Local Storage Length = 3 (same as state values)
 *************************************************/

describe('f800: Cache Value - Merge with Encrypt Test', () => {
  const key = 'full-test';
  let testService: FullTestService;
  let stopListening: () => void;

  const emitted: any[] = [];
  const storageKey = `vault::localstorage::${key}::SDUX::Behavior::Persist::LocalStorage`;
  const ivs: string[] = [];

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
          devMode: true,
          bypassLicensing: true
        }),
        FullTestService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          FullTestService,
          { key, initialState: null, insights: {} as any },
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
    testService.initializeStateCacheByValue();
  });

  afterEach(() => {
    stopListening();
  });

  it('should merge through the entire pipe', async () => {
    const lookups = [];
    jasmine.clock().tick(1_000);
    let state = testService.getState();
    await vaultSettled(key);

    lookups.push(testService.vault.cacheLookup!('be-001'));
    await vaultSettled(key);

    lookups.push(testService.vault.cacheLookup!('be-002'));
    await vaultSettled(key);

    testService.partialBeforeTapAbstract.clearTaps();
    testService.partialAfterTapAbstract.clearTaps();

    lookups.push(testService.vault.cacheLookup!('be-003'));
    await vaultSettled(key);

    jasmine.clock().tick(999);
    // await vaultSettled(key);
    await flushVaultPipeline();

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

    expect(getLocalStorage(storageKey)).toEqual(
      Object({
        v: 1,
        alg: 'AES-256-GCM',
        iv: jasmine.anything(),
        data: jasmine.anything()
      })
    );
    ivs.push((getLocalStorage(storageKey) as any).iv);

    expect(testService.fetches).toEqual([
      'be-001',
      'found - be-001',
      'be-002',
      'found - be-002',
      'be-003',
      'found - be-003'
    ]);

    testService.partialBeforeTapAbstract.clearTaps();
    testService.partialAfterTapAbstract.clearTaps();

    jasmine.clock().tick(1_000);
    lookups.push(testService.vault.cacheLookup!('be-007'));
    await vaultSettled(key);

    expect(await lookups[0]).toBeUndefined();
    expect(await lookups[1]).toBeUndefined();
    expect(await lookups[2]).toBeUndefined();
    expect(await lookups[3]).toEqual(
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

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([
      Object({
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
            phoneNumber: '555-444-1212'
          })
        ],
        source: 'partialArrowBeforeTapFunction'
      }),
      Object({
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
            phoneNumber: '555-444-1212'
          })
        ],
        source: 'partialInlineBeforeTapFunction'
      }),
      Object({
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
            phoneNumber: '555-444-1212'
          })
        ],
        source: 'partialPrivateBeforeTapFunction'
      }),
      Object({
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
            phoneNumber: '555-444-1212'
          })
        ],
        source: 'partialAnonymousBeforeTapFunction'
      }),
      Object({
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
            phoneNumber: '555-444-1212'
          })
        ],
        source: 'partialPureFunctionBeforeTap'
      })
    ]);

    expect(testService.partialAfterTapAbstract.getTaps()).toEqual([
      Object({
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
        source: 'partialArrowAfterTapFunction'
      }),
      Object({
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
        source: 'partialInlineAfterTapFunction'
      }),
      Object({
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
        source: 'partialPrivateAfterTapFunction'
      }),
      Object({
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
        source: 'partialAnonymousAfterTapFunction'
      }),
      Object({
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
        source: 'partialPureFunctionAfterTap'
      })
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

    expect(testService.fetches).toEqual([
      'be-001',
      'found - be-001',
      'be-002',
      'found - be-002',
      'be-003',
      'found - be-003',
      'be-007',
      'found - be-007'
    ]);

    testService.partialBeforeTapAbstract.clearTaps();
    testService.partialAfterTapAbstract.clearTaps();

    let employee101 = testService.vault.cacheLookup!('be-101');
    jasmine.clock().tick(1_000);
    await flushVaultPipeline();

    expect(await employee101).toBeUndefined();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    expect(state.value()).toEqual([]);

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

    expect(testService.fetches).toEqual([
      'be-001',
      'found - be-001',
      'be-002',
      'found - be-002',
      'be-003',
      'found - be-003',
      'be-007',
      'found - be-007',
      'be-101'
    ]);

    testService.partialBeforeTapAbstract.clearTaps();
    testService.partialAfterTapAbstract.clearTaps();

    employee101 = testService.vault.cacheLookup!('be-101');
    jasmine.clock().tick(1_000);
    await flushVaultPipeline();

    expect(await employee101).toBeUndefined();

    expect(state.value()).toEqual([]);

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

    testService.vault.mergeState(
      testService.formatPromiseInputAsValue([
        Object({
          id: 'be-999',
          firstName: 'Victor',
          lastName: 'Ramirez',
          role: 'Manager', // Passes: leadership, senior, non-security filters
          status: 'Active', // Passes: active-status inline filter
          salary: 120000, // Passes: > 80k arrow filter
          hireDate: '2022-06-15', // Passes: startDateAfter('2020-01-01') pure function filter
          birthDate: '1988-09-21',
          address: {
            city: 'New York', // Passes: bound filter (city === 'New York')
            state: 'NY',
            zip: '10001'
          },
          phoneNumber: '(212) 555-9012'
        })
      ])
    );

    jasmine.clock().tick(1_000);
    await vaultSettled(key);

    expect(testService.fetches).toEqual([
      'be-001',
      'found - be-001',
      'be-002',
      'found - be-002',
      'be-003',
      'found - be-003',
      'be-007',
      'found - be-007',
      'be-101',
      'be-101'
    ]);

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

    expect(testService.fetches).toEqual([
      'be-001',
      'found - be-001',
      'be-002',
      'found - be-002',
      'be-003',
      'found - be-003',
      'be-007',
      'found - be-007',
      'be-101',
      'be-101'
    ]);

    employee101 = testService.vault.cacheLookup!('be-999');
    jasmine.clock().tick(1_000);
    await flushVaultPipeline();

    expect(await employee101).toEqual(
      Object({
        id: 'be-999',
        firstName: 'Victor',
        lastName: 'Ramirez',
        role: 'Manager', // Passes: leadership, senior, non-security filters
        status: 'Active', // Passes: active-status inline filter
        salary: 120000, // Passes: > 80k arrow filter
        hireDate: '2022-06-15', // Passes: startDateAfter('2020-01-01') pure function filter
        birthDate: '1988-09-21',
        address: {
          city: 'New York', // Passes: bound filter (city === 'New York')
          state: 'NY',
          zip: '10001'
        },
        phoneNumber: '(212) 555-9012',
        senior: true,
        fullName: 'Victor Ramirez',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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

    expect(testService.fetches).toEqual([
      'be-001',
      'found - be-001',
      'be-002',
      'found - be-002',
      'be-003',
      'found - be-003',
      'be-007',
      'found - be-007',
      'be-101',
      'be-101'
    ]);

    /**
     * Cache time
     */

    /*
    jasmine.clock().tick(100_000);
    await vaultSettled(key);

    expect(await employee101).toEqual(
      Object({
        id: 'be-999',
        firstName: 'Victor',
        lastName: 'Ramirez',
        role: 'Manager', // Passes: leadership, senior, non-security filters
        status: 'Active', // Passes: active-status inline filter
        salary: 120000, // Passes: > 80k arrow filter
        hireDate: '2022-06-15', // Passes: startDateAfter('2020-01-01') pure function filter
        birthDate: '1988-09-21',
        address: {
          city: 'New York', // Passes: bound filter (city === 'New York')
          state: 'NY',
          zip: '10001'
        },
        phoneNumber: '(212) 555-9012',
        senior: true,
        fullName: 'Victor Ramirez',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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

    /*

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

    expect(testService.fetches).toEqual([
      'be-001',
      'found - be-001',
      'be-002',
      'found - be-002',
      'be-003',
      'found - be-003',
      'be-007',
      'found - be-007',
      'be-101',
      'be-101',
      'be-007',
      'found - be-007 auto-fetch',
      'be-999'
    ]);
    */
  });

  it('should have the correct insight events', async () => {
    jasmine.clock().tick(1_000);

    await vaultSettled(key);
    expectMonitorSnapshot(emitted, f800Snapshot);
  });
});
