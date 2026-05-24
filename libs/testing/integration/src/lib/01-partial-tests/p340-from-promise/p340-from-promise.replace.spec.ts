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
import { p340Snapshot } from './snap-shots/p340-from-promise.replace.snapshot';

/*************************************************
 * Test 1
 *
 * Initial value is []
 *************************************************/

describe('f340: From Promise - Replace', () => {
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
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p340Snapshot);
  });
});
