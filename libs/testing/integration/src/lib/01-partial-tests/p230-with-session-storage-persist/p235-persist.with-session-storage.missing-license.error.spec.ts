import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withSessionStoragePersistBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import {
  clearSessionStorage,
  flushVaultPipeline
} from '@sdux-vault/testing-utils';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialWithSessionStorageService } from './partial-persist.with-session-storage.service';
import { p235Snapshot } from './snap-shots/p235-persist.with-session-storage.missing-license.error.snapshot';

describe('p235: Persist - Session Storage Missing License Error Test', () => {
  const key = 'partial-persist.with-session-storage';
  let testService: PartialWithSessionStorageService;
  let stopListening: () => void;

  const emitted: any[] = [];
  const storageKey = `vault::sessionstorage::${key}::SDUX::Behavior::Persist::SessionStorage`;

  beforeEach(async () => {
    clearSessionStorage(storageKey);
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true,
          bypassLicensing: false,
          licenseTimeoutMs: 100,
          licenses: []
        }),
        PartialWithSessionStorageService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialWithSessionStorageService,
          {
            key,
            initialState: null,
            insights: {} as any
          },
          [withSessionStoragePersistBehavior]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);
    testService = TestBed.inject(PartialWithSessionStorageService);
  });

  afterEach(() => {
    stopListening();
    clearSessionStorage(storageKey);
  });

  it('should throw an error when initializing without a license', async () => {
    expect(() => testService.initialize()).toThrowError(
      '[vault] License "sdux-vault" required by behavior "SDUX::Behavior::Persist::SessionStorage" is not registered in Vault config.'
    );
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p235Snapshot);
  });
});
