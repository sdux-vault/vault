import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialWithDistinctUntilChangedService } from './partial-operator.with-distinct-until-change.service';
import { p181Snapshot } from './snap-shots/p181-operator.with-distinct-until-change.merge.snapshot';

describe('p181: Operator - Distinct Until Change - Merge Test', () => {
  const key = 'partial-operator-with-distinct-until-changed';

  let testService: PartialWithDistinctUntilChangedService;
  let stopListening: () => void;

  const emitted: any[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        PartialWithDistinctUntilChangedService,
        provideZonelessChangeDetection(),
        provideFeatureCell(PartialWithDistinctUntilChangedService, {
          key,
          initialState: null,
          insights: {} as any
        })
      ]
    });

    stopListening = createTestInsightListener(emitted);
    testService = TestBed.inject(PartialWithDistinctUntilChangedService);
    testService.initialize();
  });

  afterEach(() => {
    stopListening();
  });

  it('should merge the bank employees and bankers with withDistinctUntilChanged', async () => {
    const state = testService.getState();
    await vaultSettled(key);

    testService.p180ReplaceBankersForMerge();
    await vaultSettled(key);

    // Assert — both withDistinctUntilChanged applied in order
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

    testService.p180MergeBankers();
    await vaultSettled(key);

    // Assert — both withDistinctUntilChanged applied in order
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

    testService.p180MergeBankersSecond();
    await vaultSettled(key);

    // Assert — both withDistinctUntilChanged applied in order
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
      }),
      Object({
        id: 'be-006',
        firstName: 'Frank',
        lastName: 'Dalton',
        role: 'Security',
        status: 'Active',
        salary: 43000,
        hireDate: '2019-04-18',
        birthDate: '1974-12-19',
        phoneNumber: '555-673-8832',
        address: Object({
          street: '789 Forest Glen Dr',
          city: 'Naperville',
          state: 'IL',
          zip: '60565'
        })
      })
    ]);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p181Snapshot);
  });
});
