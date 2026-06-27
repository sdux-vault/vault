import { StateSnapshotShape } from '../shapes/state/state-snapshot.shape';
import { OperationType } from '../types/operation.type';
import { StateInputType } from '../types/state/state-input.type';

/**
 * Context supplied to a controller during pipeline admission voting.
 */
export interface ControllerContext<T> {
  /**
   * Unique identifier for the conductor instance that owns this pipeline.
   *
   * Generated once per page load and shared across all behaviors and
   * controllers within the same conductor. Used by cross-tab features
   * to distinguish messages originating from the local tab versus
   * remote peers.
   */
  conductorId: string;
  /**
   * Trace identifier for the current pipeline operation.
   */
  traceId: string;

  /**
   * Key identifying the FeatureCell associated with this operation.
   */
  featureCellKey: string;

  /** Immutable snapshot of the current cell state. */
  snapshot: Readonly<StateSnapshotShape<T>>;

  /** Raw incoming payload for replace/merge. */
  incoming?: StateInputType<T>;

  /** Replace or merge. */
  operation: OperationType;
}
