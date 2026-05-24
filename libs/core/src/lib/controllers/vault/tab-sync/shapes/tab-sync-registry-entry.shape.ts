/**
 * Represents a single tab entry in the localStorage tab registry.
 *
 * Each tab writes its own entry on construction and refreshes the
 * timestamp via a heartbeat interval. Stale entries (those whose
 * timestamp exceeds the stale threshold) are pruned when the
 * registry is read by any tab.
 */
export interface TabSyncRegistryEntryShape {
  /**
   * Unique identifier of the registered tab.
   */
  readonly tabId: string;

  /**
   * Unix epoch timestamp of the last heartbeat from this tab.
   * Used to detect stale entries from crashed or force-closed tabs.
   */
  readonly timestamp: number;
}
