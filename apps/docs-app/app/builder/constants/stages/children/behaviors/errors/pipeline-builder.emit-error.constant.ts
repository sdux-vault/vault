import { PIPELINE_BUILDER_ERROR_EMIT_AI_ASSIST_CONSTANT } from 'apps/docs-app/app/builder/constants/ai-assist/emit-error.ai-assist.constant';
import { FileBuilderApiTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-api.type';
import { FileBuilderArgStyleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-arg-style.type';
import { FileBuilderEmitTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-emit.type';
import { FileBuilderNoteTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-note.type';
import { FileBuilderRoleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-target.type';
import { ParameterTypes } from 'apps/docs-app/app/builder/types/parameter.type';
import { PipelineCoreErrorCallbackBehaviorComponent } from '../../../../../../docs/pipeline/behaviors/components/errors/with-core-error-callback/with-core-error-callback.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderCoreErrorCallbackConstant: BehaviorDefinitionShape =
  {
    /** Stable identifier */
    id: BehaviorIdTypes.WithCoreEmitErrorBehavior,

    /** Owning stage */
    parentId: StageIdTypes.Error,

    /** Documentation-only label */
    label: 'Core Error Callback Behavior',

    /** Not selectable in UI */
    question: '',

    description:
      'Core pipeline behavior that executes engineer-supplied error callbacks after error normalization and state commitment.',

    note: FileBuilderNoteTypes.CoreBehaviorWithFluentApi,

    /** Optional callback configuration */
    params: [
      {
        key: 'errorCallback',
        label: 'Error Callback Function',
        type: ParameterTypes.Function,
        defaultValue: `(error, state) => {}`,
        optional: true,
        hint: `Must be observational only. Must not mutate error or state.
Receives <code>VaultErrorShape</code> and <code>StateSnapshotShape&lt;T&gt;</code>.
Must not throw.
Example: <code>(error, state) => console.info(error.message)</code>`,
        placeholder: '(error, state) => {}'
      }
    ],

    /** Documentation renderer */
    documentationComponentReference: PipelineCoreErrorCallbackBehaviorComponent,

    aiAssist: PIPELINE_BUILDER_ERROR_EMIT_AI_ASSIST_CONSTANT,

    /**
     * ─────────────────────────────
     * Code emission metadata
     * ─────────────────────────────
     */
    code: [
      {
        /** Attaches via fluent API */
        target: FileBuilderTargetTypes.Vault,

        /** Fluent API group */
        api: FileBuilderApiTypes.Errors,

        /** Raw function call emission */
        emit: FileBuilderEmitTypes.Raw,

        /** Exported function symbol */
        symbol: 'errors',

        /** Functional registration */
        role: FileBuilderRoleTypes.Functional,

        argStyle: FileBuilderArgStyleTypes.positional,

        /**
         * Order within error stage
         * (respects array order during .errors([...]))
         */
        order: 0
      }
    ]
  };
