import { StateEmitType, StateSnapshotShape } from '@sdux-vault/shared';

/**
 * Defines the broadcast payload transmitted between tabs via BroadcastChannel.
 * This shape carries the state snapshot, emission type, and sender identity
 * required for cross-tab state synchronization.
 *
 */
export interface TabSyncMessageShape<T> {
  /**
   * Unique identifier of the FeatureCell that originated this broadcast.
   */
  featureCellKey: string;

  /**
   * Unique tab identifier used by receivers to detect self-originated messages.
   */
  tabId: string;

  /**
   * The immutable state snapshot at the time of broadcast.
   */
  snapshot: StateSnapshotShape<T>;

  /**
   * The state emission classification that triggered this broadcast.
   */
  type: StateEmitType;
}
