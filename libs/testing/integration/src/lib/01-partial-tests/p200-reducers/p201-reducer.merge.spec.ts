import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialReducerService } from './partial-reducer.service';
import { p201Snapshot } from './snap-shots/p201-reducer.merge.snapshot';

describe('p201: Reducer - Merge Test', () => {
  const key = 'partial-reducers';
  let testService: PartialReducerService;
  let stopListening: () => void;

  const emitted: any[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        PartialReducerService,
        provideZonelessChangeDetection(),
        provideFeatureCell(PartialReducerService, {
          key,
          initialState: null,
          insights: {} as any
        })
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialReducerService);
    testService.initialize();
  });

  afterEach(() => {
    stopListening();
  });

  it('should merge the bank employees and bankers with reducers', async () => {
    const state = testService.getState();
    await vaultSettled(key);
    testService.vault.replaceState(Object({ value: getBankEmployeeData() }));
    await vaultSettled(key);

    expect(state.value()?.length).toBe(9);
    expect(state.value()?.slice(0, 2)).toEqual([
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
        }),
        senior: false,
        fullName: 'Alice Wells',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        }),
        senior: true,
        fullName: 'Brian Stone',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: false
      })
    ]);

    expect(state.isLoading()).toBeFalse();
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();

    // testService.vault.mergeState({ error: null, value: getBankEmployeeData() as any });
    testService.vault.mergeState(getBankEmployeeData() as any);
    await vaultSettled(key);

    expect(state.value()?.length).toBe(9);
    expect(state.value()?.slice(0, 2)).toEqual([
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
        }),
        senior: false,
        fullName: 'Alice Wells',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        }),
        senior: true,
        fullName: 'Brian Stone',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: false
      })
    ]);

    expect(state.isLoading()).toBeFalse();
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p201Snapshot);
  });
});
