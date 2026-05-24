import { TapCallback } from '../../../types/callback/tap-callback.type';
import { PipelineUpstreamValue } from '../../../types/pipeline/pipeline-upstream-value.type';
import { BehaviorContract } from '../behavior/behavior.interface';

/** Contract for after-tap behaviors that observe state after pipeline resolution. */
export interface AfterTapBehaviorContract<T> extends BehaviorContract<T> {
  /**
   * Invokes the tap callback with the current pipeline value after resolution.
   *
   * @param current - The upstream pipeline value.
   * @param tap - The tap callback to invoke.
   */
  applyAfterTap(current: PipelineUpstreamValue<T>, tap: TapCallback<T>): void;
}
