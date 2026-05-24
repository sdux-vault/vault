/**
 * Defines the allowable verbosity levels for Vault logging.
 *
 * A `LogLevel` controls the amount of diagnostic output emitted by the
 * vault’s internal debug, warning, or error channels. Higher levels
 * produce more detailed logs, while lower levels suppress output.
 *
 * - `'off'`   — no logs are emitted
 * - `'error'` — only errors are logged
 * - `'warn'`  — warnings and errors are logged
 * - `'log'`   — standard log events, warnings, and errors are logged
 * - `'debug'` — all debug-level information is emitted
 */

/** Enumeration of Vault log verbosity levels. */
export const LogLevelTypes = {
  Off: 'off',
  Error: 'error',
  Warn: 'warn',
  Log: 'log',
  Debug: 'debug'
} as const;

/** Union type derived from LogLevelTypes values. */
export type LogLevelType = (typeof LogLevelTypes)[keyof typeof LogLevelTypes];
