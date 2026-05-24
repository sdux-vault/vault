import { StateSnapshotShape } from '@sdux-vault/shared';
import { TabSyncChannelMessageType } from '../types/tab-sync-channel-message.type';

/**
 * Defines the message payload transmitted between tab sync controllers
 * via BroadcastChannel during the initial cross-tab negotiation phase.
 *
 * Request messages carry no snapshot and signal that a new tab needs
 * the current state. Snapshot delivery is handled by the behavior
 * via the internal bus, not through this channel.
 */
export interface TabSyncChannelMessageShape<T> {
  /**
   * Discriminator indicating the message type.
   */
  readonly messageType: TabSyncChannelMessageType;

  /**
   * Unique identifier of the FeatureCell scoping this negotiation.
   */
  readonly featureCellKey: string;

  /**
   * Unique tab identifier of the message sender.
   */
  readonly tabId: string;

  /**
   * The full state snapshot included in response messages.
   * Undefined for request messages.
   */
  readonly snapshot?: StateSnapshotShape<T>;
}
