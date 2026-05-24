import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { f0xUtilityService } from '../services/full-utility.service';
import { f23Snapshot } from './snap-shots/f23-value.utilities.snapshot';

describe('f23: State Side Effects - Promise', () => {
  let testService: f0xUtilityService;
  let stopListening: () => void;

  const emitted: any[] = [];
  const resetEvents: any[] = [];
  const destroyedEvents: any[] = [];

  beforeEach(async () => {
    resetEvents.length = 0;
    destroyedEvents.length = 0;
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        f0xUtilityService,
        provideZonelessChangeDetection(),
        provideFeatureCell(f0xUtilityService, {
          key: 'full-utility',
          initialState: null,
          insights: {} as any
        })
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(f0xUtilityService);
    testService.initialize();
  });

  afterEach(() => {
    stopListening();
    testService.clearGlobalErrors();
  });

  it('should handle a filter error on an object when a filter wants an array', async () => {
    await flushVaultPipeline();

    let state = testService.getState();

    testService.vault.replaceState(Object({ value: 'the value' }));

    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();

    expect(state.error()).toEqual(
      Object({
        message: 'employees.filter is not a function',
        featureCellKey: 'full-utility',
        details: jasmine.any(String),
        raw: jasmine.any(Object),
        timestamp: jasmine.any(Number)
      })
    );

    expect(state.value()).toBeUndefined();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, f23Snapshot);
  });
});
