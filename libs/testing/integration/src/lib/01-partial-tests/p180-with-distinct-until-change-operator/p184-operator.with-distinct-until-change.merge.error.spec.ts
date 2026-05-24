import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialWithDistinctUntilChangedService } from './partial-operator.with-distinct-until-change.service';
import { p184Snapshot } from './snap-shots/p184-operator.with-distinct-until-change.merge.error.snapshot';

describe('p181: Operator - Distinct Until Change Test - Merge - Error Test', () => {
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
          key: 'partial-operator-with-distinct-until-changed',
          initialState: null,
          insights: {} as any
        })
      ]
    });

    stopListening = createTestInsightListener(emitted);
    testService = TestBed.inject(PartialWithDistinctUntilChangedService);
    testService.initializeWithError();
  });

  afterEach(() => {
    stopListening();
  });

  it('should merge the bank employees and bankers with withDistinctUntilChanged', async () => {
    const state = testService.getState();
    await flushVaultPipeline();

    testService.p180ReplaceBankersForMerge();
    await flushVaultPipeline();

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
    await flushVaultPipeline();

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

    expect(state.hasValue()).toBeTrue();
    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'this is a distinct until change error',
        featureCellKey: 'partial-operator-with-distinct-until-changed',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number)
      })
    );

    testService.p180MergeBankersSecond();
    await flushVaultPipeline();

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

    expect(state.hasValue()).toBeTrue();
    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'this is a distinct until change error',
        featureCellKey: 'partial-operator-with-distinct-until-changed',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number)
      })
    );
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p184Snapshot);
  });
});
