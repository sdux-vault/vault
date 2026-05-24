import {
  createFeatureCellToken,
  FeatureCellClass,
  FeatureCellConfig,
  FeatureCellShape,
  registerFeatureCell
} from '@sdux-vault/engine';
import {
  BehaviorClassContract,
  ControllerClassContract
} from '@sdux-vault/shared';
import { withCoreErrorCallbackBehavior } from '../../behaviors/error/with-core-error-callback/with-core-error-callback.behavior';
import { withCoreErrorBehavior } from '../../behaviors/error/with-core-error/with-core-error.behavior';
import { withCoreFilterBehavior } from '../../behaviors/filter/with-core-filter.behavior';
import { withArrayMergeBehavior } from '../../behaviors/merge/array/with-array-merge.behavior';
import { withCoreFromObservableBehavior } from '../../behaviors/observable/with-core-from-observable.behavior';
import { withCoreFromPromiseBehavior } from '../../behaviors/promise/with-core-from-promise.behavior';
import { withCoreReducerBehavior } from '../../behaviors/reducer/with-core-reducer.behavior';
import { withCoreObservableBehavior } from '../../behaviors/resolve/core-observable/with-core-observable.behavior';
import { withCorePromiseBehavior } from '../../behaviors/resolve/core-promise/with-core-promise.behavior';
import { withCoreValueBehavior } from '../../behaviors/resolve/core-value/with-core-value.behavior';
import { withCoreFromStreamBehavior } from '../../behaviors/resolve/from-stream/with-core-from-stream.behavior';
import { withCoreEmitStateBehavior } from '../../behaviors/state/with-core-emit-state/with-core-emit-state.behavior';
import { withCoreStateBehavior } from '../../behaviors/state/with-core-state/with-core-state.behavior';
import { withCoreAfterTapBehavior } from '../../behaviors/tap/with-core-after-tap.behavior';
import { withCoreBeforeTapBehavior } from '../../behaviors/tap/with-core-before-tap.behavior';

/**
 * Creates and registers a Feature Cell using the provided configuration and optional behavior and controller contracts.
 * This function produces a Feature Cell instance keyed by the descriptor and registers it for later resolution and usage.
 *
 *
 * @param descriptor Configuration descriptor that defines the Feature Cell identity and setup.
 * @param behaviors Behavior class contracts applied during Feature Cell construction.
 * @param controllers Controller class contracts applied during Feature Cell construction.
 * @returns The registered Feature Cell instance.
 */
export function FeatureCell<T>(
  descriptor: FeatureCellConfig<T>,
  behaviors: BehaviorClassContract<T>[] = [],
  controllers: ControllerClassContract<T>[] = []
): FeatureCellShape<T> {
  createFeatureCellToken(descriptor.key);

  registerFeatureCell({
    key: descriptor.key
  });

  return new FeatureCellClass(
    descriptor,
    loadDefaultBehaviors(),
    behaviors,
    controllers
  ).build();
}

/**
 * Returns the default set of core behavior classes.
 *
 * @returns An array of behavior class contracts included by default.
 */
function loadDefaultBehaviors<T>(): BehaviorClassContract<T>[] {
  return [
    withCoreAfterTapBehavior,
    withCoreBeforeTapBehavior,
    withCoreErrorBehavior,
    withCoreFilterBehavior,
    withCoreFromObservableBehavior,
    withCoreFromPromiseBehavior,
    withCoreFromStreamBehavior,
    withCoreObservableBehavior,
    withCorePromiseBehavior,
    withCoreReducerBehavior,
    withCoreValueBehavior,
    withCoreStateBehavior,
    withCoreErrorCallbackBehavior,
    withArrayMergeBehavior,
    withCoreEmitStateBehavior
  ];
}
