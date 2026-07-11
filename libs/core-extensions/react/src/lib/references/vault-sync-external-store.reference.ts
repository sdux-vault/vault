import { StateSnapshotShape } from '@sdux-vault/shared';

/**
 * React render-time subscription surface exposed by a wrapped FeatureCell.
 *
 * This interface defines the explicit hook-based API used by React components
 * to subscribe to FeatureCell snapshots during render without weakening the
 * core runtime's snapshot immutability guarantees.
 */
export interface VaultSyncExternalStoreRef<T> {
  /**
   * Subscribes the current React render to FeatureCell updates and returns the
   * latest committed snapshot.
   */
  useSyncExternalStore(): StateSnapshotShape<T>;
}
