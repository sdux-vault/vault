/**
 * Converts a PascalCase or camelCase string into kebab-case.
 *
 * This utility identifies transitions between lowercase-to-uppercase
 * and uppercase-to-uppercase-then-lowercase sequences, inserting hyphens
 * at the appropriate boundaries. The final output is fully lowercased.
 *
 * ### Examples
 * ```ts
 * toKebabCase('AppStateService'); // "app-state-service"
 * toKebabCase('HTTPServerError'); // "http-server-error"
 * toKebabCase('valueStream');     // "value-stream"
 * ```
 *
 * @param name - The string to convert into kebab-case.
 * @returns The kebab-case version of the provided string.
 */
export function toKebabCase(name) {
  return name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}
