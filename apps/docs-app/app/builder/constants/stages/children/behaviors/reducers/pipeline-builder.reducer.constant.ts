import { PIPELINE_BUILDER_REDUCER_AI_ASSIST_CONSTANT } from 'apps/docs-app/app/builder/constants/ai-assist/reducer.ai-assist.constant';
import { FileBuilderApiTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-api.type';
import { FileBuilderArgStyleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-arg-style.type';
import { FileBuilderEmitTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-emit.type';
import { FileBuilderModeTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-mode.type';
import { FileBuilderNoteTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-note.type';
import { FileBuilderRoleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-target.type';
import { PipelineReducersBehaviorComponent } from '../../../../../../docs/pipeline/behaviors/components/reducers/reducers.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderCoreReducerConstant: BehaviorDefinitionShape = {
  /** Stable identifier */
  id: BehaviorIdTypes.WithCoreReducerBehavior,

  /** Owning stage */
  parentId: StageIdTypes.Reducer,

  mode: FileBuilderModeTypes.Basic,

  /** UI copy */
  label: 'Transform State with Reducers',

  question:
    'Should state updates be processed through one or more reducer functions to produce the next immutable state?',

  description:
    'Applies pure reducer functions to the current state and candidate value to derive the next immutable state snapshot. Reducers must be deterministic and must not mutate the existing state.',

  note: FileBuilderNoteTypes.CoreBehaviorWithFluentApi,

  /**
   * Reducer function parameter
   */
  params: [
    {
      key: 'reducerFn',
      label: 'Reducer Function',
      type: 'function',
      defaultValue: `(current) => current`,
      optional: true,
      hint: `Must be pure, must not mutate state, and must return a value of the same structural type.
Example: <code>(current) => current</code>`,
      placeholder: '(current) => current'
    }
  ],

  /** Documentation renderer */
  documentationComponentReference: PipelineReducersBehaviorComponent,

  aiAssist: PIPELINE_BUILDER_REDUCER_AI_ASSIST_CONSTANT,

  /**
   * Code emission metadata
   */
  code: [
    {
      target: FileBuilderTargetTypes.Vault,
      api: FileBuilderApiTypes.Reducers,
      emit: FileBuilderEmitTypes.Raw,
      symbol: 'reducers',
      role: FileBuilderRoleTypes.Functional,
      argStyle: FileBuilderArgStyleTypes.positional,
      order: 0
    }
  ]
};
