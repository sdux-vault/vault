import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withAes256EncryptBehavior,
  withLocalStoragePersistBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { clearLocalStorage, getLocalStorage } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { getSDuXVaultLicense } from '../../structure/data/sdux-vault.license';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { verifyAllEmployees } from '../../structure/utils/verify-all-employees.util';
import { PartialWithAES256EncryptService } from './partial-encrypt.with-aes-256.service';
import { p300Snapshot } from './snap-shots/p300-encrypt.with-aes-256.snapshot';

/****************************
 * This test does not reset the local storage betweeen tests because we need it to load
 * the encrypt and then decrypted value from local storage
 * Yes the second test is dependent on the first test
 ****************************/

describe('p300: Encrypt - AES 256 Test', () => {
  const key = 'partial-encrypt.with-aes-256';
  let testService: PartialWithAES256EncryptService;
  let stopListening: () => void;

  const emitted: any[] = [];
  const storageKey = `vault::localstorage::${key}::SDUX::Behavior::Persist::LocalStorage`;

  beforeAll(() => {
    clearLocalStorage(storageKey);
  });

  afterAll(() => {
    clearLocalStorage(storageKey);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true,
          bypassLicensing: false,
          licenses: [getSDuXVaultLicense()]
        }),
        PartialWithAES256EncryptService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialWithAES256EncryptService,
          {
            key,
            initialState: null,
            insights: {} as any
          },
          [withLocalStoragePersistBehavior, withAes256EncryptBehavior]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);
    testService = TestBed.inject(PartialWithAES256EncryptService);
    testService.initialize();
  });

  afterEach(() => {
    stopListening();
  });

  it('should replace and encrypt the bank employees with in local storage', async () => {
    const state = testService.getState();
    await vaultSettled(key);

    expect(state.hasValue()).toBeFalse();
    expect(state.value()).toBeUndefined();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    expect(getLocalStorage(storageKey)).toBeNull();

    testService.vault.replaceState(
      getBankEmployeeData() as BankEmployeeShape[]
    );
    await vaultSettled(key);

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    const localStorageData = getLocalStorage(storageKey) as any;
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

  it('should load and decrypt the bank employees from local storage', async () => {
    const state = testService.getState();
    await vaultSettled(key);

    expect(state.hasValue()).toBeTrue();
    expect(state.value()).toEqual([
      Object({
        id: 'be-001',
        firstName: 'Alice',
        lastName: 'Wells',
        role: 'Teller',
        status: 'Active',
        salary: 48000,
        hireDate: '2018-03-12',
        birthDate: '1992-07-22',
        phoneNumber: '555-201-8899',
        address: Object({
          street: '101 Maple St',
          city: 'Springfield',
          state: 'IL',
          zip: '62704'
        })
      }),
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
      }),
      Object({
        id: 'be-003',
        firstName: 'Carla',
        lastName: 'Summers',
        role: 'Owner',
        status: 'Active',
        salary: 185000,
        hireDate: '2003-01-20',
        birthDate: '1964-11-30',
        phoneNumber: '555-732-1100',
        address: Object({
          street: '12 Oak Bend Dr',
          city: 'Chicago',
          state: 'IL',
          zip: '60614'
        })
      }),
      Object({
        id: 'be-004',
        firstName: 'Derek',
        lastName: 'Hughes',
        role: 'LoanOfficer',
        status: 'Suspended',
        salary: 78000,
        hireDate: '2016-06-10',
        birthDate: '1989-02-14',
        phoneNumber: '555-810-4431',
        address: Object({
          street: '88 Willow Hill Rd',
          city: 'Chicago',
          state: 'IL',
          zip: '60657'
        })
      }),
      Object({
        id: 'be-005',
        firstName: 'Elena',
        lastName: 'Reed',
        role: 'Teller',
        status: 'Active',
        salary: 52000,
        hireDate: '2021-11-01',
        birthDate: '1998-09-05',
        phoneNumber: '555-610-2099',
        address: Object({
          street: '233 Pinecrest Ln',
          city: 'Naperville',
          state: 'IL',
          zip: '60540'
        })
      }),
      Object({
        id: 'be-006',
        firstName: 'Frank',
        lastName: 'Dalton',
        role: 'Security',
        status: 'Active',
        salary: 43000,
        hireDate: '2019-04-18',
        birthDate: '1974-12-19',
        phoneNumber: '555-673-8832',
        address: Object({
          street: '789 Forest Glen Dr',
          city: 'Naperville',
          state: 'IL',
          zip: '60565'
        })
      }),
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
        phoneNumber: '555-909-8080'
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
        phoneNumber: '555-333-2323'
      })
    ]);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

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
    expect(localStorageData).toEqual(
      Object({
        v: 1,
        alg: 'AES-256-GCM',
        iv: jasmine.any(String),
        data: jasmine.any(String)
      })
    );

    testService.vault.mergeState(
      Object({ value: getBankEmployeeData(1, true) })
    );
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
    expect(state.hasValue()).toBeTrue();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    localStorageData = getLocalStorage(storageKey) as any;
    expect(originalIV).not.toEqual(localStorageData.iv);
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
    await vaultSettled(key);
    expectMonitorSnapshot(emitted, p300Snapshot);
  });
});
