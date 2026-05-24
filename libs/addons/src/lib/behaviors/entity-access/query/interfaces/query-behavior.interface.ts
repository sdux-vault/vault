import { BehaviorExtFunction } from '@sdux-vault/shared';
import { QueryBehaviorOptions } from '../options/query-behavior.options';

/**
 * Defines the FeatureCell extension contract introduced by query behavior.
 *
 * This interface describes the query-related API that becomes available on a
 * FeatureCell instance for synchronous entity lookups by identifier.
 */
export interface QueryBehaviorExtension<TEntity>
  extends Partial<Record<string, BehaviorExtFunction>> {
  /**
   * Index signature supporting dynamic behavior extension bindings.
   */
  [key: string]: BehaviorExtFunction | undefined;

  /**
   * Queries an entity by identifier from the current state.
   *
   * @param id - Identifier used to locate the entity.
   * @returns The matching entity, or undefined if not found.
   */
  query(id: string): TEntity | undefined;
}

declare module '@sdux-vault/shared' {
  /** Augments FeatureCell extensions with the query API. */
  interface FeatureCellExtension<TEntity> {
    /**
     * Queries an entity by identifier from the current state.
     *
     * @param id - Identifier used to locate the entity.
     * @returns The matching entity, or undefined if not found.
     */
    query?(id: string): TEntity | undefined;
  }
}

declare module '@sdux-vault/shared' {
  /**
   * Augments the FeatureCell base shape with query configuration support.
   */
  // eslint-disable-next-line
  interface FeatureCellFluentApi<TEntity> {
    /**
     * Registers query behavior configuration on the FeatureCell instance.
     *
     * @param options - Options used to configure query behavior.
     * @returns The FeatureCell instance for chaining.
     */
    withQuery?(options: QueryBehaviorOptions): this;
  }
}
