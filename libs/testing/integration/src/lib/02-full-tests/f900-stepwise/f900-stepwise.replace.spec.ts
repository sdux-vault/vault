import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withStepwiseController,
  withStepwiseFilterBehavior,
  withStepwiseReducerBehavior,
  withStepwiseResolveBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { verifyAllEmployees } from '../../structure/utils/verify-all-employees.util';
import { verifyFullPipelineEmployees } from '../../structure/utils/verify-full-pipeline-employees.util';
import { FullTestService } from '../services/full-test.service';
import { f900Snapshot } from './snap-shots/f900-stepwise.replace.snapshot';

/*************************************************
 * Test 1
 *
 * Initial value is null
 *
 * filters and reducers comes out to be
 *
 * state.value() = undefined
 * beforeTaps = []
 * Local Storage = null
 *
 *
 * merge is testService.vault.replaceState(Promise.resolve(getBankEmployeeData() as BankEmployeeShape[]));
 * which is getBankEmployees()
 *
 * filters and reducers comes out to be
 *
 * state.value().length = 3
 * beforeTabs.length = 5
 * Local Storage Length = 3 (same as state values)
 *************************************************/

describe('f900: Stepwise Value - Replace Test', () => {
  const key = 'full-test';
  let testService: FullTestService;
  let stopListening: () => void;

  const emitted: any[] = [];

  beforeAll(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date('2024-01-01T00:00:00.000Z'));
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
          { key, initialState: null, insights: {} as any },
          [
            withStepwiseFilterBehavior,
            withStepwiseReducerBehavior,
            withStepwiseResolveBehavior
          ],
          [withStepwiseController]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(FullTestService);
    testService.initializeWithStepwise();
  });

  afterEach(() => {
    stopListening();
  });

  it('should replace and handle stepwise decisions correctly through the entire pipe', async () => {
    let state = testService.getState();
    await vaultSettled(key);

    testService.vault.replaceState({
      value: getBankEmployeeData() as BankEmployeeShape[]
    });
    await flushVaultPipeline();
    // await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.value()).toBeUndefined();

    /**
     * Decision Cycle
     */
    let decisions = testService.partialStepwiseClass.getDecision();

    verifyAllEmployees(testService.partialStepwiseClass.getCandidate());
    expect(testService.partialStepwiseClass.getCurrent()).toBeUndefined();
    expect(testService.partialStepwiseClass.getStage()).toBe('resolve');
    expect(testService.partialStepwiseClass.getType()).toBe('arrow method');

    decisions.continue();
    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.value()).toBeUndefined();
    expect(testService.partialStepwiseClass.getCurrent()).toBeUndefined();
    expect(testService.partialStepwiseClass.getCandidate()).toEqual([
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

    /**
     * Decision Cycle
     */

    decisions = testService.partialStepwiseClass.getDecision();
    decisions.continue();
    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.value()).toBeUndefined();

    expect(testService.partialStepwiseClass.getCurrent()).toBeUndefined();
    expect(testService.partialStepwiseClass.getType()).toBe('arrow method');
    expect(testService.partialStepwiseClass.getStage()).toBe('filter');
    verifyFullPipelineEmployees(
      testService.partialStepwiseClass.getCandidate()
    );

    /**
     * Decision Cycle
     */

    decisions = testService.partialStepwiseClass.getDecision();
    decisions.continue();
    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    verifyFullPipelineEmployees(state.value());

    expect(testService.partialStepwiseClass.getCurrent()).toBeUndefined();
    expect(testService.partialStepwiseClass.getType()).toBe('arrow method');
    expect(testService.partialStepwiseClass.getStage()).toBe('reducer');
    expect(testService.partialStepwiseClass.getDecision()).toBeUndefined();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, f900Snapshot);
  });
});
