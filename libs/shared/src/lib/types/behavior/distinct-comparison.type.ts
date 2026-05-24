/**
 * Comparison function used by withDistinctUntilChanged to determine
 * whether the new incoming value should be considered equal to the
 * previously emitted value.
 *
 * @typeParam T - The value type being compared.
 */
export type DistinctComparison<T> = (a: T, b: T) => boolean;
