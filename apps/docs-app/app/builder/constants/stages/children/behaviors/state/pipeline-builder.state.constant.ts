import { PIPELINE_BUILDER_STATE_EMIT_AI_ASSIST_CONSTANT } from 'apps/docs-app/app/builder/constants/ai-assist/emit-state.ai-assist.constant';
import { BehaviorDefinitionShape } from 'apps/docs-app/app/builder/shapes/behavior-definition.shape';
import { FileBuilderApiTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-api.type';
import { FileBuilderArgStyleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-arg-style.type';
import { FileBuilderEmitTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-emit.type';
import { FileBuilderNoteTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-note.type';
import { FileBuilderRoleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-target.type';
import { ParameterTypes } from 'apps/docs-app/app/builder/types/parameter.type';
import { PipelineCoreEmitStateBehaviorComponent } from '../../../../../../docs/pipeline/behaviors/components/state/with-core-emit-state/with-core-emit-state.pipeline.component';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderCoreStateCallbackConstant: BehaviorDefinitionShape =
  {
    id: BehaviorIdTypes.WithCoreEmitStateBehavior,

    parentId: StageIdTypes.State,

    label: 'Core Emit-State Behavior',

    question: '',

    description:
      'Core pipeline behavior that executes engineer-supplied emit-state callbacks after state commitment and exposure.',

    note: FileBuilderNoteTypes.CoreBehaviorWithFluentApi,

    params: [
      {
        key: 'emitStateCallback',
        label: 'Emit-State Callback Function',
        type: ParameterTypes.Function,
        defaultValue: `(snapshot) => {}`,
        optional: true,
        hint: `Must be observational only. Must not mutate the snapshot.
Receives <code>StateSnapshotShape&lt;T&gt;</code>.
Must not throw.
Example: <code>(snapshot) => console.info(snapshot.value)</code>`,
        placeholder: '(snapshot) => {}'
      }
    ],

    documentationComponentReference: PipelineCoreEmitStateBehaviorComponent,

    aiAssist: PIPELINE_BUILDER_STATE_EMIT_AI_ASSIST_CONSTANT,

    code: [
      {
        target: FileBuilderTargetTypes.Vault,
        api: FileBuilderApiTypes.EmitStates,
        emit: FileBuilderEmitTypes.Raw,
        symbol: 'emitStates',
        role: FileBuilderRoleTypes.Functional,
        argStyle: FileBuilderArgStyleTypes.positional,
        order: 0
      }
    ]
  };
