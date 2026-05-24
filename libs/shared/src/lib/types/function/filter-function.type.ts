/**
 * A pure function used by the Filter behavior stage.
 *
 * A filter receives the current state value and must return either the same
 * value or a transformed version of it. Implementations must be pure: they
 * must not mutate the input value, trigger side effects, or access external
 * mutable state. Filters execute before reducers and tap behaviors.
 *
 * @typeParam T - The state value type processed by this filter.
 */
export type FilterFunction<T> = (current: T) => T;
