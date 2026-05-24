/**
 * Represents a pending cache lookup with deferred resolution handlers.
 *
 * This shape collects resolver and rejecter callbacks to coordinate multiple
 * consumers awaiting the same in-flight cache fetch.
 */
export interface CachePendingShape<T> {
  /**
   * Resolves all pending consumers with the provided value.
   *
   * @param value - Value to resolve all pending lookups with.
   */
  resolveAll(value: T): void;

  /**
   * Rejects all pending consumers with the provided error.
   *
   * @param err - Error used to reject all pending lookups.
   */
  // eslint-disable-next-line
  rejectAll(err: any): void;

  /**
   * Collection of resolve callbacks awaiting a successful fetch.
   */
  resolvers: ((v: T) => void)[];

  /**
   * Collection of reject callbacks awaiting a failed fetch.
   */
  // eslint-disable-next-line
  rejecters: ((e: any) => void)[];
}
