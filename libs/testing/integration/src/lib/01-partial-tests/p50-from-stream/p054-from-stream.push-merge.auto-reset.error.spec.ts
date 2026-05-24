import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withArrayPushMergeBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { VaultErrorService } from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { Subject, tap } from 'rxjs';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { partialFromStreamService } from './partial-from-stream.service';
import { p054Snapshot } from './snap-shots/p054-from-stream.push-merge.auto-reset.error.snapshot';

/*************************************************
 * Test 1
 *
 * Initial value is []
 *************************************************/

describe('p054: From Stream - with filter error - auto reset Merge', () => {
  const key = 'partial-from-stream';
  let testService: partialFromStreamService;
  const errorService = VaultErrorService();
  let stopListening: () => void;

  const emitted: any[] = [];
  const globalErrors: any[] = [];
  let errorSubscription: any;

  const employees$ = new Subject<BankEmployeeShape[]>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        partialFromStreamService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          partialFromStreamService,
          { key, initialState: [], insights: {} as any },
          [withArrayPushMergeBehavior]
        )
      ]
    });

    errorSubscription = errorService.error$
      .pipe(tap((error) => globalErrors.push(error)))
      .subscribe();

    stopListening = createTestInsightListener(emitted);
    testService = TestBed.inject(partialFromStreamService);
    testService.initializeErrors();
  });

  afterEach(() => {
    stopListening();
    errorSubscription.unsubscribe();
    testService.clearGlobalErrors();
  });

  it('should merge through the entire pipe', async () => {
    testService.vault.fromStream!(employees$);
    let state = testService.getState();
    await vaultSettled(key);

    expect(state.value()).toEqual([]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    expect(globalErrors).toEqual([null]);

    // Push through an employee

    employees$.next(getBankEmployeeData(0, false) as any);
    await vaultSettled(key);

    employees$.next(getBankEmployeeData(1, false) as any);
    await vaultSettled(key);

    employees$.next(getBankEmployeeData(2, false) as any);
    await vaultSettled(key);

    employees$.next(getBankEmployeeData(6, false) as any);
    await vaultSettled(key);

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
        id: 'be-003',
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
      })
    ]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    expect(globalErrors).toEqual([null]);

    testService.hasError = true;

    employees$.next(getBankEmployeeData(4, false) as any);
    await vaultSettled(key);

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
        id: 'be-003',
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
      })
    ]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toEqual(
      Object({
        message: 'this is a filter error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-from-stream'
      })
    );
    expect(state.isLoading()).toBeFalse();

    expect(globalErrors).toEqual([
      null,
      Object({
        message: 'this is a filter error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-from-stream'
      })
    ]);

    testService.hasError = false;

    employees$.next(getBankEmployeeData(3, false) as any);
    await vaultSettled(key);

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
        id: 'be-003',
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
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    expect(globalErrors).toEqual([
      null,
      Object({
        message: 'this is a filter error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number),
        featureCellKey: 'partial-from-stream'
      })
    ]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p054Snapshot);
  });
});
