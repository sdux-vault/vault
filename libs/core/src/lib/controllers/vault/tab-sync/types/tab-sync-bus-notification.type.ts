/**
 * Defines the supported notification types emitted by the tab sync behavior to the controller.
 *
 * These notifications inform the controller about the outcome of the
 * cross-tab negotiation phase during initial FeatureCell startup.
 */
export const TabSyncBusNotificationTypes = {
  PeerSnapshotReceived: 'peer-snapshot-received',
  SnapshotReady: 'snapshot-ready'
} as const;

/**
 * Represents the union type of all tab sync bus notification values.
 */
export type TabSyncBusNotificationType =
  (typeof TabSyncBusNotificationTypes)[keyof typeof TabSyncBusNotificationTypes];
