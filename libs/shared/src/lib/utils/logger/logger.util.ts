import { ConsoleType, ConsoleTypes } from '../../types/logging/console.type';
import {
  LogLevelType,
  LogLevelTypes
} from '../../types/logging/log-level.type';

/** Current log level threshold controlling which messages are emitted. */
let _logLevel: LogLevelType = LogLevelTypes.Off;

/**
 * Prefix applied to all vault-related console output. Used to keep log
 * messages consistently identifiable across all log levels.
 */
const LOG_PREFIX = '[vault]';

/**
 * Routes a log message to the console if the current log level permits it.
 *
 * @param level - The console severity level for this message.
 * @param args - Console arguments to log.
 */
// eslint-disable-next-line
function push(level: ConsoleType, ...args: any[]): void {
  const logLevel = getVaultLogLevel();

  if (logLevel === LogLevelTypes.Off) return;

  const levels: ConsoleType[] = [
    ConsoleTypes.Error,
    ConsoleTypes.Warn,
    ConsoleTypes.Log,
    ConsoleTypes.Debug
  ];

  const allowed = levels.indexOf(level) <= levels.indexOf(logLevel!);

  if (!allowed) return;

  // eslint-disable-next-line
  console[level](LOG_PREFIX, ...args);
}

/**
 * Emits an `error`-level Vault log message.
 *
 * @param args - Console arguments to log.
 */
// eslint-disable-next-line
export const vaultError = (...args: any[]) => push('error', ...args);

/**
 * Emits a `warn`-level Vault log message.
 *
 * @param args - Console arguments to log.
 */
// eslint-disable-next-line
export const vaultWarn = (...args: any[]) => push('warn', ...args);

/**
 * Emits a `log`-level Vault log message.
 *
 * @param args - Console arguments to log.
 */
// eslint-disable-next-line
export const vaultLog = (...args: any[]) => push('log', ...args);

/**
 * Emits a `debug`-level Vault log message.
 *
 * @param args - Console arguments to log.
 */
// eslint-disable-next-line
export const vaultDebug = (...args: any[]) => push('debug', ...args);

/**
 * Sets the global Vault log level threshold.
 *
 * @param level - The log level to apply.
 */
export function setVaultLogLevel(level: LogLevelType) {
  _logLevel = level ?? 'off';
}

/**
 * Returns the current global Vault log level.
 *
 * @returns The active log level threshold.
 */
export function getVaultLogLevel(): LogLevelType {
  return _logLevel;
}
