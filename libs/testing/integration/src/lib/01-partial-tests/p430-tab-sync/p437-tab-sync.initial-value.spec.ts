import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import {
  withTabSyncController,
  withTabSyncStateBehavior
} from '@sdux-vault/core';
import { vaultSettled } from '@sdux-vault/engine';
import { StateEmitTypes, VaultConfig } from '@sdux-vault/shared';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { getSDuXVaultLicense } from '../../structure/data/sdux-vault.license';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { verifyAllEmployees } from '../../structure/utils/verify-all-employees.util';
import { PartialTabSyncService } from './partial-tab-sync.service';
import { p437Snapshot } from './snap-shots/p437-tab-sync.initial-value.snapshot';

describe('p437: Tab Sync - Initial Value', () => {
  const key = 'partial-tab-sync';
  const channelName = `sdux-vault:tab-sync:${key}`;
  let testService: PartialTabSyncService;
  let remoteChannel: BroadcastChannel;
  const broadcastedMessages: any = [];
  const emitted: any[] = [];
  let stopListening: () => void;

  beforeEach(async () => {
    broadcastedMessages.length = 0;

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
            initialState: [getBankEmployeeData(0) as BankEmployeeShape],
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

    let state = testService.getState();
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    // Assert — both withDebounce applied in order
    expect(state.hasValue()).toBeTrue();
    expect(state.value()).toEqual([
      getBankEmployeeData(0) as BankEmployeeShape
    ]);

    testService.vault.replaceState(Object({ value: getBankEmployeeData() }));
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    // Assert — both withDebounce applied in order
    expect(state.hasValue()).toBeTrue();
    verifyAllEmployees(state.value());

    // BroadcastChannel delivers via macrotask; yield to the event loop
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(broadcastedMessages).toEqual([
      Object({
        featureCellKey: 'partial-tab-sync',
        tabId: jasmine.any(String),
        snapshot: Object({
          isLoading: false,
          error: null,
          hasValue: true,
          value: getBankEmployeeData()
        }),
        type: StateEmitTypes.FinalizePipeline
      })
    ]);
  });

  it('should have the correct insight events', async () => {
    await vaultSettled(key);
    expectMonitorSnapshot(emitted, p437Snapshot);
  });
});
