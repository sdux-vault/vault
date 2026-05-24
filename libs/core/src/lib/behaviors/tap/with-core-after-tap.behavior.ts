import {
  AfterTapBehaviorContract,
  BehaviorTypes,
  defineBehaviorKey,
  PipelineUpstreamValue,
  TapCallback,
  VaultBehavior
} from '@sdux-vault/shared';

import { TapAbstractBehavior } from './tap.abstract';

/**
 * Core tap behavior executed after reducer completion.
 *
 * This behavior allows consumers to observe the finalized pipeline value
 * after all reducer logic has executed. It delegates tap execution to the
 * shared tap abstraction and does not modify pipeline state.
 *
 * @typeParam T - The pipeline state value type observed by the tap.
 */
@VaultBehavior({
  type: BehaviorTypes.CoreAfterTap,
  key: defineBehaviorKey('Core', 'AfterTap'),
  critical: true
})
export class withCoreAfterTapBehavior<T>
  extends TapAbstractBehavior<T>
  implements AfterTapBehaviorContract<T>
{
  /** Pipeline behavior type indicating execution occurs after reducers. */
  override readonly type = BehaviorTypes.CoreAfterTap;

  /**
   * Executes the provided tap callback after reducer completion.
   *
   * The tap is invoked for observational or side-effect purposes only and
   * does not influence pipeline control flow or state resolution.
   *
   * @param current - The finalized pipeline value.
   * @param tap - The tap callback to invoke.
   */
  applyAfterTap(current: PipelineUpstreamValue<T>, tap: TapCallback<T>): void {
    this.executeTap(current, tap);
  }
}
