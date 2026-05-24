import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { f0xUtilityService } from '../services/full-utility.service';
import { f22Snapshot } from './snap-shots/f22-value.utilities.snapshot';

describe('f22: Incremental Updates - From a null state Replace', () => {
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
          key: 'full-utility',
          initialState: null,
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
    testService.vault.reset$?.subscribe(() => resetEvents.push('reset'));
    testService.vault.destroyed$?.subscribe(() =>
      destroyedEvents.push('destroyed')
    );
    let state = testService.getState();

    // New Test
    testService.vault.replaceState(
      Object({
        loading: true,
        error: 'the error',
        value: getBankEmployeeData()
      })
    );
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

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.value()).toBeUndefined();

    expect(resetEvents).toEqual(['reset']);
    expect(destroyedEvents).toEqual(['destroyed']);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, f22Snapshot);
  });
});
