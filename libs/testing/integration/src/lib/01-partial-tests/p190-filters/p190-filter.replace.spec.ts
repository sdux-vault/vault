import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialFilterService } from './partial-filter.service';
import { p190Snapshot } from './snap-shots/p190-filter.replace.snapshot';

describe('p190: Filter Replace - Test', () => {
  const key = 'partial-filters';
  let testService: PartialFilterService;
  let stopListening: () => void;

  const emitted: any[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        PartialFilterService,
        provideZonelessChangeDetection(),
        provideFeatureCell(PartialFilterService, {
          key,
          initialState: null,
          insights: {} as any
        })
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialFilterService);
    testService.initialize();
  });

  afterEach(() => {
    stopListening();
  });

  describe('value resolve', () => {
    it('should replace the bank employees with filters', async () => {
      const state = testService.getState();
      await vaultSettled(key);

      testService.vault.replaceState(Object({ value: getBankEmployeeData() }));
      await vaultSettled(key);

      expect(state.isLoading()).toBeFalse();
      expect(state.error()).toBeNull();

      // Assert — both filters applied in order
      expect(state.value()).toEqual([
        Object({
          id: 'be-007',
          firstName: 'Nina',
          lastName: 'Castillo',
          role: 'Manager',
          status: 'Active',
          salary: 90000,
          hireDate: '2021-04-10',
          birthDate: '1989-11-20',
          address: Object({
            street: '501 Madison Ave',
            city: 'New York',
            state: 'NY',
            zip: '10022'
          }),
          phoneNumber: '555-444-1212'
        }),

        Object({
          id: 'be-008',
          firstName: 'Oscar',
          lastName: 'Klein',
          role: 'LoanOfficer',
          status: 'Active',
          salary: 110000,
          hireDate: '2020-02-18',
          birthDate: '1992-05-30',
          address: Object({
            street: '12 West 43rd St',
            city: 'New York',
            state: 'NY',
            zip: '10036'
          }),
          phoneNumber: '555-909-8080'
        }),

        Object({
          id: 'be-009',
          firstName: 'Priya',
          lastName: 'Sharma',
          role: 'Owner',
          status: 'Active',
          salary: 160000,
          hireDate: '2023-01-12',
          birthDate: '1985-10-05',
          address: Object({
            street: '77 Park Ave',
            city: 'New York',
            state: 'NY',
            zip: '10016'
          }),
          phoneNumber: '555-333-2323'
        })
      ]);
    });
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p190Snapshot);
  });
});
