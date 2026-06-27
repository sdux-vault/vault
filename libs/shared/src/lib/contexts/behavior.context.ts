import { Observable, Subject } from 'rxjs';
import { StateEmitSnapshotShape } from '../shapes/state/state-emit-snapshot.shape';
import { StateSnapshotShape } from '../shapes/state/state-snapshot.shape';
import { OperationType } from '../types/operation.type';
import { ResolveType } from '../types/resolve.type';
import { StateInputType } from '../types/state/state-input.type';

/**
 * Defines the execution context supplied to behaviors during pipeline processing.
 * This interface provides access to state snapshots, operation metadata, lifecycle signals, and configuration required for behavior execution.
 */
export interface BehaviorContext<T> {
  /**
   * Emits when the FeatureCell is destroyed. Behaviors may subscribe to this
   * to perform cleanup work.
   */
  destroyed$?: Observable<void>;

  /**
   * The feature cell key
   */
  featureCellKey: string;

  /**
   * The raw incoming payload submitted to the FeatureCell through replace or
   * merge operations. This is the source input used by resolve and merge
   * behaviors to compute next-state values.
   */
  incoming?: StateInputType<T>;

  /**
   * The last snapshow of the state
   */
  lastSnapshot: StateSnapshotShape<T>;

  /**
   * Indicates whether the current pipeline action is a "replace" or "merge"
   * operation. Merge behaviors rely on this to apply correct semantics.
   */
  operation: OperationType;

  /**
   * Optional behavior-specific configuration supplied for the current operation.
   */
  options: unknown;

  /**
   * Emits when the FeatureCell is reset. Behaviors may use this to restore
   * internal state or deferred work.
   */
  reset$?: Observable<void>;

  /**
   * Identifies the resolve mode for the current operation.
   * This is set by resolve behaviors during the resolve stage.
   */
  resolveType?: ResolveType;

  /**
   * Immutable snapshot of the FeatureCell state at the start of the
   * operation. Used by merge, reducer, filter, and operator behaviors to read
   * the current state without mutating it.
   */
  state: Readonly<StateSnapshotShape<T>>;

  /**
   * Emits when the state of the FeatureCell is updated.
   */
  state$: Subject<StateEmitSnapshotShape<T> | undefined>;

  /**
   * The traceId for Devtools debugging and tracking
   * Assigned by the orchestrator
   */
  traceId: string;
}
