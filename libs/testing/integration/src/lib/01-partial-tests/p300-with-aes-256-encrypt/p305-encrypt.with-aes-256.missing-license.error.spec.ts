import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withAes256EncryptBehavior,
  withLocalStoragePersistBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { clearLocalStorage, setLocalStorage } from '@sdux-vault/testing-utils';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialWithAES256EncryptService } from './partial-encrypt.with-aes-256.service';
import { p305Snapshot } from './snap-shots/p305-encrypt.with-aes-256.missing-license.error.snapshot';

describe('p305: Encrypt - AES 256 Missing License - Error Test', () => {
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
          devMode: true,
          bypassLicensing: false,
          licenseTimeoutMs: 100,
          licenses: []
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
  });

  it('should throw an error when initializing without a license', async () => {
    expect(() => testService.initialize()).toThrowError(
      '[vault] License "sdux-vault" required by behavior "SDUX::Behavior::Persist::LocalStorage" is not registered in Vault config.'
    );
  });

  it('should have the correct insight events', async () => {
    await vaultSettled(key);
    expectMonitorSnapshot(emitted, p305Snapshot);
  });
});
