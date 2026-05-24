import { StateSnapshotShape } from '../../shapes/state/state-snapshot.shape';

/** Callback type invoked when the core emits a state snapshot. */
export type CoreEmitStateCallback<T, E = void> = (
  snapshot: StateSnapshotShape<T>
) => E;
