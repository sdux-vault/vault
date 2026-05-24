/**
 * Maximum age in milliseconds before a tab registry entry is
 * considered stale. Entries older than this threshold are ignored
 * during peer detection and pruned on next registry read.
 * Acts as a safety net for tabs that closed without cleanup
 * (e.g. browser crash, force-quit). Set to 3x the heartbeat
 * interval so a tab missing a single heartbeat under CPU load
 * is not prematurely pruned.
 */
export const TAB_SYNC_STALE_THRESHOLD = 15_000;
