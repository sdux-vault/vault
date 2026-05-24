import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { partialPromiseService } from './partial-promise.service';
import { p335Snapshot } from './snap-shots/p335-promise.error.snapshot';

/*************************************************
 * Test 1
 *
 * Initial value is []
 *************************************************/

describe('f335: From Promise - Error Test', () => {
  const key = 'partial-promise';
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
          { key, initialState: [], insights: {} as any },
          []
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(partialPromiseService);
    testService.initializeError();
  });

  afterEach(() => {
    stopListening();
  });

  it('should replace after receiving a fromPromise', async () => {
    let state = testService.getState();
    await vaultSettled(key);

    expect(state.value()).toEqual([]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    // Push through an employee

    testService.vault.replaceState(
      testService.formatPromiseInputAsValue(getBankEmployeeData(0, true))
    );
    await vaultSettled(key);

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

    testService.vault.replaceState(
      testService.formatPromiseInputAsValueReject('reject error')
    );
    await vaultSettled(key);

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
    expect(state.error()).toEqual(
      Object({
        message: 'Unexpected error',
        details: Object({
          message: 'reject error',
          details: 'reject error',
          raw: 'reject error',
          timestamp: jasmine.any(Number),
          featureCellKey: 'partial-promise'
        }),
        raw: jasmine.any(Object),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-promise'
      })
    );
    expect(state.isLoading()).toBeFalse();

    testService.vault.replaceState(
      testService.formatPromiseInputAsValue(getBankEmployeeData(2, true))
    );
    await vaultSettled(key);

    expect(state.value()).toEqual([
      Object({
        id: 'be-003',
        firstName: 'Carla',
        lastName: 'Summers',
        role: 'Owner',
        status: 'Active',
        salary: 185000,
        hireDate: '2003-01-20',
        birthDate: '1964-11-30',
        phoneNumber: '555-732-1100',
        address: Object({
          street: '12 Oak Bend Dr',
          city: 'Chicago',
          state: 'IL',
          zip: '60614'
        })
      })
    ]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toEqual(
      Object({
        message: 'Unexpected error',
        details: Object({
          message: 'reject error',
          details: 'reject error',
          raw: 'reject error',
          timestamp: jasmine.any(Number),
          featureCellKey: 'partial-promise'
        }),
        raw: Object({
          message: 'reject error',
          details: 'reject error',
          raw: 'reject error',
          timestamp: jasmine.any(Number),
          featureCellKey: 'partial-promise'
        }),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-promise'
      })
    );
    expect(state.isLoading()).toBeFalse();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p335Snapshot);
  });
});
