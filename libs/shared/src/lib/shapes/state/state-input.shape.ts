import { DeferredType } from '../../types/state/deferred.type';

/**
 * Structured shape used to represent a state update packet flowing into the
 * pipeline. Each field is optional, allowing callers to specify only the
 * components of state they intend to update. This snapshot is interpreted by
 * upstream behaviors including resolve, merge, filters, and reducers.
 *
 * @typeParam T - The underlying feature state value type.
 */
export interface StateInputShape<T> {
  /** Indicates whether the feature is currently loading. */
  loading?: boolean;

  /**
   * The state value to apply. This may be the raw state value or the resolved
   * upstream value type as defined by the pipeline.
   */
  value?: T | undefined | null | DeferredType<T>;

  /** Optional error information associated with the state update. */
  error?: unknown;
}
