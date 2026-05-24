import { PIPELINE_BUILDER_TAP_AI_ASSIST_CONSTANT } from 'apps/docs-app/app/builder/constants/ai-assist/tap.ai-assist.constant';
import { FileBuilderApiTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-api.type';
import { FileBuilderArgStyleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-arg-style.type';
import { FileBuilderEmitTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-emit.type';
import { FileBuilderNoteTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-note.type';
import { FileBuilderRoleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-target.type';
import { PipelineAfterTapBehaviorComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/taps/after-tap/after-tap.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderCoreAfterTapConstant: BehaviorDefinitionShape = {
  /** Stable identifier */
  id: BehaviorIdTypes.WithCoreAfterTapBehavior,

  /** Owning stage */
  parentId: StageIdTypes.Tap,

  /** UI copy */
  label: 'After Tap',

  question:
    'Do you want to observe the finalized state immediately after reducers execute?',

  description:
    'Executes engineer-supplied tap callbacks immediately after reducer execution. After taps allow side effects such as logging, diagnostics, metrics, or external signaling without influencing pipeline flow.',

  note: FileBuilderNoteTypes.CoreBehaviorWithFluentApi,

  params: [
    {
      key: 'afterTap',
      label: 'After Tap Callback',
      type: 'function',
      defaultValue: `(value) => console.info('after: ', value)`,
      optional: true,
      hint: `Must not mutate the value and must not return anything.
Example: <code>(value) => console.info('after: ', value)</code>`,
      placeholder: '(value) => { /* side effect */ }'
    }
  ],

  documentationComponentReference: PipelineAfterTapBehaviorComponent,

  aiAssist: PIPELINE_BUILDER_TAP_AI_ASSIST_CONSTANT,

  code: [
    {
      target: FileBuilderTargetTypes.Vault,
      api: FileBuilderApiTypes.AfterTaps,
      emit: FileBuilderEmitTypes.Raw,
      symbol: 'afterTaps',
      role: FileBuilderRoleTypes.Functional,
      argStyle: FileBuilderArgStyleTypes.positional,
      order: 0
    }
  ]
};
