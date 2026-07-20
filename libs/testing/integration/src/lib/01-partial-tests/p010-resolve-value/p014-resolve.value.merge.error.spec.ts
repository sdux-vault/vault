import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { VaultErrorService } from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { tap } from 'rxjs';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialResolveValueService } from './partial-resolve.value.service';
import { p014Snapshot } from './snap-shots/p014-resolve.value.merge.error.snapshot';

describe('p014: Resolve - Merge - With Initial State Error Test', () => {
  let testService: PartialResolveValueService;
  const errorService = VaultErrorService();
  let stopListening: () => void;

  const emitted: any[] = [];
  const globalErrors: any[] = [];
  let errorSubscription: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        PartialResolveValueService,
        provideZonelessChangeDetection(),
        provideFeatureCell(PartialResolveValueService, {
          key: 'partial-resolve.value',
          initialState: getBankEmployeeData(0, true),
          insights: {} as any
        })
      ]
    });

    errorSubscription = errorService.error$
      .pipe(tap((error) => globalErrors.push(error)))
      .subscribe();

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialResolveValueService);
    await testService.initialize();
  });

  afterEach(() => {
    stopListening();
    errorSubscription.unsubscribe();
    testService.clearGlobalErrors();
  });

  it('should merge the bank employees with an error and isLoading', async () => {
    const state = testService.getState();

    testService.vault.mergeState(
      Object({
        loading: true,
        value: getBankEmployeeData(1, true) as BankEmployeeShape[],
        error: new Error('this is an error')
      })
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

    expect(state.isLoading()).toBeTrue();
    expect(state.error()).toEqual(
      Object({
        message: 'this is an error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'external'
      })
    );

    expect(globalErrors).toEqual([null]);

    testService.vault.mergeState(
      Object({
        loading: false,
        value: [],
        error: null
      })
    );
    await flushVaultPipeline();

    expect(state.value()).toEqual([]);
    expect(state.hasValue()).toBeTrue();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(globalErrors).toEqual([null]);

    testService.vault.mergeState(
      Object({
        loading: true,
        value: getBankEmployeeData(1, true) as BankEmployeeShape[],
        error: null
      })
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

    expect(state.isLoading()).toBeTrue();
    expect(state.error()).toBeNull();

    expect(globalErrors).toEqual([null]);

    testService.vault.mergeState(
      Object({
        loading: false,
        value: undefined,
        error: 'new error'
      }),
      { clearUndefined: false } as any
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

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'new error',
        details: jasmine.any(String),
        raw: 'new error',
        timestamp: jasmine.any(Number),
        featureCellKey: 'external'
      })
    );
    expect(globalErrors).toEqual([null]);

    testService.vault.mergeState(
      Object({
        loading: true,
        value: () => Promise.resolve(undefined)
      }),
      { clearUndefined: true } as any
    );
    await flushVaultPipeline();

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'new error',
        details: jasmine.any(String),
        raw: 'new error',
        timestamp: jasmine.any(Number),
        featureCellKey: 'external'
      })
    );
    expect(globalErrors).toEqual([null]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p014Snapshot);
  });
});
