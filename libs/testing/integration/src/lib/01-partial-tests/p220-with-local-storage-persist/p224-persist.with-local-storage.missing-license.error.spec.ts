import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withLocalStoragePersistBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { VaultConfig } from '@sdux-vault/shared';
import { flushVaultPipeline } from '../../../../../utils/src/public-api';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialWithLocalStorageService } from './partial-persist.with-local-storage.service';
import { p224Snapshot } from './snap-shots/p224-persist.with-local-storage.missing-license.error.snapshot';

describe('p224: Persist - Local Storage Missing License Error', () => {
  const key = 'partial-persist.with-local-storage';
  let testService: PartialWithLocalStorageService;
  const emitted: any[] = [];
  let stopListening: () => void;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true,
          bypassLicensing: false,
          licenseTimeoutMs: 100,
          licenses: []
        } as VaultConfig),
        PartialWithLocalStorageService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialWithLocalStorageService,
          {
            key,
            initialState: null,
            insights: {} as any
          },
          [withLocalStoragePersistBehavior]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialWithLocalStorageService);
  });

  afterEach(() => {
    stopListening();
  });

  it('should throw an error when initializing without a license', async () => {
    expect(() => testService.initialize()).toThrowError(
      '[vault] License "sdux-vault" required by behavior "SDUX::Behavior::Persist::LocalStorage" is not registered in Vault config.'
    );
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p224Snapshot);
  });
});
