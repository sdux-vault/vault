/**
 * Describes a cached entity entry with expiration and refresh state.
 *
 * This shape represents an immutable cached value along with timing metadata
 * used to determine validity and background refresh behavior.
 */
export interface CacheEntryShape<T> {
  /** Cached entity value stored in the cache. */
  value: T;

  /** Timestamp indicating when the value was written to the cache. */
  cachedAt: number;

  /** Absolute timestamp after which the cached value is considered expired. */
  expiresAt: number;

  /** Indicates whether a background refresh operation is currently in progress. */
  isRefreshing: boolean;
}
