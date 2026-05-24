/**
 * Defines the supported message types used on the tab sync BroadcastChannel
 * for controller-level cross-tab negotiation.
 *
 * Request messages signal that a newly opened tab needs the current state.
 * Snapshot responses are handled by the behavior via the internal bus.
 */
export const TabSyncChannelMessageTypes = {
  Request: 'ctrl:request',
  Response: 'ctrl:response'
} as const;

/**
 * Represents the union type of all tab sync channel message type values.
 */
export type TabSyncChannelMessageType =
  (typeof TabSyncChannelMessageTypes)[keyof typeof TabSyncChannelMessageTypes];
