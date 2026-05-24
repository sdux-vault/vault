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
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialWithAES256EncryptService } from './partial-encrypt.with-aes-256.service';
import { p301Snapshot } from './snap-shots/p301-encrypt.with-aes-256.non-standard.snapshot';

/****************************
 * This test does not reset the local storage betweeen tests because we need it to load
 * the encrypt and then decrypted value from local storage
 * Yes the second test is dependent on the first test
 ****************************/

/*************************************************
 * Test 1
 *
 * Initial value is -1
 *
 * filters and reducers comes out to be
 *
 * state.value() = undefined
 * beforeTaps = []
 * Local Storage = null
 *
 *************************************************/

/*************************************************
 * Test 2
 *
 * Initial value is "taco"
 *
 * filters and reducers comes out to be
 *
 * state.value() = undefined
 * beforeTaps = []
 * Local Storage = null
 *
 * replace is getBankEmployees()
 *
 * filters and reducers comes out to be
 *
 * state.value().length = 3
 * beforeTabs.length = 5
 * Local Storage Length = 3 (same as state values)
 *************************************************/

describe('p301: Encrypt - AES 256 - Non Standard Initial Test', () => {
  const key = 'partial-encrypt.with-aes-256';
  let testService: PartialWithAES256EncryptService;
  let stopListening: () => void;

  const emitted: any[] = [];
  const storageKey =
    'vault::localstorage::partial-encrypt.with-aes-256::SDUX::Behavior::Persist::LocalStorage';

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
          devMode: true
        }),
        PartialWithAES256EncryptService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialWithAES256EncryptService,
          {
            key,
            initialState: -1,
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

    testService.vault.replaceState('taco' as any);
    await vaultSettled(key);

    expect(state.value()).toEqual('taco' as any);
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
    expect(state.value()).toEqual('taco' as any);

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
    expectMonitorSnapshot(emitted, p301Snapshot);
  });
});
