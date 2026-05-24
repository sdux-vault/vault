import { FileBuilderApiTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-api.type';
import { FileBuilderEmitTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-emit.type';
import { FileBuilderRoleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-target.type';
import { PipelineSessionStoragePersistComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/persist/session-storage/session-storage.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderSessionStoragePersistConstant: BehaviorDefinitionShape =
  {
    /** Stable identifier */
    id: BehaviorIdTypes.WithSessionStoragePersistBehavior,

    /** Owning stage */
    parentId: StageIdTypes.Persist,

    /** UI label */
    label: 'Session Storage Persist',

    question:
      'Do you want to persist committed FeatureCell state using browser sessionStorage (tab-scoped persistence)?',

    description:
      'Writes finalized pipeline state to sessionStorage during the Persist stage. Provides tab-scoped persistence suitable for transient UI flows and temporary state.',

    /**
     * No configuration parameters
     */
    params: [],

    /** Documentation renderer */
    documentationComponentReference: PipelineSessionStoragePersistComponent,

    /**
     * ─────────────────────────────
     * Code emission metadata
     * ─────────────────────────────
     */
    code: [
      {
        target: FileBuilderTargetTypes.FeatureCell,
        api: FileBuilderApiTypes.Behaviors,
        emit: FileBuilderEmitTypes.Reference,
        symbol: 'withSessionStoragePersistBehavior',
        role: FileBuilderRoleTypes.Structural,
        import: '@sdux-vault/addons',
        order: 0
      }
    ]
  };
