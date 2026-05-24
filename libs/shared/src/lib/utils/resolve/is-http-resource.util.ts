import { HttpResourceRefShape } from '../../shapes/http-resource-ref-shape.shape';

/**
 * Type guard that determines whether a value is an `HttpResourceRef<T>`.
 *
 * An `HttpResourceRef` is a structured object produced by Angular’s
 * `HttpClient` resource APIs. It contains a standardized shape used by
 * Vault to detect and normalize resource-backed state transitions.
 *
 * This utility checks only for the presence of the canonical
 * `HttpResourceRef` fields (`value`, `isLoading`, `error`, `hasValue`)
 * and does not validate the internal content of those properties.
 *
 * @typeParam T - The resource value type.
 *
 * @param obj - The value to test.
 * @returns `true` if the value matches the structural shape of an
 *          `HttpResourceRef<T>`, otherwise `false`.
 */
// eslint-disable-next-line
export function isHttpResourceRef<T>(obj: any): obj is HttpResourceRefShape<T> {
  return !!(
    obj &&
    typeof obj === 'object' &&
    'value' in obj &&
    'isLoading' in obj &&
    'error' in obj &&
    'hasValue' in obj
  );
}
