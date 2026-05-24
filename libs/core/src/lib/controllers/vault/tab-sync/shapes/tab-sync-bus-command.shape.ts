import { StateSnapshotShape } from '@sdux-vault/shared';
import { TabSyncBusCommandType } from '../types/tab-sync-bus-command.type';

/**
 * Represents a command issued from the tab sync controller to the behavior.
 *
 * Commands direct the behavior to commit cached state, clear the cache,
 * or provide its current snapshot for cross-tab responses.
 */
export interface TabSyncBusCommandShape {
  /**
   * Unique identifier scoping the command to a specific FeatureCell.
   */
  readonly featureCellKey: string;

  /**
   * Tab identifier scoping the command to a specific tab instance.
   *
   * Ensures the behavior only processes commands from its own
   * controller when multiple tab instances share the same bus.
   */
  readonly tabId: string;

  /**
   * The command type indicating the action the behavior should take.
   */
  readonly command: TabSyncBusCommandType;

  /**
   * Optional snapshot carried with the command.
   *
   * Used by CommitCache when the peer snapshot arrived through the
   * controller channel and was not cached by the behavior directly.
   */
  readonly snapshot?: StateSnapshotShape<unknown>;
}
