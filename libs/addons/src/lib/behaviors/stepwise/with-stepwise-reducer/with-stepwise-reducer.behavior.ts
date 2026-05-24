import {
  BehaviorClassContext,
  BehaviorTypes,
  defineBehaviorKey,
  FeatureCellBaseShape,
  VaultBehavior
} from '@sdux-vault/shared';

import { StepwiseStageTypes } from '../../../controllers/stepwise/types/stepwise-stage.type';
import { StepwiseBehaviorAbstract } from '../abstract/with-stepwise.abstract';
import { extendStepwiseReducerFunction } from '../symbols/function/extend-stepwise-reducer.function';
import { StepwiseBehaviorOptions } from '../symbols/options/stepwise-behavior.options';

/**
 * Stepwise reducer behavior that evaluates candidate state values against a stepwise
 * policy before allowing reducer execution to proceed.
 *
 * This behavior operates at the reducer stage and delegates decision-making to a
 * consumer-supplied stepwise callback configured through the FeatureCell fluent API.
 *
 */
@VaultBehavior({
  type: BehaviorTypes.StepwiseReducer,
  key: defineBehaviorKey('Policy', 'StepwiseReducer'),
  critical: true,
  wantsConfig: true,
  configKey: 'withStepwiseReducer'
})
export class withStepwiseReducerBehavior<
  T
> extends StepwiseBehaviorAbstract<T> {
  /**
   * Extension function used to augment the FeatureCell API with stepwise reducer configuration.
   */
  static readonly extension = extendStepwiseReducerFunction;

  /**
   * Installs the fluent API method used to configure stepwise reducer behavior on a FeatureCell.
   *
   * @param cell - The FeatureCell instance being extended.
   * @param behaviorConfigs - Storage map for behavior configuration values.
   */
  static installFluentApi<T>(
    cell: FeatureCellBaseShape<T>,
    behaviorConfigs: Map<string, unknown>
  ): void {
    cell.withStepwiseReducer = function (options: StepwiseBehaviorOptions<T>) {
      behaviorConfigs.set(withStepwiseReducerBehavior.configKey, options);
      return this;
    };
  }

  /**
   * Creates a new stepwise reducer behavior instance bound to the reducer stage.
   *
   * @param key - Unique behavior identifier assigned by the behavior factory.
   * @param _behaviorCtx - Behavior class context providing configuration and lifecycle access.
   */
  constructor(key: string, _behaviorCtx: BehaviorClassContext) {
    super(key, _behaviorCtx, StepwiseStageTypes.Reducer);

    this.type = withStepwiseReducerBehavior.type;
    this.critical = withStepwiseReducerBehavior.critical;
  }
}
