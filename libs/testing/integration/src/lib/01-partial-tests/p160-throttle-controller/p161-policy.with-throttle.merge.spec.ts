import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withThrottleController } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialWithThrottleService } from './partial-policy.with-throttle.service';
import { p161Snapshot } from './snap-shots/p161-policy.with-throttle.merge.snapshot';

describe('p161: Policy - Throttle Test - Merge', () => {
  const key = 'partial-policy.throttle';
  let testService: any;
  let stopListening: () => void;

  const emitted: any[] = [];

  beforeAll(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date('2024-01-01T00:00:00.000Z'));
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        PartialWithThrottleService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialWithThrottleService,
          {
            key,
            initialState: null,
            insights: {} as any
          },
          [],
          [withThrottleController]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialWithThrottleService);
    testService.initialize();
  });

  afterEach(() => {
    stopListening();
  });

  it('should merge the bank employees and bankers with withThrottle', async () => {
    const state = testService.getState();
    await vaultSettled(key);

    expect(state.value()).toBeUndefined();

    jasmine.clock().tick(1_000);
    testService.vault.mergeState(
      Object({ value: getBankEmployeeData(1, true) })
    );
    await vaultSettled(key);

    // Assert — both withThrottle applied in order
    expect(state.value()).toEqual([
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
    ]);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    testService.vault.mergeState(
      Object({ value: getBankEmployeeData(3, true) })
    );
    await vaultSettled(key);

    testService.vault.mergeState(
      Object({ value: getBankEmployeeData(3, true) })
    );
    await vaultSettled(key);

    testService.vault.mergeState(
      Object({ value: getBankEmployeeData(3, true) })
    );
    await vaultSettled(key);

    // Assert — both withThrottle applied in order
    expect(state.value()).toEqual([
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
    ]);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    jasmine.clock().tick(1_000);
    testService.vault.mergeState(
      getBankEmployeeData(4, true) as BankEmployeeShape[]
    );
    await vaultSettled(key);

    // Assert — both withThrottle applied in order
    expect(state.value()).toEqual([
      Object({
        id: 'be-005',
        firstName: 'Elena',
        lastName: 'Reed',
        role: 'Teller',
        status: 'Active',
        salary: 52000,
        hireDate: '2021-11-01',
        birthDate: '1998-09-05',
        phoneNumber: '555-610-2099',
        address: Object({
          street: '233 Pinecrest Ln',
          city: 'Naperville',
          state: 'IL',
          zip: '60540'
        })
      })
    ]);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    jasmine.clock().tick(3_000);

    // Assert — both withThrottle applied in order
    expect(state.value()).toEqual([
      Object({
        id: 'be-005',
        firstName: 'Elena',
        lastName: 'Reed',
        role: 'Teller',
        status: 'Active',
        salary: 52000,
        hireDate: '2021-11-01',
        birthDate: '1998-09-05',
        phoneNumber: '555-610-2099',
        address: Object({
          street: '233 Pinecrest Ln',
          city: 'Naperville',
          state: 'IL',
          zip: '60540'
        })
      })
    ]);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
  });

  it('should have the correct insight events', async () => {
    jasmine.clock().tick(1_000);
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p161Snapshot);
  });
});
