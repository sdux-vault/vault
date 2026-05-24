import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { verifyFullPipelineEmployees } from '../../structure/utils/verify-full-pipeline-employees.util';
import { f0xUtilityService } from '../services/full-utility.service';
import { f11Snapshot } from './snap-shots/f11-init.utilities.snapshot';

describe('f11: Incremental Updates - From an initial statue Replace', () => {
  const key = 'full-utility';
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
          key,
          initialState: getBankEmployeeData(),
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
  });

  it('should handle reset and reset$ through the entire pipe', async () => {
    let state = testService.getState();
    await vaultSettled(key);

    testService.vault.reset$?.subscribe(() => resetEvents.push('reset'));
    testService.vault.destroyed$?.subscribe(() =>
      destroyedEvents.push('destroyed')
    );

    verifyFullPipelineEmployees(state.value());

    // New Test
    testService.vault.replaceState(
      Object({
        loading: true,
        error: 'the error',
        value: getBankEmployeeData()
      })
    );
    await vaultSettled(key);

    expect(state.isLoading()).toBeTrue();
    expect(state.error()).toEqual(
      Object({
        message: 'the error',
        details: 'the error',
        raw: 'the error',
        timestamp: jasmine.any(Number),
        featureCellKey: 'external'
      })
    );
    verifyFullPipelineEmployees(state.value());

    expect(resetEvents).toEqual([]);
    expect(destroyedEvents).toEqual([]);

    // New Test
    resetEvents.length = 0;
    testService.vault.replaceState(undefined);
    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();

    expect(resetEvents).toEqual([]);
    expect(destroyedEvents).toEqual([]);

    // New Test
    resetEvents.length = 0;
    testService.vault.replaceState(
      Object({
        loading: true,
        error: 'the error',
        value: getBankEmployeeData()
      })
    );
    await vaultSettled(key);

    expect(state.isLoading()).toBeTrue();
    expect(state.error()).toEqual(
      Object({
        message: 'the error',
        details: 'the error',
        raw: 'the error',
        timestamp: jasmine.any(Number),
        featureCellKey: 'external'
      })
    );
    verifyFullPipelineEmployees(state.value());

    expect(resetEvents).toEqual([]);
    expect(destroyedEvents).toEqual([]);

    // New Test
    resetEvents.length = 0;
    testService.vault.replaceState(undefined);
    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.hasValue()).toBeFalse();
    expect(state.value()).toBeUndefined();

    expect(resetEvents).toEqual([]);
    expect(destroyedEvents).toEqual([]);

    // New Test
    resetEvents.length = 0;
    testService.vault.replaceState(
      Object({
        loading: true,
        error: 'the error',
        value: getBankEmployeeData()
      })
    );
    await vaultSettled(key);

    expect(state.isLoading()).toBeTrue();
    expect(state.error()).toEqual(
      Object({
        message: 'the error',
        details: 'the error',
        raw: 'the error',
        timestamp: jasmine.any(Number),
        featureCellKey: 'external'
      })
    );
    verifyFullPipelineEmployees(state.value());

    expect(resetEvents).toEqual([]);
    expect(destroyedEvents).toEqual([]);

    // New Test
    resetEvents.length = 0;
    testService.vault.reset();
    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.hasValue()).toBeFalse();
    expect(state.value()).toBeUndefined();

    expect(resetEvents).toEqual(['reset']);
    expect(destroyedEvents).toEqual([]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, f11Snapshot);
  });
});
