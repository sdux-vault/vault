import {
  BehaviorClassContext,
  BehaviorType,
  BehaviorTypes,
  CoreErrorBehaviorContract,
  createVaultError,
  defineBehaviorKey,
  VaultBehavior,
  VaultErrorShape,
  vaultWarn
} from '@sdux-vault/shared';

/**
 * Core error behavior used internally by the Vault orchestrator.
 *
 * This behavior represents the **first step** in the error-handling pipeline.
 * It is intentionally minimal and exists solely to normalize any thrown value—
 * regardless of type—into a canonical ResourceStateError using
 * resourceError.
 *
 * ## Responsibilities
 * - Convert `unknown` errors into a well-structured `ResourceStateError`
 * - Provide a deterministic starting point for all addon error behaviors
 * - Guarantee error normalization before transformations occur
 *
 * All richer behaviors (mapping, retries, notifications, old-school callbacks)
 * are implemented as **addon error behaviors** layered after this one.
 */
@VaultBehavior({
  type: BehaviorTypes.CoreError,
  key: defineBehaviorKey('Core', 'Error'),
  critical: true
})
export class withCoreErrorBehavior<T> implements CoreErrorBehaviorContract<T> {
  /** Behavior type metadata assigned by the decorator. */
  static readonly type: BehaviorType;

  /**
   * Unique behavior key assigned by the decorator. */
  static readonly key: string;

  /** Indicates this behavior participates critically in the pipeline. */
  static readonly critical: boolean;

  /** Indicates that this error behavior is critical and always executed. */
  readonly critical = true;

  /** Unique identifier for this behavior instance. */
  readonly key: string;

  /** Behavior type for orchestrator registration. */
  readonly type = BehaviorTypes.CoreError;

  /**
   * Creates a new Core Error Behavior instance.
   *
   * @param key - Runtime identifier assigned by the behavior factory.
   * @param behaviorCtx - Behavior context providing injector access and
   *                      future extensibility hooks.
   *
   * This constructor performs no allocation of runtime resources. It simply
   * stores metadata required by the orchestrator and devtools.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    this.key = key;
  }

  /**
   * Normalizes an unknown error into a {@link VaultErrorShape}.
   *
   * This is the *only* operation performed by the core error behavior.
   * Additional behaviors further down the pipeline may inspect or transform
   * the returned structure.
   *
   * @param error - The raw error thrown during pipeline execution.
   * @param feaetureCellKey - The FeatureCell key where the error originated.
   * @returns A canonical `ResourceStateError` created from the raw value.
   */
  handleError(error: unknown, featureCellKey: string): VaultErrorShape {
    return createVaultError(error, featureCellKey);
  }

  /**
   * Lifecycle hook invoked when the behavior instance is destroyed.
   *
   * Core behaviors maintain no internal resources and therefore perform no
   * cleanup. This method logs a devtools-friendly "noop" warning to help
   * with behavior lifecycle introspection.
   */
  destroy(): void {
    vaultWarn(`${this.key} - destroy "noop"`);
  }

  /**
   * Resets the behavior instance.
   *
   * This behavior maintains no internal mutable state. The reset hook exists
   * strictly for lifecycle symmetry across all behavior types and to support
   * devtools state introspection.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset "noop"`);
  }
}
