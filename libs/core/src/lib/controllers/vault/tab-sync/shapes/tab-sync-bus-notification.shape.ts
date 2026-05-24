import { TabSyncBusNotificationType } from '../types/tab-sync-bus-notification.type';

/**
 * Represents a notification emitted from the tab sync behavior to the controller.
 *
 * Notifications inform the controller about peer discovery outcomes
 * and provide snapshot data when requested.
 */
export interface TabSyncBusNotificationShape {
  /**
   * Unique identifier scoping the notification to a specific FeatureCell.
   */
  readonly featureCellKey: string;

  /**
   * The notification type indicating what the behavior is reporting.
   */
  readonly notification: TabSyncBusNotificationType;

  /**
   * Optional snapshot data provided when the notification carries state.
   * Present for `peer-snapshot-received` and `snapshot-ready` notifications.
   */
  readonly snapshot?: unknown;
}
