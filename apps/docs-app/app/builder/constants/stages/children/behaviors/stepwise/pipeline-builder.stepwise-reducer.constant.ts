import { PIPELINE_BUILDER_STEPWISE_AI_ASSIST_CONSTANT } from 'apps/docs-app/app/builder/constants/ai-assist/stepwise.ai-assist.constant';
import { FileBuilderApiTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-api.type';
import { FileBuilderCallStyleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-call-style.type';
import { FileBuilderEmitTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-emit.type';
import { FileBuilderRoleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-target.type';
import { PipelineWithStepwiseReducerBehaviorComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/stepwise/with-stepwise-reducer/with-stepwise-reducer.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderStepwiseReducerConstant: BehaviorDefinitionShape = {
  id: BehaviorIdTypes.WithStepwiseReducerBehavior,

  parentId: StageIdTypes.Stepwise,

  label: 'Stepwise Reducer',

  question:
    'Do you want to apply policy-driven execution control immediately after the Reducer stage?',

  description:
    'Executes an engineer-supplied Stepwise Reducer function after the Reducer stage produces a reduced candidate value. ' +
    'The function must explicitly continue, block, or clear the update.',

  params: [
    {
      key: 'stepwiseCallback',
      label: 'Stepwise Reducer Function',
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

  documentationComponentReference: PipelineWithStepwiseReducerBehaviorComponent,

  aiAssist: PIPELINE_BUILDER_STEPWISE_AI_ASSIST_CONSTANT,

  code: [
    /**
     * Structural controller
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

    /**
     * Structural behavior
     */
    {
      target: FileBuilderTargetTypes.FeatureCell,
      api: FileBuilderApiTypes.Behaviors,
      emit: FileBuilderEmitTypes.Reference,
      symbol: 'withStepwiseReducerBehavior',
      role: FileBuilderRoleTypes.Structural,
      import: '@sdux-vault/addons',
      order: 0
    },

    /**
     * Fluent runtime configuration
     */
    {
      target: FileBuilderTargetTypes.Vault,
      api: FileBuilderApiTypes.StepwiseReducer,
      emit: FileBuilderEmitTypes.Call,
      symbol: 'withStepwiseReducer',
      role: FileBuilderRoleTypes.Functional,
      callStyle: FileBuilderCallStyleTypes.Fluent,
      order: 0
    }
  ]
};
