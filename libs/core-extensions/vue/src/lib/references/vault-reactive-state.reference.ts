import { StateSnapshotShape } from '@sdux-vault/shared';

/**
 * Vue reactive State surface exposed by a wrapped FeatureCell.
 *
 * This interface defines the composable API used by Vue components to consume
 * FeatureCell snapshots reactively without weakening the core runtime's
 * snapshot immutability guarantees.
 */
export interface VaultReactiveStateRef<T> {
  /**
   * Subscribes the active Vue effect scope to FeatureCell updates and returns
   * the latest committed snapshot as a readonly reactive object.
   */
  useReactiveState(): Readonly<StateSnapshotShape<T>>;
}
