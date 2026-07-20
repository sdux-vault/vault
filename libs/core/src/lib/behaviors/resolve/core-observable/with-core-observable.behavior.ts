import {
  BehaviorClassContext,
  BehaviorContext,
  BehaviorType,
  BehaviorTypes,
  defineBehaviorKey,
  PipelineUpstreamValue,
  ResolveBehaviorContract,
  ResolveType,
  ResolveTypes,
  safeStringify,
  VaultBehavior,
  vaultDebug,
  vaultWarn
} from '@sdux-vault/shared';
import {
  EMPTY,
  firstValueFrom,
  isObservable,
  Observable,
  take,
  takeUntil
} from 'rxjs';

/**
 * Core resolve behavior that extracts a single value from an RxJS Observable.
 *
 * This behavior participates in the resolve stage and handles incoming
 * Observable values by subscribing once and resolving with the first emitted
 * value. Resolution is automatically terminated when the FeatureCell is reset
 * or destroyed.
 */
@VaultBehavior({
  type: BehaviorTypes.Resolve,
  key: defineBehaviorKey('Core', 'Observable'),
  critical: false,
  resolveType: ResolveTypes.Observable
})
export class withCoreObservableBehavior<
  T
> implements ResolveBehaviorContract<T> {
  /** Static behavior type used for orchestrator classification. */
  static readonly type: BehaviorType;

  /** Unique behavior key used for diagnostics and devtools. */
  static readonly key: string;

  /** Indicates whether this behavior is required by the pipeline. */
  static readonly critical: boolean;

  /** Resolve type classification for observable-based resolution. */
  static readonly resolveType: ResolveType;

  /** The pipeline behavior type identifier. */
  readonly type = BehaviorTypes.Resolve;

  /** Unique identifier for this behavior instance. */
  readonly key: string;

  /** Indicates that this behavior is optional within the pipeline. */
  readonly critical = false;

  /** Resolve type identifier for observable-based resolution. */
  readonly resolveType = withCoreObservableBehavior.resolveType;

  /**
   * Creates a new observable resolve behavior instance.
   *
   * @param key Unique behavior identifier supplied by the factory.
   * @param behaviorCtx Behavior class context for dependency injection and configuration.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    this.key = key;
  }

  /**
   * Resolves a state value from an Observable input.
   *
   * @param ctx The resolve behavior context containing the incoming value.
   * @returns The resolved state value or undefined if resolution is skipped.
   */
  async computeResolve(
    ctx: BehaviorContext<T>
  ): Promise<PipelineUpstreamValue<T>> {
    const incoming = ctx.incoming;

    vaultDebug(
      `${this.key} computeResolve called with incoming: ${safeStringify(incoming)}`
    );

    if (!isObservable(incoming)) {
      vaultDebug(
        `${this.key} computeResolve skipped — incoming is not an Observable.`
      );
      return;
    }

    vaultDebug(`${this.key} computeResolve detected Observable input.`);

    const source$ = incoming as Observable<T>;
    const reset$ = ctx.reset$ ?? EMPTY;
    const destroyed$ = ctx.destroyed$ ?? EMPTY;

    try {
      const value = await firstValueFrom(
        source$.pipe(takeUntil(reset$), takeUntil(destroyed$), take(1))
      );

      vaultDebug(
        `${this.key} computeResolve resolved value: ${safeStringify(value)}`
      );

      return value;
    } catch (err) {
      vaultDebug(
        `${this.key} computeResolve caught error: ${
          err instanceof Error ? err.message : safeStringify(err)
        }`
      );

      throw err;
    }
  }

  /**
   * Invoked when the behavior instance is destroyed.
   */
  destroy(): void {
    vaultWarn(`${this.key} - destroy "noop"`);
  }

  /**
   * Resets the resolve behavior to its initial state.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset "noop"`);
  }
}
