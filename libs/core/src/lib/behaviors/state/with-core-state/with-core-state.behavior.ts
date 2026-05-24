import { isPipelineTerminal, LicensingAbstract } from '@sdux-vault/engine';
import {
  BehaviorClassContext,
  BehaviorContext,
  BehaviorType,
  BehaviorTypes,
  CoreStateBehaviorContract,
  createVaultError,
  defineBehaviorKey,
  FinalState,
  isDefined,
  isHttpResourceRef,
  isNull,
  isNullish,
  isolateValue,
  isStateInputShape,
  isUndefined,
  isVaultClearState,
  isVaultNoop,
  safeStringify,
  StateEmitSnapshotShape,
  StateEmitType,
  StateEmitTypes,
  StateInputType,
  StateSnapshotShape,
  VAULT_CLEAR_STATE,
  VAULT_NOOP,
  VaultBehavior,
  vaultDebug,
  vaultError,
  VaultErrorShape,
  vaultWarn
} from '@sdux-vault/shared';
import { VAULT_EXTERNAL } from '../../../constants/vault-external.constant';

/**
 * Core behavior responsible for committing resolved pipeline outcomes into state.
 *
 * This behavior translates pipeline execution results into immutable state
 * snapshots and emits authoritative state lifecycle events. It coordinates
 * loading, value, and error transitions and ensures state emission remains
 * atomic and ordered.
 */
