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
import { extendWithMaxFailureFluent } from './function/extend-with-max-failure.function';
import { WithMaxFailureControllerOptions } from './options/with-max-failure-controller.options';

/**
 * Error controller that tracks per-trace failure counts and aborts pipeline
 * attempts once the configured maximum number of failures is exceeded.
 */
@VaultController({
  type: ControllerTypes.Error,
  key: defineControllerKey('Policy', 'MaxFailures'),
  critical: false,
  wantsConfig: true,
  configKey: 'withMaxFailures'
})
export class withMaxFailuresController<T> implements ControllerContract<T> {
  /** Static controller type used for orchestrator classification. */
  static readonly type: ControllerType;

  /** Unique controller key used for diagnostics and devtools. */
  static readonly key: string;

  /** Whether errors from this controller halt the pipeline. */
  static readonly critical: boolean;

  /** Fluent extension function for max-failure configuration. */
  static readonly extensionFluent = extendWithMaxFailureFluent;

  /** Whether this controller requires consumer-supplied configuration. */
  static readonly wantsConfig: boolean;

  /** Configuration key used to locate max-failure options in the config registry. */
  static readonly configKey: string;

  /** The controller type identifier for this instance. */
  readonly type = withMaxFailuresController.type;

  /** Unique identifier for this controller instance. */
  readonly key: string;

  /** Whether this controller is critical to pipeline execution. */
  readonly critical = withMaxFailuresController.critical;

  /** Maximum number of failures allowed before aborting. */
  private readonly maxFailures: number;

  /** Trace identifier currently being tracked for failures. */
  private activeTraceId: string | undefined;

  /** Accumulated failure count for the active trace. */
  private failureCount = 0;

  /**
   * Installs the fluent withMaxFailures configuration method on the FeatureCell.
   *
   * @param cell - The FeatureCell shape to extend.
   * @param controllerConfigs - Map of controller configuration entries.
   */
  static installFluentApi<T>(
    cell: FeatureCellBaseShape<T>,
    controllerConfigs: Map<string, unknown>
  ) {
    cell.withMaxFailures = function (options: WithMaxFailureControllerOptions) {
      controllerConfigs.set(withMaxFailuresController.configKey, options);
      return this;
    };
  }

  /**
   * Creates a new max-failures controller instance.
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
      controllerCtx.controllerConfig as WithMaxFailureControllerOptions;
    const maxFailures = options?.maxFailures;

    if (!Number.isInteger(maxFailures) || maxFailures <= 0) {
      throw new Error(
        `[vault] MaxFailures controller requires a positive integer maxFailures. Received "${maxFailures}".`
      );
    }

    this.maxFailures = maxFailures;
  }

  /**
   * Evaluates an incoming controller message against the failure threshold.
   *
   * @param msg - The controller message to evaluate.
   * @returns An observable emitting the controller vote.
   */
  handleMessage(
    msg: ControllerMessageShape<T>
  ): Observable<ControllerVote | void> {
    const { traceId, type } = msg;

    if (traceId !== this.activeTraceId) {
      this.activeTraceId = traceId;
      this.failureCount = 0;
    }

    switch (type) {
      case ControllerMessageTypes.Attempt: {
        if (this.failureCount >= this.maxFailures) {
          vaultDebug(
            `${this.key} ABORT — trace ${traceId} exceeded maxFailures (${this.failureCount}/${this.maxFailures})`
          );
          this.activeTraceId = undefined;
          this.failureCount = 0;
          return of(ControllerVotes.Abort);
        } else {
          return of(ControllerVotes.Abstain);
        }
      }

      case ControllerMessageTypes.Failure: {
        this.failureCount++;

        vaultDebug(
          `${this.key} FAILURE — trace ${traceId} registered a failure (${this.failureCount}/${this.maxFailures})`
        );
        return of();
      }

      default: {
        vaultDebug(
          `${this.key} ALLOW — trace ${traceId} failure ${this.failureCount}/${this.maxFailures}`
        );
        return of(ControllerVotes.Abstain);
      }
    }
  }

  /** Resets the failure counters to allow fresh attempts. */
  reset(): void {
    vaultWarn(`${this.key} reset`);
    this.activeTraceId = undefined;
    this.failureCount = 0;
  }

  /** Tears down the controller and clears the failure counters. */
  destroy(): void {
    vaultWarn(`${this.key} destroy`);
    this.activeTraceId = undefined;
    this.failureCount = 0;
  }
}
