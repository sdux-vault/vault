import { Subject } from 'rxjs';
import { StateEmitSnapshotShape } from '../shapes/state/state-emit-snapshot.shape';
import { StateSnapshotShape } from '../shapes/state/state-snapshot.shape';
import { BehaviorClassContext } from './behavior-class.context';

/**
 * Extended behavior class context providing direct state access for tab-sync behaviors.
 */
export interface TabSyncBehaviorClassContext extends BehaviorClassContext {
  /**
   * Live reference to the FeatureCell's mutable state snapshot.
   */
  readonly lastSnapshot: StateSnapshotShape<unknown>;

  /**
   * Subject used to emit state snapshots to the FeatureCell.
   */
  readonly state$: Subject<StateEmitSnapshotShape<unknown>>;
}
