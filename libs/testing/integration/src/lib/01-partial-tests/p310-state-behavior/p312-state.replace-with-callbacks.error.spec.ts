import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { tap } from 'rxjs';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { verifyAllEmployees } from '../../structure/utils/verify-all-employees.util';
import { PartialStateWithEmitCallbacksService } from './partial-state-with-emit-callbacks.service';
import { p312Snapshot } from './snap-shots/p312-state.replace-with-callbacks.error.snapshot';

describe('p312: State Service Merge with Emit State Callbacks - Error Test', () => {
  let testService: PartialStateWithEmitCallbacksService<BankEmployeeShape[]>;
  let stopListening: () => void;

  const emitted: any[] = [];
  const globalStates: any[] = [];
  let stateSubscription: any;

  beforeEach(async () => {
    globalStates.length = 0;

    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        provideZonelessChangeDetection(),
        provideFeatureCell(PartialStateWithEmitCallbacksService, {
          key: 'partial-state-with-emit-callbacks',
          initialState: null,
          insights: {
            wantsStates: true,
            wantsPayload: true
          } as any
        })
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialStateWithEmitCallbacksService);
    testService.initializeErrorEmitStateCallbacksTest();

    stateSubscription = testService.vault.state$
      .pipe(tap((state) => globalStates.push(state)))
      .subscribe();
  });

  afterEach(() => {
    stopListening();
    stateSubscription.unsubscribe();
  });

  it('should merge the bank employees and emit states', async () => {
    const state = testService.getState();
    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(testService.getStates()).toEqual([]);

    expect(globalStates).toEqual([]);

    testService.clearStates();

    testService.vault.mergeState({
      error: null,
      value: getBankEmployeeData() as any[]
    });

    await flushVaultPipeline();

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    expect(testService.getStates()).toEqual([
      'arrow-true',
      '{"id":"be-001","firstName":"Alice","lastName":"Wells","role":"Teller","status":"Active","salary":48000,"hireDate":"2018-03-12","birthDate":"1992-07-22","phoneNumber":"555-201-8899","address":{"street":"101 Maple St","city":"Springfield","state":"IL","zip":"62704"}}',
      'bound-true',
      '{"id":"be-001","firstName":"Alice","lastName":"Wells","role":"Teller","status":"Active","salary":48000,"hireDate":"2018-03-12","birthDate":"1992-07-22","phoneNumber":"555-201-8899","address":{"street":"101 Maple St","city":"Springfield","state":"IL","zip":"62704"}}'
    ]);

    expect(globalStates).toEqual([
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: undefined,
          error: null,
          hasValue: false
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: getBankEmployeeData(),
          error: null,
          hasValue: true
        })
      })
    ]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p312Snapshot);
  });
});
