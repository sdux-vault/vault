import {
  BehaviorClassContext,
  BehaviorContract,
  BehaviorType,
  BehaviorTypes,
  createVaultError,
  DeferredFactory,
  defineBehaviorKey,
  FeatureCellExtensionContext,
  isDeferredFactory,
  isUndefined,
  ResolveType,
  ResolveTypes,
  safeStringify,
  StateInputType,
  VaultBehavior,
  vaultDebug,
  vaultWarn
} from '@sdux-vault/shared';
import { extendFromPromise } from './function/extend-from-promise.function';
import { FromPromiseBehaviorExtension } from './interface/from-promise-behavior.interface';

/**
 * Extension behavior that enables promise-based state resolution for FeatureCells.
 *
 * This behavior augments a FeatureCell with APIs that accept deferred factories
 * and resolve their produced values into normalized state inputs. It supports
 * both promise and deferred invocation semantics while preserving pipeline
 * loading and error metadata.
 *
 * @deprecated
 * This API exists as a migration bridge for deferred- and promise-based workflows.
 * Prefer using `replaceState` or `mergeState` to resolve promises
 * directly within the pipeline.
 *
 */
@VaultBehavior({
  type: BehaviorTypes.FromPromise,
  key: defineBehaviorKey('Core', 'FromPromise'),
  critical: false,
  resolveType: ResolveTypes.Promise
})
export class withCoreFromPromiseBehavior<T> implements BehaviorContract<
  T,
  FromPromiseBehaviorExtension
> {
  /** Static behavior function used to extend the FeatureCell API. */
  static readonly extension = extendFromPromise;

  /** Static behavior type used for orchestrator classification. */
  static readonly type: BehaviorType;

  /** Static behavior key used for diagnostics and tooling. */
  static readonly key: string;

  /** Indicates whether this behavior is required by the pipeline. */
  static readonly critical: boolean;

  /** Resolve type identifier for promise-based resolution. */
  static readonly resolveType: ResolveType;

  /** Instance-level behavior type identifier. */
  readonly type = withCoreFromPromiseBehavior.type;

  /** Unique identifier for this behavior instance. */
  readonly key: string;

  /** Indicates that this behavior is optional within the pipeline. */
  readonly critical = withCoreFromPromiseBehavior.critical;

  /** Resolve type identifier for this behavior instance. */
  readonly resolveType = withCoreFromPromiseBehavior.resolveType;

  /**
   * Creates a new instance of the promise resolution behavior.
   *
   * @param key Unique behavior identifier supplied by the factory.
   * @param behaviorCtx Behavior context providing configuration and lifecycle hooks.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    this.key = key;
  }

  /**
   * Extends the FeatureCell API with promise-based resolution functions.
   *
   * @param ctx FeatureCell extension context used for lifecycle coordination.
   * @returns An extension object exposing promise-based resolution methods.
   */
  extendCellAPI(
    ctx: FeatureCellExtensionContext<T>
  ): FromPromiseBehaviorExtension {
    const handleDeferred = (
      incoming: DeferredFactory<T> | unknown
    ): Promise<StateInputType<T>> =>
      new Promise<StateInputType<T>>((resolve, reject) => {
        vaultDebug(`${this.key} fromPromise called.`);

        if (isUndefined(incoming)) {
          resolve({
            loading: false,
            value: undefined,
            error: null
          });
          return;
        }

        if (!isDeferredFactory(incoming)) {
          const potentialIncoming = incoming as Partial<DeferredFactory<T>>;
          resolve({
            loading: potentialIncoming?.loading ?? false,
            value: undefined,
            error: potentialIncoming?.error ?? null
          });
          return;
        }

        let result: T | undefined | null | Promise<T | undefined | null>;

        try {
          result = incoming.value?.() as
            | T
            | undefined
            | null
            | Promise<T | undefined | null>;
        } catch (err) {
          const error = createVaultError(err, ctx.featureCellKey);
          reject(error);
          return;
        }

        Promise.resolve(result)
          .then((value) => {
            vaultDebug(
              `${this.key} fromPromise resolved value: ${safeStringify(value)}`
            );
            resolve({
              loading: incoming.loading ?? false,
              value,
              error: incoming.error ?? null
            });
          })
          .catch((err) => {
            const error = createVaultError(err, ctx.featureCellKey);
            reject(error);
          });
      });

    return {
      fromPromise: (incoming: DeferredFactory<T>) => handleDeferred(incoming),
      fromDeferred: (incoming: DeferredFactory<T>) => handleDeferred(incoming)
    };
  }

  /**
   * Invoked during behavior teardown.
   */
  destroy(): void {
    vaultWarn(`${this.key} - destroy "noop"`);
  }

  /**
   * Resets the behavior state.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset "noop"`);
  }
}
