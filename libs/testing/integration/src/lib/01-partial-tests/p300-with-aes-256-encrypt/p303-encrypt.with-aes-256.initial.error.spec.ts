import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withAes256EncryptBehavior,
  withLocalStoragePersistBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage
} from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { verifyAllEmployees } from '../../structure/utils/verify-all-employees.util';
import { PartialWithAES256EncryptService } from './partial-encrypt.with-aes-256.service';
import { p303Snapshot } from './snap-shots/p303-encrypt.with-aes-256.initial.error.snapshot';

describe('p303: Encrypt - AES 256 Malformed Initial - Error Test', () => {
  const key = 'partial-encrypt.with-aes-256';
  let testService: PartialWithAES256EncryptService;
  let stopListening: () => void;

  const emitted: any[] = [];
  const storageKey = `vault::localstorage::${key}::SDUX::Behavior::Persist::LocalStorage`;

  beforeEach(async () => {
    clearLocalStorage(storageKey);
    setLocalStorage(storageKey, {
      v: 1,
      alg: 'AES-256-GCM',
      iv: 'AAAAAAAAAAAAAAAAAAAAAA', // valid base64, NOT valid IV bytes
      data: 'BBBBBBBBBBBBBBBBBBBBBB' // valid base64, NOT ciphertext
    });

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
            initialState: null,
            insights: {
              wantsErrors: true,
              wantsPayload: true
            } as any
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
    clearLocalStorage(storageKey);
  });

  it('should throw an error if the encrypt key is not set', async () => {
    const state = testService.getState();
    await vaultSettled(key);

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    expect(getLocalStorage(storageKey)).toEqual(
      Object({
        v: 1,
        alg: 'AES-256-GCM',
        iv: 'AAAAAAAAAAAAAAAAAAAAAA',
        data: 'BBBBBBBBBBBBBBBBBBBBBB'
      })
    );

    testService.vault.replaceState(Object({ value: getBankEmployeeData() }));
    await vaultSettled(key);

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    expect(getLocalStorage(storageKey)).toEqual(
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
    expectMonitorSnapshot(emitted, p303Snapshot);
  });
});
