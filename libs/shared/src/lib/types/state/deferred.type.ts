/** Factory function type that lazily produces a state value or a Promise of one. */
export type DeferredType<T> = () =>
  T | undefined | null | Promise<T | undefined | null>;
