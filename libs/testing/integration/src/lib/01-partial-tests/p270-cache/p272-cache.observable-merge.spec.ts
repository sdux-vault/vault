import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withStateCacheBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialCacheService } from './partial-cache.service';
import { p272Snapshot } from './snap-shots/p272-cache.observable-merge.snapshot';

/*************************************************
 * Test 1
 *
 * Initial value is []
 *************************************************/

describe('p272: Observable - Cache Merge Test', () => {
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
    testService.initializeByObservable();
  });

  afterEach(() => {
    stopListening();
  });

  it('should handle lookup calls from a value', async () => {
    let state = testService.getState();
    let employee: any;
    await vaultSettled(key);

    expect(state.value()).toEqual([]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    testService.vault.cacheLookup$!('be-002').subscribe((entity) => {
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

    jasmine.clock().tick(30_000);
    testService.vault.cacheLookup$!('be-004').subscribe((entity) => {
      employee = entity;
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
      'found - be-004'
    ]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    testService.vault.cacheLookup$!('be-002').subscribe((entity) => {
      employee = entity;
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
      'found - be-004'
    ]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    testService.vault.cacheLookup$!('be-004').subscribe((entity) => {
      employee = entity;
    });
    await flushVaultPipeline();

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
      'found - be-004'
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
      'found - be-004',
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
    jasmine.clock().tick(60_000);
    await flushVaultPipeline();

    // Cache should have refreshed in background
    expect(testService.fetches).toEqual([
      'be-002',
      'found - be-002',
      'be-004',
      'found - be-004',
      'be-002',
      'found - be-002 auto-fetch',
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

    expect(state.hasValue()).toBeTrue();
    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    // Cache should have refreshed in background
    expect(testService.fetches).toEqual([
      'be-002',
      'found - be-002',
      'be-004',
      'found - be-004',
      'be-002',
      'found - be-002 auto-fetch',
      'be-004',
      'found - be-004 auto-fetch',
      'be-002',
      'found - be-002 auto-fetch'
    ]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p272Snapshot);
  });
});
