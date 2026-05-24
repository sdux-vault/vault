import { StateEmitType } from '../../types/state/state-emit.type';
import { StateSnapshotShape } from './state-snapshot.shape';

/** Shape wrapping a state snapshot with its emission type and options. */
export interface StateEmitSnapshotShape<T> {
  /** The state snapshot at the time of emission. */
  snapshot: StateSnapshotShape<T>;

  /** Optional configuration passed with the emission. */
  options: unknown | undefined;

  /** Classification of the state emission event. */
  type: StateEmitType;
}
