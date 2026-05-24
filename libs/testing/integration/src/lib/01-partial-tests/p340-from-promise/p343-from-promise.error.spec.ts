import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { StateInputShape } from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialFromPromiseService } from './partial-from-promise.service';
import { p343Snapshot } from './snap-shots/p343-from-promise.error.snapshot';

/*************************************************
 * Test 1
 *
 * Initial value is []
 *************************************************/

describe('f343: From Promise - Error Test', () => {
  let testService: PartialFromPromiseService;
  let stopListening: () => void;

  const emitted: any[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        PartialFromPromiseService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialFromPromiseService,
          {
            key: 'partial-from-promise',
            initialState: [],
            insights: {} as any
          },
          []
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialFromPromiseService);
    await testService.initialize();
  });

  afterEach(() => {
    stopListening();
  });

  it('should replace after receiving a fromPromise', async () => {
    let state = testService.getState();
    await flushVaultPipeline();

    expect(state.value()).toEqual([]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    // Push through an employee

    testService.vault.fromPromise!({
      value: () => Promise.resolve(getBankEmployeeData(0, true) as any)
    }).then((vaultInput: StateInputShape<BankEmployeeShape[]>): void => {
      testService.vault.replaceState(vaultInput);
    });

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

    testService.vault.fromPromise!({
      value: () => Promise.reject('this is a reject error')
    }).catch((error: any): void => {
      testService.vault.replaceState(
        Object({
          error: error.message
        })
      );
    });

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
    expect(state.error()).toEqual(
      Object({
        message: 'this is a reject error',
        details: 'this is a reject error',
        raw: 'this is a reject error',
        timestamp: jasmine.any(Number),
        featureCellKey: 'external'
      })
    );
    expect(state.isLoading()).toBeFalse();

    testService.vault.fromPromise!({
      value: () => Promise.resolve(getBankEmployeeData(3, true)) as any
    }).then((vaultInput: StateInputShape<BankEmployeeShape[]>): void => {
      testService.vault.replaceState(vaultInput);
    });

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
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p343Snapshot);
  });
});
