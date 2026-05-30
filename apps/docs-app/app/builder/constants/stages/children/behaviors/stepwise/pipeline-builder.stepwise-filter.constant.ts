import { PIPELINE_BUILDER_STEPWISE_AI_ASSIST_CONSTANT } from 'apps/docs-app/app/builder/constants/ai-assist/stepwise.ai-assist.constant';
import { FileBuilderApiTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-api.type';
import { FileBuilderCallStyleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-call-style.type';
import { FileBuilderEmitTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-emit.type';
import { FileBuilderRoleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-target.type';
import { PipelineWithStepwiseFilterBehaviorComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/stepwise/with-stepwise-filter/with-stepwise-filter.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderStepwiseFilterConstant: BehaviorDefinitionShape = {
  /** Stable identifier */
  id: BehaviorIdTypes.WithStepwiseFilterBehavior,

  /** Owning stage */
  parentId: StageIdTypes.Stepwise,

  /** UI label */
  label: 'Stepwise Filter',

  /** Builder prompt */
  question:
    'Do you want to apply policy-driven execution control immediately after the Filter stage?',

  description:
    'Executes an engineer-supplied Stepwise Filter function after filtering produces a candidate value. ' +
    'The function must explicitly continue, block, or clear the update.',

  /**
   * Stepwise callback function
   */
  params: [
    {
      key: 'stepwiseCallback',
      label: 'Stepwise Filter Function',
      type: 'function',
      defaultValue: `(current, candidate, decisions) => {
  decisions.continue();
}`,
      optional: false,
      hint: 'Must be pure. Must not mutate state. Must emit exactly one decision: continue(), block(), or clear().',
      placeholder:
        '(current, candidate, decisions) => { decisions.continue(); }'
    }
  ],

  /** Documentation renderer */
  documentationComponentReference: PipelineWithStepwiseFilterBehaviorComponent,

  aiAssist: PIPELINE_BUILDER_STEPWISE_AI_ASSIST_CONSTANT,

  /**
   * ─────────────────────────────
   * Code emission metadata
   * ─────────────────────────────
   */
  code: [
    /**
     * Definition-time structural controller
     * Appears in provideFeatureCell(..., [], [controllers])
     */
    {
      target: FileBuilderTargetTypes.FeatureCell,
      api: FileBuilderApiTypes.Controllers,
      emit: FileBuilderEmitTypes.Reference,
      symbol: 'withStepwiseController',
      role: FileBuilderRoleTypes.Structural,
      import: '@sdux-vault/addons',
      order: 0
    },
    {
      target: FileBuilderTargetTypes.FeatureCell,
      api: FileBuilderApiTypes.Behaviors,
      emit: FileBuilderEmitTypes.Reference,
      symbol: 'withStepwiseFilterBehavior',
      role: FileBuilderRoleTypes.Structural,
      import: '@sdux-vault/addons',
      order: 0
    },

    /**
     * Runtime fluent configuration
     * Appears in this.#vault.withDelay?.(...)
     */
    {
      target: FileBuilderTargetTypes.Vault,
      api: FileBuilderApiTypes.StepwiseFilter,
      emit: FileBuilderEmitTypes.Call,
      symbol: 'withStepwiseFilter',
      role: FileBuilderRoleTypes.Functional,
      callStyle: FileBuilderCallStyleTypes.Fluent,
      order: 0
    }
  ]
};
