import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { partialHttpResourceService } from './partial-http-resource.service';

import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { p021Snapshot } from './snap-shots/p021-http-resource.merge.snapshot';
/*************************************************
 * Test: p021 — HttpResource Resolve via mergeState
 *
 * Uses a mock HttpResourceRef to verify the
 * withHttpResourceBehavior resolves an HttpResourceRef
 * submitted through mergeState().
 *
 * The Resolve stage runs before merge — the HttpResourceRef
 * must be resolved to a plain value before the merge
 * behavior combines it with committed state.
 *************************************************/

describe('p021: HttpResource - Merge', () => {
  let testService: partialHttpResourceService;
  let stopListening: () => void;
  const key = 'partial-http-resource';
  const emitted: any[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        partialHttpResourceService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          partialHttpResourceService,
          {
            key,
            initialState: []
          },
          []
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(partialHttpResourceService);
    testService.initialize();
  });

  afterEach(() => {
    stopListening();
  });

  it('should resolve an HttpResourceRef via mergeState and commit state', async () => {
    const state = testService.vault.state;
    await vaultSettled(key);

    expect(state.value()).toEqual([]);
    expect(state.hasValue()).toBeTrue();

    const mockResource = testService.createMockHttpResourceRef(
      getBankEmployeeData(0, true)
    );

    testService.vault.mergeState(mockResource as any);

    await vaultSettled(key);

    expect(state.value()).toEqual([
      jasmine.objectContaining({
        id: 'be-001',
        firstName: 'Alice',
        lastName: 'Wells'
      })
    ]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    const resource2 = testService.createMockHttpResourceRef(
      getBankEmployeeData(1, true)
    );
    testService.vault.mergeState(resource2 as any);
    await vaultSettled(key);

    // Default merge behavior (withArrayMerge) replaces the array
    expect(state.value()).toEqual([jasmine.objectContaining({ id: 'be-002' })]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p021Snapshot);
  });
});
