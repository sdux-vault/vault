import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import {
  withTabSyncController,
  withTabSyncStateBehavior
} from '@sdux-vault/core';
import { vaultSettled } from '@sdux-vault/engine';
import {
  StateEmitSnapshotShape,
  StateEmitTypes,
  VaultConfig
} from '@sdux-vault/shared';
import { tap } from 'rxjs';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { getSDuXVaultLicense } from '../../structure/data/sdux-vault.license';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialTabSyncService } from './partial-tab-sync.service';
import { p432Snapshot } from './snap-shots/p432-tab-sync.ignore-same-tab.snapshot';

describe('p432: Tab Sync - Ignore Messages From Same Tab', () => {
  const key = 'partial-tab-sync';
  const channelName = `sdux-vault:tab-sync:${key}`;
  let testService: PartialTabSyncService;
  let remoteChannel: BroadcastChannel;
  const emitted: any[] = [];
  let stopListening: () => void;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true,
          bypassLicensing: false,
          licenses: [getSDuXVaultLicense()]
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
    testService.initialize();

    remoteChannel = new BroadcastChannel(channelName);
  });

  afterEach(() => {
    stopListening();
    remoteChannel.close();
  });

  it('should ignore messages from the same tab', async () => {
    await vaultSettled(key);

    const emissions: StateEmitSnapshotShape<BankEmployeeShape[]>[] = [];
    testService.vault.state$
      .pipe(tap((emission) => emissions.push(emission)))
      .subscribe();

    const behavior = (testService.vault as any)._behaviors?.find(
      (b: any) => b.tabId
    ) as withTabSyncStateBehavior<BankEmployeeShape[]> | undefined;

    const tabId = behavior?.tabId ?? 'unknown';

    remoteChannel.postMessage({
      featureCellKey: key,
      tabId,
      snapshot: {
        isLoading: false,
        value: getBankEmployeeData(),
        error: null,
        hasValue: true
      },
      type: StateEmitTypes.FinalizePipeline
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    const tabSyncEmissions = emissions.filter(
      (e) => e.type === StateEmitTypes.TabSync
    );
    expect(tabSyncEmissions.length).toBe(1);
  });

  it('should have the correct insight events', async () => {
    await vaultSettled(key);
    expectMonitorSnapshot(emitted, p432Snapshot);
  });
});
