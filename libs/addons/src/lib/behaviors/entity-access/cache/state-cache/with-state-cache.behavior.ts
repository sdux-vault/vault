import {
  BehaviorClassContext,
  BehaviorContract,
  BehaviorType,
  BehaviorTypes,
  createVaultError,
  DeferredFactory,
  defineBehaviorKey,
  FeatureCellBaseShape,
  FeatureCellExtensionContext,
  isFunction,
  isNullish,
  isolateValue,
  ResolveTypes,
  StateEmitSnapshotShape,
  StateEmitTypes,
  StateInputType,
  VaultBehavior,
  vaultDebug,
  vaultWarn
} from '@sdux-vault/shared';
import { Observable, Subscription } from 'rxjs';
import {
  extendStateCacheFunction,
  extendWithStateCacheFluent
} from './function/extend-state-cache.function';
import { StateCacheBehaviorExtension } from './interfaces/state-cache-behavior.interface';
import { StateCacheBehaviorOptions } from './options/state-cache-behavior.options';
import { CacheEntryShape } from './shapes/cache-entity.shape';
import { CachePendingShape } from './shapes/cache-pending.shape';
import { CacheTTL } from './types/cache-ttl.type';

/**
 * Adds TTL-based entity caching to a feature cell and coordinates cache-miss resolution through the state pipeline.
 *
 * This behavior provides cache lookup methods, tracks pending lookups for fan-out, and refreshes expired entries.
 */
@VaultBehavior({
  type: BehaviorTypes.Extension,
  key: defineBehaviorKey('Cache', 'State'),
  critical: false,
  wantsConfig: true,
  configKey: 'withStateCache'
})
export class withStateCacheBehavior<
  TState,
  TEntity
