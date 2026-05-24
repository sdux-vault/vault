/**
 * Defines the internal pending state for lookup resolution coordination.
 *
 * This interface represents a collection of resolver and rejecter callbacks
 * that are invoked when a lookup operation completes or fails, allowing all
 * pending consumers to be notified with the same result.
 */
export interface LookupPendingShape<TEntity> {
  /**
   * Resolves all pending lookup promises with the provided entity value.
   *
   * @param value - The entity value used to resolve all pending lookups.
   */
  resolveAll(value: TEntity): void;

  /**
   * Rejects all pending lookup promises with the provided error.
   *
   * @param err - The error used to reject all pending lookups.
   */
  // eslint-disable-next-line
  rejectAll(err: any): void;

  /**
   * Collection of resolver callbacks awaiting successful lookup completion.
   */
  resolvers: ((v: TEntity) => void)[];

  /**
   * Collection of rejecter callbacks awaiting lookup failure notification.
   */
  // eslint-disable-next-line
  rejecters: ((e: any) => void)[];
}
