import { VAULT_CLEAR_STATE, VAULT_NOOP } from '../../constants';
import { BehaviorContext } from '../../contexts';
import { VaultErrorShape } from '../../shapes';
import { FinalState, StateInputType } from '../../types';
import { BehaviorContract } from './behavior/behavior.interface';

/**
 * Contract for the core behavior responsible for committing pipeline state.
 */
export interface CoreStateBehaviorContract<T> extends BehaviorContract<T> {
  /**
   * Finalizes an error state for the current pipeline execution.
   *
   * @param error - The error to commit or null to clear error state.
   * @param ctx - The active behavior context.
   */
  finalizePipelineError(
    error: VaultErrorShape | null,
    ctx: BehaviorContext<T>
  ): void;

  /**
   * Finalizes a resolved pipeline value.
   *
   * @param value - The computed pipeline result.
   * @param ctx - The active behavior context.
   */
  finalizePipelineState(value: FinalState<T>, ctx: BehaviorContext<T>): void;

  /**
   * Finalizes a pipeline stop condition without applying state.
   *
   * @param ctx - The active behavior context.
   */
  finalizePipelineVaultStop(ctx: BehaviorContext<T>): void;

  /**
   * Prepares an incoming value for pipeline processing.
   *
   * @param ctx - The active behavior context.
   * @returns The prepared input or a no-op sentinel.
   */
  preparePipelineIncoming(
    ctx: BehaviorContext<T>
  ): StateInputType<T> | typeof VAULT_NOOP | typeof VAULT_CLEAR_STATE;

  /**
   * Finalizes a controller abort condition without applying state.
   *
   * @param ctx - The active behavior context.
   */
  finalizeControllerAbort(ctx: BehaviorContext<T>): void;

  /**
   * Finalizes a controller deny condition without applying state.
   *
   * @param ctx - The active behavior context.
   */
  finalizeControllerDeny(ctx: BehaviorContext<T>): void;
}
