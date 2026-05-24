import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withCookieStoragePersistBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import {
  clearCookieStorage,
  flushVaultPipeline,
  getCookieStorage
} from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialWithCookieStorageService } from './partial-persist.with-cookie-storage.service';
import { p242Snapshot } from './snap-shots/p242-persist.with-cookie-storage.reset.snapshot';

describe('p242: Persist - Cookie Storage - reset', () => {
  let testService: PartialWithCookieStorageService;
  let stopListening: () => void;

  const emitted: any[] = [];
  const storageKey =
    'vault::cookiestorage::partial-persist.with-cookie-storage::SDUX::Behavior::Persist::CookieStorage';

  beforeEach(async () => {
    clearCookieStorage(storageKey);
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
            initialState: null,
            insights: {} as any
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

  it('should not remove the bank employees in cookie storage', async () => {
    await flushVaultPipeline();

    testService.vault.replaceState({
      value: getBankEmployeeData(0, false) as BankEmployeeShape
    });
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

    testService.vault.reset();
    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    // Assert — both withDebounce applied in order
    expect(state.value()).toBeUndefined();

    expect(getCookieStorage(storageKey)).toBeNull();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p242Snapshot);
  });
});
