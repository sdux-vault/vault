import { DeferredFactory } from '../../types/state/deferred-factory.type';

/**
 * Determines whether a value conforms to the DeferredFactory contract.
 *
 * @param value - The value to inspect.
 * @returns `true` if the value is an object with a callable `value` property.
 */
export function isDeferredFactory<T = unknown>(
  value: unknown
): value is DeferredFactory<T> {
  return (
    !!value &&
    typeof value === 'object' &&
    // eslint-disable-next-line
    typeof (value as any).value === 'function'
  );
}
