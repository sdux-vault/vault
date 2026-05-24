import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withThrottleController } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialWithThrottleService } from './partial-policy.with-throttle.service';
import { p160Snapshot } from './snap-shots/p160-policy.with-throttle.replace.snapshot';

describe('p160: Policy - Throttle Test - Replace', () => {
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
          //         includeLicenseController: true
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

  it('should replace the bank employees with withCooldown', async () => {
    let state: any;
    state = testService.getState();
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    // Assert — both withCooldown applied in order
    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();

    testService.vault.replaceState(
      Object({ value: getBankEmployeeData(0, true) })
    );
    await vaultSettled(key);

    expect(state.value()).toBeUndefined();

    testService.vault.replaceState(
      Object({ value: getBankEmployeeData(1, true) })
    );
    await vaultSettled(key);

    expect(state.value()).toBeUndefined();

    testService.vault.replaceState(
      Object({ value: getBankEmployeeData(2, true) })
    );
    await vaultSettled(key);

    expect(state.value()).toBeUndefined();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    // Assert — both withCooldown applied in order
    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();

    jasmine.clock().tick(1_000);
    testService.vault.replaceState(
      Object({ value: getBankEmployeeData(1, true) })
    );
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    // Assert — both withThrottle applied in order
    expect(state.hasValue()).toBeTrue();
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
  });

  it('should have the correct insight events', async () => {
    jasmine.clock().tick(1_000);
    await vaultSettled(key);
    expectMonitorSnapshot(emitted, p160Snapshot);
  });
});
