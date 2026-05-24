import { TapCallback } from '../../../types/callback/tap-callback.type';
import { PipelineUpstreamValue } from '../../../types/pipeline/pipeline-upstream-value.type';
import { BehaviorContract } from '../behavior/behavior.interface';

/** Contract for before-tap behaviors that observe state before pipeline resolution. */
export interface BeforeTapBehaviorContract<T> extends BehaviorContract<T> {
  /**
   * Invokes the tap callback with the current pipeline value before resolution.
   *
   * @param current - The upstream pipeline value.
   * @param tap - The tap callback to invoke.
   */
  applyBeforeTap(current: PipelineUpstreamValue<T>, tap: TapCallback<T>): void;
}
