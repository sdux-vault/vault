import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withArrayByIdMergeBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialMergeWithArrayWithIdService } from './partial-merge.with-array-with-id.service';
import { p440Snapshot } from './snap-shots/p440-merge.with-array-with-id.merge.snapshot';

describe('p440: WithArrayById - Without Initial Values Merge Test', () => {
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

  it('should merge the bank employees', async () => {
    await flushVaultPipeline();
    const state = testService.getState();

    expect(state.value()).toBeUndefined();
    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.hasValue()).toBeFalse();

    testService.vault.replaceState(
      Object({ value: getBankEmployeeData(1, true) })
    );
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

    testService.vault.mergeState(
      Object({
        value: [getBankEmployeeData(1, false), getBankEmployeeData(2, false)]
      })
    );
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
      }),
      Object({
        id: 'be-003',
        firstName: 'Carla',
        lastName: 'Summers',
        role: 'Owner',
        status: 'Active',
        salary: 185000,
        hireDate: '2003-01-20',
        birthDate: '1964-11-30',
        phoneNumber: '555-732-1100',
        address: Object({
          street: '12 Oak Bend Dr',
          city: 'Chicago',
          state: 'IL',
          zip: '60614'
        })
      })
    ]);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.hasValue()).toBeTrue();

    testService.vault.mergeState(
      Object({
        value: [
          Object({ id: 'be-002', firstName: 'Bryan' }),
          getBankEmployeeData(3, false)
        ]
      })
    );
    await flushVaultPipeline();

    expect(state.value()).toEqual([
      Object({
        id: 'be-002',
        firstName: 'Bryan'
      }),
      Object({
        id: 'be-003',
        firstName: 'Carla',
        lastName: 'Summers',
        role: 'Owner',
        status: 'Active',
        salary: 185000,
        hireDate: '2003-01-20',
        birthDate: '1964-11-30',
        phoneNumber: '555-732-1100',
        address: Object({
          street: '12 Oak Bend Dr',
          city: 'Chicago',
          state: 'IL',
          zip: '60614'
        })
      }),
      Object({
        id: 'be-004',
        firstName: 'Derek',
        lastName: 'Hughes',
        role: 'LoanOfficer',
        status: 'Suspended',
        salary: 78000,
        hireDate: '2016-06-10',
        birthDate: '1989-02-14',
        phoneNumber: '555-810-4431',
        address: Object({
          street: '88 Willow Hill Rd',
          city: 'Chicago',
          state: 'IL',
          zip: '60657'
        })
      })
    ]);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.hasValue()).toBeTrue();

    testService.vault.mergeState(
      Object({
        value: [
          Object({ id: 'be-002', firstName: 'Bryan' }),
          getBankEmployeeData(3, false)
        ]
      }),
      Object({ isDelete: true })
    );
    await flushVaultPipeline();

    expect(state.value()).toEqual([
      Object({
        id: 'be-003',
        firstName: 'Carla',
        lastName: 'Summers',
        role: 'Owner',
        status: 'Active',
        salary: 185000,
        hireDate: '2003-01-20',
        birthDate: '1964-11-30',
        phoneNumber: '555-732-1100',
        address: Object({
          street: '12 Oak Bend Dr',
          city: 'Chicago',
          state: 'IL',
          zip: '60614'
        })
      })
    ]);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.hasValue()).toBeTrue();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p440Snapshot);
  });
});
