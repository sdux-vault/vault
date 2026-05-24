import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialWithDistinctUntilChangedService } from './partial-operator.with-distinct-until-change.service';
import { p182Snapshot } from './snap-shots/p182-operator.with-distinct-until-change.comparison.snapshot';

describe('p182: Operator - Distinct Until Change - Comparison Test', () => {
  const key = 'partial-operator-with-distinct-until-changed';
  let testService: PartialWithDistinctUntilChangedService;
  let stopListening: () => void;

  const emitted: any[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        PartialWithDistinctUntilChangedService,
        provideZonelessChangeDetection(),
        provideFeatureCell(PartialWithDistinctUntilChangedService, {
          key: 'partial-operator-with-distinct-until-changed',
          initialState: null,
          insights: {} as any
        })
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialWithDistinctUntilChangedService);
    testService.initializeWithComparison();
  });

  afterEach(() => {
    stopListening();
  });

  it('should produce DIFFERENT results based on comparator (JSON vs reference equality)', async () => {
    const state = testService.getState();
    await vaultSettled(key);

    expect(state.value()).toBeUndefined();

    testService.vault.replaceState([
      Object({
        id: '1',
        name: 'Kai'
      })
    ]);
    await vaultSettled(key);

    expect(state.value()).toEqual([
      Object({
        id: '1',
        name: 'Kai'
      })
    ]);

    testService.vault.mergeState([
      Object({
        id: '1',
        name: 'Kai'
      })
    ]);
    await vaultSettled(key);

    expect(state.value()).toEqual([
      Object({
        id: '1',
        name: 'Kai'
      })
    ]);

    testService.vault.mergeState([
      Object({
        id: '1',
        name: 'Brian'
      })
    ]);
    await vaultSettled(key);

    expect(state.value()).toEqual([
      Object({
        id: '1',
        name: 'Kai'
      })
    ]);

    testService.vault.mergeState([
      Object({
        id: '2',
        name: 'Brian'
      })
    ]);
    await vaultSettled(key);

    expect(state.value()).toEqual([
      Object({
        id: '2',
        name: 'Brian'
      })
    ]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p182Snapshot);
  });
});
