import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withArrayPushMergeBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { partialMergeWithArrayPushService } from './partial-merge.with-array-push.service';
import { p320Snapshot } from './snap-shots/p320-merge.with-array-push.merge.snapshot';

describe('p320: WithArrayPush - Without Initial Values Merge Test', () => {
  let testService: partialMergeWithArrayPushService;
  let stopListening: () => void;

  const emitted: any[] = [];

  beforeEach(async () => {
    spyOn(console, 'warn');
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        partialMergeWithArrayPushService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          partialMergeWithArrayPushService,
          {
            key: 'partial-merge.with-array-push',
            initialState: null,
            insights: {} as any
          },
          [withArrayPushMergeBehavior]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);
    testService = TestBed.inject(partialMergeWithArrayPushService);
  });

  afterEach(() => {
    stopListening();
  });

  it('should merge the bank employees', async () => {
    await flushVaultPipeline();
    const state = testService.getState();

    testService.vault.mergeState(
      getBankEmployeeData(1, false) as BankEmployeeShape
    );
    await flushVaultPipeline();

    expect(state.value()).toEqual(
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
    );

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    testService.vault.mergeState(
      getBankEmployeeData(1, false) as BankEmployeeShape
    );
    await flushVaultPipeline();

    expect(state.value()).toEqual(
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
    );

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p320Snapshot);
  });
});
