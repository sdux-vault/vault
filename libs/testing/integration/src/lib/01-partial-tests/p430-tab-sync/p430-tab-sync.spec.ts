import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import {
  withTabSyncController,
  withTabSyncStateBehavior
} from '@sdux-vault/core';
import { vaultSettled } from '@sdux-vault/engine';
import { VaultConfig } from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { getSDuXVaultLicense } from '../../structure/data/sdux-vault.license';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { verifyAllEmployees } from '../../structure/utils/verify-all-employees.util';
import { PartialTabSyncService } from './partial-tab-sync.service';
import { p430Snapshot } from './snap-shots/p430-tab-sync.snapshot';

describe('p430: Tab Sync - Cross-Tab State Synchronization', () => {
  const key = 'partial-tab-sync';
  const channelName = `sdux-vault:tab-sync:${key}`;
  const registryKey = `sdux-vault:tab-registry:${key}`;
  let testService: PartialTabSyncService;
  let remoteChannel: BroadcastChannel;
  const broadcastedMessages: any = [];
  const emitted: any[] = [];
  let stopListening: () => void;

  beforeEach(async () => {
    broadcastedMessages.length = 0;
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

  it('should broadcast state changes to other tabs', async () => {
    remoteChannel.onmessage = (event) => {
      broadcastedMessages.push(event.data);
    };

    const state = testService.getState();
    await flushVaultPipeline();

    testService.vault.replaceState(Object({ value: getBankEmployeeData() }));
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    // Assert — both withDebounce applied in order
    expect(state.hasValue()).toBeTrue();
    verifyAllEmployees(state.value());

    expect(broadcastedMessages).toEqual([]);

    const registryEntries = JSON.parse(localStorage.getItem(registryKey)!);
    expect(registryEntries).toEqual([
      Object({
        tabId: jasmine.any(String),
        timestamp: jasmine.any(Number)
      })
    ]);
  });

  it('should have the correct insight events', async () => {
    await vaultSettled(key);
    expectMonitorSnapshot(emitted, p430Snapshot);
  });
});