> implements BehaviorContract<TState, StateCacheBehaviorExtension<TEntity>> {
  /** Declares the feature cell extension function used to register cache APIs. */
  static readonly extensionCell = extendStateCacheFunction;

  /** Declares the fluent extension function used to register cache configuration APIs. */
  static readonly extensionFluent = extendWithStateCacheFluent;

  /** Declares the behavior type assigned by the behavior system. */
  static readonly type: BehaviorType;

  /** Declares the stable behavior key assigned by the behavior system. */
  static readonly key: string;

  /** Declares whether the behavior is treated as critical by the behavior system. */
  static readonly critical: boolean;

  /** Declares whether configuration is required by the behavior system. */
  static readonly wantsConfig: boolean;

  /** Declares the configuration key used to locate behavior options. */
  static readonly configKey: string;

  /**
   * Installs the fluent configuration API used to register state cache options for a feature cell.
   *
   * @param cell - Feature cell instance to augment with the configuration method.
   * @param behaviorConfigs - Registry used to store behavior configuration keyed by configKey.
   */
  static installFluentApi<T>(
    cell: FeatureCellBaseShape<T>,
    behaviorConfigs: Map<string, unknown>
  ) {
    cell.withStateCache = function (options: StateCacheBehaviorOptions<T>) {
      behaviorConfigs.set(withStateCacheBehavior.configKey, options);
      return this;
    };
  }

  /** Exposes the behavior type for runtime identification. */
  readonly type = withStateCacheBehavior.type;

  /** Exposes whether the behavior is treated as critical at runtime. */
  readonly critical = withStateCacheBehavior.critical;

  /** Holds the runtime behavior key provided by the behavior system. */
  readonly key: string;

  /** Stores the resolved configuration options used by the caching behavior. */
  readonly #options: StateCacheBehaviorOptions<TState>;

  /** Stores cached entities by identifier with expiration metadata. */
  #cache = new Map<string, CacheEntryShape<TEntity>>();

  /** Stores pending lookup fan-out state keyed by identifier. */
  #pending = new Map<string, CachePendingShape<TEntity>>();

  /** Holds the subscription used to observe state emissions for cache synchronization. */
  #stateSubscribe?: Subscription;

  /** Holds the interval handle used to refresh expired cache entries. */
  #refreshTimer?: number;

  /** Defines the internal options key used to tag state merges with an identifier. */
  #optionsKey = 'withStateCacheBehavior';

  /**
   * Creates a caching behavior instance bound to the provided runtime key and behavior context.
   *
   * @param key - Runtime behavior key used for logging and behavior identification.
   * @param behaviorCtx - Behavior context that provides configuration and shared runtime services.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    this.key = key;
    this.#options =
      behaviorCtx.behaviorConfig as StateCacheBehaviorOptions<TState>;

    if (!this.#options) {
      throw new Error(
        '[vault] Cache behavior requires configuration via withStateCache()'
      );
    }

    if (!this.#options.idKey) {
      throw new Error('[vault] Cache behavior requires idKey');
    }

    if (!Object.values(ResolveTypes).includes(this.#options.fetchType)) {
      throw new Error(
        `[vault] Cache behavior requires a valid fetchType (ResolveType). Received: ${this.#options.fetchType}`
      );
    }

    if (!this.#options.fetch) {
      throw new Error('[vault] Cache behavior requires fetch(id)');
    }

    if (!isFunction(this.#options.fetch)) {
      throw new Error(
        '[vault] Cache behavior requires fetch(id) to be a function'
      );
    }

    if (!Object.values(CacheTTL).includes(this.#options.ttl)) {
      throw new Error('[vault] Invalid cache TTL value');
    }
  }

  // ────────────────────────────────────────────────────────────
  // Behavior lifecycle
  // ────────────────────────────────────────────────────────────

  /**
   * Extends the feature cell with cache lookup APIs backed by this behavior instance.
   *
   * @param ctx - Extension context used to observe state emissions and initiate state merges.
   * @returns The cache lookup API surface added to the feature cell.
   */
  extendCellAPI(ctx: FeatureCellExtensionContext<TState>) {
    const { idKey } = this.#options;

    this.#startRefreshLoop(ctx);

    this.#stateSubscribe?.unsubscribe();
    this.#stateSubscribe = ctx.state$.subscribe(
      (stateEmitSnapshot: StateEmitSnapshotShape<TState>) => {
        const { snapshot, options, type } = stateEmitSnapshot;

        // eslint-disable-next-line
        const id = (options as any)?.[this.#optionsKey]?.id ?? null;

        switch (type) {
          case StateEmitTypes.AbortController:
          case StateEmitTypes.DenyController: {
            vaultDebug(`${this.key} cache ${type} detected.`);

            this.#clearRefreshingFlag(id);
            return;
          }

          // ---------------------------------------------
          // RESET: global, terminal, authoritative
          // ---------------------------------------------
          case StateEmitTypes.PipelineReset: {
            vaultDebug(`${this.key} cache reset detected`);

            this.#cacheCleanup();
            return;
          }

          // ---------------------------------------------
          // ERROR: scoped if id present, otherwise global
          // ---------------------------------------------
          case StateEmitTypes.PipelineError: {
            if (id == null) {
              this.#resolveAllPendingAsUndefined();
              this.#clearRefreshingFlags();
              return;
            }

            this.#deleteCacheEntry(id);
            return;
          }

          // ---------------------------------------------
          // INCOMING: loading / pre-resolution signal
          // ---------------------------------------------
          case StateEmitTypes.IncomingPipeline: {
            if (snapshot?.value === null) {
              vaultDebug(`${this.key} cache reset detected`);
              this.#cacheCleanup();
            }

            return;
          }

          // ---------------------------------------------
          // FINALIZE: authoritative resolution
          // ---------------------------------------------
          case StateEmitTypes.FinalizePipeline: {
            const value = snapshot?.value;

            if (isNullish(value)) {
              if (id == null && snapshot?.value === null) {
                vaultDebug(`${this.key} cache reset detected`);
                this.#cacheCleanup();
                return;
              }

              this.#deleteCacheEntry(id!);
              return;
            }

            const entities = this.#normalizeEntities(value);

            if (!entities.length) {
              this.#deleteCacheEntry(id);
              return;
            }

            let fetchFound = false;

            for (const entity of entities) {
              // eslint-disable-next-line
              const rawId = (entity as any)?.[idKey];
              if (rawId == null) continue;
              if (typeof rawId !== 'string' && typeof rawId !== 'number')
                continue;

              const entityId = String(rawId);

              if (entityId === id) {
                fetchFound = true;
              } else if (id !== null) {
                continue;
              }

              if (!entityId) continue;

              const currentEntry = this.#cache.get(entityId);
              const pending = this.#pending.get(entityId);
              const refreshing = currentEntry?.isRefreshing === true;

              if (refreshing) {
                this.#refreshEntity(entityId, entity);
                continue;
              } else if (currentEntry) {
                this.#updateEntity(entityId, entity);
              } else {
                this.#recordEntity(entityId, entity);
              }

              if (!pending) continue;

              pending.resolveAll(entity);
              this.#pending.delete(entityId);
            }

            if (!fetchFound && id !== null) {
              this.#deleteCacheEntry(id);
              return;
            }

            return;
          }

          default: {
            return;
          }
        }
      }
    );

    /**
     * Performs a cached lookup for an entity by identifier with fan-out support for concurrent requests.
     *
     * @param id Identifier used to resolve the cached entity.
     * @returns A promise that resolves with the cached or refreshed entity value.
     */
    const internalCache = (id: string): Promise<TEntity> => {
      const entry = this.#cache.get(id);
      const now = Date.now();

      // --------------------------------------
      // Fresh cache
      // --------------------------------------
      if (entry && now < entry.expiresAt) {
        vaultDebug(`${this.key} cache hit for id "${id}"`);
        return Promise.resolve(isolateValue(entry.value));
      }

      // --------------------------------------
      // Pending fan-out
      // --------------------------------------
      const existing = this.#pending.get(id);
      if (existing) {
        vaultDebug(`${this.key} cache fan-out hit for id "${id}"`);
        return new Promise<TEntity>((resolve, reject) => {
          existing.resolvers.push(resolve);
          existing.rejecters.push(reject);
        });
      }

      // --------------------------------------
      // Expired cache (stale-while-refresh)
      // --------------------------------------
      if (entry) {
        vaultDebug(
          `${this.key} cache expired for id "${id}" - returning stale and refreshing`
        );

        if (!entry.isRefreshing) {
          entry.isRefreshing = true;
          this.#mergeState(ctx, id);
        }

        return Promise.resolve(isolateValue(entry.value));
      }

      // --------------------------------------
      // Cold miss
      // --------------------------------------
      vaultDebug(`${this.key} cache miss for id "${id}"`);

      const pending: CachePendingShape<TEntity> = {
        resolvers: [],
        rejecters: [],
        resolveAll(value) {
          for (const resolver of this.resolvers) resolver(value);
        },
        rejectAll(err) {
          for (const rejecter of this.rejecters) rejecter(err);
        }
      };

      this.#pending.set(id, pending);

      return new Promise<TEntity>((resolve, reject) => {
        pending.resolvers.push(resolve);
        pending.rejecters.push(reject);

        try {
          this.#mergeState(ctx, id);
        } catch (error) {
          pending.rejectAll(createVaultError(error, this.key));
          this.#pending.delete(id);
        }
      });
    };
    return {
      /**
       * Resolves an entity from the cache using a promise-based API.
       *
       * @param id Identifier used to resolve the cached entity.
       * @returns A promise that resolves with the cached or refreshed entity value.
       */
      cacheLookup: (id: string): Promise<TEntity> => internalCache(id),

      /**
       * Resolves an entity from the cache using an observable-based API.
       *
       * @param id Identifier used to resolve the cached entity.
       * @returns Observable that emits the resolved entity and then completes.
       */
      cacheLookup$(id: string): Observable<TEntity> {
        return new Observable((observer) => {
          internalCache(id)
            .then((entity) => {
              observer.next(entity);
              observer.complete();
            })
            .catch((err) => {
              observer.error(err);
            });
        });
      }
    };
  }

  // ────────────────────────────────────────────────────────────
  // Cleanup
  // ────────────────────────────────────────────────────────────

  /** Clears all cached entries and resolves all pending lookups as undefined. */
  reset() {
    vaultWarn(`${this.key} reset — clearing cache`);
    this.#cache.clear();
    this.#resolveAllPendingAsUndefined();
    this.#clearRefreshingFlags();
    this.stopRefreshLoop();
  }

  /** Unsubscribes from state emissions and clears all cached and pending state. */
  destroy() {
    vaultWarn(`${this.key} destroy — clearing cache`);
    this.#cache.clear();
    this.#resolveAllPendingAsUndefined();
    this.#stateSubscribe?.unsubscribe();
    this.stopRefreshLoop();
  }

  /**
   * Removes a cached entry and resolves any pending lookups for the same identifier as undefined.
   *
   * @param id - Identifier of the cache entry to remove.
   */
  #deleteCacheEntry(id: string) {
    if (id == null) return;
    this.#cache.delete(id);

    const pending = this.#pending.get(id);
    if (!pending) return;

    // eslint-disable-next-line
    pending.resolveAll(undefined as any);
    this.#pending.delete(id);
  }

  /**
   * Initiates a state merge that triggers resolution for a cache miss or refresh request.
   *
   * @param ctx - Extension context used to merge state through the feature cell pipeline.
   * @param id - Identifier used to tag the merge options for downstream cache correlation.
   */
  #mergeState(ctx: FeatureCellExtensionContext<TState>, id: string): void {
    const options = Object({});
    options[this.#optionsKey] = Object({ id });

    if (this.#options.fetchType === ResolveTypes.Promise) {
      ctx.mergeState(
        {
          value: () => this.#options.fetch!(id)
        } as DeferredFactory<TState>,
        options
      );
    } else {
      ctx.mergeState(
        this.#options.fetch!(id) as StateInputType<TState>,
        options
      );
    }
  }

  // ────────────────────────────────────────────────────────────
  // Refresh loop
  // ────────────────────────────────────────────────────────────

  /**
   * Starts a periodic refresh loop that triggers resolution for expired entries.
   *
   * @param ctx - Extension context used to trigger refresh merges through the pipeline.
   */
  #startRefreshLoop(ctx: FeatureCellExtensionContext<TState>) {
    if (this.#refreshTimer) return;

    const interval = Math.min(30_000, this.#options.ttl / 2);

    this.#refreshTimer = globalThis.setInterval(() => {
      const now = Date.now();

      for (const [id, entry] of this.#cache) {
        if (now >= entry.expiresAt && !entry.isRefreshing) {
          entry.isRefreshing = true;

          this.#mergeState(ctx, id);
        }
      }
    }, interval) as unknown as number;
  }

  /** Stops the periodic refresh loop used to refresh expired cache entries. */
  private stopRefreshLoop() {
    if (this.#refreshTimer) {
      globalThis.clearInterval(this.#refreshTimer);
      this.#refreshTimer = undefined;
    }
  }

  // ────────────────────────────────────────────────────────────
  // Helpers
  // ────────────────────────────────────────────────────────────

  /**
   * Normalizes a resolved state value into an array of entities for cache recording.
   *
   * @param value - Resolved state value emitted by the pipeline.
   * @returns A list of entities to process for caching.
   */
  #normalizeEntities(value: TState | null | undefined): TEntity[] {
    return Array.isArray(value) ? value : [value as unknown as TEntity];
  }

  /**
   * Records an entity in the cache using the configured time-to-live for expiration.
   *
   * @param id Identifier used as the cache key.
   * @param entity Entity value to store in the cache.
   */
  #recordEntity(id: string, entity: TEntity): void {
    const now = Date.now();

    this.#cache.set(id, {
      value: isolateValue(entity),
      cachedAt: now,
      expiresAt: now + this.#options.ttl,
      isRefreshing: false
    });
  }

  /**
   * Refreshes an existing cache entry with a new entity value and resets the TTL.
   *
   * @param id Identifier used as the cache key.
   * @param entity Refreshed entity value to store.
   */
  #refreshEntity(id: string, entity: TEntity): void {
    const now = Date.now();

    this.#cache.set(id, {
      value: isolateValue(entity),
      cachedAt: now,
      expiresAt: now + this.#options.ttl,
      isRefreshing: false
    });
  }

  /**
   * Updates the cached value for an existing entity entry.
   *
   * @param id Identifier used as the cache key.
   * @param entity Updated entity value to store.
   */
  #updateEntity(id: string, entity: TEntity): void {
    const existing = this.#cache.get(id)!;

    this.#cache.set(id, {
      ...existing,
      value: isolateValue(entity)
    });
  }

  /**
   * Clears the refreshing flag for a single cache entry.
   *
   * @param id Identifier of the cache entry to update.
   */
  #clearRefreshingFlag(id: string) {
    if (!id) return;

    const cacheEntityShape = this.#cache.get(id);
    if (!cacheEntityShape) return;

    vaultDebug(`${this.key} cache entity ${id} isRefreshing set to false.`);
    cacheEntityShape.isRefreshing = false;
  }

  /** Clears the refreshing flag on all cached entries. */
  #clearRefreshingFlags() {
    for (const [id, entry] of this.#cache) {
      vaultDebug(`${this.key} cache entity ${id} isRefreshing set to false.`);
      entry.isRefreshing = false;
    }
  }

  /** Resolves all pending lookups as undefined and clears the pending registry. */
  #resolveAllPendingAsUndefined() {
    for (const [, pending] of this.#pending) {
      // eslint-disable-next-line
      pending.resolveAll(undefined as any);
    }
    this.#pending.clear();
  }

  /** Clears cache state and pending fan-out state for a reset or global failure condition. */
  #cacheCleanup(): void {
    this.#resolveAllPendingAsUndefined();
    this.#cache.clear();
  }
}
