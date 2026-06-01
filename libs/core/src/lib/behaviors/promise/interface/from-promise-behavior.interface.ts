import {
  BehaviorExtFunction,
  DeferredFactory,
  StateInputShape
} from '@sdux-vault/shared';

/**
 * Runtime extension contract for promise-based state resolution APIs.
 *
 * This interface defines the behavior extension surface exposed when a
 * promise-capable resolve behavior is installed. It declares the dynamic
 * methods added to a FeatureCell to support deferred and promise-based
 * resolution through the pipeline.
 *
 */
export interface FromPromiseBehaviorExtension extends Partial<
  Record<string, BehaviorExtFunction>
> {
  [key: string]: BehaviorExtFunction | undefined;

  /**
   * Resolves state from a deferred factory using promise semantics.
   */
  fromPromise: BehaviorExtFunction;

  /**
   * Resolves state from a deferred factory using deferred semantics.
   */
  fromDeferred: BehaviorExtFunction;
}

declare module '@sdux-vault/shared' {
  /**
   * FeatureCell extension methods for promise-based state resolution.
   */
  interface FeatureCellExtension<TEntity> {
    /**
     * Resolves state from a deferred factory using deferred semantics.
     *
     * @param incoming Deferred factory that produces the state value.
     * @returns A promise resolving to a normalized state envelope.
     */
    fromDeferred?(
      incoming: DeferredFactory<TEntity>
    ): Promise<StateInputShape<TEntity>>;

    /**
     * Resolves state from a deferred factory using promise semantics.
     *
     * @param incoming Deferred factory that produces the state value.
     * @returns A promise resolving to a normalized state envelope.
     */
    fromPromise?(
      incoming: DeferredFactory<TEntity>
    ): Promise<StateInputShape<TEntity>>;
  }
}

/** Module augmentation anchor for the fromPromise behavior extension. */
export const __fromPromise_extension = true;
