/**
 * Structural interface representing a reactive, asynchronously resolved resource.
 *
 * This interface intentionally mirrors the *shape* of Angular’s `HttpResourceRef`
 * without introducing any framework dependency. It is used by core Vault logic
 * to interact with resource-backed values in a fully framework-agnostic way.
 *
 * Implementations may be backed by:
 * - Angular `HttpResourceRef`
 * - Signals
 * - Observables
 * - Promises
 * - Custom adapters or test doubles
 *
 * Consumers should treat all methods as **side-effect free** accessors.
 *
 * @typeParam T - The resolved value type of the resource.
 */
export interface HttpResourceRefShape<T> {
  /**
   * Returns the current resolved value of the resource.
   *
   * - Returns `undefined` if the resource has not yet resolved
   * - Returns a value of type `T` once available
   *
   * This method must be safe to call multiple times.
   */
  value(): T | undefined;

  /**
   * Indicates whether the resource is currently loading.
   *
   * @returns `true` while the resource is resolving, otherwise `false`.
   */
  isLoading(): boolean;

  /**
   * Returns the most recent error produced by the resource, if any.
   *
   * @returns An error object, or `null` / `undefined` if no error is present.
   */
  error(): unknown;

  /**
   * Indicates whether the resource currently holds a resolved value.
   *
   * This is semantically equivalent to checking `value() !== undefined`,
   * but is provided explicitly to support resource implementations that
   * track resolution state independently.
   *
   * @returns `true` if a value is available, otherwise `false`.
   */
  hasValue(): boolean;
}
