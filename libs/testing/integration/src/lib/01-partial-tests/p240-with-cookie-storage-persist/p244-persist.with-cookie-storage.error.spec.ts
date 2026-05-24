import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withCookieStoragePersistBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import {
  clearCookieStorage,
  flushVaultPipeline,
  getCookieStorage
} from '@sdux-vault/testing-utils';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialWithCookieStorageService } from './partial-persist.with-cookie-storage.service';
import { p244Snapshot } from './snap-shots/p244-persist.with-cookie-storage.error.snapshot';

describe('p244: Persist - Cookie Storage - error', () => {
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
    testService.clearGlobalErrors();
  });

  it('should not remove the bank employees in cookie storage', async () => {
    await flushVaultPipeline();

    const largeString = 'x'.repeat(4000);
    testService.vault.replaceState({ value: largeString as any });
    await flushVaultPipeline();

    const state = testService.getState();

    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    expect(state.value()).toContain('x');

    expect(getCookieStorage(storageKey)).toBeNull();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p244Snapshot);
  });
});
