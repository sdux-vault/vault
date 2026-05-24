import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withArrayAppendMergeBehavior,
  withStateCacheBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialCacheService } from './partial-cache.service';
import { p271Snapshot } from './snap-shots/p271-cache.promise-append-merge.snapshot';

/*************************************************
 * Test 1
 *
 * Initial value is []
 *************************************************/

describe('p271: Promise - Cache Append Merge Test', () => {
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
          [withStateCacheBehavior, withArrayAppendMergeBehavior]
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

  it('should handle cache calls from a value', async () => {
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
      }),
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

    employee = await testService.vault.cacheLookup!('be-002');

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
      }),
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

    employee = await testService.vault.cacheLookup!('be-004');

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
      }),
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
      }),
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
      }),
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

    // manual merge
    const employee1 = getBankEmployeeData(2) as BankEmployeeShape;

    /****
     *
     * This overwrites be-002
     */

    employee1.id = 'be-002';
    const employee3 = getBankEmployeeData(4) as BankEmployeeShape;
    employee3.id = 'be-004';
    testService.vault.mergeState({
      value: [employee1, employee3] as any
    });
    await vaultSettled(key);

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
      'found - be-002 auto-fetch',
      'be-004',
      'found - be-004 auto-fetch'
    ]);

    // Ensure state was refreshed, not duplicated
    expect(state.value()).toEqual([
      // Initital - non Cache
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
      }),
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
      }),
      // Cache
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
      }),
      // Manual
      Object({
        id: 'be-002',
        firstName: 'Carla',
        lastName: 'Summers',
        role: 'Owner',
        status: 'Active',
        salary: 185000,
        hireDate: '2003-01-20',
        birthDate: '1964-11-30',
        phoneNumber: '555-732-1100',
        address: Object({
          street: '12 Oak Bend Dr',
          city: 'Chicago',
          state: 'IL',
          zip: '60614'
        })
      }),
      Object({
        id: 'be-004',
        firstName: 'Elena',
        lastName: 'Reed',
        role: 'Teller',
        status: 'Active',
        salary: 52000,
        hireDate: '2021-11-01',
        birthDate: '1998-09-05',
        phoneNumber: '555-610-2099',
        address: Object({
          street: '233 Pinecrest Ln',
          city: 'Naperville',
          state: 'IL',
          zip: '60540'
        })
      }),
      // Cache
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
      // Manual
      Object({
        id: 'be-002',
        firstName: 'Carla',
        lastName: 'Summers',
        role: 'Owner',
        status: 'Active',
        salary: 185000,
        hireDate: '2003-01-20',
        birthDate: '1964-11-30',
        phoneNumber: '555-732-1100',
        address: Object({
          street: '12 Oak Bend Dr',
          city: 'Chicago',
          state: 'IL',
          zip: '60614'
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
      }),
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
      }),
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
      }),
      Object({
        id: 'be-002',
        firstName: 'Carla',
        lastName: 'Summers',
        role: 'Owner',
        status: 'Active',
        salary: 185000,
        hireDate: '2003-01-20',
        birthDate: '1964-11-30',
        phoneNumber: '555-732-1100',
        address: Object({
          street: '12 Oak Bend Dr',
          city: 'Chicago',
          state: 'IL',
          zip: '60614'
        })
      }),
      Object({
        id: 'be-004',
        firstName: 'Elena',
        lastName: 'Reed',
        role: 'Teller',
        status: 'Active',
        salary: 52000,
        hireDate: '2021-11-01',
        birthDate: '1998-09-05',
        phoneNumber: '555-610-2099',
        address: Object({
          street: '233 Pinecrest Ln',
          city: 'Naperville',
          state: 'IL',
          zip: '60540'
        })
      }),
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
      'found - be-004',
      'be-002',
      'found - be-002 auto-fetch',
      'be-004',
      'found - be-004 auto-fetch'
    ]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p271Snapshot);
  });
});
