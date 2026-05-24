import { DeferredType } from './deferred.type';

/** Shape wrapping a deferred value factory with optional loading and error state. */
export type DeferredFactory<T> = Partial<{
  loading: boolean;

  value: DeferredType<T>;

  error: unknown;
}>;
