/**
 * Channel name prefix used for controller-level BroadcastChannel instances.
 * Separates controller negotiation traffic from behavior state sync traffic
 * to prevent cross-contamination of message shapes.
 */
export const TAB_SYNC_CTRL_CHANNEL_PREFIX = 'sdux-vault:tab-sync-ctrl';
