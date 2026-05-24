import { Observable } from 'rxjs';
import { VaultMonitorContract } from '../interfaces/vault/vault-monitor.interface';
import { StateEmitSnapshotShape } from '../shapes/state/state-emit-snapshot.shape';
import { StateInputType } from '../types/state/state-input.type';

/** Runtime context provided to behavior extensions for interacting with a FeatureCell. */
export interface FeatureCellExtensionContext<T> {
  /** Observable that emits when the FeatureCell is destroyed. */
  destroyed$: Observable<void>;

  /** Unique key identifying the FeatureCell. */
  featureCellKey: string;

  /**
   * Merges incoming state into the current FeatureCell state.
   *
   * @param incoming - The state input to merge.
   * @param options - Optional merge configuration.
   */
  mergeState(incoming: StateInputType<T>, options?: unknown): Promise<void>;

  /**
   * Replaces the current FeatureCell state with the provided input.
   *
   * @param input - The state input to set.
   * @param options - Optional replacement configuration.
   */
  replaceState(input: StateInputType<T>, options?: unknown): Promise<void>;

  /** Observable that emits when the FeatureCell is reset. */
  reset$: Observable<void>;

  /** Observable stream of state-emit snapshots from the FeatureCell. */
  state$: Observable<StateEmitSnapshotShape<T>>;

  /** Reference to the Vault monitor for diagnostics and tracing. */
  vaultMonitor: VaultMonitorContract;

  /** Optional configuration options for the extension context. */
  options?: unknown;
}
