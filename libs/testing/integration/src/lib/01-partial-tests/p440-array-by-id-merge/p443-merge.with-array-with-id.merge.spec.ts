import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withArrayByIdMergeBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialMergeWithArrayWithIdService } from './partial-merge.with-array-with-id.service';
import { p443Snapshot } from './snap-shots/p443-merge.with-array-with-id.merge.snapshot';

describe('p443: WithArrayById - Initial and Mixed Values Merge Test', () => {
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
            initialState: 'a string',
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

  it('should merge the bank employees', async () => {
    const state = testService.getState();
    await flushVaultPipeline();

    expect(state.value()).toEqual('a string' as any);

    testService.vault.mergeState(
      getBankEmployeeData(0, true) as BankEmployeeShape[]
    );
    await flushVaultPipeline();

    expect(state.value()).toEqual([
      Object({
        id: 'be-001',
        firstName: 'Alice',
        lastName: 'Wells',
        role: 'Teller',
        status: 'Active',
        salary: 48000,
        hireDate: '2018-03-12',
        birthDate: '1992-07-22',
        phoneNumber: '555-201-8899',
        address: Object({
          street: '101 Maple St',
          city: 'Springfield',
          state: 'IL',
          zip: '62704'
        })
      })
    ]);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.hasValue()).toBeTrue();

    testService.vault.mergeState([1, 2] as any);
    await flushVaultPipeline();

    expect(state.value()).toEqual([1, 2] as any);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.hasValue()).toBeTrue();

    testService.vault.mergeState([1, 2] as any, Object({ isDelete: true }));
    await flushVaultPipeline();

    expect(state.value()).toEqual([1, 2] as any);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.hasValue()).toBeTrue();

    testService.vault.mergeState([
      getBankEmployeeData(0, false),
      getBankEmployeeData(1, false),
      getBankEmployeeData(0, false),
      getBankEmployeeData(1, false)
    ] as any);
    await flushVaultPipeline();

    expect(state.value()).toEqual([
      1,
      2,
      Object({
        id: 'be-001',
        firstName: 'Alice',
        lastName: 'Wells',
        role: 'Teller',
        status: 'Active',
        salary: 48000,
        hireDate: '2018-03-12',
        birthDate: '1992-07-22',
        phoneNumber: '555-201-8899',
        address: Object({
          street: '101 Maple St',
          city: 'Springfield',
          state: 'IL',
          zip: '62704'
        })
      }),
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
    ] as any);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.hasValue()).toBeTrue();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p443Snapshot);
  });
});
