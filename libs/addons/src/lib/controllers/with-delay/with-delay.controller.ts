import {
  ControllerClassContext,
  ControllerContract,
  ControllerMessageShape,
  ControllerMessageTypes,
  ControllerType,
  ControllerTypes,
  ControllerVote,
  ControllerVotes,
  defineControllerKey,
  FeatureCellBaseShape,
  VaultController,
  vaultDebug,
  vaultWarn
} from '@sdux-vault/shared';
import { Observable, of } from 'rxjs';
import { extendWithDelayFluent } from './function/extend-with-delay.function';
import { WithDelayControllerOptions } from './options/with-delay-controller.options';

/**
 * Policy controller that delays pipeline execution by a configured interval.
 *
 * The withDelay controller queues incoming pipeline traces and denies their
 * initial attempt. After the configured delay elapses, it requests a revote
 * to allow the trace to proceed through the pipeline.
 */
@VaultController({
  type: ControllerTypes.Policy,
  key: defineControllerKey('Policy', 'Delay'),
  critical: false,
  wantsConfig: true,
  configKey: 'withDelay'
})
export class withDelayController<T> implements ControllerContract<T> {
  /** Controller type classification. */
  static readonly type: ControllerType;
  /** Unique key identifying this controller. */
  static readonly key: string;
  /** Whether this controller is critical for pipeline execution. */
  static readonly critical: boolean;

  /** Fluent API installation function for FeatureCell builders. */
  static readonly extensionFluent = extendWithDelayFluent;
  /** Whether this controller requires configuration. */
  static readonly wantsConfig: boolean;
  /** Configuration key used to retrieve delay options. */
  static readonly configKey: string;

  /** Instance-level controller type. */
  readonly type = withDelayController.type;
  /** Instance-level unique key. */
  readonly key: string;
  /** Instance-level critical flag. */
  readonly critical = withDelayController.critical;

  /** Configured delay in milliseconds. */
  private readonly milliseconds: number;

  /** Map of trace IDs to their scheduled emit timestamps. */
  private readonly queue = new Map<string, number>();

  /** Active timer reference for the next scheduled revote. */
  private timer: ReturnType<typeof setTimeout> | null = null;

  /**
   * Installs the withDelay fluent API on a FeatureCell builder.
   *
   * @param cell - The FeatureCell base shape to extend.
   * @param controllerConfigs - Map of controller configuration entries.
   */
  static installFluentApi<T>(
    cell: FeatureCellBaseShape<T>,
    controllerConfigs: Map<string, unknown>
  ) {
    cell.withDelay = function (options: WithDelayControllerOptions) {
      controllerConfigs.set(withDelayController.configKey, options);
      return this;
    };
  }

  /**
   * Creates a withDelay controller instance.
   *
   * @param key - The unique key for this controller instance.
   * @param controllerCtx - The runtime context for controller operations.
   */
  constructor(
    key: string,
    readonly controllerCtx: ControllerClassContext
  ) {
    this.key = key;

    const options =
      controllerCtx.controllerConfig as WithDelayControllerOptions;
    const delay = options?.millisecondDelay;

    if (typeof delay !== 'number' || delay < 0) {
      throw new Error(
        `[vault] Delay controller requires a delay in milliseconds (>=0). Received "${delay}".`
      );
    }

    this.milliseconds = delay;
  }

  /**
   * Handles a controller message by queuing or releasing traces based on delay.
   *
   * @param msg - The controller message to process.
   * @returns An observable emitting the controller vote.
   */
  handleMessage(
    msg: ControllerMessageShape<T>
  ): Observable<ControllerVote | void> {
    if (msg.type !== ControllerMessageTypes.Attempt) {
      return of(ControllerVotes.Abstain);
    }

    const traceId = msg.traceId;
    const now = Date.now();

    // First time seeing this trace: schedule it
    if (!this.queue.has(traceId)) {
      const emitAt = now + this.milliseconds;
      this.queue.set(traceId, emitAt);

      vaultDebug(`${this.key} DENY — queued trace ${traceId} emitAt=${emitAt}`);
      this.scheduleNextTimer();

      return of(ControllerVotes.Deny);
    }

    // Seen before: if expired, release it; otherwise keep pause
    const emitAt = this.queue.get(traceId)!;

    if (now >= emitAt) {
      this.queue.delete(traceId);

      vaultDebug(
        `${this.key} ABSTAIN — release trace ${traceId} (now=${now}, emitAt=${emitAt})`
      );
      this.scheduleNextTimer();

      return of(ControllerVotes.Abstain);
    }

    vaultDebug(
      `${this.key} DENY — trace ${traceId} not ready (now=${now}, emitAt=${emitAt})`
    );
    // timer already scheduled for earliest; but keep it safe
    this.scheduleNextTimer();

    return of(ControllerVotes.Deny);
  }

  /** Resets the controller by clearing all queued traces and timers. */
  reset(): void {
    vaultWarn(`${this.key} reset`);
    this.queue.clear();
    this.clearTimer();
  }

  /** Destroys the controller by clearing all queued traces and timers. */
  destroy(): void {
    vaultWarn(`${this.key} destroy`);
    this.queue.clear();
    this.clearTimer();
  }

  /** Clears the active revote timer. */
  private clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  /** Schedules a timer for the earliest queued trace. */
  private scheduleNextTimer() {
    this.clearTimer();
    if (this.queue.size === 0) return;

    const now = Date.now();
    let soonestEmitAt = Infinity;

    for (const emitAt of this.queue.values()) {
      if (emitAt < soonestEmitAt) soonestEmitAt = emitAt;
    }

    const delayMs = Math.max(0, soonestEmitAt - now);

    this.timer = setTimeout(() => {
      this.timer = null;
      this.fireExpired();
    }, delayMs);
  }

  /** Requests revotes for all expired traces in the queue. */
  private fireExpired() {
    const now = Date.now();

    // For every expired trace, request revote.
    // IMPORTANT: don't delete here — deletion happens when the revote Attempt returns Abstain.
    for (const [traceId, emitAt] of this.queue.entries()) {
      if (emitAt <= now) {
        vaultDebug(
          `${this.key} REVOTE — requesting revote for trace ${traceId} (emitAt=${emitAt}, now=${now})`
        );
        this.controllerCtx.requestRevote?.(traceId);
      }
    }

    // Schedule next timer for remaining items
    this.scheduleNextTimer();
  }
}
