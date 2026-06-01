import {
  BehaviorClassContext,
  BehaviorContract,
  BehaviorType,
  BehaviorTypes,
  createVaultError,
  defineBehaviorKey,
  FeatureCellExtensionContext,
  ResolveType,
  ResolveTypes,
  safeStringify,
  StateInputShape,
  VaultBehavior,
  vaultDebug,
  vaultWarn
} from '@sdux-vault/shared';
import { EMPTY, Observable, take, takeUntil } from 'rxjs';
import { extendFromObservable } from './function/extend-from-observable.function';
import { FromObservableBehaviorExtension } from './interface/from-observable-behavior.interface';

/**
 * Extension behavior that enables FeatureCells to resolve state from observable sources.
 *
 * This behavior augments the FeatureCell API with a `fromObservable` method that
 * converts a single observable emission into a normalized state envelope and
 * binds subscription lifetime to the cell lifecycle.
 *
 * @deprecated
 * This API exists as a migration bridge for observable-based workflows.
 * Prefer using `replaceState` or `mergeState` to resolve
 * observables directly within the pipeline.
 *
 */
@VaultBehavior({
  type: BehaviorTypes.FromObservable,
  key: defineBehaviorKey('Core', 'FromObservable'),
  critical: false,
  resolveType: ResolveTypes.Observable
})
export class withCoreFromObservableBehavior<T> implements BehaviorContract<
  T,
  FromObservableBehaviorExtension
> {
  /** Extension function used to attach observable APIs to the FeatureCell. */
  static readonly extension = extendFromObservable;

  /** Static behavior type used for pipeline classification. */
  static readonly type: BehaviorType;

  /** Static behavior key used for diagnostics and introspection. */
  static readonly key: string;

  /** Resolve type associated with observable-based resolution. */
  static readonly resolveType: ResolveType;

  /** Indicates whether this behavior is required by the pipeline. */
  static readonly critical: boolean;

  /** Instance-level behavior type identifier. */
  readonly type = withCoreFromObservableBehavior.type;

  /** Unique identifier for this behavior instance. */
  readonly key: string;

  /** Indicates that this behavior is optional within the pipeline. */
  readonly critical = withCoreFromObservableBehavior.critical;

  /** Resolve type for this behavior instance. */
  readonly resolveType = withCoreFromObservableBehavior.resolveType;

  /**
   * Creates a new observable extension behavior instance.
   *
   * @param key Unique identifier assigned by the behavior factory.
   * @param behaviorCtx Behavior class context used for configuration access.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    this.key = key;
  }

  /**
   * Extends the FeatureCell API with observable-based resolution support.
   *
   * @param ctx FeatureCell extension context providing lifecycle signals.
   * @returns An extension object exposing the `fromObservable` API.
   */
  extendCellAPI(
    ctx: FeatureCellExtensionContext<T>
  ): FromObservableBehaviorExtension {
    return {
      fromObservable: (source$: Observable<T>) =>
        new Observable<StateInputShape<T>>((observer) => {
          vaultDebug(`${this.key} fromObservable called.`);

          const destroy$ = ctx.destroyed$ ?? EMPTY;
          const reset$ = ctx.reset$ ?? EMPTY;

          const subscription = source$
            .pipe(takeUntil(reset$), takeUntil(destroy$), take(1))
            .subscribe({
              next: (value) => {
                vaultDebug(
                  `${this.key} fromObservable emitted value "${safeStringify(value)}".`
                );
                observer.next({
                  loading: false,
                  value,
                  error: null
                });
              },

              error: (err) => {
                const error = createVaultError(err, ctx.featureCellKey);
                observer.error(error);
                vaultDebug(
                  `${this.key} fromObservable emitted error "${error.message}".`
                );
              },

              complete: () => {
                observer.complete();
                vaultDebug(`${this.key} fromObservable completed.`);
              }
            });

          return () => {
            subscription.unsubscribe();
            vaultDebug(`${this.key} fromObservable subscription unsubscribed.`);
          };
        })
    };
  }

  /**
   * Invoked when the behavior instance is destroyed.
   */
  destroy(): void {
    vaultWarn(`${this.key} - destroy "noop"`);
  }

  /**
   * Resets the observable extension behavior.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset "noop"`);
  }
}
