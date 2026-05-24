/**
 * Interval in milliseconds at which each tab refreshes its timestamp
 * in the localStorage tab registry. Keeps this tab's entry fresh
 * so peer tabs do not treat it as stale.
 */
export const TAB_SYNC_HEARTBEAT_INTERVAL = 5_000;
