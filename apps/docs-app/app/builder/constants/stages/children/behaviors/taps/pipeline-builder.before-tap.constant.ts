import { PIPELINE_BUILDER_TAP_AI_ASSIST_CONSTANT } from 'apps/docs-app/app/builder/constants/ai-assist/tap.ai-assist.constant';
import { FileBuilderApiTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-api.type';
import { FileBuilderArgStyleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-arg-style.type';
import { FileBuilderEmitTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-emit.type';
import { FileBuilderNoteTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-note.type';
import { FileBuilderRoleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-target.type';
import { PipelineBeforeTapBehaviorComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/taps/before-tap/before-tap.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderCoreBeforeTapConstant: BehaviorDefinitionShape = {
  /** Stable identifier */
  id: BehaviorIdTypes.WithCoreBeforeTapBehavior,

  /** Owning stage */
  parentId: StageIdTypes.Tap,

  /** UI copy */
  label: 'Before Tap',

  question:
    'Do you want to observe the candidate state after filtering but before reducers execute?',

  description:
    'Executes engineer-supplied tap callbacks immediately after filtering and before reducer execution. Before taps allow deterministic side effects without influencing state derivation.',

  note: FileBuilderNoteTypes.CoreBehaviorWithFluentApi,

  params: [
    {
      key: 'beforeTap',
      label: 'Before Tap Callback',
      type: 'function',
      defaultValue: `(value) => console.info('before: ', value)`,
      optional: true,
      hint: `Must not mutate the value and must not return anything.
Example: <code>(value) => console.info('before: ', value)</code>`,
      placeholder: '(value) => { /* side effect */ }'
    }
  ],

  documentationComponentReference: PipelineBeforeTapBehaviorComponent,

  aiAssist: PIPELINE_BUILDER_TAP_AI_ASSIST_CONSTANT,

  code: [
    {
      target: FileBuilderTargetTypes.Vault,
      api: FileBuilderApiTypes.BeforeTaps,
      emit: FileBuilderEmitTypes.Raw,
      symbol: 'beforeTaps',
      role: FileBuilderRoleTypes.Functional,
      argStyle: FileBuilderArgStyleTypes.positional,
      order: 0
    }
  ]
};
