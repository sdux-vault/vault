import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withLocalStoragePersistBehavior,
  withStateCacheBehavior,
  withThrottleController
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { clearLocalStorage, setLocalStorage } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { FullTestService } from '../services/full-test.service';
import { f100Snapshot } from './snap-shots/f100-init.snapshot';

/*************************************************
 * Test 1
 *
 * Initial value is getBankEmployees()
 *
 * filters and reducers comes out to be
 *
 * state.value().length = 3
 * beforeTabs.length = 5
 * Local Storage Length = 3 (same as state values)
 *************************************************/

describe('f100: Init Test', () => {
  const key = 'full-test';
  let testService: FullTestService;
  let stopListening: () => void;

  const emitted: any[] = [];
  const storageKey =
    'vault::localstorage::full-test::SDUX::Behavior::Persist::LocalStorage';

  beforeAll(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date('2024-01-01T00:00:00.000Z'));
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  beforeEach(async () => {
    setLocalStorage(storageKey, getBankEmployeeData());
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        FullTestService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          FullTestService,
          {
            key,
            initialState: getBankEmployeeData(1, true),
            insights: { wantsErrors: true, wantsPayload: true } as any
          },
          [withLocalStoragePersistBehavior, withStateCacheBehavior],
          [withThrottleController]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(FullTestService);
    testService.initializeStateCache();
  });

  afterEach(() => {
    stopListening();
    clearLocalStorage(storageKey);
  });

  it('should load initial storage valiables and replace through the entire pipe', async () => {
    const state = testService.getState();
    jasmine.clock().tick(1_000);
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
      })
    ]);

    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    expect(testService.fetches).toEqual([]);

    /*
    verifyFullPipelineBeforeTaps(testService.partialBeforeTapAbstract.getTaps());
    verifyFullPipelineAfterTaps(testService.partialAfterTapAbstract.getTaps());

    expect(getLocalStorage(storageKey)).toEqual([
      Object({
        id: 'be-007',
        firstName: 'Nina',
        lastName: 'Castillo',
        role: 'Manager',
        status: 'Active',
        salary: 90000,
        hireDate: '2021-04-10',
        birthDate: '1989-11-20',
        address: Object({ street: '501 Madison Ave', city: 'New York', state: 'NY', zip: '10022' }),
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
        address: Object({ street: '12 West 43rd St', city: 'New York', state: 'NY', zip: '10036' }),
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
        address: Object({ street: '77 Park Ave', city: 'New York', state: 'NY', zip: '10016' }),
        phoneNumber: '555-333-2323',
        senior: true,
        fullName: 'Priya Sharma',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
      })
    ]);

    jasmine.clock().tick(30_000);
    await flushVaultPipeline();

    expect(testService.fetches).toEqual([]);

    jasmine.clock().tick(29_000);

    expect(testService.fetches).toEqual([]);

    jasmine.clock().tick(31_000);
    await vaultSettled(key);

    expect(testService.fetches).toEqual([
      'be-007',
      'found - be-007',
      'be-008',
      'found - be-008',
      'be-009',
      'found - be-009'
    ]);

    jasmine.clock().tick(60_000);
    await vaultSettled(key);

    expect(testService.fetches).toEqual([
      'be-007',
      'found - be-007',
      'be-008',
      'found - be-008',
      'be-009',
      'found - be-009',
      'be-009',
      'found - be-009 auto-fetch'
    ]);
    */
  });

  it('should have the correct insight events', async () => {
    jasmine.clock().tick(1_000);
    await vaultSettled(key);
    expectMonitorSnapshot(emitted, f100Snapshot);
  });
});
