import {
  BehaviorClassContext,
  BehaviorContract,
  BehaviorType,
  BehaviorTypes,
  defineBehaviorKey,
  FeatureCellBaseShape,
  FeatureCellExtensionContext,
  isNullish,
  isolateValue,
  StateEmitSnapshotShape,
  StateEmitTypes,
  VaultBehavior,
  vaultDebug,
  vaultWarn
} from '@sdux-vault/shared';
import { Subscription } from 'rxjs';
import { extendQueryFunction } from './function/extend-query.function';
import { QueryBehaviorExtension } from './interfaces/query-behavior.interface';
import { QueryBehaviorOptions } from './options/query-behavior.options';

/**
 * FeatureCell extension behavior that provides entity query capabilities.
 *
 * This behavior maintains a local cache of entities observed through state
 * emissions and exposes query APIs for resolving entities by identifier.
 *
 * Unlike lookup behavior, query behavior never triggers fetches or submits
 * pipeline work. It only reflects entities that have already entered state.
 */
@VaultBehavior({
  type: BehaviorTypes.Extension,
  key: defineBehaviorKey('Core', 'Query'),
  critical: false,
  wantsConfig: true,
  configKey: 'withQuery'
})
export class withQueryBehavior<TState, TEntity>
  implements BehaviorContract<TState, QueryBehaviorExtension<TEntity>>
{
  /** Extension function that registers the query API on the FeatureCell. */
  static readonly extension = extendQueryFunction;

  /** Static behavior type used for orchestrator classification. */
  static readonly type: BehaviorType;

  /** Unique behavior key used for diagnostics and devtools. */
  static readonly key: string;

  /** Indicates whether this behavior is required by the pipeline. */
  static readonly critical: boolean;

  /** Whether this behavior requires consumer-supplied configuration. */
  static readonly wantsConfig: boolean;

  /** Configuration key used to locate query options in the config registry. */
  static readonly configKey: string;

  /**
   * Registers the fluent withQuery configuration method on the FeatureCell.
   *
   * @param cell - The FeatureCell shape to extend.
   * @param behaviorConfigs - Map of behavior configuration entries.
   */
  static installFluentApi<T>(
    cell: FeatureCellBaseShape<T>,
    behaviorConfigs: Map<string, unknown>
  ) {
    cell.withQuery = function (options: QueryBehaviorOptions) {
      behaviorConfigs.set(withQueryBehavior.configKey, options);
      return this;
    };
  }

  /** The behavior type identifier for this instance. */
  readonly type = withQueryBehavior.type;

  /** Whether this behavior is critical to pipeline execution. */
  readonly critical = withQueryBehavior.critical;

  /** Unique identifier for this behavior instance. */
  readonly key: string;

  /** Resolved query configuration options for this behavior instance. */
  readonly #options: QueryBehaviorOptions;

  /**
   * Cache of resolved entities indexed by identifier.
   */
  #cache = new Map<string, TEntity>();

  /**
   * Subscription tracking state emission events.
   */
  /** Subscription tracking state emission observation. */
  #stateSubcribe?: Subscription;

  /**
   * Creates a new query behavior instance.
   *
   * @param key - Unique behavior identifier supplied by the factory.
   * @param behaviorCtx - Class-level context for dependency resolution.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    this.key = key;
    this.#options = behaviorCtx.behaviorConfig as QueryBehaviorOptions;

    if (!this.#options) {
      throw new Error(
        '[vault] Query behavior requires configuration via withQuery()'
      );
    }

    if (!this.#options.idKey) {
      throw new Error('[vault] Query behavior requires idKey');
    }
  }

  /**
   * Extends the FeatureCell with the query subscription and lookup API.
   *
   * @param ctx - Extension context used to observe state emissions.
   * @returns The query extension API surface.
   */
  extendCellAPI(ctx: FeatureCellExtensionContext<TState>) {
    const { idKey } = this.#options;

    this.#stateSubcribe?.unsubscribe();

    this.#stateSubcribe = ctx.state$.subscribe(
      (stateEmitSnapshot: StateEmitSnapshotShape<TState>) => {
        const { snapshot, type } = stateEmitSnapshot;

        switch (type) {
          case StateEmitTypes.PipelineReset: {
            vaultDebug(`${this.key} cache reset detected`);
            this.#cache.clear();
            return;
          }

          case StateEmitTypes.IncomingPipeline: {
            if (snapshot?.value === null) {
              vaultDebug(`${this.key} cache reset detected`);
              this.#cache.clear();
            }
            return;
          }

          case StateEmitTypes.FinalizePipeline: {
            const value = snapshot?.value;

            if (isNullish(value)) {
              if (snapshot?.value === null) {
                vaultDebug(`${this.key} cache reset detected`);
                this.#cache.clear();
              }
              return;
            }

            const entities = this.#normalizeEntities(value);

            for (const entity of entities) {
              // eslint-disable-next-line
              const rawId = (entity as any)?.[idKey];

              if (rawId == null) continue;
              if (typeof rawId !== 'string' && typeof rawId !== 'number')
                continue;

              const entityId = String(rawId);
              if (!entityId) continue;

              this.#cache.set(entityId, isolateValue(entity));
            }

            return;
          }

          default:
            return;
        }
      }
    );

    return {
      /**
       * Returns an entity by identifier if it exists in cache.
       */
      query: (id: string): TEntity | undefined => {
        const cached = this.#cache.get(id);
        return cached ? isolateValue(cached) : undefined;
      }
    };
  }

  /** Resets the query cache to its initial empty state. */
  reset(): void {
    vaultWarn(`${this.key} reset — clearing query cache`);
    this.#cache.clear();
  }

  /** Clears the query cache and unsubscribes from state emissions. */
  destroy(): void {
    vaultWarn(`${this.key} destroy — clearing query cache`);
    this.#cache.clear();
    this.#stateSubcribe?.unsubscribe();
  }

  /**
   * Normalizes a state value into an array of entities for cache indexing.
   *
   * @param value - The raw state value to normalize.
   * @returns An array of entities extracted from the state value.
   */
  #normalizeEntities(value: TState): TEntity[] {
    return Array.isArray(value) ? value : [value as unknown as TEntity];
  }
}
