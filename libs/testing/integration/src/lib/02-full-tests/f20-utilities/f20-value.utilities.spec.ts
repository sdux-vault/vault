import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '../../../../../utils/src/public-api';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { verifyAllEmployees } from '../../structure/utils/verify-all-employees.util';
import { verifyFullPipelineEmployees } from '../../structure/utils/verify-full-pipeline-employees.util';
import { f0xUtilityService } from '../services/full-utility.service';
import { f20Snapshot } from './snap-shots/f20-value.utilities.snapshot';

describe('f20: State Side Effects - Value', () => {
  const key = 'full-utility';
  let testService: f0xUtilityService;
  let stopListening: () => void;

  const emitted: any[] = [];
  const resetEvents: any[] = [];
  const destroyedEvents: any[] = [];

  beforeEach(async () => {
    resetEvents.length = 0;
    destroyedEvents.length = 0;
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        f0xUtilityService,
        provideZonelessChangeDetection(),
        provideFeatureCell(f0xUtilityService, {
          key,
          initialState: null,
          insights: {} as any
        })
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(f0xUtilityService);
    testService.initialize();
  });

  afterEach(() => {
    stopListening();
  });

  it('should replace incremental state inputs throught the entire pipe', async () => {
    const bankEmployeeData = getBankEmployeeData();
    let state = testService.getState();
    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    expect(state.value()).toBeUndefined();

    // New Test
    testService.vault.replaceState(Object({ loading: true }));
    await flushVaultPipeline();

    expect(state.isLoading()).toBeTrue();
    expect(state.error()).toBeNull();

    expect(state.value()).toBeUndefined();

    // New Test
    testService.vault.replaceState(Object({ error: 'the error' }));
    await flushVaultPipeline();

    expect(state.isLoading()).toBeTrue();
    expect(state.error()).toEqual(
      Object({
        message: 'the error',
        details: 'the error',
        raw: 'the error',
        timestamp: jasmine.any(Number),
        featureCellKey: 'external'
      })
    );

    expect(state.value()).toBeUndefined();

    // New Test
    testService.vault.replaceState(Object({ value: bankEmployeeData }));
    await vaultSettled(key);

    expect(state.isLoading()).toBeTrue();
    expect(state.error()).toEqual(
      Object({
        message: 'the error',
        details: 'the error',
        raw: 'the error',
        timestamp: jasmine.any(Number),
        featureCellKey: 'external'
      })
    );

    verifyAllEmployees(bankEmployeeData);
    verifyFullPipelineEmployees(state.value());

    // New Test
    testService.vault.replaceState(
      Object({ error: 'the error', loading: false })
    );
    await flushVaultPipeline();

    verifyAllEmployees(bankEmployeeData);
    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'the error',
        details: 'the error',
        raw: 'the error',
        timestamp: jasmine.any(Number),
        featureCellKey: 'external'
      })
    );
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
        phoneNumber: '555-444-1212',
        senior: true,
        fullName: 'Nina Castillo',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-909-8080',
        senior: false,
        fullName: 'Oscar Klein',
        isLoanOfficer: true,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
      })
    ]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, f20Snapshot);
  });
});
