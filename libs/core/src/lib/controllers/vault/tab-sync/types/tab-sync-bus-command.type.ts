/**
 * Defines the supported command types issued by the tab sync controller to the behavior.
 *
 * These commands coordinate the initial cross-tab state negotiation
 * between the controller and behavior via the internal bus.
 */
export const TabSyncBusCommandTypes = {
  CommitCache: 'commit-cache',
  ClearCache: 'clear-cache',
  SendSnapshot: 'send-snapshot'
} as const;

/**
 * Represents the union type of all tab sync bus command values.
 */
export type TabSyncBusCommandType =
  (typeof TabSyncBusCommandTypes)[keyof typeof TabSyncBusCommandTypes];
