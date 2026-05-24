import { VaultErrorShape } from '../vault-error.shape';

/**
 * Defines the immutable snapshot shape representing FeatureCell state at a specific moment.
 * This interface exposes loading, value, and error indicators used by consumers to reason about current state.
 *
 */
export interface StateSnapshotShape<T> {
  /**
   * Indicates whether the state is currently in a loading phase.
   */
  isLoading: boolean;

  /**
   * The resolved value for this snapshot, or `undefined` when no value exists.
   */
  value: T | undefined;

  /**
   * Error associated with the state at this moment, or `null` if no error is present.
   */
  error: VaultErrorShape | null;

  /**
   * Whether the snapshot contains a non-undefined value.
   */
  hasValue: boolean;
}
