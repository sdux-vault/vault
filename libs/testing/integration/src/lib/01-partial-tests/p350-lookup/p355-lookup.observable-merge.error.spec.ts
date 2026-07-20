import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withLookupBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialLookupService } from './partial-lookup.service';
import { p355Snapshot } from './snap-shots/p355-lookup.observable-merge.error.snapshot';

/*************************************************
 * Test 1
 *
 * Initial value is []
 *************************************************/

describe('p355: Observable - Merge Error Test', () => {
  const key = 'partial-lookup';
  let testService: PartialLookupService;
  let stopListening: () => void;

  const emitted: any[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        PartialLookupService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialLookupService,
          { key, initialState: [], insights: {} as any },
          [withLookupBehavior]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialLookupService);
    testService.initializeByObservable();
  });

  afterEach(() => {
    stopListening();
  });

  it('should handle lookup calls from a value', async () => {
    let state = testService.getState();
    await vaultSettled(key);

    expect(state.value()).toEqual([]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    let employee: any;

    testService.vault.lookup$!('be-002').subscribe((entity) => {
      employee = entity;
    });
    await vaultSettled(key);

    // NOW the pipeline has run
    expect(employee).toEqual(
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

    expect(testService.fetches).toEqual(['be-002', 'found - be-002']);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    testService.isError = true;
    employee = undefined;
    let error: any;

    testService.vault.lookup$!('be-004').subscribe({
      next: (entity) => {
        employee = entity;
      },
      error: (_error) => {
        error = _error;
      }
    });
    await vaultSettled(key);

    // NOW the pipeline has run
    expect(employee).toBeUndefined();

    expect(error).toBeUndefined();

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

    expect(testService.fetches).toEqual([
      'be-002',
      'found - be-002',
      'be-004',
      'error - be-004'
    ]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toEqual(
      Object({
        message: 'This is the reject error',
        details: jasmine.any(String),
        raw: jasmine.any(Object),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-lookup'
      })
    );
    expect(state.isLoading()).toBeFalse();

    /**
     * Verify the error is sticky
     */
    employee = undefined;
    error = undefined;
    testService.vault.lookup$!('be-004').subscribe({
      next: (entity) => {
        employee = entity;
      },
      error: (_error) => {
        error = _error;
      }
    });

    await flushVaultPipeline();

    // NOW the pipeline has run
    expect(employee).toBeUndefined();

    expect(error).toBeUndefined();

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

    expect(testService.fetches).toEqual([
      'be-002',
      'found - be-002',
      'be-004',
      'error - be-004',
      'be-004',
      'error - be-004'
    ]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toEqual(
      Object({
        message: 'This is the reject error',
        details: jasmine.any(String),
        raw: jasmine.any(Object),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-lookup'
      })
    );
    expect(state.isLoading()).toBeFalse();

    testService.vault.replaceState({ error: null });
    await flushVaultPipeline();

    testService.isError = false;
    testService.vault.lookup$!('be-002').subscribe({
      next: (entity) => {
        employee = entity;
      },
      error: (_error) => {
        error = _error;
      }
    });
    await flushVaultPipeline();

    // NOW the pipeline has run
    expect(employee).toEqual(
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

    expect(testService.fetches).toEqual([
      'be-002',
      'found - be-002',
      'be-004',
      'error - be-004',
      'be-004',
      'error - be-004'
    ]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    testService.vault.lookup$!('be-004').subscribe({
      next: (entity) => {
        employee = entity;
      },
      error: (_error) => {
        error = _error;
      }
    });
    await vaultSettled(key);

    // NOW the pipeline has run
    expect(employee).toEqual(
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
    );

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

    expect(testService.fetches).toEqual([
      'be-002',
      'found - be-002',
      'be-004',
      'error - be-004',
      'be-004',
      'error - be-004',
      'be-004',
      'found - be-004 auto-fetch'
    ]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p355Snapshot);
  });
});
