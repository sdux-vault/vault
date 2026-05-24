import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import {
  withTabSyncController,
  withTabSyncStateBehavior
} from '@sdux-vault/core';
import { vaultSettled } from '@sdux-vault/engine';
import { StateEmitTypes, VaultConfig } from '@sdux-vault/shared';
import { tap } from 'rxjs';
import { flushVaultPipeline } from '../../../../../utils/src/public-api';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { getSDuXVaultLicense } from '../../structure/data/sdux-vault.license';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { verifyAllEmployees } from '../../structure/utils/verify-all-employees.util';
import { PartialTabSyncService } from './partial-tab-sync.service';
import { p431Snapshot } from './snap-shots/p431-tab-sync.receive.snapshot';

describe('p431: Tab Sync - Receive State From Remote Tab', () => {
  const key = 'partial-tab-sync';
  const channelName = `sdux-vault:tab-sync:${key}`;
  let testService: PartialTabSyncService;
  let remoteChannel: BroadcastChannel;
  const emitted: any[] = [];
  let stopListening: () => void;

  beforeEach(async () => {
    spyOn(console, 'info');
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

  it('should receive state from a remote tab and apply it locally', async () => {
    const state = testService.getState();
    await flushVaultPipeline();

    // Open the channel by triggering a local state change
    testService.vault.replaceState(Object({ value: getBankEmployeeData() }));
    await vaultSettled(key);

    const stateUpdated = new Promise<void>((resolve) => {
      testService.vault.state$
        .pipe(
          tap((emission) => {
            if (emission.type === StateEmitTypes.TabSync) {
              resolve();
            }
          })
        )
        .subscribe();
    });

    const employees = getBankEmployeeData();

    remoteChannel.postMessage({
      featureCellKey: key,
      tabId: 'remote-tab-id',
      snapshot: {
        isLoading: false,
        value: employees,
        error: null,
        hasValue: true
      },
      type: StateEmitTypes.FinalizePipeline
    });

    await stateUpdated;

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
    verifyAllEmployees(state.value());
  });

  it('should have the correct insight events', async () => {
    await vaultSettled(key);
    expectMonitorSnapshot(emitted, p431Snapshot);
  });
});
