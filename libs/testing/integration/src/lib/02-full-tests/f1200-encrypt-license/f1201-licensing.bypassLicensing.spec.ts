import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withAes256EncryptBehavior,
  withLocalStoragePersistBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { clearLocalStorage } from '@sdux-vault/testing-utils';
import {
  flushVaultPipeline,
  getLocalStorage
} from '../../../../../utils/src/public-api';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { verifyAllEmployees } from '../../structure/utils/verify-all-employees.util';
import { FullTestService } from '../services/full-test.service';
import { f1201Snapshot } from './snap-shots/f1201-licensing.bypassLicensing.snapshot';

describe('f1201: Licensing - Bypass Licensing Test', () => {
  const key = 'full-test';
  let testService: FullTestService;
  let stopListening: () => void;

  const emitted: any[] = [];
  const storageKey = `vault::localstorage::${key}::SDUX::Behavior::Persist::LocalStorage`;
  const ivs: string[] = [];

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
          [withLocalStoragePersistBehavior, withAes256EncryptBehavior]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(FullTestService);
    testService.initializeWithLicensing();
  });

  afterEach(() => {
    stopListening();
  });

  it('should replace through the entire pipe', async () => {
    let state = testService.getState();
    await vaultSettled(key);

    testService.vault.replaceState(Object({ value: getBankEmployeeData() }));
    await vaultSettled(key);

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

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
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, f1201Snapshot);
  });
});
