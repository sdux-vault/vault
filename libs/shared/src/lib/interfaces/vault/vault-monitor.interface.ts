import type { InsightConfig } from '../../config/insight.config';
import type { ControllerDecisionShape } from '../../shapes/controller/controller-decision.shape';
import type { VaultErrorShape } from '../../shapes/vault-error.shape';
import type { VaultMonitorContext } from '../../types/vault-monitor-context.type';

/**
 * Contract for the VaultMonitor singleton exposing the full DevTools-visible
 * monitoring API without implementation details.
 */
export interface VaultMonitorContract {
  /* ------------------------------------------------------------------ */
  /* Shared state (inherited from VaultMonitorHelper)                     */
  /* ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------ */
  /* Pipeline lifecycle events                                           */
  /* ------------------------------------------------------------------ */

  /**
   * Activates global insight tracking with the supplied configuration.
   *
   * @param definition - The insight configuration to activate.
   */
  activateGlobalInsights(definition: InsightConfig): void;

  /**
   * Signals the start of an after-tap lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startAfterTap<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of an after-tap lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   * @param payload - Optional result payload.
   */
  endAfterTap<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>,
    payload?: unknown
  ): void;

  /**
   * Signals the start of a before-tap lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startBeforeTap<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of a before-tap lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   * @param payload - Optional result payload.
   */
  endBeforeTap<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>,
    payload?: unknown
  ): void;

  /**
   * Signals the start of a compute-merge lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startComputeMerge<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of a compute-merge lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  endComputeMerge<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the start of a clear-persist lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startClearPersist<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of a clear-persist lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  endClearPersist<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the start of a core callback-error lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startCoreCallbackError<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of a core callback-error lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  endCoreCallbackError<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the start of a core emit-state lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startCoreEmitState<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of a core emit-state lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  endCoreEmitState<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the start of a core error lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startCoreError<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of a core error lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  endCoreError<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the start of a core state lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startCoreState<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of a core state lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  endCoreState<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the start of a destroy lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startDestroy<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of a destroy lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   * @param payload - Optional result payload.
   */
  endDestroy<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>,
    payload?: unknown
  ): void;

  /**
   * Signals the start of a decrypt lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startDecrypt<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of a decrypt lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   * @param payload - Optional result payload.
   */
  endDecrypt<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>,
    payload?: unknown
  ): void;

  /**
   * Signals the start of an encrypt lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startEncrypt<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of an encrypt lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  endEncrypt<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the start of a filter lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startFilter<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of a filter lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  endFilter<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the start of a global error lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startGlobalError<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of a global error lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  endGlobalError<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Records that an ingress source has been subscribed.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   * @param source - The ingress source identifier.
   */
  ingressSubscribed<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>,
    source: string
  ): void;

  /**
   * Records that an ingress source has completed.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   * @param source - The ingress source identifier.
   */
  ingressCompleted<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>,
    source: string
  ): void;

  /**
   * Signals the start of an interceptor lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startInterceptor<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of an interceptor lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   * @param payload - Optional result payload.
   */
  endInterceptor<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>,
    payload?: unknown
  ): void;

  /**
   * Signals the start of an initialized lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startInitialized<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of an initialized lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   * @param payload - Optional result payload.
   */
  endInitialized<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>,
    payload?: unknown
  ): void;

  /**
   * Signals the start of a load-persist lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startLoadPersist<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of a load-persist lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   * @param payload - Optional result payload.
   */
  endLoadPersist<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>,
    payload?: unknown
  ): void;

  /**
   * Signals the start of a merge lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startMerge<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of a merge lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   * @param payload - Optional result payload.
   */
  endMerge<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>,
    payload?: unknown
  ): void;

  /**
   * Signals the start of a persist lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startPersist<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of a persist lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  endPersist<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the start of an operator lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startOperator<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of an operator lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   * @param payload - Optional result payload.
   */
  endOperator<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>,
    payload?: unknown
  ): void;

  /**
   * Signals the start of a persist lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startPersist<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of a persist lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  endPersist<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the start of a reducer lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startReducer<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of a reducer lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  endReducer<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Registers a FeatureCell for monitoring.
   *
   * @param cellKey - The FeatureCell key to register.
   * @param insight - Optional insight configuration for the cell.
   */
  registerCell(cellKey: string, insight?: InsightConfig): void;

  /**
   * Signals the start of a replace lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startReplace<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of a replace lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   * @param payload - Optional result payload.
   */
  endReplace<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>,
    payload?: unknown
  ): void;

  /**
   * Signals the start of a reset lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startReset<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of a reset lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   * @param payload - Optional result payload.
   */
  endReset<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>,
    payload?: unknown
  ): void;

  /**
   * Signals the start of a resolve lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startResolve<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of a resolve lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  endResolve<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the start of a set-initial-value lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startSetInitialValue<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of a set-initial-value lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  endSetInitialValue<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the start of a stepwise lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startStepwise<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of a stepwise lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   * @param payload - Optional result payload.
   */
  endStepwise<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>,
    payload?: unknown
  ): void;

  /* ------------------------------------------------------------------ */
  /* Controller lifecycle                                                */
  /* ------------------------------------------------------------------ */

  /**
   * Records that the conductor denied a pipeline operation.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  notifyConductorDeny<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Records that the conductor triggered a revote.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  conductorRevote<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Records that the conductor aborted a pipeline operation.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  conductorAbort<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Records a license validation attempt for a FeatureCell.
   *
   * @param cell - The FeatureCell key.
   * @param featureCellKey - The target cell key under validation.
   */
  conductorLicenseAttempt(cell: string, featureCellKey: string): void;

  /**
   * Records that a license validation was approved.
   *
   * @param cell - The FeatureCell key.
   * @param featureCellKey - The target cell key that was approved.
   */
  conductorLicenseApproved(cell: string, featureCellKey: string): void;

  /**
   * Records that a license validation was denied.
   *
   * @param cell - The FeatureCell key.
   * @param featureCellKey - The target cell key that was denied.
   */
  conductorLicenseDenied(cell: string, featureCellKey: string): void;

  /**
   * Signals the start of a controller attempt lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startControllerAttempt<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of a controller attempt lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   * @param payload - The attempt result payload.
   */
  endControllerAttempt<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>,
    payload: unknown
  ): void;

  /**
   * Records that a controller attempt was restarted.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   * @param payload - The restart reason.
   */
  restartControllerAttempt<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>,
    payload: string
  ): void;

  /**
   * Records a controller failure event.
   *
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   * @param error - The error that caused the failure.
   */
  controllerFailure<T>(
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>,
    error: unknown
  ): void;

  /**
   * Records a controller finalize event.
   *
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  controllerFinalize<T>(
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Records a controller success event.
   *
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  controllerSuccess<T>(
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the start of a controller vote lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startControllerVote<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of a controller vote lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   * @param payload - The controller decision result.
   */
  endControllerVote<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>,
    payload: ControllerDecisionShape
  ): void;

  /**
   * Records that the conductor crashed during execution.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   * @param error - The error that caused the crash.
   */
  conductorCrashed<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>,
    error: unknown
  ): void;

  /* ------------------------------------------------------------------ */
  /* Errors & warnings                                                    */
  /* ------------------------------------------------------------------ */

  /**
   * Records a runtime error encountered during pipeline execution.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   * @param error - The runtime error.
   */
  runtimeError<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>,
    error: unknown
  ): void;

  /**
   * Records a warning message during pipeline execution.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   * @param message - The warning message.
   */
  warn<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>,
    message: string
  ): void;

  /**
   * Signals the start of an error-transform lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   */
  startErrorTransform<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>
  ): void;

  /**
   * Signals the end of an error-transform lifecycle event.
   *
   * @param cell - The FeatureCell key.
   * @param behaviorKey - The behavior key.
   * @param ctx - The monitor context for this operation.
   * @param payload - The transformed error shape.
   */
  endErrorTransform<T>(
    cell: string,
    behaviorKey: string,
    ctx: Readonly<VaultMonitorContext<T>>,
    payload: VaultErrorShape
  ): void;
}
