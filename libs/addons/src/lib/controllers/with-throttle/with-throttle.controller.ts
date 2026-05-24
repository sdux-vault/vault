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
import { extendWithThrottleFluent } from './function/extend-with-throttle.function';
import { WithThrottleControllerOptions } from './options/with-throttle-controller.options';

/**
 * Policy controller that enforces a time-based throttle window on pipeline
 * attempts, aborting any attempt that occurs within the cooldown period.
 */
@VaultController({
  type: ControllerTypes.Policy,
  key: defineControllerKey('Policy', 'Throttle'),
  critical: false,
  wantsConfig: true,
  configKey: 'withThrottle'
})
export class withThrottleController<T> implements ControllerContract<T> {
  /** Static controller type used for orchestrator classification. */
  static readonly type: ControllerType;

  /** Unique controller key used for diagnostics and devtools. */
  static readonly key: string;

  /** Whether errors from this controller halt the pipeline. */
  static readonly critical: boolean;

  /** Fluent extension function for throttle configuration. */
  static readonly extensionFluent = extendWithThrottleFluent;

  /** Whether this controller requires consumer-supplied configuration. */
  static readonly wantsConfig: boolean;

  /** Configuration key used to locate throttle options in the config registry. */
  static readonly configKey: string;

  /** The controller type identifier for this instance. */
  readonly type = withThrottleController.type;

  /** Unique identifier for this controller instance. */
  readonly key: string;

  /** Whether this controller is critical to pipeline execution. */
  readonly critical = withThrottleController.critical;

  /**
   * Installs the fluent withThrottle configuration method on the FeatureCell.
   *
   * @param cell - The FeatureCell shape to extend.
   * @param controllerConfigs - Map of controller configuration entries.
   */
  static installFluentApi<T>(
    cell: FeatureCellBaseShape<T>,
    controllerConfigs: Map<string, unknown>
  ) {
    cell.withThrottle = function (options: WithThrottleControllerOptions) {
      controllerConfigs.set(withThrottleController.configKey, options);
      return this;
    };
  }

  /** Throttle duration in milliseconds. */
  private readonly milliseconds: number;

  /** Timestamp until which new attempts are throttled. */
  private throttledUntil: number | null = null;

  /**
   * Creates a new throttle controller instance.
   *
   * @param key - Unique controller identifier supplied by the factory.
   * @param controllerCtx - Class-level context for dependency resolution.
   */
  constructor(
    key: string,
    readonly controllerCtx: ControllerClassContext
  ) {
    this.key = key;

    const options =
      controllerCtx.controllerConfig as WithThrottleControllerOptions;
    const milliseconds = options?.millisecondThrottle;

    if (typeof milliseconds !== 'number' || milliseconds < 0) {
      throw new Error(
        `[vault] Throttle controller requires a throttle in millisecond (>=0). A millisecondThrottle of "${milliseconds}" is not valid.`
      );
    }

    this.milliseconds = milliseconds;
  }

  /**
   * Evaluates an incoming controller message against the throttle window.
   *
   * @param msg - The controller message to evaluate.
   * @returns An observable emitting the controller vote.
   */
  handleMessage(
    msg: ControllerMessageShape<T>
  ): Observable<ControllerVote | void> {
    if (msg.type !== ControllerMessageTypes.Attempt) {
      return of(ControllerVotes.Abstain);
    }

    const now = Date.now();

    // First attempt or window expired → allow immediately
    if (this.throttledUntil === null || now >= this.throttledUntil) {
      this.throttledUntil = now + this.milliseconds;

      vaultDebug(
        `${this.key} ALLOW — throttle window opened [${now}..${this.throttledUntil}) for trace ${msg.traceId}`
      );

      return of(ControllerVotes.Abstain);
    }

    // Inside throttle window → abort
    vaultDebug(
      `${this.key} ABORT — throttled (now=${now}, until=${this.throttledUntil}) for trace ${msg.traceId}`
    );

    return of(ControllerVotes.Abort);
  }

  /** Resets the throttle window to allow the next attempt immediately. */
  reset(): void {
    vaultWarn(`${this.key} reset`);
    this.throttledUntil = null;
  }

  /** Tears down the controller and clears the throttle window. */
  destroy(): void {
    vaultWarn(`${this.key} destroy`);
    this.throttledUntil = null;
  }
}
