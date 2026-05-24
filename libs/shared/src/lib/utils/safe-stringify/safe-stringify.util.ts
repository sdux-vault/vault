/**
 * Safely converts an arbitrary value into a JSON string representation.
 *
 * This function wraps `JSON.stringify` with enhanced handling for non-serializable
 * values, including:
 * - functions
 * - `Error` objects
 * - `Map` and `Set` instances
 * - circular references
 *
 * If serialization fails for any reason, a fallback string `"[unserializable]"`
 * is returned. The replacer ensures stable and predictable stringification for
 * use in logging and debugging utilities.
 *
 * @param value - The value to stringify safely.
 * @returns A JSON-formatted string or a fallback indicator.
 */
export function safeStringify(value: unknown): string {
  try {
    return JSON.stringify(value, jsonSafeReplacer, 2);
  } catch {
    return '[unserializable]';
  }
}

/**
 * Replacer function used by `safeStringify` to handle values that are normally
 * not serializable via `JSON.stringify`.
 *
 * It converts functions, errors, `Map`, and `Set` values into safe structures
 * and detects circular references. If a value cannot be serialized, a fallback
 * marker string is returned.
 *
 * @param _key - The property key being processed (unused).
 * @param val - The value associated with the key.
 * @returns A serializable representation of the value.
 */

function jsonSafeReplacer(_key: string, val: unknown) {
  if (typeof val === 'function') return '[Function]';
  if (val instanceof Error) return { message: val.message, stack: val.stack };
  if (val instanceof Map) return { map: Array.from(val.entries()) };
  if (val instanceof Set) return { set: Array.from(val.values()) };

  // Avoid circular references
  try {
    JSON.stringify(val);
    return val;
  } catch {
    return '[Circular]';
  }
}
