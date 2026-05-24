import { BehaviorIdTypes } from 'apps/docs-app/app/builder/types/id/behavior-id.type';
import { PipelineReplayGlobalErrorControllerComponent } from 'apps/docs-app/app/docs/pipeline/controllers/components/replay-global-error/replay-global-error.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../shapes/behavior-definition.shape';
import { FileBuilderApiTypes } from '../../../../types/file-builder/file-builder-api.type';
import { FileBuilderEmitTypes } from '../../../../types/file-builder/file-builder-emit.type';
import { FileBuilderRoleTypes } from '../../../../types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from '../../../../types/file-builder/file-builder-target.type';
import { StageIdTypes } from '../../../../types/id/stage-id.type';

export const PipelineBuilderReplayGlobalErrorConstant: BehaviorDefinitionShape =
  {
    /** Stable identifier */
    id: BehaviorIdTypes.WithReplayGlobalErrorController,

    /** Owning stage */
    parentId: StageIdTypes.Policy,

    /** UI copy */
    label: 'Replay After Global Error',
    question:
      'Should previously blocked pipeline executions be retried automatically once the global error is cleared?',

    description:
      'Coordinates pipeline pause and controlled replay when a global error is active. Execution attempts are denied during the error and may be retried once the error is explicitly cleared.',

    /** Optional documentation renderer */
    documentationComponentReference:
      PipelineReplayGlobalErrorControllerComponent,

    /**
     * ─────────────────────────────
     * Code emission metadata
     * ─────────────────────────────
     */
    code: [
      {
        /** Controllers attach at definition time */
        target: FileBuilderTargetTypes.FeatureCell,

        /** Fluent API group */
        api: FileBuilderApiTypes.Controllers,

        /** Reference emission (no params) */
        emit: FileBuilderEmitTypes.Reference,

        /** Exported symbol name */
        symbol: 'withReplayGlobalErrorController',

        /** Controllers are structural */
        role: FileBuilderRoleTypes.Structural,

        import: `@sdux-vault/addons`,

        /** Optional ordering hint */
        order: 10
      }
    ]
  };
