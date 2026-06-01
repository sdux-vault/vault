import {
  BehaviorClassContext,
  BehaviorType,
  isFunction,
  PipelineUpstreamValue,
  StepwiseBehaviorContract,
  VAULT_CLEAR_STATE,
  VAULT_CONTINUE,
  VAULT_NOOP,
  vaultDebug,
  vaultWarn
} from '@sdux-vault/shared';
import { StepwiseBusService } from '../../../controllers/stepwise/services/stepwise-bus.service';

import { firstValueFrom } from 'rxjs';
import { StepwiseAnswerShape } from '../../../controllers/stepwise/shapes/stepwise-answer.shape';
import { StepwiseRequestShape } from '../../../controllers/stepwise/shapes/stepwise-request.shape';
import { StepwiseDecisionTypes } from '../../../controllers/stepwise/types/stepwise-decision.type';
import { StepwiseStageType } from '../../../controllers/stepwise/types/stepwise-stage.type';
import { StepwiseBehaviorOptions } from '../symbols/options/stepwise-behavior.options';
import { StepwiseFunction } from '../symbols/types/function/stepwise-function.type';

/**
 * Abstract base class for stepwise pipeline behaviors.
 *
 * This class provides shared execution and decision-handling logic for
 * stepwise behaviors that participate in gated pipeline stages, delegating
 * decision-making to a consumer-supplied callback and mapping responses into
 * pipeline-native control signals.
 */
export abstract class StepwiseBehaviorAbstract<
  T
> implements StepwiseBehaviorContract<T> {
  /**
   * Static behavior type identifier used for pipeline classification.
   */
  static readonly type: BehaviorType;

  /**
   * Indicates whether the behavior is critical at the static level.
   */
  static readonly critical: boolean;

  /**
   * Static behavior key assigned by the behavior system.
   */
  static readonly key: string;

  /**
   * Declares whether configuration is required for this behavior.
   */
  static readonly wantsConfig: boolean;

  /**
   * Declares the configuration key used to locate behavior options.
   */
  static readonly configKey: string;

  /**
   * Unique behavior key for this instance.
   */
  readonly key: string;

  /**
   * Instance-level behavior type identifier.
   */
  type!: BehaviorType;

  /**
   * Indicates whether this behavior instance is critical.
   */
  critical!: boolean;

  /**
   * Semantic pipeline stage associated with this behavior.
   */
  readonly #stage: StepwiseStageType;

  /**
   * Human-readable representation of the stage.
   */
  readonly #stageDisplay: string;

  /**
   * Shared stepwise message bus used for request and response coordination.
   */
  readonly #bus = StepwiseBusService();

  /**
   * Consumer-supplied callback used to evaluate stepwise decisions.
   */
  readonly #stepwiseCallback: StepwiseFunction<T>;

  /**
   * Creates a new stepwise behavior instance for a specific pipeline stage.
   *
   * @param key - Unique behavior identifier assigned by the factory.
   * @param behaviorCtx - Behavior class context providing configuration.
   * @param stage - The pipeline stage this behavior participates in.
   */
  constructor(
    key: string,
    behaviorCtx: BehaviorClassContext,
    stage: StepwiseStageType
  ) {
    this.key = key;
    const options = behaviorCtx.behaviorConfig as StepwiseBehaviorOptions<T>;
    this.#stage = stage;
    this.#stageDisplay = this.#capitalizeFirst(stage);

    if (!options) {
      throw new Error(
        `[vault] Stepwise behavior requires configuration via withStepwise${this.#stageDisplay}()`
      );
    }

    if (!isFunction(options.stepwiseCallback)) {
      throw new Error(
        '[vault] Stepwise behavior requires stepwiseCallback to be a function'
      );
    }

    this.#stepwiseCallback = options.stepwiseCallback;
  }

  /**
   * Capitalizes the first character of a string.
   *
   * @param str - The input string.
   * @returns The capitalized string.
   */
  #capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Executes the stepwise policy evaluation for the configured pipeline stage.
   *
   * @param current - The current committed state value.
   * @param candidate - The candidate upstream value under evaluation.
   * @param pipelineId - The unique identifier of the pipeline execution.
   * @returns A pipeline control signal or continuation marker.
   */
  async evaluateStepwise(
    current: T,
    candidate: PipelineUpstreamValue<T>,
    pipelineId: string
  ): Promise<PipelineUpstreamValue<T>> {
    const requestId = `${pipelineId}:${this.#stageDisplay}:${this.key}`;

    const request: StepwiseRequestShape = {
      id: requestId,
      pipelineId,
      stage: this.#stage,
      snapshot: current
    };

    vaultDebug(
      `${this.key} stepwise request emitted for pipeline "${pipelineId}" at stage "${this.#stageDisplay}".`
    );

    this.#bus.emitInboundRequest(request);

    const answer = firstValueFrom(this.#bus.waitForAnswer(requestId));

    await new Promise<void>((resolve): void => {
      const clearStepwise = () => {
        vaultDebug(`${this.key} - Response is "Clear"`);
        this.#bus.emitResponse({
          id: requestId,
          pipelineId,
          stage: this.#stage,
          decision: StepwiseDecisionTypes.Clear
        });
        resolve();
      };

      const blockStepwise = () => {
        vaultDebug(`${this.key} - Response is "Block"`);
        this.#bus.emitResponse({
          id: requestId,
          pipelineId,
          stage: this.#stage,
          decision: StepwiseDecisionTypes.Block
        });
        resolve();
      };

      const continueStepwise = () => {
        vaultDebug(`${this.key} - Response is "Continue"`);
        this.#bus.emitResponse({
          id: requestId,
          pipelineId,
          stage: this.#stage,
          decision: StepwiseDecisionTypes.Continue
        });
        resolve();
      };

      this.#stepwiseCallback(current as T, candidate as T, {
        clear: clearStepwise,
        block: blockStepwise,
        continue: continueStepwise,
        stage: this.#stage
      });
    });

    return this.#toPipelineOutcome(await answer);
  }

  /**
   * Maps a stepwise decision response to a pipeline-native control outcome.
   *
   * @param decision - The resolved stepwise decision.
   * @returns The corresponding pipeline control signal.
   */
  #toPipelineOutcome(
    decision: StepwiseAnswerShape
  ): typeof VAULT_CONTINUE | typeof VAULT_NOOP | typeof VAULT_CLEAR_STATE {
    vaultDebug(`${this.key} - decision = ${decision.decision}`);
    switch (decision.decision) {
      case StepwiseDecisionTypes.Continue:
        return VAULT_CONTINUE;

      case StepwiseDecisionTypes.Block:
        return VAULT_NOOP;

      case StepwiseDecisionTypes.Clear:
        return VAULT_CLEAR_STATE;

      default:
        return VAULT_NOOP;
    }
  }

  /**
   * Invoked when the behavior instance is destroyed.
   */
  destroy(): void {
    vaultWarn(`${this.key} - destroy noop`);
  }

  /**
   * Resets the behavior to its initial state.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset noop`);
  }
}
