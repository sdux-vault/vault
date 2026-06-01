import { Observable, Subscription, tap } from 'rxjs';
import { ControllerClassContext } from '../../contexts/controller-class.context';
import { ControllerContract } from '../../interfaces/controllers/controller.interface';
import { VaultErrorService } from '../../services/error/vault-error.service';
import { ControllerMessageShape } from '../../shapes/controller/controller-message.shape';
import { ControllerVote } from '../../types/controller/controller-vote.type';
import { ControllerType } from '../../types/controller/controller.type';
import { vaultDebug, vaultWarn } from '../../utils/logger/logger.util';
import { safeStringify } from '../../utils/safe-stringify/safe-stringify.util';

/**
 * Abstract base class for active controllers that react to external error
 * state changes and participate in pipeline admission voting.
 */
export abstract class AbstractActiveController<
  T
> implements ControllerContract<T> {
  /** Unique identifier for this controller instance. */
  readonly key: string;

  /** Controller type classification determined by the subclass. */
  abstract readonly type: ControllerType;

  /** Whether errors from this controller halt the pipeline. */
  readonly critical = false;

  /** Tracks whether the global error service currently holds an error. */
  protected hasError = false;

  /** Trace identifier from the most recent pipeline operation. */
  protected traceId: string | null = null;

  /** Subscription to the global VaultErrorService stream. */
  #subscription: Subscription;

  /**
   * Creates an active controller and subscribes to the global error stream.
   *
   * @param key - Unique controller identifier supplied by the factory.
   * @param ctx - Class-level context providing revote and lifecycle access.
   */
  constructor(
    key: string,
    protected readonly ctx: ControllerClassContext
  ) {
    this.key = key;

    this.#subscription = VaultErrorService()
      .error$.pipe(
        tap((error) => {
          vaultDebug(
            `${this.key} VaultErrorService dispatched event. Raw event: ${safeStringify(error)}.`
          );
          const newValue = error != null;
          vaultDebug(`${this.key} New transformed error value: "${newValue}".`);

          const revoteDecision =
            newValue !== this.hasError && this.traceId !== undefined;
          vaultDebug(
            `${this.key} Revote Decision: ${revoteDecision}. Factors.  NewValue: ${newValue} HasError: ${this.hasError} TraceId: ${this.traceId} Rubric: 'newValue !== this.hasError && this.traceId !== undefined'`
          );

          this.hasError = newValue;
          vaultDebug(
            `${this.key} this.hasError replace with newValue: "${this.hasError}".`
          );
          vaultDebug(
            `${this.key} onExternalTrigger dispatchd with: "${newValue}".`
          );
          this.onExternalTrigger(newValue);

          if (revoteDecision) {
            vaultDebug(
              `${this.key} Revote Requesed with traceId: "${this.traceId}".`
            );
            this.ctx.requestRevote(this.traceId!);
          }
        })
      )
      .subscribe();
  }

  /**
   * Hook invoked when the external error state changes.
   *
   * @param _newErrorState - The updated error state flag.
   */
  //istanbul ignore next
  protected onExternalTrigger(_newErrorState: boolean): void {}

  /**
   * Processes an incoming controller message and returns a vote.
   *
   * @param msg - The controller message to evaluate.
   * @returns An observable emitting the controller vote or void.
   */
  abstract handleMessage(
    msg: ControllerMessageShape<T>
  ): Observable<ControllerVote | void>;

  /** Tears down the controller and unsubscribes from the error stream. */
  destroy(): void {
    this.#subscription.unsubscribe();
    vaultWarn(`${this.key} - destroy`);
  }

  /** Resets the controller to its initial state. */
  reset(): void {
    vaultWarn(`${this.key} - reset "noop"`);
  }
}
