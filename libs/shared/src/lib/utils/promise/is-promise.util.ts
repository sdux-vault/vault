/**
 * Determines whether a value is a thenable Promise-like object.
 *
 * @param value - The value to inspect.
 * @returns `true` if the value has a callable `then` property.
 */
export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  return (
    !!value &&
    (typeof value === 'object' || typeof value === 'function') &&
    // eslint-disable-next-line
    typeof (value as any).then === 'function'
  );
}
