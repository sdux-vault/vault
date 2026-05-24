import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withCookieStoragePersistBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import {
  clearCookieStorage,
  flushVaultPipeline
} from '@sdux-vault/testing-utils';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialWithCookieStorageService } from './partial-persist.with-cookie-storage.service';
import { p246Snapshot } from './snap-shots/p246-persist.with-cookie-storage.missing-license.error.snapshot';

describe('p246: Persist - Cookie Storage Missing License', () => {
  let testService: PartialWithCookieStorageService;
  let stopListening: () => void;

  const emitted: any[] = [];
  const storageKey =
    'vault::cookiestorage::partial-persist.with-cookie-storage::SDUX::Behavior::Persist::CookieStorage';

  beforeEach(async () => {
    clearCookieStorage(storageKey);
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true,
          bypassLicensing: false,
          licenseTimeoutMs: 100,
          licenses: []
        }),
        PartialWithCookieStorageService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialWithCookieStorageService,
          {
            key: 'partial-persist.with-cookie-storage',
            initialState: null,
            insights: {} as any
          },
          [withCookieStoragePersistBehavior]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);
    testService = TestBed.inject(PartialWithCookieStorageService);
  });

  afterEach(() => {
    stopListening();
    clearCookieStorage(storageKey);
  });

  it('should throw an error when initializing without a license', async () => {
    expect(() => testService.initialize()).toThrowError(
      '[vault] License "sdux-vault" required by behavior "SDUX::Behavior::Persist::CookieStorage" is not registered in Vault config.'
    );
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p246Snapshot);
  });
});
