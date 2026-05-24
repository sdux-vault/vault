import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withAes256EncryptBehavior,
  withLocalStoragePersistBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { clearLocalStorage, setLocalStorage } from '@sdux-vault/testing-utils';
import { Subscription } from 'rxjs';
import { flushVaultPipeline } from '../../../../../utils/src/lib/util/flush-vault-pipeline.util';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { getSDuXVaultInvalidLicense } from '../../structure/data/sdux-vault.invalid-license';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialWithAES256EncryptService } from './partial-encrypt.with-aes-256.service';
import { p304Snapshot } from './snap-shots/p304-encrypt.with-aes-256.invalid-license.error.snapshot';

describe('p304: Encrypt - AES 256 Invalid License - Error Test', () => {
  const key = 'partial-encrypt.with-aes-256';
  let testService: PartialWithAES256EncryptService;
  let stopListening: () => void;
  let stopErrorListening: Subscription;
  const globalErrors: any[] = [];

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
          licenses: [getSDuXVaultInvalidLicense()]
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

    stopErrorListening = testService.globalError.error$.subscribe((err) => {
      globalErrors.push(err);
    });
  });

  afterEach(() => {
    stopListening();
    stopErrorListening.unsubscribe();
    clearLocalStorage(storageKey);
    testService.clearGlobalErrors();
  });

  it('should deny the pipeline when the license is invalid', async () => {
    const state = testService.getState();

    testService.vault.replaceState(Object({ value: getBankEmployeeData() }));
    await vaultSettled(key);

    expect(state.error()).toBeNull();
    expect(state.value()).toBeUndefined();

    expect(globalErrors).toEqual([
      null,
      Object({
        message:
          'partial-encrypt.with-aes-256 Conductor Decision Engine: The FeatureCell received a "License Denied". Pipeline is disabled.',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: key
      })
    ]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p304Snapshot);
  });
});
