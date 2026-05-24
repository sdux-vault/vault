import {
  AbstractActiveController,
  ControllerClassContext,
  ControllerMessageShape,
  ControllerMessageTypes,
  ControllerType,
  ControllerTypes,
  ControllerVote,
  ControllerVotes,
  defineControllerKey,
  VaultController,
  vaultDebug,
  vaultWarn
} from '@sdux-vault/shared';
import { Observable, of } from 'rxjs';

/**
 * Controller that conditionally blocks pipeline attempts when a global error is active.
 *
 * This controller observes incoming controller messages and votes to deny execution
 * when a global error is present, otherwise abstaining from intervention.
 *
 */
@VaultController({
  type: ControllerTypes.ReplayGlobalError,
  key: defineControllerKey('Policy', 'ReplayGlobalError'),
  critical: false
})
export class withReplayGlobalErrorController<
  T
> extends AbstractActiveController<T> {
  /** Static type identifier used by the orchestrator. */
  static readonly type: ControllerType;

  /** Static controller key assigned by the decorator. */
  static readonly key: string;

  /** Marks the controller as non-critical in the pipeline. */
  static readonly critical: boolean;

  /** Controller type identifier used for pipeline classification. */
  readonly type = withReplayGlobalErrorController.type;

  /**
   * Creates a new replay global error controller instance.
   *
   * @param key - Unique controller identifier assigned by the factory.
   * @param controllerCtx - Controller class context providing lifecycle and state access.
   */
  constructor(
    key: string,
    readonly controllerCtx: ControllerClassContext
  ) {
    super(key, controllerCtx);
  }

  /**
   * Handles incoming controller messages and produces a vote based on global error state.
   *
   * @param msg - The controller message describing the current pipeline action.
   * @returns An observable emitting a controller vote or no value.
   */
  handleMessage(
    msg: ControllerMessageShape<T>
  ): Observable<ControllerVote | void> {
    vaultDebug(
      `${this.key} handleMessage received "${msg.type}" for trace "${msg.traceId}".`
    );
    this.traceId = msg.traceId;

    if (msg.type === ControllerMessageTypes.Attempt) {
      vaultDebug(
        `${this.key} ATTEMPT received. Global error present? ${this.hasError}.`
      );
      if (this.hasError) {
        vaultWarn(
          `${this.key} voting DENY — global error active. Attempt blocked for trace "${msg.traceId}".`
        );
        return of(ControllerVotes.Deny);
      }

      vaultDebug(`${this.key} voting ABSTAIN — no global error detected.`);
      return of(ControllerVotes.Abstain);
    }

    vaultWarn(
      // eslint-disable-next-line
      `${this.key} received unknown controller message type "${(msg as any).type}". Abstaining.`
    );
    return of(ControllerVotes.Abstain);
  }
}
