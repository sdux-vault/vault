import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { f0xUtilityService } from '../services/full-utility.service';
import { f13Snapshot } from './snap-shots/f13-init.utilities.snapshot';

describe('f13: Incremental Updates - From an initial statue Replace', () => {
  let testService: f0xUtilityService;
  let stopListening: () => void;

  const emitted: any[] = [];
  const resetEvents: any[] = [];
  const destroyedEvents: any[] = [];

  beforeAll(() => {
    jasmine.clock().install();
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

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
          key: 'full-utility',
          initialState: getBankEmployeeData(),
          insights: {} as any
        })
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(f0xUtilityService);
    await testService.initialize();
  });

  afterEach(() => {
    stopListening();
  });

  it('should handle destroy and destroyed$ through the entire pipe', async () => {
    await flushVaultPipeline();
    jasmine.clock().tick(1000);

    await flushVaultPipeline();

    testService.vault.reset$?.subscribe(() => resetEvents.push('reset'));
    testService.vault.destroyed$?.subscribe(() =>
      destroyedEvents.push('destroyed')
    );
    let state = testService.getState();

    await flushVaultPipeline();

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

    // New Test
    testService.vault.replaceState(
      Object({
        loading: true,
        error: 'the error',
        value: getBankEmployeeData()
      })
    );
    await flushVaultPipeline();

    jasmine.clock().tick(1000);
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
    expect(state.value()?.length).toBe(3);
    expect(state.value()?.[0]).toEqual(
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
      })
    );

    expect(resetEvents).toEqual([]);
    expect(destroyedEvents).toEqual([]);

    // New Test
    resetEvents.length = 0;
    destroyedEvents.length = 0;
    testService.vault.destroy();
    await flushVaultPipeline();

    jasmine.clock().tick(1000);
    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.value()).toBeUndefined();

    expect(resetEvents).toEqual(['reset']);
    expect(destroyedEvents).toEqual(['destroyed']);
  });

  it('should have the correct insight events', async () => {
    jasmine.clock().tick(1000);
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, f13Snapshot);
  });
});
