import {
  BehaviorClassContext,
  BehaviorTypes,
  defineBehaviorKey,
  FeatureCellBaseShape,
  VaultBehavior
} from '@sdux-vault/shared';

import { StepwiseStageTypes } from '../../../controllers/stepwise/types/stepwise-stage.type';
import { StepwiseBehaviorAbstract } from '../abstract/with-stepwise.abstract';
import { extendStepwiseFilterFunction } from '../symbols/function/extend-stepwise-filter.function';
import { StepwiseBehaviorOptions } from '../symbols/options/stepwise-behavior.options';

/**
 * Stepwise filter behavior that evaluates candidate state values against a stepwise policy
 * before allowing them to proceed through the pipeline.
 *
 * This behavior operates at the filter stage and delegates decision-making to a consumer-supplied
 * stepwise callback configured via the FeatureCell fluent API.
 *
 */
@VaultBehavior({
  type: BehaviorTypes.StepwiseFilter,
  key: defineBehaviorKey('Policy', 'StepwiseFilter'),
  critical: true,
  wantsConfig: true,
  configKey: 'withStepwiseFilter'
})
export class withStepwiseFilterBehavior<T> extends StepwiseBehaviorAbstract<T> {
  /**
   * Extension function used to augment the FeatureCell API with stepwise filter configuration.
   */
  static readonly extension = extendStepwiseFilterFunction;

  /**
   * Installs the fluent API method used to configure stepwise filter behavior on a FeatureCell.
   *
   * @param cell - The FeatureCell instance being extended.
   * @param behaviorConfigs - Storage map for behavior configuration values.
   * @returns No return value.
   */
  static installFluentApi<T>(
    cell: FeatureCellBaseShape<T>,
    behaviorConfigs: Map<string, unknown>
  ): void {
    cell.withStepwiseFilter = function (options: StepwiseBehaviorOptions<T>) {
      behaviorConfigs.set(withStepwiseFilterBehavior.configKey, options);
      return this;
    };
  }

  /**
   * Creates a new stepwise filter behavior instance bound to the filter stage.
   *
   * @param key - Unique behavior identifier assigned by the behavior factory.
   * @param _behaviorCtx - Behavior class context providing configuration and lifecycle access.
   */
  constructor(key: string, _behaviorCtx: BehaviorClassContext) {
    super(key, _behaviorCtx, StepwiseStageTypes.Filter);

    this.type = withStepwiseFilterBehavior.type;
    this.critical = withStepwiseFilterBehavior.critical;
  }
}
