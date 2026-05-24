import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { partialPromiseService } from './partial-promise.service';
import { p331Snapshot } from './snap-shots/p331-promise.merge.snapshot';

/*************************************************
 * Test 1
 *
 * Initial value is []
 *************************************************/

describe('f331: Promise - Merge Test', () => {
  let testService: partialPromiseService;
  let stopListening: () => void;

  const emitted: any[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        partialPromiseService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          partialPromiseService,
          { key: 'partial-promise', initialState: [], insights: {} as any },
          []
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(partialPromiseService);
    await testService.initialize();
  });

  afterEach(() => {
    stopListening();
  });

  it('should merge after receiving a fromPromise', async () => {
    let state = testService.getState();
    await flushVaultPipeline();

    expect(state.value()).toEqual([]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    // Push through an employee

    testService.vault.mergeState(
      testService.formatPromiseInputAsValue(getBankEmployeeData(0, true))
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
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    testService.vault.mergeState(
      testService.formatPromiseInputAsDeferred(getBankEmployeeData(1, true))
    );
    await flushVaultPipeline();

    expect(state.value()).toEqual([
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
        })
      })
    ]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p331Snapshot);
  });
});
