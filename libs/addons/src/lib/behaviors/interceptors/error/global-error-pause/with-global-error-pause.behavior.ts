import {
  BehaviorClassContext,
  BehaviorContext,
  BehaviorType,
  BehaviorTypes,
  defineBehaviorKey,
  InterceptorBehaviorContract,
  InterceptorStateType,
  VAULT_STOP,
  VaultBehavior,
  vaultDebug,
  VaultErrorService,
  VaultErrorShape,
  vaultWarn
} from '@sdux-vault/shared';
import { Subscription } from 'rxjs';

/**
 * Interceptor behavior that pauses state propagation when a global error signal is active.
 *
 * This behavior monitors the global error service and conditionally blocks incoming
 * state updates at the interceptor stage when an error is present. When no global
 * error exists, incoming state is passed through unchanged. The interceptor is
 * non-critical and does not modify state values directly.
 *
 */
@VaultBehavior({
  type: BehaviorTypes.Interceptor,
  key: defineBehaviorKey('Interceptor', 'GlobalErrorPause'),
  critical: false
})
export class withGlobalErrorPauseBehavior<
  T
> implements InterceptorBehaviorContract<T> {
  /** Static type identifier used for pipeline classification. */
  static readonly type: BehaviorType;

  /** Static behavior key assigned by the decorator. */
  static readonly key: string;

  /** Indicates that this behavior is non-critical within the pipeline. */
  static readonly critical: boolean;

  /** Instance-level criticality flag inherited from the static definition. */
  readonly critical = withGlobalErrorPauseBehavior.critical;

  /** Behavior type identifier used by the orchestrator. */
  readonly type = withGlobalErrorPauseBehavior.type;

  /** Unique behavior key for this interceptor instance. */
  readonly key: string;

  /** Tracks whether a global error signal is currently active. */
  #globalError!: boolean;

  /** Subscription used to observe global error state changes. */
  readonly #errorSubscription = new Subscription();

  /**
   * Creates a new interceptor instance that observes the global error service.
   *
   * @param key - Unique identifier assigned by the behavior factory.
   * @param behaviorCtx - Context object providing behavior-level services.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    this.key = key;

    this.#errorSubscription = VaultErrorService().error$.subscribe({
      next: (error: VaultErrorShape | null) => {
        this.#globalError = error != null;
      }
    });
  }

  /**
   * Conditionally blocks incoming state updates when a global error is active.
   *
   * @param ctx - Interceptor context containing the incoming state.
   * @returns The incoming state when allowed or a stop signal when blocked.
   */
  async applyInterceptor(
    ctx: BehaviorContext<T>
  ): Promise<InterceptorStateType<T>> {
    if (this.#globalError) {
      vaultDebug(
        `${this.key} applyInterceptor blocked incoming value due to active global error.`
      );
      return VAULT_STOP;
    }

    vaultDebug(`${this.key} applyInterceptor passed incoming value through.`);
    return ctx.incoming;
  }

  /**
   * Releases resources associated with the interceptor instance.
   */
  destroy(): void {
    vaultWarn(`${this.key} - destroy "noop"`);
    this.#errorSubscription.unsubscribe();
  }

  /**
   * Resets the interceptor to its initial state.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset "noop"`);
  }
}
