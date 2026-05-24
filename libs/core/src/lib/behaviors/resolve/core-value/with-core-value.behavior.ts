import {
  BehaviorClassContext,
  BehaviorContext,
  BehaviorType,
  BehaviorTypes,
  defineBehaviorKey,
  isHttpResourceRef,
  PipelineUpstreamValue,
  ResolveBehaviorContract,
  ResolveType,
  ResolveTypes,
  safeStringify,
  VAULT_CLEAR_STATE,
  VaultBehavior,
  vaultDebug,
  vaultWarn
} from '@sdux-vault/shared';

/**
 * Core resolve behavior that extracts a plain value from an incoming state envelope.
 *
 * This behavior participates in the resolve stage and handles direct value-based
 * state inputs by safely normalizing the contained value. Objects and arrays are
 * shallow-cloned to preserve immutability guarantees, while null and undefined
 * values are handled explicitly according to pipeline semantics.
 */
@VaultBehavior({
  type: BehaviorTypes.Resolve,
  key: defineBehaviorKey('Core', 'Value'),
  critical: true,
  resolveType: ResolveTypes.Value
})
export class withCoreValueBehavior<T> implements ResolveBehaviorContract<T> {
  /** Static behavior type for orchestrator classification. */
  static readonly type: BehaviorType;

  /** Static unique behavior identifier. */
  static readonly key: string;

  /** Static flag marking this behavior as pipeline-critical. */
  static readonly critical: boolean;

  /** Resolve type classification for value-based resolution. */
  static readonly resolveType: ResolveType;

  /** Instance-level pipeline type identifier. */
  readonly type = withCoreValueBehavior.type;

  /** Indicates this resolve behavior is required for pipeline operation. */
  readonly critical = withCoreValueBehavior.critical;

  /** Unique behavior key for the instance. */
  readonly key: string;

  /** Resolve mode indicating plain value resolution. */
  readonly resolveType = withCoreValueBehavior.resolveType;

  /**
   * Creates a new value resolve behavior instance.
   *
   * @param key Unique behavior identifier assigned by the factory.
   * @param behaviorCtx Behavior class context for dependency injection and configuration.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    this.key = key;
  }

  /**
   * Resolves a state value from a plain state envelope.
   *
   * @param ctx Resolve context containing the incoming state packet.
   * @returns The normalized resolved value, a clear signal, or undefined.
   */
  async computeResolve(
    ctx: BehaviorContext<T>
  ): Promise<PipelineUpstreamValue<T>> {
    vaultDebug(
      `${this.key} computeResolve called with "${safeStringify(ctx.incoming)}".`
    );

    const incoming = ctx.incoming;
    if (!incoming || isHttpResourceRef<T>(incoming)) {
      vaultDebug(
        `${this.key} computeResolve skipped - not a valid plain state.`
      );
      return;
    }

    const { value } = incoming as { value?: PipelineUpstreamValue<T> };

    if (value === undefined) {
      vaultDebug(`${this.key} value is undefined and resolution skipped.`);
      return;
    }

    if (value === null) {
      vaultDebug(`${this.key} value is null and clear state returned.`);
      return VAULT_CLEAR_STATE;
    }

    if (Array.isArray(value)) {
      vaultDebug(`${this.key} array value detected and cloned.`);
      return [...value] as T;
    }

    if (typeof value === 'object') {
      vaultDebug(`${this.key} object value detected and cloned.`);
      return { ...value } as T;
    }

    vaultDebug(`${this.key} primitive value detected and returned.`);
    return value as T;
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
