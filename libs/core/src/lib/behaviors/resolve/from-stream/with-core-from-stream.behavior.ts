// --- AI Model File Path (DO NOT DELETE) ---

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
  StateInputType,
  VaultBehavior,
  vaultDebug,
  vaultWarn
} from '@sdux-vault/shared';
import { Observable, takeUntil } from 'rxjs';
import { extendFromStream } from './function/extend-from-stream.function';
import { FromStreamBehaviorExtension } from './interface/from-stream-behavior.interface';
import { FromStreamOptions } from './options/from-stream.options';

/**
 * Observable-based resolve behavior that subscribes to a consumer-supplied stream
 * and merges emitted values into the FeatureCell state pipeline.
 */
@VaultBehavior({
  type: BehaviorTypes.FromStream,
  key: defineBehaviorKey('Core', 'FromStream'),
  critical: false,
  resolveType: ResolveTypes.Observable
})
export class withCoreFromStreamBehavior<T> implements BehaviorContract<
  T,
  FromStreamBehaviorExtension
> {
  /** Extension function used to register the fromStream API on the FeatureCell. */
  static readonly extension = extendFromStream;

  /** Static behavior type used for orchestrator classification. */
  static readonly type: BehaviorType;

  /** Unique behavior key used for diagnostics and devtools. */
  static readonly key: string;

  /** Indicates whether this behavior is required by the pipeline. */
  static readonly critical: boolean;

  /** Static resolve type assigned by the behavior system. */
  static readonly resolveType: ResolveType;

  /** The extension behavior type identifier. */
  readonly type = withCoreFromStreamBehavior.type;

  /** Unique identifier for this behavior instance. */
  public readonly key: string;

  /** Indicates that this behavior is optional within the pipeline. */
  public readonly critical = withCoreFromStreamBehavior.critical;

  /** Instance-level resolve type identifier. */
  public readonly resolveType = withCoreFromStreamBehavior.resolveType;

  /**
   * Creates a new fromStream behavior instance.
   *
   * @param key - Unique behavior identifier supplied by the factory.
   * @param behaviorCtx - Behavior class context for dependency injection.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    this.key = key;
  }

  /**
   * Extends the FeatureCell with the fromStream subscription API.
   *
   * @param ctx - Extension context used to observe state and merge updates.
   * @returns The fromStream extension API surface.
   */
  extendCellAPI(
    ctx: FeatureCellExtensionContext<T>
  ): FromStreamBehaviorExtension {
    return {
      fromStream: (
        source$: Observable<T>,
        options?: FromStreamOptions
      ): void => {
        const { autoResetError = true } = options ?? {};

        vaultDebug(`${this.key} fromStream called.`);
        vaultDebug(
          `${this.key} fromStream options resolved (autoResetError=${autoResetError}).`
        );

        ctx.vaultMonitor.ingressSubscribed(
          ctx.featureCellKey,
          this.key,
          ctx,
          'fromStream'
        );

        vaultDebug(`${this.key} fromStream subscription started.`);

        source$.pipe(takeUntil(ctx.destroyed$)).subscribe({
          next: (incomingItem) => {
            vaultDebug(`${this.key} subscription.next called.`);
            vaultDebug(
              `${this.key} incoming value received: "${safeStringify(incomingItem)}".`
            );

            if (autoResetError) {
              vaultDebug(
                `${this.key} autoResetError enabled → clearing error.`
              );
            }

            const nextState: StateInputType<T> = autoResetError
              ? { value: incomingItem, error: null }
              : { value: incomingItem };

            ctx.mergeState(nextState);

            vaultDebug(`${this.key} mergeState invoked from stream.next.`);
          },

          error: (err) => {
            vaultDebug(`${this.key} subscription.error called.`);

            const vaultError = createVaultError(err, this.key);

            vaultDebug(
              `${this.key} stream error converted to VaultError: "${vaultError.message}".`
            );

            ctx.mergeState({ error: vaultError });

            vaultDebug(`${this.key} mergeState invoked from stream.error.`);
          },

          complete: () => {
            vaultDebug(`${this.key} subscription.complete called.`);

            ctx.vaultMonitor.ingressCompleted(
              ctx.featureCellKey,
              this.key,
              ctx,
              'fromStream'
            );

            vaultDebug(`${this.key} fromStream completed.`);
          }
        });
      }
    };
  }

  /**
   * Teardown hook invoked when the behavior instance is destroyed.
   */
  destroy(): void {
    vaultWarn(`${this.key} - destroy "noop"`);
  }

  /**
   * Resets the behavior to its initial state.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset "noop"`);
  }
}
