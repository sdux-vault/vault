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
import { p302Snapshot } from './snap-shots/p302-encrypt.with-aes-256.error.snapshot';

describe('p302: Encrypt - AES 256 - Error Test', () => {
  const key = 'partial-encrypt.with-aes-256';
  let testService: PartialWithAES256EncryptService;
  let stopListening: () => void;

  const emitted: any[] = [];
  const storageKey = `vault::localstorage::${key}::SDUX::Behavior::Persist::LocalStorage`;

  beforeEach(async () => {
    clearLocalStorage(storageKey);
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
  });

  afterEach(() => {
    stopListening();
    clearLocalStorage(storageKey);
    testService.clearGlobalErrors();
  });

  it('should throw an error if the encrypt key is not set', async () => {
    expect(() => testService.initializeError()).toThrowError(
      '[vault] AES256Encrypt behavior requires configuration via setAes256Secret()'
    );

    const state = testService.getState();

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    expect(() =>
      testService.vault.replaceState(Object({ value: getBankEmployeeData() }))
    ).toThrowError(
      '[vault] FeatureCell "partial-encrypt.with-aes-256" encountered a critical initialization failure and is now in a corrupted state. Further use is blocked.'
    );

    expect(getLocalStorage(storageKey)).toBeNull();
  });

  it('should have the correct insight events', async () => {
    testService.initialize();
    await vaultSettled(key);
    expectMonitorSnapshot(emitted, p302Snapshot);
  });
});
