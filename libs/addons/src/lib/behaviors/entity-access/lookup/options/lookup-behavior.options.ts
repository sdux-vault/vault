import { ResolveType, StateInputType } from '@sdux-vault/shared';

/**
 * Defines configuration options for lookup behavior execution.
 *
 * This interface specifies how entities are identified, how missing entities
 * are fetched, and which resolve strategy is used when submitting the fetch
 * result into the pipeline.
 */
export interface LookupBehaviorOptions<T> {
  /**
   * Property name on the entity used as the lookup identifier.
   *
   * The value resolved from this property is used to match and retrieve
   * entities during lookup operations.
   */
  idKey: string;

  /**
   * Resolve strategy used when processing the fetch result.
   *
   * This value determines how the pipeline interprets the value returned
   * from the fetch function.
   */
  fetchType: ResolveType;

  /**
   * Function invoked to retrieve an entity when it is not present in cache.
   *
   * The returned value is submitted directly into the pipeline for resolution
   * according to the configured resolve type.
   *
   * @param id - The lookup identifier value.
   * @returns A state input value to be resolved by the pipeline.
   */
  fetch: (id: string) => StateInputType<T> | Promise<T>;
}
