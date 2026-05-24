import { BehaviorExtFunction } from '@sdux-vault/shared';
import { Observable } from 'rxjs';
import { LookupBehaviorOptions } from '../options/lookup-behavior.options';

/**
 * Defines the FeatureCell extension contract introduced by lookup behavior.
 *
 * This interface describes the lookup-related APIs that become available on a
 * FeatureCell instance, including promise-based and observable-based lookup
 * operations exposed to consumers.
 *
 */
export interface LookupBehaviorExtension<TEntity>
  extends Partial<Record<string, BehaviorExtFunction>> {
  /**
   * Index signature supporting dynamic behavior extension bindings.
   */
  [key: string]: BehaviorExtFunction | undefined;

  /**
   * Resolves an entity by identifier using the lookup behavior.
   *
   * @param id - Identifier used to locate the entity.
   * @returns A promise that resolves to the matching entity.
   */
  lookup(id: string): Promise<TEntity>;

  /**
   * Resolves an entity by identifier as an observable.
   *
   * @param id - Identifier used to locate the entity.
   * @returns An observable that emits the matching entity.
   */
  lookup$(id: string): Observable<TEntity>;
}

declare module '@sdux-vault/shared' {
  /**
   * Augments FeatureCell extensions with lookup APIs.
   */
  // eslint-disable-next-line
  interface FeatureCellExtension<TEntity> {
    /**
     * Resolves an entity by identifier using the lookup behavior.
     *
     * @param id - Identifier used to locate the entity.
     * @returns A promise that resolves to the matching entity.
     */
    lookup?<TEntity>(id: string): Promise<TEntity>;

    /**
     * Resolves an entity by identifier as an observable.
     *
     * @param id - Identifier used to locate the entity.
     * @returns An observable that emits the matching entity.
     */
    lookup$?<TEntity>(id: string): Observable<TEntity>;
  }
}

declare module '@sdux-vault/shared' {
  /**
   * Augments the FeatureCell base shape with lookup configuration support.
   */
  interface FeatureCellFluentApi<TEntity> {
    /**
     * Registers lookup behavior configuration on the FeatureCell instance.
     *
     * @param options - Options used to configure lookup behavior.
     * @returns The FeatureCell instance for chaining.
     */
    withLookup?(options: LookupBehaviorOptions<TEntity>): this;
  }
}

/** Module augmentation anchor for the lookup behavior extension. */
export const __lookup_extension = true;
