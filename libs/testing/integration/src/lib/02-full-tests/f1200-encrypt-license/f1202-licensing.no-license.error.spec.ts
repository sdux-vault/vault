import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withAes256EncryptBehavior,
  withLocalStoragePersistBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { clearLocalStorage } from '@sdux-vault/testing-utils';
import { flushVaultPipeline } from '../../../../../utils/src/public-api';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { FullTestService } from '../services/full-test.service';
import { f1202Snapshot } from './snap-shots/f1202-licensing.no-license.error.snapshot';

describe('f1202: Licensing - No License Error Test', () => {
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
          bypassLicensing: false
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
  });

  afterEach(() => {
    stopListening();
  });

  it('should replace through the entire pipe', async () => {
    expect(() => testService.initializeWithLicensing()).toThrowError(
      '[vault] License "sdux-vault" required by behavior "SDUX::Behavior::Persist::LocalStorage" is not registered in Vault config.'
    );
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, f1202Snapshot);
  });
});
