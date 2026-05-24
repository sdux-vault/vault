import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { withObjectShallowMergeBehavior } from 'libs/core/src/public-api';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialMergeWithObjectShallowService } from './partial-merge.with-object-shallow.service';
import { p140Snapshot } from './snap-shots/p140-merge.with-object-shallow.merge.snapshot';

describe('p140: Merge - WithObjectShallow - without initial values Merge Test', () => {
  let testService: PartialMergeWithObjectShallowService;
  let stopListening: () => void;

  const emitted: any[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        PartialMergeWithObjectShallowService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialMergeWithObjectShallowService,
          {
            key: 'partial-merge.with-object-shallow',
            initialState: null,
            insights: {} as any
          },
          [withObjectShallowMergeBehavior]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialMergeWithObjectShallowService);
    testService.initialize();
  });

  afterEach(() => {
    stopListening();
  });

  it('should merge the bank employees', async () => {
    await flushVaultPipeline();
    const state = testService.getState();

    testService.vault.mergeState(testService.p140GetInitialState());
    await flushVaultPipeline();

    expect(state.value()).toEqual(
      Object({
        id: 'E-001',
        firstName: 'Sarah',
        lastName: 'Kensington',
        role: 'Teller',
        status: 'Active',
        salary: 52000,
        hireDate: '2020-04-15',
        birthDate: '1991-02-10',
        address: Object({
          street: '123 Maple St',
          city: 'Riverside',
          state: 'CA',
          zip: '92501'
        }),
        phoneNumber: '555-123-9876',
        fullName: 'Sarah Kensington',
        senior: false,
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
      })
    );

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    testService.vault.mergeState(testService.p140GetPartialState());
    await flushVaultPipeline();

    expect(state.value()).toEqual(
      Object({
        id: 'E-001',
        firstName: 'Sarah',
        lastName: 'Kensington',

        role: 'Teller',
        status: 'Vacation', // updated
        salary: 54000, // updated

        hireDate: '2020-04-15',
        birthDate: '1991-02-10',

        // address replaced, not merged
        address: {
          street: '900 Oceanview Blvd',
          city: 'San Diego',
          state: 'CA',
          zip: '92101'
        },

        phoneNumber: '555-777-8888', // updated

        // unchanged derived fields (reducers may recompute afterward)
        fullName: 'Sarah Kensington',
        senior: false,
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
      })
    );

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p140Snapshot);
  });
});
