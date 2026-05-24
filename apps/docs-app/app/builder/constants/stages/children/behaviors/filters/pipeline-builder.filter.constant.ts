import { PIPELINE_BUILDER_FILTER_AI_ASSIST_CONSTANT } from 'apps/docs-app/app/builder/constants/ai-assist/filter.ai-assist.constant';
import { FileBuilderApiTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-api.type';
import { FileBuilderArgStyleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-arg-style.type';
import { FileBuilderEmitTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-emit.type';
import { FileBuilderModeTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-mode.type';
import { FileBuilderNoteTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-note.type';
import { FileBuilderRoleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-target.type';
import { PipelineFiltersBehaviorComponent } from '../../../../../../docs/pipeline/behaviors/components/filters/filters.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderCoreFilterConstant: BehaviorDefinitionShape = {
  /** Stable identifier */
  id: BehaviorIdTypes.WithCoreFilterBehavior,

  /** Owning stage */
  parentId: StageIdTypes.Filter,

  mode: FileBuilderModeTypes.Basic,

  /** UI copy */
  label: 'Filter State Updates',

  question:
    'Should state updates be conditionally filtered before they reach reducers?',

  description:
    'Applies one or more filter functions to candidate state values before reducers execute. If a filter returns undefined, the update is suppressed and no state change occurs.',

  note: FileBuilderNoteTypes.CoreBehaviorWithFluentApi,
  // noteTodo: 'This is a core infrastructure behavior. It is automatically installed and does not need to be declared, registered, or selected in the builder UI.',

  /** Optional configuration parameters */
  params: [
    {
      key: 'filterFn',
      label: 'Custom Filter Function',
      type: 'function',
      defaultValue: `(value) => value`,
      optional: true,
      hint: `Must be deterministic and must not mutate the structural type of the value.
Return <code>undefined</code> to prevent the state update.
Example: <code>(value) => value</code>`,
      placeholder: '(value) => value'
    }
  ],

  /** Documentation renderer */
  documentationComponentReference: PipelineFiltersBehaviorComponent,

  aiAssist: PIPELINE_BUILDER_FILTER_AI_ASSIST_CONSTANT,

  /**
   * Code emission metadata
   */
  code: [
    {
      target: FileBuilderTargetTypes.Vault,
      api: FileBuilderApiTypes.Filters,
      emit: FileBuilderEmitTypes.Raw,
      symbol: 'filters',
      role: FileBuilderRoleTypes.Functional,
      argStyle: FileBuilderArgStyleTypes.positional,
      order: 0
    }
  ]
};
