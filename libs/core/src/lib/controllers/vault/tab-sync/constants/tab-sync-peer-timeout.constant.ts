/**
 * Maximum time in milliseconds to wait for a peer snapshot response
 * when the tab registry indicates active peers exist. Because peer
 * detection is deterministic via localStorage, this timeout only
 * guards against a registered peer that crashed before cleanup.
 */
export const TAB_SYNC_PEER_TIMEOUT = 3_000;
