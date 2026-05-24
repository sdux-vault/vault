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
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { getSDuXVaultLicense } from '../../structure/data/sdux-vault.license';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { verifyAllEmployees } from '../../structure/utils/verify-all-employees.util';
import { PartialTabSyncService } from './partial-tab-sync.service';
import { p434Snapshot } from './snap-shots/p434-tab-sync.local-then-remote.snapshot';

describe('p434: Tab Sync - Local State Then Remote Update', () => {
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

  it('should replace state locally and then receive a remote update', async () => {
    const state = testService.getState();
    await vaultSettled(key);

    testService.vault.replaceState(Object({ value: getBankEmployeeData() }));
    await vaultSettled(key);

    verifyAllEmployees(state.value());

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

    const updatedEmployee: BankEmployeeShape[] = [
      Object({
        id: 'be-002',
        firstName: 'Brian',
        lastName: 'Stone',
        role: 'Manager',
        status: 'Vacation',
        salary: 90000,
        hireDate: '2012-09-05',
        birthDate: '1981-04-17',
        phoneNumber: '555-490-3322',
        address: Object({
          street: '54 Ridgeview Ave',
          city: 'Springfield',
          state: 'IL',
          zip: '62711'
        })
      })
    ];

    remoteChannel.postMessage({
      featureCellKey: key,
      tabId: 'remote-tab-id',
      snapshot: {
        isLoading: false,
        value: updatedEmployee,
        error: null,
        hasValue: true
      },
      type: StateEmitTypes.FinalizePipeline
    });

    await stateUpdated;

    expect(state.value()).toEqual(updatedEmployee);
  });

  it('should have the correct insight events', async () => {
    await vaultSettled(key);
    expectMonitorSnapshot(emitted, p434Snapshot);
  });
});
