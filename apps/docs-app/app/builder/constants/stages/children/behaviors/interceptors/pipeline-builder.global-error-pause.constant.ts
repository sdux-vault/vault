import { PipelineInterceptorsWithGlobalErrorPauseBehaviorComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/interceptors/with-global-error-pause/with-global-error-pause.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { FileBuilderApiTypes } from '../../../../../types/file-builder/file-builder-api.type';
import { FileBuilderEmitTypes } from '../../../../../types/file-builder/file-builder-emit.type';
import { FileBuilderRoleTypes } from '../../../../../types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from '../../../../../types/file-builder/file-builder-target.type';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderGlobalErrorPauseConstant: BehaviorDefinitionShape =
  {
    /** Stable identifier */
    id: BehaviorIdTypes.WithGlobalErrorPauseBehavior,

    /** Owning stage */
    parentId: StageIdTypes.Interceptor,

    /** UI copy */
    label: 'Pause on Global Error',
    question:
      'Should incoming updates be blocked while a global error is active?',

    description:
      'Blocks incoming pipeline updates at the Interceptor stage whenever a global Vault error is present, resuming automatically once the error is cleared.',

    /** Render full documentation inline when requested */
    documentationComponentReference:
      PipelineInterceptorsWithGlobalErrorPauseBehaviorComponent,

    /**
     * ─────────────────────────────
     * Code emission metadata
     * ─────────────────────────────
     */
    code: [
      {
        /** Interceptors attach at definition time */
        target: FileBuilderTargetTypes.FeatureCell,

        /** Fluent API group */
        api: FileBuilderApiTypes.Behaviors,

        /** Function call emission (no params) */
        emit: FileBuilderEmitTypes.Reference,

        /** Exported function symbol */
        symbol: 'withGlobalErrorPauseBehavior',

        /** Functional behavior */
        role: FileBuilderRoleTypes.Structural,

        import: `@sdux-vault/addons`,

        /** Ordering hint (before replay controller) */
        order: 0
      }
    ]
  };
