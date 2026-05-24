/**
 * Defines supported cache time-to-live durations in milliseconds.
 *
 * These values provide fixed expiration intervals used to control cache
 * validity and refresh behavior.
 */
export const CacheTTL = {
  OneMinute: 60_000,
  FiveMinutes: 300_000,
  TenMinutes: 600_000,
  FifteenMinutes: 900_000,
  ThirtyMinutes: 1_800_000,
  OneHour: 3_600_000
} as const;

/**
 * Represents the set of allowed cache TTL values.
 *
 * This type constrains TTL configuration to one of the predefined durations.
 */
export type CacheTTLType = (typeof CacheTTL)[keyof typeof CacheTTL];
