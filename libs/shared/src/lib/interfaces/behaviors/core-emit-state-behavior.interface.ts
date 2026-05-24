import { StateSnapshotShape } from '../../shapes/state/state-snapshot.shape';
import { CoreEmitStateCallback } from '../../types/callback/core-emit-state-callback.type';
import { CoreEmitStateResult } from '../../types/state/core-emit-state-result.type';
import { BehaviorContract } from '../behaviors/behavior/behavior.interface';

/**
 * Contract for behaviors that emit finalized state snapshots.
 */
export interface CoreEmitStateBehaviorContract<T> extends BehaviorContract<T> {
  /**
   * Emits a state snapshot through the configured emit callback.
   *
   * @param snapshot - The finalized state snapshot.
   * @param callback - The callback invoked with the snapshot.
   * @returns The emit result indicating pipeline continuation behavior.
   */
  emitState(
    snapshot: StateSnapshotShape<T>,
    callback: CoreEmitStateCallback<T>
  ): CoreEmitStateResult;
}
