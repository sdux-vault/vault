import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withArrayPushMergeBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { Subject } from 'rxjs';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { FullTestService } from '../services/full-test.service';
import { f301Snapshot } from './snap-shots/f301-from-stream.no-init.merge.snapshot';

/*************************************************
 * Test 1
 *
 * Initial value is undefined
 *************************************************/

describe('f301: From Stream - No Initial Value Merge', () => {
  const key = 'full-test';
  let testService: FullTestService;
  let stopListening: () => void;

  const emitted: any[] = [];

  const employees$ = new Subject<BankEmployeeShape[]>();

  beforeAll(() => {
    jasmine.clock().install();
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        FullTestService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          FullTestService,
          { key, initialState: undefined, insights: {} as any },
          [withArrayPushMergeBehavior]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(FullTestService);
    testService.initializeFromStreamNoFiltersAndReducers();
  });

  afterEach(() => {
    stopListening();
  });

  it('should merge through the entire pipe', async () => {
    const warnSpy = spyOn(console, 'warn');
    testService.vault.fromStream!(employees$);
    let state = testService.getState();
    await flushVaultPipeline();

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    // Push through an employee

    const indexes = [
      0, 1, 2, 6, 0, 1, 2, 3, 4, 5, 7, 0, 1, 2, 3, 4, 5, 8, 0, 1, 2, 3, 4, 5, 8,
      8, 8, 8
    ];

    for (const index of indexes) {
      employees$.next(getBankEmployeeData(index, false) as any);

      await vaultSettled(key);
    }

    expect(state.value()).toEqual(
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
    );
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    expect(warnSpy).toHaveBeenCalledWith(
      'One Time Warning: [vault] SDUX::Behavior::Merge::ArrayPush: ArrayPushMerge received non-array current value. This behavior is intended for array state.',
      jasmine.any(String)
    );
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, f301Snapshot);
  });
});
