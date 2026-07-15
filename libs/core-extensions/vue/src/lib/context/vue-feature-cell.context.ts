import { StateEmitSnapshotShape, StateSnapshotShape } from '@sdux-vault/shared';
import { Observable } from 'rxjs';

/**
 * Defines the State surfaces required to augment a FeatureCell for Vue.
 */
export interface VueFeatureCellContext<T> {
  /**
   * Provides synchronous access to the FeatureCell's latest immutable State Snapshot.
   */
  state: StateSnapshotShape<T>;

  /**
   * Emits State Snapshots whenever the FeatureCell State changes.
   */
  state$: Observable<StateEmitSnapshotShape<T>>;
}