@VaultBehavior({
  type: BehaviorTypes.CoreState,
  key: defineBehaviorKey('Core', 'State'),
  critical: true
})
export class withCoreStateBehavior<T>
  extends LicensingAbstract<T>
  implements CoreStateBehaviorContract<T>
{
  /** Static behavior type used for pipeline classification. */
  static readonly type: BehaviorType;

  /** Indicates that this behavior is required for pipeline execution. */
  static readonly critical: boolean;

  /** Instance-level pipeline behavior type identifier. */
  readonly type = withCoreStateBehavior.type;

  /** Indicates that this behavior must always execute. */
  readonly critical = withCoreStateBehavior.critical;

  /** Unique identifier for this behavior instance. */
  readonly key: string;

  /**
   * Creates a new core state behavior instance.
   *
   * @param key Unique behavior identifier supplied by the factory.
   * @param behaviorCtx Behavior class context for dependency injection.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    super(behaviorCtx);
    this.key = key;
  }

  /**
   * Commits partial state changes and emits a single state snapshot event.
   *
   * @param ctx Pipeline behavior context containing state references.
   * @param changes Partial snapshot changes or null.
   * @param type State emission classification.
   */
  protected commitState(
    ctx: BehaviorContext<T>,
    changes: Partial<StateSnapshotShape<T>> | null,
    type: StateEmitType
  ): void {
    vaultDebug(
      `${this.key} commitState called with: ${safeStringify(changes)}`
    );

    try {
      const hasChanges = !!changes && Object.keys(changes).length > 0;
      if (hasChanges) {
        const safeChanges = isolateValue(changes);
        Object.assign(ctx.lastSnapshot, safeChanges);
        ctx.lastSnapshot.hasValue =
          ctx.lastSnapshot.value !== undefined &&
          ctx.lastSnapshot.value !== null;
      }

      const snapshotEmit = {
        snapshot: isolateValue(ctx.lastSnapshot),
        type
      } as StateEmitSnapshotShape<T>;

      if (ctx.options) {
        snapshotEmit.options = ctx.options;
      }

      ctx.state$.next(snapshotEmit);
    } catch (error) {
      vaultError(`${this.key} an error occurred updating the state`, error);
    }
  }

  /*
    | Input                                                         | Interpretation                | Behavior                                                      | Pipeline | Notes                                                |
| ------------------------------------------------------------- | ----------------------------- | ------------------------------------------------------------- | -------- | ---------------------------------------------------- |
| `.reset()`                                                    | Explicit reset                | `isLoading = false`, `value = undefined`, `error = null`      | ❌ NOOP  | Full reset of state                                  |
| `replaceState(null)`                                          | Explicit reset                | `isLoading = false`, `value = undefined`, `error = null`      | ❌ NOOP  | Full reset of state                                  |
| `replaceState()`                                              | Explicit reset                | `isLoading = false`, `value = undefined`, `error = null`      | ❌ NOOP  | Full reset of state                                  |
| `replaceState(undefined)`                                     | Explicit reset                | `isLoading = false`, `value = undefined`, `error = null`      | ❌ NOOP  | Full reset of state                                  |
| `replaceState({value: null})`                                 | Explicit reset                | `isLoading = false`, `value = undefined`, `error = null`      | ❌ NOOP  | Full reset of state                                  |
| `replaceState({})`                                            | No change                     | No state changes                                              | ❌ NOOP  | True no-op input                                     |
| `replaceState({ value: undefined })`                          | Ignore value                  | No state changes                                              | ❌ NOOP  | Value, error and isLoading are intentionally ignored |
| `replaceState({ loading: undefined })`                        | Ignore loading                | No state changes                                              | ❌ NOOP  | loading is intentionally ignored                     |
| `replaceState({ error: undefined })`                          | Ignore error                  | No state changes                                              | ❌ NOOP  | error is intentionally ignored                       |
| `replaceState({ loading: true })`                             | Update loading                | `isLoading = true`, `value` & `error` unchanged               | ❌ NOOP  | isLoading is set. Value and error unchanged          |
| `replaceState({ error: x, loading: false })`                  | Update error & loading        | `error = x`, `isLoading = false`, `value` unchanged           | ❌ NOOP  | isLoading and error are set. Value unchanged         |
| `replaceState({ error: x })`                                  | Update error                  | `error = x`, `value` & `isLoading` unchanged                  | ❌ NOOP  | Error is set. Value and isLoading unchanged          |
| `replaceState({ error: null })`                               | Clear error                   | `error = null`, others unchanged                              | ❌ NOOP  | Explicit error reset                                 |
| `replaceState({ value: something })`                          | Update value                  | `value = something` , `error` & `isLoading` unchanged         | ✅ RUNS  | Triggers full pipeline (reducers, filters, etc.)     |
| `replaceState({ value: something, error: x })`                | Update value & error          | `value = something` , `error = x` , `isLoading` unchanged     | ✅ RUNS  | Triggers full pipeline (reducers, filters, etc.)     |
| `replaceState({ value: something, loading: false })`          | Update value & loading        | `value = something` , `isLoading = false` , `error` unchanged | ✅ RUNS  | Triggers full pipeline (reducers, filters, etc.)     |
| `replaceState({ value: something, error: x, loading: true })` | Update value, error & loading | `value = something` , `error = x`, `isLoading = true`         | ✅ RUNS  | Triggers full pipeline (reducers, filters, etc.)     |

| Category     | Input                                   | Behavior                                                        | Pipeline | Notes                              |
| ------------ | --------------------------------------- | --------------------------------------------------------------- | -------- | ---------------------------------- |
| Reset        | `replaceState()` / `undefined` / `null` | Full reset (`isLoading=false`, `value=undefined`, `error=null`) | ❌ NOOP  | All reset forms behave identically |
| No-op        | `replaceState({})`                      | No changes                                                      | ❌ NOOP  | Explicit no-op                     |
| Partial      | `replaceState({ loading, error })`      | Updates provided fields only                                    | ❌ NOOP  | Missing/undefined fields ignored   |
| Value update | `replaceState({ value })`               | Updates value                                                   | ✅ RUNS  | Triggers pipeline                  |
*/

  /**
   * Prepares incoming pipeline input and emits an initial incoming state.
   *
   * @param ctx Pipeline behavior context.
   * @returns The incoming value or `VAULT_NOOP`.
   */
  preparePipelineIncoming(
    ctx: BehaviorContext<T>
  ): StateInputType<T> | typeof VAULT_NOOP | typeof VAULT_CLEAR_STATE {
    const incoming = ctx.incoming;
    const changes: Partial<StateSnapshotShape<T>> = {};

    if (
      isNullish(incoming) ||
      (isStateInputShape(incoming) && isNull(incoming.value))
    ) {
      this.commitState(ctx, null, StateEmitTypes.IncomingPipeline);
      return VAULT_CLEAR_STATE;
    }

    if (isStateInputShape(incoming) && isUndefined(incoming.value)) {
      if (!isNullish(incoming.loading)) {
        changes.isLoading = incoming.loading;
      }

      if (isDefined(incoming.error)) {
        changes.error = isNull(incoming.error)
          ? null
          : createVaultError(incoming.error, VAULT_EXTERNAL);
      }
      /**
       * This is no change and the existing value should remain.
       */
      // changes.value = undefined

      this.commitState(ctx, changes, StateEmitTypes.IncomingPipeline);
      return VAULT_NOOP;
    }

    if (isHttpResourceRef(incoming)) {
      changes.isLoading = true;
    } else if (isStateInputShape(incoming)) {
      if (!isNullish(incoming?.loading)) {
        changes.isLoading = incoming.loading;
      }

      if (isDefined(incoming?.error)) {
        changes.error = isNull(incoming.error)
          ? null
          : createVaultError(incoming.error, VAULT_EXTERNAL);
      }
    }

    if (Object.keys(changes).length > 0) {
      this.commitState(ctx, changes, StateEmitTypes.IncomingPipeline);
    }

    return incoming;
  }

  /**
   * Finalizes state after pipeline resolution completes.
   *
   * @param value Final pipeline output.
   * @param ctx Pipeline behavior context.
   */
  finalizePipelineState(value: FinalState<T>, ctx: BehaviorContext<T>): void {
    vaultDebug(`${this.key} - finalizeVaultState`);

    if (isHttpResourceRef(ctx.incoming)) {
      this.commitState(
        ctx,
        { isLoading: false },
        StateEmitTypes.FinalizePipeline
      );
    }

    if (isVaultNoop(value)) {
      this.commitState(ctx, null, StateEmitTypes.FinalizePipeline);
      return;
    }

    if (isNull(value) || isVaultClearState(value)) {
      this.commitState(
        ctx,
        { value: undefined },
        StateEmitTypes.FinalizePipeline
      );
      return;
    }

    if (!isNullish(value) && !isPipelineTerminal(value)) {
      this.commitState(
        ctx,
        { value: value as T },
        StateEmitTypes.FinalizePipeline
      );
    }
  }

  /**
   * Finalizes state when pipeline execution is stopped.
   *
   * @param ctx Pipeline behavior context.
   */
  finalizePipelineVaultStop(ctx: BehaviorContext<T>): void {
    vaultDebug(`${this.key} - finalizePipelineVaultStop`);
    this.commitState(ctx, null, StateEmitTypes.FinalizePipeline);
  }

  /**
   * Finalizes state when a pipeline error occurs.
   *
   * @param err Normalized vault error or null.
   * @param ctx Pipeline behavior context.
   */
  finalizePipelineError(
    err: VaultErrorShape | null,
    ctx: BehaviorContext<T>
  ): void {
    vaultDebug(`${this.key} - finalizePipelineError`);
    this.commitState(
      ctx,
      {
        error: err,
        value: ctx.lastSnapshot.value,

        isLoading: false
      },
      StateEmitTypes.PipelineError
    );
  }

  /**
   * Finalizes state when a controller abort occurs.
   *
   * @param ctx Pipeline behavior context.
   */
  finalizeControllerAbort(ctx: BehaviorContext<T>): void {
    vaultDebug(`${this.key} - finalizeAbort`);
    this.commitState(ctx, { isLoading: false }, StateEmitTypes.AbortController);
  }

  /**
   * Finalizes state when a controller deny occurs.
   *
   * @param ctx Pipeline behavior context.
   */
  finalizeControllerDeny(ctx: BehaviorContext<T>): void {
    vaultDebug(`${this.key} - finalizeDeny`);
    this.commitState(ctx, { isLoading: false }, StateEmitTypes.DenyController);
  }

  /**
   * Emits a terminal destroy state snapshot.
   *
   * @param ctx Pipeline behavior context.
   */
  destroy(ctx: BehaviorContext<T>): void {
    vaultWarn(`${this.key} - destroy`);
    this.commitState(
      ctx,
      { isLoading: false, value: undefined, error: null },
      StateEmitTypes.PipelineDestroy
    );
  }

  /**
   * Emits a terminal reset state snapshot.
   *
   * @param ctx Pipeline behavior context.
   */
  reset(ctx: BehaviorContext<T>): void {
    vaultWarn(`${this.key} - reset`);
    this.commitState(
      ctx,
      { isLoading: false, value: undefined, error: null },
      StateEmitTypes.PipelineReset
    );
  }
}
