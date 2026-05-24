import { vaultDebug } from '@sdux-vault/shared';
import { Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { StepwiseAnswerShape } from '../shapes/stepwise-answer.shape';
import { StepwiseRequestShape } from '../shapes/stepwise-request.shape';
import { StepwiseResponseShape } from '../shapes/stepwise-response.shape';

/**
 * Directional message bus that coordinates stepwise requests, responses, and answers.
 *
 * This service provides isolated channels that allow behaviors, controllers, and
 * external responders to exchange stepwise messages without introducing feedback loops.
 */
class StepwiseBusServiceClass {
  /**
   * Subject emitting inbound stepwise requests from behaviors to controllers.
   */
  readonly #inboundRequest$ = new Subject<StepwiseRequestShape>();

  /**
   * Subject emitting outbound stepwise requests from controllers to external observers.
   */
  readonly #outboundRequest$ = new Subject<StepwiseRequestShape>();

  /**
   * Subject emitting stepwise responses from external sources back to controllers.
   */
  readonly #response$ = new Subject<StepwiseResponseShape>();

  /**
   * Subject emitting final stepwise answers from controllers back to behaviors.
   */
  readonly #answer$ = new Subject<StepwiseAnswerShape>();

  /**
   * Observable stream of inbound stepwise requests entering the controller layer.
   */
  readonly inboundRequest$: Observable<StepwiseRequestShape> =
    this.#inboundRequest$.asObservable();

  /**
   * Observable stream of outbound stepwise requests leaving the controller layer.
   */
  readonly outboundRequest$: Observable<StepwiseRequestShape> =
    this.#outboundRequest$.asObservable();

  /**
   * Observable stream of external stepwise responses.
   */
  readonly response$: Observable<StepwiseResponseShape> =
    this.#response$.asObservable();

  /**
   * Observable stream of resolved stepwise answers returned to behaviors.
   */
  readonly answer$: Observable<StepwiseAnswerShape> =
    this.#answer$.asObservable();

  /**
   * Emits a stepwise request originating from a behavior into the controller channel.
   *
   * @param request - The stepwise request to emit.
   */
  emitInboundRequest(request: StepwiseRequestShape): void {
    vaultDebug(
      `[StepwiseBus] inboundRequest id="${request.id}" stage="${request.stage}"`
    );
    this.#inboundRequest$.next(request);
  }

  /**
   * Returns an observable that resolves with the first answer matching the given request id.
   *
   * @param id - The identifier of the stepwise request.
   * @returns An observable emitting the matching stepwise answer.
   */
  waitForAnswer(id: string): Observable<StepwiseAnswerShape> {
    return this.answer$.pipe(
      filter((a) => a.id === id),
      take(1)
    );
  }

  /**
   * Emits a stepwise request from a controller toward external observers.
   *
   * @param request - The stepwise request to emit.
   */
  emitOutboundRequest(request: StepwiseRequestShape): void {
    vaultDebug(
      `[StepwiseBus] outboundRequest id="${request.id}" stage="${request.stage}"`
    );
    this.#outboundRequest$.next(request);
  }

  /**
   * Emits a finalized stepwise answer from a controller back to behaviors.
   *
   * @param answer - The resolved stepwise answer.
   */
  emitAnswer(answer: StepwiseAnswerShape): void {
    vaultDebug(
      `[StepwiseBus] emitAnswer id="${answer.id}" decision="${answer.decision}"`
    );
    this.#answer$.next(answer);
  }

  /**
   * Emits a stepwise response from an external source to the controller layer.
   *
   * @param response - The stepwise response to emit.
   */
  emitResponse(response: StepwiseResponseShape): void {
    vaultDebug(
      `[StepwiseBus] emitResponse id="${response.id}" stage="${response.stage}" decision="${response.decision}"`
    );
    this.#response$.next(response);
  }
}

/**
 * Cached singleton instance of the stepwise bus service.
 */
let _instance: StepwiseBusServiceClass | null = null;

/**
 * Returns the singleton instance of the stepwise bus service.
 *
 * @returns The shared stepwise bus service instance.
 */
export function StepwiseBusService(): StepwiseBusServiceClass {
  if (!_instance) {
    _instance = new StepwiseBusServiceClass();
  }
  return _instance;
}
