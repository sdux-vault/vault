import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withStateCacheBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialCacheService } from './partial-cache.service';
import { p275Snapshot } from './snap-shots/p275-cache.promise-merge.error.snapshot';

/*************************************************
 * Test 1
 *
 * Initial value is []
 *************************************************/

describe('p274: Promise - Cache Merge Error Test', () => {
  const key = 'partial-cache';
  let testService: PartialCacheService;
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
        PartialCacheService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialCacheService,
          { key, initialState: [], insights: {} as any },
          [withStateCacheBehavior]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialCacheService);
    testService.initializeByPromise();
  });

  afterEach(() => {
    stopListening();
  });

  it('should handle cache calls from a promise', async () => {
    let employee: any;
    const state = testService.getState();
    await vaultSettled(key);

    expect(state.value()).toEqual([]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    employee = await testService.vault.cacheLookup!('be-002');
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

    jasmine.clock().tick(30_000);
    await flushVaultPipeline();

    testService.isError = true;
    employee = undefined;
    let error: any;

    employee = await testService.vault.cacheLookup!('be-004').catch(
      (_error) => {
        error = `error: ${_error.message}`;
      }
    );
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
        message: 'Unexpected error',
        details: jasmine.any(Object),
        raw: jasmine.any(Object),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-cache'
      })
    );
    expect(state.isLoading()).toBeFalse();

    /**
     * Verify the error is sticky
     */
    employee = undefined;
    error = undefined;

    employee = await testService.vault.cacheLookup!('be-004').catch(
      (_error) => {
        error = `error: ${_error}`;
      }
    );
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
      'error - be-004',
      'be-004',
      'error - be-004'
    ]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toEqual(
      Object({
        message: 'Unexpected error',
        details: jasmine.any(Object),
        raw: jasmine.any(Object),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-cache'
      })
    );
    expect(state.isLoading()).toBeFalse();

    testService.vault.replaceState({ error: null });
    await flushVaultPipeline();

    testService.isError = false;
    employee = await testService.vault.cacheLookup!('be-002');
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

    employee = await testService.vault.cacheLookup!('be-004');
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

    // Advance time past TTL expiration (1 minute)
    jasmine.clock().tick(30_000);
    await flushVaultPipeline();

    // Cache should have refreshed in background
    expect(testService.fetches).toEqual([
      'be-002',
      'found - be-002',
      'be-004',
      'error - be-004',
      'be-004',
      'error - be-004',
      'be-004',
      'found - be-004 auto-fetch',
      'be-002',
      'found - be-002 auto-fetch'
    ]);

    // Ensure state was refreshed, not duplicated
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
    expect(state.error()).toBeNull();

    // Advance time past TTL expiration (1 minute)
    jasmine.clock().tick(30_000);
    await flushVaultPipeline();

    // Cache should have refreshed in background
    expect(testService.fetches).toEqual([
      'be-002',
      'found - be-002',
      'be-004',
      'error - be-004',
      'be-004',
      'error - be-004',
      'be-004',
      'found - be-004 auto-fetch',
      'be-002',
      'found - be-002 auto-fetch',
      'be-004',
      'found - be-004 auto-fetch'
    ]);

    // Ensure state was refreshed, not duplicated
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
    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    employee = await testService.vault.cacheLookup!('be-002');
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
    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    // Cache should have refreshed in background
    expect(testService.fetches).toEqual([
      'be-002',
      'found - be-002',
      'be-004',
      'error - be-004',
      'be-004',
      'error - be-004',
      'be-004',
      'found - be-004 auto-fetch',
      'be-002',
      'found - be-002 auto-fetch',
      'be-004',
      'found - be-004 auto-fetch'
    ]);
  });

  it('should have the correct insight events', async () => {
    jasmine.clock().tick(1000);
    await vaultSettled(key);
    expectMonitorSnapshot(emitted, p275Snapshot);
  });
});
