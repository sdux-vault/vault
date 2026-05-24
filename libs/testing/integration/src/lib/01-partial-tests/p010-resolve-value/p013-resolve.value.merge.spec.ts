import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialResolveValueService } from './partial-resolve.value.service';
import { p013Snapshot } from './snap-shots/p013-resolve.value.merge.snapshot';

describe('p013: Resolve - Value - With Initial Values Merge', () => {
  let testService: PartialResolveValueService;
  let stopListening: () => void;

  const emitted: any[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        PartialResolveValueService,
        provideZonelessChangeDetection(),
        provideFeatureCell(PartialResolveValueService, {
          key: 'partial-resolve.value',
          initialState: getBankEmployeeData(0, true),
          insights: {} as any
        })
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialResolveValueService);
    await testService.initialize();
  });

  afterEach(() => {
    stopListening();
  });

  it('should merge the bank employees', async () => {
    const state = testService.getState();
    await flushVaultPipeline();

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

    testService.vault.mergeState(
      getBankEmployeeData(3, true) as BankEmployeeShape[]
    );
    await flushVaultPipeline();

    expect(state.value()).toEqual([
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
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p013Snapshot);
  });
});
