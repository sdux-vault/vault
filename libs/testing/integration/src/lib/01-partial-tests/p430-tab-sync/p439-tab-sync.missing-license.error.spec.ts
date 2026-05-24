import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import {
  withTabSyncController,
  withTabSyncStateBehavior
} from '@sdux-vault/core';
import { VaultConfig } from '@sdux-vault/shared';
import { flushVaultPipeline } from '../../../../../utils/src/public-api';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialTabSyncService } from './partial-tab-sync.service';
import { p439Snapshot } from './snap-shots/p439-tab-sync.missing-license.error.snapshot';

describe('p439: Tab Sync - Missing License Error', () => {
  const key = 'partial-tab-sync';
  let testService: PartialTabSyncService;
  const emitted: any[] = [];
  let stopListening: () => void;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true,
          bypassLicensing: false,
          licenseTimeoutMs: 100,
          licenses: [{ licenseId: 'second-license', payload: 'Second License' }]
        } as VaultConfig),
        PartialTabSyncService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialTabSyncService,
          {
            key,
            initialState: null,
            insights: {} as any
          },
          [withTabSyncStateBehavior],
          [withTabSyncController]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialTabSyncService);
  });

  afterEach(() => {
    stopListening();
  });

  it('should throw an error when initializing without a license', async () => {
    expect(() => testService.initialize()).toThrowError(
      '[vault] License "sdux-vault" required by controller "SDUX::Controller::Policy::TabSync" is not registered in Vault config.'
    );
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p439Snapshot);
  });
});
