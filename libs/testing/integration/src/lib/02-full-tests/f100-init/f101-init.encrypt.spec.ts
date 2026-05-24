import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withAes256EncryptBehavior,
  withLocalStoragePersistBehavior,
  withThrottleController
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage
} from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import {
  verifyFullPipelineAfterTaps,
  verifyFullPipelineEmployees
} from '../../structure/utils/verify-full-pipeline-employees.util';
import { FullTestService } from '../services/full-test.service';
import { f101Snapshot } from './snap-shots/f101-init.encrypt.snapshot';

/****************************
 * This test suite does not reset the local storage betweeen tests because we need it to load
 * the encrypt and then decrypted value from local storage
 * Yes the second test is dependent on the first test
 ****************************/

/*************************************************
 * Test 1
 *
 * Initial value is []
 *
 * filters and reducers comes out to be
 *
 * state.value().length = 0
 * beforeTabs.length = 5
 * Local Storage Length = 3 (same as state values)
 *************************************************/

/*************************************************
 * Test 2
 *
 * Initial value is getBankEmployees(), encrypted and loaded from localstorage
 *
 * filters and reducers comes out to be
 *
 * state.value().length = 3
 * beforeTabs.length = 5
 * Local Storage Length = 3 (same as state values)
 *************************************************/

describe('f101: Init Test', () => {
  const key = 'full-test';
  let testService: FullTestService;
  let stopListening: () => void;

  const emitted: any[] = [];
  const storageKey =
    'vault::localstorage::full-test::SDUX::Behavior::Persist::LocalStorage';

  beforeAll(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date('2024-01-01T00:00:00.000Z'));
    clearLocalStorage(storageKey);
    setLocalStorage(storageKey, []);
  });

  afterAll(() => {
    jasmine.clock().uninstall();
    clearLocalStorage(storageKey);
  });

  beforeEach(async () => {
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
            initialState: getBankEmployeeData(),
            insights: { wantsErrors: true, wantsPayload: true } as any
          },
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
  });

  it('should load initial unencrypted values and replace through the entire pipe', async () => {
    const state = testService.getState();

    jasmine.clock().tick(1_000);
    await vaultSettled(key);

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([]);

    expect(testService.partialAfterTapAbstract.getTaps()).toEqual([]);

    let localStorageData = getLocalStorage(storageKey) as any;
    const originalIV = localStorageData.iv;
    expect(localStorageData.data).not.toContain(['Alice']);
    expect(localStorageData.data).not.toContain(['Brian']);
    expect(localStorageData.data).not.toContain(['Carla']);
    expect(localStorageData.data).not.toContain(['Derek']);
    expect(localStorageData.data).not.toContain(['Elena']);
    expect(localStorageData.data).not.toContain(['Frank']);
    expect(localStorageData.data).not.toContain(['Nina']);
    expect(localStorageData.data).not.toContain(['Oscar']);
    expect(localStorageData.data).not.toContain(['Priya']);
    expect(localStorageData).toEqual([]);

    // Now verify the IV doesn't change on a noop

    testService.vault.replaceState([]);
    await vaultSettled(key);

    expect(state.value()).toEqual([]);

    expect(state.hasValue()).toBeTrue();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    localStorageData = getLocalStorage(storageKey) as any;
    expect(originalIV).toBeUndefined();
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

    // Now verify the it writes now values
    testService.vault.reset();

    testService.vault.replaceState(
      getBankEmployeeData() as BankEmployeeShape[]
    );
    await vaultSettled(key);

    verifyFullPipelineEmployees(state.value());
    expect(state.hasValue()).toBeTrue();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    localStorageData = getLocalStorage(storageKey) as any;
    expect(originalIV).not.toBe(localStorageData.iv);
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
  });

  it('should load initial unencrypted values and replace through the entire pipe', async () => {
    let state = testService.getState();

    jasmine.clock().tick(1_000);
    await vaultSettled(key);

    verifyFullPipelineEmployees(state.value());

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
            phoneNumber: '555-444-1212',
            senior: true,
            fullName: 'Nina Castillo',
            isLoanOfficer: false,
            isSecurity: false,
            isActive: true
          }),
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
          }),
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
            phoneNumber: '555-444-1212',
            senior: true,
            fullName: 'Nina Castillo',
            isLoanOfficer: false,
            isSecurity: false,
            isActive: true
          }),
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
          }),
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
            phoneNumber: '555-444-1212',
            senior: true,
            fullName: 'Nina Castillo',
            isLoanOfficer: false,
            isSecurity: false,
            isActive: true
          }),
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
          }),
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
            phoneNumber: '555-444-1212',
            senior: true,
            fullName: 'Nina Castillo',
            isLoanOfficer: false,
            isSecurity: false,
            isActive: true
          }),
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
          }),
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
            phoneNumber: '555-444-1212',
            senior: true,
            fullName: 'Nina Castillo',
            isLoanOfficer: false,
            isSecurity: false,
            isActive: true
          }),
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
          }),
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
        source: 'partialPureFunctionBeforeTap'
      })
    ]);

    verifyFullPipelineAfterTaps(testService.partialAfterTapAbstract.getTaps());

    let localStorageData = getLocalStorage(storageKey) as any;
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
  });

  it('should have the correct insight events', async () => {
    jasmine.clock().tick(1_000);
    await vaultSettled(key);

    expectMonitorSnapshot(emitted, f101Snapshot);
  });
});
