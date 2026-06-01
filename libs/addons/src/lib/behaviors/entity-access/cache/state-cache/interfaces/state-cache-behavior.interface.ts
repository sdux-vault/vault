import { BehaviorExtFunction } from '@sdux-vault/shared';
import { Observable } from 'rxjs';
import { StateCacheBehaviorOptions } from '../options/state-cache-behavior.options';

/**
 * Defines the extension surface added to a feature cell by the state cache behavior.
 */
export interface StateCacheBehaviorExtension<TEntity> extends Partial<
  Record<string, BehaviorExtFunction>
> {
  [key: string]: BehaviorExtFunction | undefined;

  /**
   * Resolves an entity by identifier using cache-backed lookup.
   *
   * @param id - Identifier of the entity to resolve.
   * @returns A promise that resolves with the entity value.
   */
  cacheLookup(id: string): Promise<TEntity>;

  /**
   * Resolves an entity by identifier as an observable stream.
   *
   * @param id - Identifier of the entity to resolve.
   * @returns An observable that emits the resolved entity.
   */
  cacheLookup$(id: string): Observable<TEntity>;
}

declare module '@sdux-vault/shared' {
  /**
   * Extends the FeatureCell extensions contract with cache-backed entity lookup APIs.
   * These extensions expose optional methods for resolving entities through a state cache.
   */
  // eslint-disable-next-line
  interface FeatureCellExtension<TEntity> {
    /**
     * Resolves an entity by identifier using a cache-backed lookup.
     *
     * @param id Identifier of the entity to resolve.
     * @returns A promise that resolves with the entity value.
     */
    cacheLookup?<TEntity>(id: string): Promise<TEntity>;

    /**
     * Resolves an entity by identifier using an observable-based lookup.
     *
     * @param id Identifier of the entity to resolve.
     * @returns An observable that emits the resolved entity value.
     */
    cacheLookup$?<TEntity>(id: string): Observable<TEntity>;
  }
}

declare module '@sdux-vault/shared' {
  /**
   * Extends the FeatureCell base shape with state cache configuration support.
   * This extension enables consumers to configure cache behavior directly on the FeatureCell.
   */
  interface FeatureCellFluentApi<TEntity> {
    /**
     * Configures state cache behavior for the FeatureCell.
     *
     * @param options Configuration options for state cache behavior.
     * @returns The FeatureCell instance.
     */
    withStateCache?(options: StateCacheBehaviorOptions<TEntity>): this;
  }
}

/** Module augmentation anchor for the state cache behavior extension. */
export const __stateCache_extension = true;
