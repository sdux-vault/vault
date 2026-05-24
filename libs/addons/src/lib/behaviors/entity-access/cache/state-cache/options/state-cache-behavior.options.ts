import { ResolveType, StateInputType } from '@sdux-vault/shared';
import { CacheTTLType } from '../types/cache-ttl.type';

/**
 * Defines configuration options that control state cache behavior.
 *
 * These options specify cache lifetime, entity identification, and
 * how cache misses are resolved through the state pipeline.
 *
 */
export interface StateCacheBehaviorOptions<T> {
  /**
   * Time-to-live value that determines how long cached entries remain valid.
   */
  ttl: CacheTTLType;

  /**
   * Property name used to extract a unique identifier from entities.
   */
  idKey: string;

  /**
   * Resolution strategy used to execute cache miss fetch operations.
   */
  fetchType: ResolveType;

  /**
   * Function invoked to resolve an entity when a cache miss occurs.
   */
  fetch: (id: string) => StateInputType<T> | Promise<T>;
}
