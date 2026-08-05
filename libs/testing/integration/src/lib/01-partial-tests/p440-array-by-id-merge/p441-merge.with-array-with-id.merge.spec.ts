import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withArrayByIdMergeBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialMergeWithArrayWithIdService } from './partial-merge.with-array-with-id.service';
import { p441Snapshot } from './snap-shots/p441-merge.with-array-with-id.merge.snapshot';

fdescribe('p441: WithArrayById - Without Initial Values and Clear Merge Test', () => {
  const key = 'partial-merge.with-array-by-id';
  let testService: PartialMergeWithArrayWithIdService;
  let stopListening: () => void;

  const emitted: any[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        PartialMergeWithArrayWithIdService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialMergeWithArrayWithIdService,
          {
            key,
            initialState: null,
            insights: {} as any
          },
          [withArrayByIdMergeBehavior]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialMergeWithArrayWithIdService);
    testService.initialize();
  });

  afterEach(() => {
    stopListening();
  });

  it('should merge the bank employees with and without clear', async () => {
    const state = testService.getState();
    await vaultSettled(key);

    expect(state.value()).toBeUndefined();
    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.hasValue()).toBeFalse();

    testService.vault.replaceState(
      Object({ value: getBankEmployeeData(1, true) })
    );
    await flushVaultPipeline();

    testService.vault.mergeState(
      Object({ value: getBankEmployeeData(1, true) })
    );
    await vaultSettled(key);

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
    expect(state.hasValue()).toBeTrue();

    testService.vault.mergeState([]);
    await vaultSettled(key);

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
    expect(state.hasValue()).toBeTrue();

    testService.vault.mergeState({ value: () => Promise.resolve(undefined) }, {
      clearUndefined: false
    } as any);
    await flushVaultPipeline();

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
    expect(state.hasValue()).toBeTrue();

    testService.vault.mergeState({ value: () => Promise.resolve(undefined) }, {
      clearUndefined: true
    } as any);
    await flushVaultPipeline();

    expect(state.value()).toBeUndefined();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.hasValue()).toBeFalse();

    testService.vault.mergeState(
      { value: () => Promise.resolve(getBankEmployeeData(1, false) as any) },
      {
        clearUndefined: true,
        isDelete: true
      } as any
    );
    await flushVaultPipeline();

    expect(state.value()).toBeUndefined();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.hasValue()).toBeFalse();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p441Snapshot);
  });
});
