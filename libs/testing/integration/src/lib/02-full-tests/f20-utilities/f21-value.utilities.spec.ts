import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { of } from 'rxjs';
import { flushVaultPipeline } from '../../../../../utils/src/public-api';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { verifyAllEmployees } from '../../structure/utils/verify-all-employees.util';
import { verifyFullPipelineEmployees } from '../../structure/utils/verify-full-pipeline-employees.util';
import { f0xUtilityService } from '../services/full-utility.service';
import { f21Snapshot } from './snap-shots/f21-value.utilities.snapshot';

describe('f21: State Side Effects - Observable', () => {
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
  });

  it('should handle reset and reset$ through the entire pipe', async () => {
    const bankEmployeeData = getBankEmployeeData();
    testService.vault.reset$?.subscribe(() => resetEvents.push('reset'));
    testService.vault.destroyed$?.subscribe(() =>
      destroyedEvents.push('destroyed')
    );
    let state = testService.getState();

    // New Test
    testService.vault.replaceState(of(bankEmployeeData as BankEmployeeShape[]));
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    verifyAllEmployees(bankEmployeeData);
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

    expect(resetEvents).toEqual([]);
    expect(destroyedEvents).toEqual([]);

    // New Test
    resetEvents.length = 0;
    testService.vault.replaceState(of(bankEmployeeData as BankEmployeeShape[]));
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    verifyAllEmployees(bankEmployeeData);
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
    testService.vault.replaceState(of(bankEmployeeData as BankEmployeeShape[]));
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    verifyAllEmployees(bankEmployeeData);
    verifyFullPipelineEmployees(state.value());

    expect(resetEvents).toEqual([]);
    expect(destroyedEvents).toEqual([]);

    // New Test
    resetEvents.length = 0;
    testService.vault.reset();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.hasValue()).toBeFalse();
    expect(state.value()).toBeUndefined();

    expect(resetEvents).toEqual(['reset']);
    expect(destroyedEvents).toEqual([]);
  });

  it('should have the correct insight events', async () => {
    await vaultSettled(key);
    expectMonitorSnapshot(emitted, f21Snapshot);
  });
});
