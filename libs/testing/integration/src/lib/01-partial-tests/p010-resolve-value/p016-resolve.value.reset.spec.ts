import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { of } from 'rxjs';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { verifyAllEmployees } from '../../structure/utils/verify-all-employees.util';
import { PartialResolveValueService } from './partial-resolve.value.service';
import { p016Snapshot } from './snap-shots/p016-resolve.value.reset.snapshot';

describe('p016: Resolve - Value - Reset', () => {
  let testService: PartialResolveValueService;
  let stopListening: () => void;

  const emitted: any[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        PartialResolveValueService,
        provideZonelessChangeDetection(),
        provideFeatureCell(PartialResolveValueService, {
          key: 'partial-resolve.value',
          initialState: getBankEmployeeData(),
          insights: {} as any
        })
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialResolveValueService);
    testService.initialize();
  });

  afterEach(() => {
    stopListening();
  });

  it('should replace the bank employees', async () => {
    let state = testService.getState();
    await flushVaultPipeline();

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    /** Next Test */

    testService.vault.replaceState({ value: undefined });
    await flushVaultPipeline();

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    /** Next Test */
    testService.vault.replaceState({ value: undefined });
    await flushVaultPipeline();

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    /** Next Test */
    testService.vault.replaceState({ error: new Error('this is an error') });
    await flushVaultPipeline();

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toEqual(
      Object({
        message: 'this is an error',
        details: jasmine.anything(),
        raw: jasmine.anything(),
        timestamp: jasmine.anything(),
        featureCellKey: 'external'
      })
    );
    expect(state.isLoading()).toBeFalse();

    /** Next Test */
    testService.vault.replaceState({ error: null, value: null });
    await flushVaultPipeline();

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    testService.vault.replaceState(getBankEmployeeData() as any);
    await flushVaultPipeline();

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    /** Next Test */
    testService.vault.replaceState({});
    await flushVaultPipeline();

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    testService.vault.replaceState(getBankEmployeeData() as any);
    await flushVaultPipeline();

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    /** Next Test */
    testService.vault.replaceState(undefined);
    await flushVaultPipeline();

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    testService.vault.replaceState(getBankEmployeeData() as any);
    await flushVaultPipeline();

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    /** Next Test */
    testService.vault.replaceState(null);
    await flushVaultPipeline();

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    testService.vault.replaceState(getBankEmployeeData() as any);
    await flushVaultPipeline();

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    /** Next Test */
    testService.vault.replaceState({ value: null });
    await flushVaultPipeline();

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    testService.vault.replaceState(getBankEmployeeData() as any);
    await flushVaultPipeline();

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    /** Next Test */
    testService.vault.replaceState({ value: () => Promise.resolve(undefined) });
    await flushVaultPipeline();

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    testService.vault.replaceState(getBankEmployeeData() as any);
    await flushVaultPipeline();

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    /** Next Test */
    testService.vault.replaceState({ value: () => Promise.resolve(null) });
    await flushVaultPipeline();

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    testService.vault.replaceState(getBankEmployeeData() as any);
    await flushVaultPipeline();

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    /** Next Test */
    testService.vault.replaceState({
      value: () => Promise.resolve({ value: null } as any)
    });
    await flushVaultPipeline();

    expect(state.value()).toEqual(Object({ value: null }));
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    testService.vault.replaceState(getBankEmployeeData() as any);
    await flushVaultPipeline();

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    /** Next Test */
    testService.vault.replaceState({
      value: () => Promise.resolve({ value: undefined } as any)
    });
    await flushVaultPipeline();

    expect(state.value()).toEqual(Object({ value: undefined }));
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    testService.vault.replaceState(getBankEmployeeData() as any);
    await flushVaultPipeline();

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    /** Next Test */
    testService.vault.replaceState(of(undefined as any));
    await flushVaultPipeline();

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    testService.vault.replaceState(getBankEmployeeData() as any);
    await flushVaultPipeline();

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    /** Next Test */
    testService.vault.replaceState(of(null as any));
    await flushVaultPipeline();

    expect(state.value()).toBeUndefined();
    expect(state.hasValue()).toBeFalse();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    testService.vault.replaceState(getBankEmployeeData() as any);
    await flushVaultPipeline();

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    /** Next Test */
    testService.vault.replaceState(of({ value: null } as any));
    await flushVaultPipeline();

    expect(state.value()).toEqual(Object({ value: null }));
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    testService.vault.replaceState(getBankEmployeeData() as any);
    await flushVaultPipeline();

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    /** Next Test */
    testService.vault.replaceState(of({ value: undefined } as any));
    await flushVaultPipeline();

    expect(state.value()).toEqual(Object({ value: undefined }));
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    testService.vault.replaceState(getBankEmployeeData() as any);
    await flushVaultPipeline();

    verifyAllEmployees(state.value());
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p016Snapshot);
  });
});
