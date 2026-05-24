/**
 * Maximum time in milliseconds to wait for a cross-tab snapshot response
 * during initial FeatureCell negotiation. If no response is received
 * within this window, the controller assumes no peer tabs exist
 * and allows normal initialization to proceed.
 */
export const TAB_SYNC_NEGOTIATION_TIMEOUT = 100;
