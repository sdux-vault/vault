import {
  BehaviorClassContext,
  BehaviorTypes,
  defineBehaviorKey,
  FeatureCellBaseShape,
  VaultBehavior
} from '@sdux-vault/shared';

import { StepwiseStageTypes } from '../../../controllers/stepwise/types/stepwise-stage.type';
import { StepwiseBehaviorAbstract } from '../abstract/with-stepwise.abstract';
import { extendStepwiseResolveFunction } from '../symbols/function/extend-stepwise-resolve.function';
import { StepwiseBehaviorOptions } from '../symbols/options/stepwise-behavior.options';

/**
 * Stepwise resolve behavior that evaluates candidate state values against a
 * stepwise policy before allowing resolve-stage execution to proceed.
 *
 * This behavior operates at the resolve stage and delegates decision-making to
 * a consumer-supplied stepwise callback configured through the FeatureCell API.
 *
 */
@VaultBehavior({
  type: BehaviorTypes.StepwiseResolve,
  key: defineBehaviorKey('Policy', 'StepwiseResolve'),
  critical: true,
  wantsConfig: true,
  configKey: 'withStepwiseResolve'
})
export class withStepwiseResolveBehavior<
  T
> extends StepwiseBehaviorAbstract<T> {
  /**
   * Extension function used to augment the FeatureCell API with stepwise resolve configuration.
   */
  static readonly extension = extendStepwiseResolveFunction;

  /**
   * Installs the fluent API method used to configure stepwise resolve behavior on a FeatureCell.
   *
   * @param cell - The FeatureCell instance being extended.
   * @param behaviorConfigs - Storage map for behavior configuration values.
   */
  static installFluentApi<T>(
    cell: FeatureCellBaseShape<T>,
    behaviorConfigs: Map<string, unknown>
  ): void {
    cell.withStepwiseResolve = function (options: StepwiseBehaviorOptions<T>) {
      behaviorConfigs.set(withStepwiseResolveBehavior.configKey, options);
      return this;
    };
  }

  /**
   * Creates a new stepwise resolve behavior instance bound to the resolve stage.
   *
   * @param key - Unique behavior identifier assigned by the behavior factory.
   * @param _behaviorCtx - Behavior class context providing configuration and lifecycle access.
   */
  constructor(key: string, _behaviorCtx: BehaviorClassContext) {
    super(key, _behaviorCtx, StepwiseStageTypes.Resolve);

    this.type = withStepwiseResolveBehavior.type;
    this.critical = withStepwiseResolveBehavior.critical;
  }
}
