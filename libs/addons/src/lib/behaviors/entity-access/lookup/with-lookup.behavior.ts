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
import { extendLookupFunction } from './function/extend-lookup.function';
import { LookupBehaviorExtension } from './interfaces/lookup-behavior.interface';
import { LookupBehaviorOptions } from './options/lookup-behavior.options';
import { LookupPendingShape } from './shapes/lookup-pending.shape';

/**
 * FeatureCell extension behavior that provides entity lookup capabilities.
 *
 * This behavior enables cached and on-demand lookup of entities by identifier,
 * coordinating cache state, pending requests, and pipeline fetch resolution
 * based on configured lookup options.
 *
 */
@VaultBehavior({
  type: BehaviorTypes.Extension,
  key: defineBehaviorKey('Core', 'Lookup'),
  critical: false,
  wantsConfig: true,
  configKey: 'withLookup'
})
export class withLookupBehavior<TState, TEntity>
  implements BehaviorContract<TState, LookupBehaviorExtension<TEntity>>
{
  /**
   * Static extension function used to augment the FeatureCell API.
   */
  static readonly extension = extendLookupFunction;

  /**
   * Static behavior type identifier.
   */
  static readonly type: BehaviorType;

  /**
   * Static behavior key identifier.
   */
  static readonly key: string;

  /**
   * Indicates whether the behavior is critical in the pipeline.
   */
  static readonly critical: boolean;

  /**
   * Indicates that this behavior expects configuration input.
   */
  static readonly wantsConfig: boolean;

  /**
   * Configuration key used to store behavior options.
   */
  static readonly configKey: string;

  /**
   * Installs the fluent lookup configuration API onto the FeatureCell.
   *
   * @param cell - The FeatureCell instance to extend.
   * @param behaviorConfigs - The behavior configuration storage map.
   */
  static installFluentApi<T>(
    cell: FeatureCellBaseShape<T>,
    behaviorConfigs: Map<string, unknown>
  ) {
    cell.withLookup = function (options: LookupBehaviorOptions<T>) {
      behaviorConfigs.set(withLookupBehavior.configKey, options);
      return this;
    };
  }

  /**
   * Instance-level behavior type identifier.
   */
  readonly type = withLookupBehavior.type;

  /**
   * Indicates that this behavior is non-critical.
   */
  readonly critical = withLookupBehavior.critical;

  /**
   * Unique behavior key for this instance.
   */
  readonly key: string;

  /**
   * Lookup configuration options supplied by the consumer.
   */
  readonly #options: LookupBehaviorOptions<TState>;

  /**
   * Internal key used to associate lookup options with state emissions.
   */
  #optionsKey = 'withLookupBehavior';

  /**
   * Cache of resolved entities indexed by identifier.
   */
  #cache = new Map<string, TEntity>();

  /**
   * Registry of pending lookup requests awaiting resolution.
   */
  #pending = new Map<string, LookupPendingShape<TEntity>>();

  /**
   * Subscription tracking state emission events.
   */
  #stateSubcribe?: Subscription;

  /**
   * Creates a new lookup behavior instance.
   *
   * @param key - Unique identifier assigned by the behavior factory.
   * @param behaviorCtx - Behavior class context containing configuration.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    this.key = key;
    this.#options = behaviorCtx.behaviorConfig as LookupBehaviorOptions<TState>;

    if (!this.#options) {
      throw new Error(
        '[vault] Lookup behavior requires configuration via withLookup()'
      );
    }

    if (!this.#options.idKey) {
      throw new Error('[vault] Lookup behavior requires idKey');
    }

    if (!Object.values(ResolveTypes).includes(this.#options.fetchType)) {
      throw new Error(
        `[vault] Lookup behavior requires a valid fetchType (ResolveType). Received: ${this.#options.fetchType}`
      );
    }

    if (!this.#options.fetch) {
      throw new Error('[vault] Lookup behavior requires fetch(id)');
    }

    if (!isFunction(this.#options.fetch)) {
      throw new Error(
        '[vault] Lookup behavior requires fetch(id) to be a function'
      );
    }
  }

  /**
   * Extends the FeatureCell API with lookup functions.
   *
   * @param ctx - FeatureCell extension context.
   * @returns An object containing lookup APIs.
   */
  extendCellAPI(ctx: FeatureCellExtensionContext<TState>) {
    const { idKey } = this.#options;

    this.#stateSubcribe?.unsubscribe();

    this.#stateSubcribe = ctx.state$.subscribe(
      (stateEmitSnapshot: StateEmitSnapshotShape<TState>) => {
        const { snapshot, options, type } = stateEmitSnapshot;

        // eslint-disable-next-line
        const id = (options as any)?.[this.#optionsKey]?.id ?? null;

        switch (type) {
          case StateEmitTypes.AbortController:
          case StateEmitTypes.DenyController: {
            vaultDebug(`${this.key} lookup ${type} detected for id "${id}"`);
            this.#deleteCacheEntry(id); // resolves pending undefined
            return;
          }

          case StateEmitTypes.PipelineReset: {
            vaultDebug(`${this.key} cache reset detected`);
            this.#cacheCleanup();
            return;
          }

          case StateEmitTypes.PipelineError: {
            if (id == null) {
              this.#resolveAllPendingAsUndefined();
              return;
            }

            this.#deleteCacheEntry(id);
            return;
          }

          case StateEmitTypes.IncomingPipeline: {
            if (snapshot?.value === null) {
              vaultDebug(`${this.key} cache reset detected`);
              this.#cacheCleanup();
            }

            return;
          }

          case StateEmitTypes.FinalizePipeline: {
            const value = snapshot?.value;

            if (isNullish(value)) {
              if (id == null && snapshot?.value === null) {
                vaultDebug(`${this.key} cache reset detected`);
                this.#cacheCleanup();
                return;
              }

              this.#deleteCacheEntry(id);
              return;
            }

            const entities = this.#normalizeEntities(value);

            if (entities.length > 0) {
              let fetchFound = false;

              for (const entity of entities) {
                // eslint-disable-next-line
                const rawId = (entity as any)?.[idKey];
                if (rawId == null) continue;
                if (typeof rawId !== 'string' && typeof rawId !== 'number')
                  continue;

                if (rawId === id) {
                  fetchFound = true;
                }

                const entityId = String(rawId);
                if (!entityId) continue;

                this.#recordEntity(entityId, entity);

                const pending = this.#pending.get(entityId);
                if (!pending) continue;

                pending.resolveAll(entity);
                this.#pending.delete(entityId);
              }

              if (!fetchFound) {
                this.#deleteCacheEntry(id);
              }
            } else {
              this.#deleteCacheEntry(id);
            }

            return;
          }

          default: {
            return;
          }
        }
      }
    );

    const lookupInternal = (id: string): Promise<TEntity> => {
      const cached = this.#cache.get(id);
      if (cached) {
        vaultDebug(`${this.key} lookup cache hit for id "${id}"`);
        return Promise.resolve(isolateValue(cached));
      }

      const existing = this.#pending.get(id);
      if (existing) {
        return new Promise((resolve, reject) => {
          existing.resolvers.push(resolve);
          existing.rejecters.push(reject);
        });
      }

      const pending: LookupPendingShape<TEntity> = {
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
       * Resolves an entity by identifier.
       *
       * @param id - The lookup identifier.
       * @returns A promise resolving to the entity.
       */
      lookup: (id: string): Promise<TEntity> => lookupInternal(id),

      /**
       * Resolves an entity by identifier as an observable.
       *
       * @param id - The lookup identifier.
       * @returns An observable that emits the resolved entity.
       */
      lookup$(id: string): Observable<TEntity> {
        return new Observable((observer) => {
          lookupInternal(id)
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

  /**
   * Resets the lookup cache and resolves all pending lookups.
   */
  reset(): void {
    vaultWarn(`${this.key} reset — clearing lookup cache`);
    this.#cache.clear();
    this.#resolveAllPendingAsUndefined();
  }

  /**
   * Destroys the behavior and releases all internal resources.
   */
  destroy(): void {
    vaultWarn(`${this.key} destroy — clearing lookup cache`);
    this.#cache.clear();
    this.#resolveAllPendingAsUndefined();
    this.#stateSubcribe?.unsubscribe();
  }

  /**
   * Removes a cached entity and resolves any pending lookups for the identifier.
   *
   * @param id - The entity identifier.
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
   * Normalizes a resolved state value into an array of entities.
   *
   * @param value - The resolved state value.
   * @returns An array of entities.
   */
  #normalizeEntities(value: TState): TEntity[] {
    return Array.isArray(value) ? value : [value as unknown as TEntity];
  }

  /**
   * Records an entity in the lookup cache.
   *
   * @param id - The entity identifier.
   * @param entity - The entity to cache.
   */
  #recordEntity(id: string, entity: TEntity) {
    this.#cache.set(id, isolateValue(entity));
  }

  /**
   * Resolves all pending lookups with an undefined value.
   */
  #resolveAllPendingAsUndefined() {
    for (const [, pending] of this.#pending) {
      // eslint-disable-next-line
      pending.resolveAll(undefined as any);
    }
    this.#pending.clear();
  }

  /**
   * Submits a lookup fetch request into the pipeline.
   *
   * @param ctx - FeatureCell extension context.
   * @param id - The lookup identifier.
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

  /**
   * Clears the lookup cache and resolves all pending lookups.
   */
  #cacheCleanup(): void {
    this.#resolveAllPendingAsUndefined();
    this.#cache.clear();
  }
}
