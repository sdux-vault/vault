import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withObjectDeepMergeBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialMergeWithObjectDeepService } from './partial-merge.with-object-deep.service';
import { p150Snapshot } from './snap-shots/p150-merge.with-object-deep.merge.snapshot';

describe('p150: Merge - WithObjectDeep - without initial values Merge Test', () => {
  const key = 'partial-merge.with-object-deep';
  let testService: PartialMergeWithObjectDeepService;
  let stopListening: () => void;

  const emitted: any[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        PartialMergeWithObjectDeepService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialMergeWithObjectDeepService,
          {
            key,
            initialState: null,
            insights: {} as any
          },
          [withObjectDeepMergeBehavior]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialMergeWithObjectDeepService);
    testService.initialize();
  });

  afterEach(() => {
    stopListening();
  });

  it('should merge the bank employees', async () => {
    const state = testService.getState();
    await vaultSettled(key);

    testService.vault.mergeState(testService.p150GetInitialState());
    await vaultSettled(key);

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

    testService.vault.mergeState(testService.p150GetPartialState());
    await vaultSettled(key);

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
          city: 'Riverside',
          state: 'CA',
          zip: '92501'
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
    expectMonitorSnapshot(emitted, p150Snapshot);
  });
});
