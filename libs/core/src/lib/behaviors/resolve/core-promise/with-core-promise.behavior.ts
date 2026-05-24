import {
  BehaviorClassContext,
  BehaviorContext,
  BehaviorType,
  BehaviorTypes,
  createVaultError,
  defineBehaviorKey,
  isDeferredFactory,
  isFunction,
  isUndefined,
  PipelineUpstreamValue,
  ResolveBehaviorContract,
  ResolveType,
  ResolveTypes,
  safeStringify,
  VaultBehavior,
  vaultDebug,
  vaultWarn
} from '@sdux-vault/shared';

/**
 * Core resolve behavior that extracts a value from a deferred promise factory.
 *
 * This behavior participates in the resolve stage and handles incoming
 * deferred factories by invoking the factory exactly once and resolving
 * with the resulting value. Errors are normalized and propagated through
 * the pipeline error handling contract.
 */
@VaultBehavior({
  type: BehaviorTypes.Resolve,
  key: defineBehaviorKey('Core', 'Promise'),
  critical: false,
  resolveType: ResolveTypes.Promise
})
export class withCorePromiseBehavior<T> implements ResolveBehaviorContract<T> {
  /** Static behavior type used for orchestrator classification. */
  static readonly type: BehaviorType;

  /** Unique behavior key used for diagnostics and devtools. */
  static readonly key: string;

  /** Indicates whether this behavior is required by the pipeline. */
  static readonly critical: boolean;

  /** Resolve type classification for promise-based resolution. */
  static readonly resolveType: ResolveType;

  /** The pipeline behavior type identifier. */
  readonly type = withCorePromiseBehavior.type;

  /** Unique identifier for this behavior instance. */
  readonly key: string;

  /** Indicates that this behavior is optional within the pipeline. */
  readonly critical = withCorePromiseBehavior.critical;

  /** Resolve type identifier for promise-based resolution. */
  readonly resolveType = withCorePromiseBehavior.resolveType;

  /**
   * Creates a new promise resolve behavior instance.
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
   * Resolves a state value from a deferred promise factory.
   *
   * @param ctx The resolve behavior context containing the incoming value.
   * @returns The resolved state value or undefined if resolution is skipped.
   */
  async computeResolve(
    ctx: BehaviorContext<T>
  ): Promise<PipelineUpstreamValue<T>> {
    const incoming = ctx.incoming;

    vaultDebug(
      `${this.key} computeResolve promise called with incoming: ${safeStringify(incoming)}`
    );

    if (
      !(isDeferredFactory(incoming) || isFunction(incoming)) ||
      isUndefined(incoming)
    ) {
      vaultDebug(
        `${this.key} computeResolve skipped — incoming is not a deferred factory.`
      );
      return;
    }

    vaultDebug(`${this.key} computeResolve detected Promise input.`);

    try {
      let value: T;
      if (isFunction(incoming)) {
        value = (await incoming?.()) as T;
      } else {
        value = (await incoming.value?.()) as T;
      }

      vaultDebug(
        `${this.key} computeResolve resolved value: ${safeStringify(value)}`
      );

      return value;
    } catch (err) {
      const vaultError = createVaultError(err, ctx.featureCellKey);
      vaultDebug(
        `${this.key} computeResolve caught error: ${vaultError.message}`
      );
      throw vaultError;
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
