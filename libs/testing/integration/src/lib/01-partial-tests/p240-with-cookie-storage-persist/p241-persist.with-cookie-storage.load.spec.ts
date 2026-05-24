import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withCookieStoragePersistBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import {
  clearCookieStorage,
  flushVaultPipeline,
  getCookieStorage,
  setCookieStorage
} from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialWithCookieStorageService } from './partial-persist.with-cookie-storage.service';
import { p241Snapshot } from './snap-shots/p241-persist.with-cookie-storage.load.snapshot';

/**
 * This was a change in #toShapshot in the vault-monitor lik 163
 */

describe('p241: Persist - Cookie Storage - load', () => {
  let testService: PartialWithCookieStorageService;
  let stopListening: () => void;

  const emitted: any[] = [];
  const storageKey =
    'vault::cookiestorage::partial-persist.with-cookie-storage::SDUX::Behavior::Persist::CookieStorage';

  beforeEach(async () => {
    clearCookieStorage(storageKey);
    setCookieStorage(storageKey, getBankEmployeeData(0, false));

    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        PartialWithCookieStorageService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialWithCookieStorageService,
          {
            key: 'partial-persist.with-cookie-storage',
            initialState: getBankEmployeeData(1, false),
            insights: { wantsState: true } as any
          },
          [withCookieStoragePersistBehavior]
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialWithCookieStorageService);
    testService.initialize();
  });

  afterEach(() => {
    stopListening();
    clearCookieStorage(storageKey);
  });

  it('should replace the bank employees with in cookie storage', async () => {
    await flushVaultPipeline();

    const state = testService.getState();
    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    expect(state.value()).toEqual(
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
      })
    );

    expect(getCookieStorage(storageKey)).toEqual(
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
      })
    );
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p241Snapshot);
  });
});
