import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { partialHttpResourceService } from './partial-http-resource.service';
import { p020Snapshot } from './snap-shots/p020-http-resource.replace.snapshot';

/*************************************************
 * Test: p020 — HttpResource Resolve via replaceState
 *
 * Uses a mock HttpResourceRef to verify the
 * withHttpResourceBehavior resolves an HttpResourceRef
 * input through the pipeline.
 *************************************************/

describe('p020: HttpResource - Replace', () => {
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

  it('should resolve an HttpResourceRef and commit state via replaceState', async () => {
    const state = testService.vault.state;
    await vaultSettled(key);

    expect(state.value()).toEqual([]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    const mockResource = testService.createMockHttpResourceRef(
      getBankEmployeeData(0, true)
    );

    testService.vault.replaceState(mockResource as any);

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
    testService.vault.replaceState(resource2 as any);
    await vaultSettled(key);

    expect(state.value()).toEqual([jasmine.objectContaining({ id: 'be-002' })]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p020Snapshot);
  });
});
