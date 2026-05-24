import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withGlobalErrorPauseBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { VaultErrorService } from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { tap } from 'rxjs';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialWithGlobalErrorPauseService } from './partial-interceptor.with-global-error-pause.service';
import { p290Snapshot } from './snap-shots/p290-interceptor.with-global-error-pause.snapshot';

describe('p280: Interceptor - Global Error Pause - Replace Test', () => {
  const key = 'partial-interceptor.global-error-pause';
  let testService: PartialWithGlobalErrorPauseService;
  let errorService: any;
  let stopListening: () => void;

  const emitted: any[] = [];
  const globalErrors: any[] = [];
  let errorSubscription: any;

  beforeEach(async () => {
    globalErrors.length = 0;
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        PartialWithGlobalErrorPauseService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialWithGlobalErrorPauseService,
          {
            key,
            initialState: null,
            insights: { wantsErrors: true, wantsPayload: true } as any
          },
          [withGlobalErrorPauseBehavior]
        )
      ]
    });

    errorService = VaultErrorService();
    errorSubscription = errorService.error$
      .pipe(tap((error) => globalErrors.push(error)))
      .subscribe();

    stopListening = createTestInsightListener(emitted);
    testService = TestBed.inject(PartialWithGlobalErrorPauseService);
    testService.initialize();
  });

  afterEach(() => {
    stopListening();
    testService.unsetError();
    errorSubscription.unsubscribe();
    testService.clearGlobalErrors();
  });

  it('should start and pause the pipeline with withGlobalErrorPause', async () => {
    const state = testService.getState();
    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(globalErrors).toEqual([null]);

    // Verify the pipeline works
    testService.vault.replaceState(
      getBankEmployeeData(1, true) as BankEmployeeShape[]
    );
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
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
    expect(globalErrors).toEqual([null]);

    // Shutdown the pipeline
    testService.setError();
    testService.vault.mergeState(
      getBankEmployeeData(2, true) as BankEmployeeShape[]
    );
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'this is an error state',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-interceptor.global-error-pause'
      })
    );

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
    expect(globalErrors).toEqual([
      null,
      Object({
        message: 'this is an error state',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-interceptor.global-error-pause'
      })
    ]);

    // Verify the pipeline is paused
    testService.unsetError();
    testService.vault.replaceState({
      error: null,
      value: getBankEmployeeData(3, true) as BankEmployeeShape[]
    });
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

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
    expect(globalErrors).toEqual([
      null,
      Object({
        message: 'this is an error state',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-interceptor.global-error-pause'
      })
    ]);

    // Verify the pipeline is still paused
    testService.unsetError();

    testService.vault.replaceState(
      getBankEmployeeData(4, true) as BankEmployeeShape[]
    );
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

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
    expect(globalErrors).toEqual([
      null,
      Object({
        message: 'this is an error state',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-interceptor.global-error-pause'
      })
    ]);

    // Verify the pipeline is now open
    testService.unsetError();
    errorService.clear();
    testService.vault.replaceState(
      getBankEmployeeData(5, true) as BankEmployeeShape[]
    );
    await vaultSettled(key);

    expect(globalErrors).toEqual([
      null,
      Object({
        message: 'this is an error state',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-interceptor.global-error-pause'
      }),
      null
    ]);

    expect(state.value()).toEqual([
      Object({
        id: 'be-006',
        firstName: 'Frank',
        lastName: 'Dalton',
        role: 'Security',
        status: 'Active',
        salary: 43000,
        hireDate: '2019-04-18',
        birthDate: '1974-12-19',
        phoneNumber: '555-673-8832',
        address: Object({
          street: '789 Forest Glen Dr',
          city: 'Naperville',
          state: 'IL',
          zip: '60565'
        })
      })
    ]);
    expect(state.hasValue()).toBeTrue();
    expect(globalErrors).toEqual([
      null,
      Object({
        message: 'this is an error state',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-interceptor.global-error-pause'
      }),
      null
    ]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p290Snapshot);
  });
});
