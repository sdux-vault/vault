import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withAes256EncryptBehavior,
  withLocalStoragePersistBehavior,
  withThrottleController
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { StateInputShape } from '@sdux-vault/shared';
import { clearLocalStorage, getLocalStorage } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import {
  verifyFullPipelineAfterTaps,
  verifyFullPipelineBeforeTaps,
  verifyFullPipelineEmployees
} from '../../structure/utils/verify-full-pipeline-employees.util';
import { FullTestService } from '../services/full-test.service';
import { f601Snapshot } from './snap-shots/f601-from-promise.merge.snapshot';

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

describe('f601: Value - FromPromise Merge with Encrypt Test', () => {
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
        provideZonelessChangeDetection(),
        FullTestService,
        provideVaultTesting({
          devMode: true
        }),
        provideFeatureCell(
          FullTestService,
          { key, initialState: null, insights: {} as any },
          [withLocalStoragePersistBehavior, withAes256EncryptBehavior],
          [withThrottleController]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(FullTestService);
    testService.initializeWithEncrypt();
  });

  afterEach(() => {
    stopListening();
    clearLocalStorage(storageKey);
  });

  it('should merge through the entire pipe', async () => {
    let state = testService.getState();
    await vaultSettled(key);

    testService.vault.fromPromise!({
      value: () => Promise.resolve(getBankEmployeeData() as any)
    }).then((vaultInput: StateInputShape<BankEmployeeShape[]>): void => {
      testService.vault.replaceState(vaultInput);
    });
    await vaultSettled(key);

    testService.vault.fromPromise!({
      value: () => Promise.resolve(getBankEmployeeData() as any)
    }).then((vaultInput: StateInputShape<BankEmployeeShape[]>): void => {
      testService.vault.replaceState(vaultInput);
    });
    await vaultSettled(key);

    testService.vault.fromPromise!({
      value: () => Promise.resolve(getBankEmployeeData(0, true) as any)
    }).then((vaultInput: StateInputShape<BankEmployeeShape[]>): void => {
      testService.vault.replaceState(vaultInput);
    });
    await vaultSettled(key);

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([]);
    expect(testService.partialAfterTapAbstract.getTaps()).toEqual([]);

    expect(getLocalStorage(storageKey)).toBeNull();

    testService.partialBeforeTapAbstract.clearTaps();
    testService.partialAfterTapAbstract.clearTaps();

    jasmine.clock().tick(1000);
    testService.vault.fromPromise!({
      value: () => Promise.resolve(getBankEmployeeData() as any)
    }).then((vaultInput: StateInputShape<BankEmployeeShape[]>): void => {
      testService.vault.mergeState(vaultInput);
    });
    await vaultSettled(key);

    verifyFullPipelineEmployees(state.value());
    expect(state.hasValue()).toBeTrue();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    verifyFullPipelineBeforeTaps(
      testService.partialBeforeTapAbstract.getTaps()
    );
    verifyFullPipelineAfterTaps(testService.partialAfterTapAbstract.getTaps());

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

    jasmine.clock().tick(1001);
    testService.vault.fromPromise!({
      value: () => Promise.resolve([] as any)
    }).then((vaultInput: StateInputShape<BankEmployeeShape[]>): void => {
      testService.vault.mergeState(vaultInput);
    });

    await vaultSettled(key);

    expect(state.hasValue()).toBeTrue();

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

    testService.partialBeforeTapAbstract.clearTaps();
    testService.partialAfterTapAbstract.clearTaps();

    jasmine.clock().tick(1000);
    testService.vault.fromPromise!({
      value: () => Promise.resolve([] as any)
    }).then((vaultInput: StateInputShape<BankEmployeeShape[]>): void => {
      testService.vault.mergeState(vaultInput);
    });
    await vaultSettled(key);

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

    jasmine.clock().tick(1000);
    testService.partialFilterAbstract.p190MergeEmployeesFilters();
    await vaultSettled(key);

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
  });

  it('should have the correct insight events', async () => {
    jasmine.clock().tick(1000);
    await vaultSettled(key);
    expectMonitorSnapshot(emitted, f601Snapshot);
  });
});
