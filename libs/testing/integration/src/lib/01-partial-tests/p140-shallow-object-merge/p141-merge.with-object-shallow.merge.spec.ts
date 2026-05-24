import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { withObjectShallowMergeBehavior } from 'libs/core/src/public-api';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialMergeWithObjectShallowService } from './partial-merge.with-object-shallow.service';
import { p141Snapshot } from './snap-shots/p141-merge.with-object-shallow.merge.snapshot';

describe('p141: Merge - WithObjectShallow - null initial and clear Merge Test', () => {
  const key = 'partial-merge.with-object-shallow';
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
            key,
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

  it('should merge the bank employees with and without clear', async () => {
    const state = testService.getState();
    await vaultSettled(key);

    testService.vault.mergeState(testService.p140GetInitialState());
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

    testService.vault.mergeState({} as BankEmployeeShape);
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

    testService.vault.mergeState({ value: () => Promise.resolve(undefined) }, {
      clearUndefined: false
    } as any);
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

    testService.vault.mergeState({ value: () => Promise.resolve(undefined) }, {
      clearUndefined: true
    } as any);
    await vaultSettled(key);

    expect(state.value()).toBeUndefined();

    expect(state.isLoading()).toBeFalse();

    expect(state.error()).toBeNull();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p141Snapshot);
  });
});
