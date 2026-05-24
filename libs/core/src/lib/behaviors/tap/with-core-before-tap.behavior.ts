import {
  BeforeTapBehaviorContract,
  BehaviorTypes,
  defineBehaviorKey,
  PipelineUpstreamValue,
  TapCallback,
  VaultBehavior
} from '@sdux-vault/shared';

import { TapAbstractBehavior } from './tap.abstract';

/**
 * Core tap behavior executed before reducer evaluation.
 *
 * This behavior allows consumers to observe or react to the pipeline value
 * prior to reducer execution. It delegates tap execution to the shared tap
 * abstraction and does not modify pipeline state or control flow.
 *
 * @typeParam T - The pipeline state value type observed by the tap.
 */
@VaultBehavior({
  type: BehaviorTypes.CoreBeforeTap,
  key: defineBehaviorKey('Core', 'BeforeTap'),
  critical: true
})
export class withCoreBeforeTapBehavior<T>
  extends TapAbstractBehavior<T>
  implements BeforeTapBehaviorContract<T>
{
  /** Pipeline behavior type indicating execution occurs prior to reducers. */
  override readonly type = BehaviorTypes.CoreBeforeTap;

  /**
   * Executes the provided tap callback before reducer evaluation.
   *
   * The tap is invoked for observational or side-effect purposes only and
   * does not influence reducer logic or state resolution.
   *
   * @param current - The current pipeline value prior to reduction.
   * @param tap - The tap callback to invoke.
   */
  applyBeforeTap(current: PipelineUpstreamValue<T>, tap: TapCallback<T>): void {
    this.executeTap(current, tap);
  }
}
