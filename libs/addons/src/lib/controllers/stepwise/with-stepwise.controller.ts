import {
  ControllerClassContext,
  ControllerMessageShape,
  ControllerType,
  ControllerTypes,
  ControllerVote,
  ControllerVotes,
  defineControllerKey,
  VaultController,
  vaultDebug,
  vaultWarn
} from '@sdux-vault/shared';
import { Observable, of, Subscription } from 'rxjs';
import { StepwiseBusService } from './services/stepwise-bus.service';
import { StepwiseAnswerShape } from './shapes/stepwise-answer.shape';
import { StepwiseRequestShape } from './shapes/stepwise-request.shape';
import { StepwiseResponseShape } from './shapes/stepwise-response.shape';

/**
 * Controller that coordinates stepwise policy decisions by serializing requests
 * and mediating responses between behaviors and external decision producers.
 *
 * This controller maintains a FIFO queue of stepwise requests and ensures that
 * only one request is active at a time, emitting requests outward and resolving
 * them when a corresponding response is received.
 */
@VaultController({
  type: ControllerTypes.Stepwise,
  key: defineControllerKey('Policy', 'Stepwise'),
  critical: false
})
export class withStepwiseController<T> {
  /**
   * Static controller type identifier assigned by the decorator.
   */
  static readonly type: ControllerType;

  /**
   * Static controller key assigned by the decorator.
   */
  static readonly key: string;

  /**
   * Indicates that this controller is non-critical in the pipeline.
   */
  static readonly critical: boolean;

  /**
   * Instance-level controller type identifier.
   */
  readonly type = withStepwiseController.type;

  /**
   * Indicates whether this controller is critical for pipeline execution.
   */
  readonly critical = withStepwiseController.critical;

  /**
   * Unique controller key for this instance.
   */
  readonly key: string;

  /**
   * Shared stepwise bus used for request, response, and answer signaling.
   */
  private readonly bus = StepwiseBusService();

  /**
   * FIFO queue of pending stepwise requests awaiting processing.
   */
  private readonly queue: StepwiseRequestShape[] = [];

  /**
   * Currently active request awaiting a response.
   */
  private awaiting?: StepwiseRequestShape;

  /**
   * Subscription to inbound stepwise requests.
   */
  private readonly requestSub: Subscription;

  /**
   * Subscription to external stepwise responses.
   */
  private readonly responseSub: Subscription;

  /**
   * Creates a new stepwise controller instance and wires bus subscriptions.
   *
   * @param key - Unique controller identifier assigned by the controller factory.
   * @param controllerCtx - Controller class context provided by the orchestrator.
   */
  constructor(
    key: string,
    readonly controllerCtx: ControllerClassContext
  ) {
    this.key = key;

    this.requestSub = this.bus.inboundRequest$.subscribe({
      next: (req) => this.#onRequest(req),
      error:
        /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
        (e) =>
          /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
          vaultWarn(`${this.key} inboundRequest$ error: ${String(e)}`)
    });

    this.responseSub = this.bus.response$.subscribe({
      next: (res) => this.#onResponse(res),
      error:
        /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
        (e) =>
          /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
          vaultWarn(`${this.key} response$ error: ${String(e)}`)
    });
  }

  /**
   * Handles controller admission messages by abstaining from all votes.
   *
   * @param _ - Incoming controller message.
   * @returns An observable emitting an abstain vote.
   */
  handleMessage(_: ControllerMessageShape<T>): Observable<ControllerVote> {
    return of(ControllerVotes.Abstain);
  }

  /**
   * Enqueues an inbound stepwise request and triggers processing.
   *
   * @param request - Incoming stepwise request emitted by a behavior.
   */
  #onRequest(request: StepwiseRequestShape): void {
    this.queue.push(request);
    vaultDebug(
      `${this.key} queued request id="${request.id}" queue=${this.queue.length}`
    );
    this.#processNext();
  }

  /**
   * Advances the request queue and emits the next request when idle.
   */
  #processNext(): void {
    if (this.awaiting) return;

    this.awaiting = this.queue.shift();
    if (!this.awaiting) return;

    vaultDebug(
      `${this.key} emitting request id="${this.awaiting.id}" stage="${this.awaiting.stage}"`
    );
    this.bus.emitOutboundRequest(this.awaiting);
  }

  /**
   * Processes an external response and resolves the active request.
   *
   * @param response - Stepwise response associated with a prior request.
   */
  #onResponse(response: StepwiseResponseShape): void {
    if (!this.awaiting) {
      vaultWarn(
        `${this.key} received response with no awaiting request id="${response.id}"`
      );
      return;
    }

    if (response.id !== this.awaiting.id) {
      vaultWarn(
        `${this.key} ignoring out-of-order response id="${response.id}", awaiting="${this.awaiting.id}"`
      );
      return;
    }

    vaultDebug(
      `${this.key} accepted response id="${response.id}" decision="${response.decision}"`
    );

    const answer: StepwiseAnswerShape = {
      id: response.id,
      decision: response.decision
    };

    this.bus.emitAnswer(answer);

    this.awaiting = undefined;
    this.#processNext();
  }

  /**
   * Cleans up controller resources and unsubscribes from bus streams.
   */
  destroy(): void {
    this.requestSub.unsubscribe();
    this.responseSub.unsubscribe();
    this.queue.length = 0;
    this.awaiting = undefined;
    vaultWarn(`${this.key} - destroy`);
  }

  /**
   * Resets the controller without modifying internal state.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset noop`);
  }
}
