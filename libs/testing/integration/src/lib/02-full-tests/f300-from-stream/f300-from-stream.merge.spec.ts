import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withArrayPushMergeBehavior,
  withStateCacheBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { Subject, tap } from 'rxjs';
import { flushVaultPipeline } from '../../../../../utils/src/public-api';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { getFilteredAndReducedBankEmployeeData } from '../../structure/data/bank-employee.filtered-and-reduced.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { verifyFullPipelineEmployees } from '../../structure/utils/verify-full-pipeline-employees.util';
import { FullTestService } from '../services/full-test.service';
import { f300Snapshot } from './snap-shots/f300-from-stream.merge.snapshot';

/*************************************************
 * Test 1
 *
 * Initial value is []
 *************************************************/

describe('f300: From Stream - Merge', () => {
  const key = 'full-test';
  let testService: FullTestService;
  let stopListening: () => void;

  const emitted: any[] = [];
  const globalStates: any[] = [];
  let stateSubscription: any;

  const employees$ = new Subject<BankEmployeeShape[]>();

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
          { key, initialState: [], insights: {} as any },
          [withArrayPushMergeBehavior, withStateCacheBehavior]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(FullTestService);
    testService.initializeStateCache();

    stateSubscription = testService.vault.state$
      .pipe(tap((state) => globalStates.push(state)))
      .subscribe();
  });

  afterEach(() => {
    stopListening();
    stateSubscription.unsubscribe();
    employees$.complete();
  });

  it('should merge through the entire pipe', async () => {
    testService.vault.fromStream!(employees$);
    let state = testService.getState();
    jasmine.clock().tick(1000);
    await vaultSettled(key);

    expect(state.value()).toEqual([]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([
      Object({
        value: [],
        source: 'partialArrowBeforeTapFunction'
      }),
      Object({
        value: [],
        source: 'partialInlineBeforeTapFunction'
      }),
      Object({
        value: [],
        source: 'partialPrivateBeforeTapFunction'
      }),
      Object({
        value: [],
        source: 'partialAnonymousBeforeTapFunction'
      }),
      Object({
        value: [],
        source: 'partialPureFunctionBeforeTap'
      })
    ]);
    expect(testService.partialAfterTapAbstract.getTaps()).toEqual([
      Object({
        value: [],
        source: 'partialArrowAfterTapFunction'
      }),
      Object({
        value: [],
        source: 'partialInlineAfterTapFunction'
      }),
      Object({
        value: [],
        source: 'partialPrivateAfterTapFunction'
      }),
      Object({
        value: [],
        source: 'partialAnonymousAfterTapFunction'
      }),
      Object({
        value: [],
        source: 'partialPureFunctionAfterTap'
      })
    ]);

    testService.partialBeforeTapAbstract.clearTaps();
    testService.partialAfterTapAbstract.clearTaps();

    // Push through an employee

    employees$.next(getBankEmployeeData(0, false) as any);

    expect(testService.partialBeforeTapAbstract.getTaps().length).toBe(0);
    expect(testService.partialAfterTapAbstract.getTaps().length).toBe(0);
    expect(state.value()).toEqual([]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    employees$.next(getBankEmployeeData(1, false) as any);

    expect(testService.partialBeforeTapAbstract.getTaps().length).toBe(0);
    expect(testService.partialAfterTapAbstract.getTaps().length).toBe(0);
    expect(state.value()).toEqual([]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    employees$.next(getBankEmployeeData(2, false) as any);

    expect(testService.partialBeforeTapAbstract.getTaps().length).toBe(0);
    expect(testService.partialAfterTapAbstract.getTaps().length).toBe(0);
    expect(state.value()).toEqual([]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    employees$.next(getBankEmployeeData(6, false) as any);
    await vaultSettled(key);

    expect(state.value()).toEqual([
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
        phoneNumber: '555-444-1212',
        senior: true,
        fullName: 'Nina Castillo',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
      })
    ]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    expect(testService.partialBeforeTapAbstract.getTaps().length).toBe(20);
    expect(testService.partialAfterTapAbstract.getTaps().length).toBe(20);

    testService.partialBeforeTapAbstract.clearTaps();
    testService.partialAfterTapAbstract.clearTaps();

    // Push through an employee

    employees$.next(getBankEmployeeData(0, false) as any);
    employees$.next(getBankEmployeeData(1, false) as any);
    employees$.next(getBankEmployeeData(2, false) as any);
    employees$.next(getBankEmployeeData(3, false) as any);
    employees$.next(getBankEmployeeData(4, false) as any);
    employees$.next(getBankEmployeeData(5, false) as any);
    employees$.next(getBankEmployeeData(7, false) as any);
    await vaultSettled(key);

    expect(state.value()).toEqual([
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
        phoneNumber: '555-444-1212',
        senior: true,
        fullName: 'Nina Castillo',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-909-8080',
        senior: false,
        fullName: 'Oscar Klein',
        isLoanOfficer: true,
        isSecurity: false,
        isActive: true
      })
    ]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    expect(testService.partialBeforeTapAbstract.getTaps().length).toBe(35);
    expect(testService.partialAfterTapAbstract.getTaps().length).toBe(35);

    testService.partialBeforeTapAbstract.clearTaps();
    testService.partialAfterTapAbstract.clearTaps();

    employees$.next(getBankEmployeeData(0, false) as any);
    employees$.next(getBankEmployeeData(1, false) as any);
    employees$.next(getBankEmployeeData(2, false) as any);
    employees$.next(getBankEmployeeData(3, false) as any);
    employees$.next(getBankEmployeeData(4, false) as any);
    employees$.next(getBankEmployeeData(5, false) as any);
    employees$.next(getBankEmployeeData(8, false) as any);
    await vaultSettled(key);

    verifyFullPipelineEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    expect(testService.partialBeforeTapAbstract.getTaps().length).toEqual(35);
    expect(testService.partialBeforeTapAbstract.getTaps().slice(-1)).toEqual([
      Object({
        value: [
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
            phoneNumber: '555-444-1212',
            senior: true,
            fullName: 'Nina Castillo',
            isLoanOfficer: false,
            isSecurity: false,
            isActive: true
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
            phoneNumber: '555-909-8080',
            senior: false,
            fullName: 'Oscar Klein',
            isLoanOfficer: true,
            isSecurity: false,
            isActive: true
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
        ],
        source: 'partialPureFunctionBeforeTap'
      })
    ]);

    expect(testService.partialAfterTapAbstract.getTaps().length).toEqual(35);
    expect(testService.partialAfterTapAbstract.getTaps().slice(-1)).toEqual([
      Object({
        value: [
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
            phoneNumber: '555-444-1212',
            senior: true,
            fullName: 'Nina Castillo',
            isLoanOfficer: false,
            isSecurity: false,
            isActive: true
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
            phoneNumber: '555-909-8080',
            senior: false,
            fullName: 'Oscar Klein',
            isLoanOfficer: true,
            isSecurity: false,
            isActive: true
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
            phoneNumber: '555-333-2323',
            senior: true,
            fullName: 'Priya Sharma',
            isLoanOfficer: false,
            isSecurity: false,
            isActive: true
          })
        ],
        source: 'partialPureFunctionAfterTap'
      })
    ]);

    employees$.next(getBankEmployeeData(0, false) as any);
    employees$.next(getBankEmployeeData(1, false) as any);
    employees$.next(getBankEmployeeData(2, false) as any);
    employees$.next(getBankEmployeeData(3, false) as any);
    employees$.next(getBankEmployeeData(4, false) as any);
    employees$.next(getBankEmployeeData(5, false) as any);
    employees$.next(getBankEmployeeData(8, false) as any);
    await vaultSettled(key);

    employees$.next(getBankEmployeeData(8, false) as any);
    await vaultSettled(key);

    employees$.next(getBankEmployeeData(8, false) as any);
    await vaultSettled(key);

    employees$.next(getBankEmployeeData(8, false) as any);
    await vaultSettled(key);

    expect(state.value()).toEqual([
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
        phoneNumber: '555-444-1212',
        senior: true,
        fullName: 'Nina Castillo',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-909-8080',
        senior: false,
        fullName: 'Oscar Klein',
        isLoanOfficer: true,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
      })
    ]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    employees$.next(getBankEmployeeData(8, false) as any);
    await vaultSettled(key);

    expect(state.value()).toEqual([
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
        phoneNumber: '555-444-1212',
        senior: true,
        fullName: 'Nina Castillo',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-909-8080',
        senior: false,
        fullName: 'Oscar Klein',
        isLoanOfficer: true,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
      })
    ]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    // Advance time past TTL expiration (1 minute)
    jasmine.clock().tick(90_000);
    await flushVaultPipeline();

    // Cache should have refreshed in background
    expect(testService.fetches).toEqual([
      'be-007',
      'found - be-007',
      'be-008',
      'found - be-008',
      'be-009',
      'found - be-009'
    ]);

    // Ensure state was refreshed, not duplicated
    expect(state.value()).toEqual([
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
        phoneNumber: '555-444-1212',
        senior: true,
        fullName: 'Nina Castillo',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-909-8080',
        senior: false,
        fullName: 'Oscar Klein',
        isLoanOfficer: true,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
      })
    ]);

    expect(state.hasValue()).toBeTrue();
    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    let cachePromise = testService.vault.cacheLookup!('be-002');
    await flushVaultPipeline();

    let employee = await cachePromise;

    expect(testService.fetches).toEqual([
      'be-007',
      'found - be-007',
      'be-008',
      'found - be-008',
      'be-009',
      'found - be-009',
      'be-002',
      'found - be-002'
    ]);

    // NOW the pipeline has run
    expect(employee).toBeUndefined();

    expect(state.value()).toEqual([
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
        phoneNumber: '555-444-1212',
        senior: true,
        fullName: 'Nina Castillo',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-909-8080',
        senior: false,
        fullName: 'Oscar Klein',
        isLoanOfficer: true,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
      })
    ]);

    expect(state.hasValue()).toBeTrue();
    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    // Lookup a filter/reducer Success

    cachePromise = testService.vault.cacheLookup!('be-007');
    await flushVaultPipeline();
    employee = await cachePromise;

    expect(testService.fetches).toEqual([
      'be-007',
      'found - be-007',
      'be-008',
      'found - be-008',
      'be-009',
      'found - be-009',
      'be-002',
      'found - be-002'
    ]);

    // NOW the pipeline has run
    expect(employee).toEqual(
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
        phoneNumber: '555-444-1212',
        senior: true,
        fullName: 'Nina Castillo',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
      })
    );

    expect(state.value()).toEqual([
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
        phoneNumber: '555-444-1212',
        senior: true,
        fullName: 'Nina Castillo',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-909-8080',
        senior: false,
        fullName: 'Oscar Klein',
        isLoanOfficer: true,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
      })
    ]);

    expect(state.hasValue()).toBeTrue();
    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    // expire the cache

    jasmine.clock().tick(90_000);

    expect(testService.fetches).toEqual([
      'be-007',
      'found - be-007',
      'be-008',
      'found - be-008',
      'be-009',
      'found - be-009',
      'be-002',
      'found - be-002',
      'be-007',
      'found - be-007 auto-fetch',
      'be-008',
      'found - be-008 auto-fetch',
      'be-009',
      'found - be-009 auto-fetch'
    ]);

    // NOW the pipeline has run
    expect(employee).toEqual(
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
        phoneNumber: '555-444-1212',
        senior: true,
        fullName: 'Nina Castillo',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
      })
    );

    expect(state.value()).toEqual([
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
        phoneNumber: '555-444-1212',
        senior: true,
        fullName: 'Nina Castillo',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-909-8080',
        senior: false,
        fullName: 'Oscar Klein',
        isLoanOfficer: true,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
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
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
      })
    ]);

    expect(state.hasValue()).toBeTrue();
    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
  });

  it('should have the correct insight events', async () => {
    jasmine.clock().tick(1_000);
    await vaultSettled(key);
    expectMonitorSnapshot(emitted, f300Snapshot);
  });

  it('should have the correct global state$ events', async () => {
    expect(globalStates).toEqual([
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [getFilteredAndReducedBankEmployeeData(0)],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [getFilteredAndReducedBankEmployeeData(0)],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [getFilteredAndReducedBankEmployeeData(0)],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [getFilteredAndReducedBankEmployeeData(0)],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [getFilteredAndReducedBankEmployeeData(0)],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [getFilteredAndReducedBankEmployeeData(0)],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [getFilteredAndReducedBankEmployeeData(0)],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [getFilteredAndReducedBankEmployeeData(0)],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [getFilteredAndReducedBankEmployeeData(0)],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [getFilteredAndReducedBankEmployeeData(0)],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [getFilteredAndReducedBankEmployeeData(0)],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [getFilteredAndReducedBankEmployeeData(0)],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [getFilteredAndReducedBankEmployeeData(0)],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [getFilteredAndReducedBankEmployeeData(0)],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Incoming Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        }),
        options: Object({ withStateCacheBehavior: Object({ id: 'be-007' }) })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        }),
        options: Object({ withStateCacheBehavior: Object({ id: 'be-008' }) })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        }),
        options: Object({ withStateCacheBehavior: Object({ id: 'be-009' }) })
      }),
      Object({
        type: 'Finalize Pipeline',
        snapshot: Object({
          isLoading: false,
          value: [
            getFilteredAndReducedBankEmployeeData(0),
            getFilteredAndReducedBankEmployeeData(1),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2),
            getFilteredAndReducedBankEmployeeData(2)
          ],
          error: null,
          hasValue: true
        }),
        options: Object({ withStateCacheBehavior: Object({ id: 'be-002' }) })
      }),
      Object({
        snapshot: Object({
          isLoading: false,
          value: [],
          error: null,
          hasValue: true
        }),
        type: 'Finalize Pipeline'
      })
    ]);
  });
});
