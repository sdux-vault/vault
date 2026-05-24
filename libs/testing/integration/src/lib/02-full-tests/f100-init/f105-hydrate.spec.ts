import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withLocalStoragePersistBehavior,
  withThrottleController
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { clearLocalStorage, getLocalStorage } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { FullTestService } from '../services/full-test.service';
import { f105Snapshot } from './snap-shots/f105-hydrate.snapshot';

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

describe('f105: Hydrate Test', () => {
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
    clearLocalStorage(storageKey);
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
            key: 'full-test',
            initialState: getBankEmployeeData(),
            insights: { wantsErrors: true, wantsPayload: true } as any
          },
          [withLocalStoragePersistBehavior],
          [withThrottleController]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(FullTestService);
    testService.initializeWithHydration();
  });

  afterEach(() => {
    stopListening();
    clearLocalStorage(storageKey);
  });

  it('should load initial values and replace through the entire pipe', async () => {
    const state = testService.getState();
    jasmine.clock().tick(1_000);
    await vaultSettled(testService.vault.key);

    expect(state.value()).toEqual([
      Object({
        id: 'be-999',
        firstName: 'Victor',
        lastName: 'Ramirez',
        role: 'Manager',
        status: 'Active',
        salary: 120000,
        hireDate: '2022-06-15',
        birthDate: '1988-09-21',
        address: Object({ city: 'New York', state: 'NY', zip: '10001' }),
        phoneNumber: '(212) 555-9012',
        senior: true,
        fullName: 'Victor Ramirez',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
      })
    ]);

    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    expect(testService.fetches).toEqual([]);

    expect(testService.partialBeforeTapAbstract.getTaps()).toEqual([
      Object({
        value: [
          Object({
            id: 'be-999',
            firstName: 'Victor',
            lastName: 'Ramirez',
            role: 'Manager',
            status: 'Active',
            salary: 120000,
            hireDate: '2022-06-15',
            birthDate: '1988-09-21',
            address: Object({ city: 'New York', state: 'NY', zip: '10001' }),
            phoneNumber: '(212) 555-9012'
          })
        ],
        source: 'partialArrowBeforeTapFunction'
      }),
      Object({
        value: [
          Object({
            id: 'be-999',
            firstName: 'Victor',
            lastName: 'Ramirez',
            role: 'Manager',
            status: 'Active',
            salary: 120000,
            hireDate: '2022-06-15',
            birthDate: '1988-09-21',
            address: Object({ city: 'New York', state: 'NY', zip: '10001' }),
            phoneNumber: '(212) 555-9012'
          })
        ],
        source: 'partialInlineBeforeTapFunction'
      }),
      Object({
        value: [
          Object({
            id: 'be-999',
            firstName: 'Victor',
            lastName: 'Ramirez',
            role: 'Manager',
            status: 'Active',
            salary: 120000,
            hireDate: '2022-06-15',
            birthDate: '1988-09-21',
            address: Object({ city: 'New York', state: 'NY', zip: '10001' }),
            phoneNumber: '(212) 555-9012'
          })
        ],
        source: 'partialPrivateBeforeTapFunction'
      }),
      Object({
        value: [
          Object({
            id: 'be-999',
            firstName: 'Victor',
            lastName: 'Ramirez',
            role: 'Manager',
            status: 'Active',
            salary: 120000,
            hireDate: '2022-06-15',
            birthDate: '1988-09-21',
            address: Object({ city: 'New York', state: 'NY', zip: '10001' }),
            phoneNumber: '(212) 555-9012'
          })
        ],
        source: 'partialAnonymousBeforeTapFunction'
      }),
      Object({
        value: [
          Object({
            id: 'be-999',
            firstName: 'Victor',
            lastName: 'Ramirez',
            role: 'Manager',
            status: 'Active',
            salary: 120000,
            hireDate: '2022-06-15',
            birthDate: '1988-09-21',
            address: Object({ city: 'New York', state: 'NY', zip: '10001' }),
            phoneNumber: '(212) 555-9012'
          })
        ],
        source: 'partialPureFunctionBeforeTap'
      })
    ]);
    expect(testService.partialAfterTapAbstract.getTaps()).toEqual([
      Object({
        value: [
          Object({
            id: 'be-999',
            firstName: 'Victor',
            lastName: 'Ramirez',
            role: 'Manager',
            status: 'Active',
            salary: 120000,
            hireDate: '2022-06-15',
            birthDate: '1988-09-21',
            address: Object({ city: 'New York', state: 'NY', zip: '10001' }),
            phoneNumber: '(212) 555-9012',
            senior: true,
            fullName: 'Victor Ramirez',
            isLoanOfficer: false,
            isSecurity: false,
            isActive: true
          })
        ],
        source: 'partialArrowAfterTapFunction'
      }),
      Object({
        value: [
          Object({
            id: 'be-999',
            firstName: 'Victor',
            lastName: 'Ramirez',
            role: 'Manager',
            status: 'Active',
            salary: 120000,
            hireDate: '2022-06-15',
            birthDate: '1988-09-21',
            address: Object({ city: 'New York', state: 'NY', zip: '10001' }),
            phoneNumber: '(212) 555-9012',
            senior: true,
            fullName: 'Victor Ramirez',
            isLoanOfficer: false,
            isSecurity: false,
            isActive: true
          })
        ],
        source: 'partialInlineAfterTapFunction'
      }),
      Object({
        value: [
          Object({
            id: 'be-999',
            firstName: 'Victor',
            lastName: 'Ramirez',
            role: 'Manager',
            status: 'Active',
            salary: 120000,
            hireDate: '2022-06-15',
            birthDate: '1988-09-21',
            address: Object({ city: 'New York', state: 'NY', zip: '10001' }),
            phoneNumber: '(212) 555-9012',
            senior: true,
            fullName: 'Victor Ramirez',
            isLoanOfficer: false,
            isSecurity: false,
            isActive: true
          })
        ],
        source: 'partialPrivateAfterTapFunction'
      }),
      Object({
        value: [
          Object({
            id: 'be-999',
            firstName: 'Victor',
            lastName: 'Ramirez',
            role: 'Manager',
            status: 'Active',
            salary: 120000,
            hireDate: '2022-06-15',
            birthDate: '1988-09-21',
            address: Object({ city: 'New York', state: 'NY', zip: '10001' }),
            phoneNumber: '(212) 555-9012',
            senior: true,
            fullName: 'Victor Ramirez',
            isLoanOfficer: false,
            isSecurity: false,
            isActive: true
          })
        ],
        source: 'partialAnonymousAfterTapFunction'
      }),
      Object({
        value: [
          Object({
            id: 'be-999',
            firstName: 'Victor',
            lastName: 'Ramirez',
            role: 'Manager',
            status: 'Active',
            salary: 120000,
            hireDate: '2022-06-15',
            birthDate: '1988-09-21',
            address: Object({ city: 'New York', state: 'NY', zip: '10001' }),
            phoneNumber: '(212) 555-9012',
            senior: true,
            fullName: 'Victor Ramirez',
            isLoanOfficer: false,
            isSecurity: false,
            isActive: true
          })
        ],
        source: 'partialPureFunctionAfterTap'
      })
    ]);

    expect(getLocalStorage(storageKey)).toEqual([
      Object({
        id: 'be-999',
        firstName: 'Victor',
        lastName: 'Ramirez',
        role: 'Manager',
        status: 'Active',
        salary: 120000,
        hireDate: '2022-06-15',
        birthDate: '1988-09-21',
        address: Object({ city: 'New York', state: 'NY', zip: '10001' }),
        phoneNumber: '(212) 555-9012',
        senior: true,
        fullName: 'Victor Ramirez',
        isLoanOfficer: false,
        isSecurity: false,
        isActive: true
      })
    ]);
  });

  it('should have the correct insight events', async () => {
    jasmine.clock().tick(1_000);
    await vaultSettled(testService.vault.key);
    expectMonitorSnapshot(emitted, f105Snapshot);
  });
});
