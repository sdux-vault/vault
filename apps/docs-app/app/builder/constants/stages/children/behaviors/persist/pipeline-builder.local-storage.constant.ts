import { FileBuilderApiTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-api.type';
import { FileBuilderEmitTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-emit.type';
import { FileBuilderRoleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-target.type';
import { PipelineLocalStoragePersistComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/persist/local-storage/local-storage.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderLocalStoragePersistConstant: BehaviorDefinitionShape =
  {
    /** Stable identifier */
    id: BehaviorIdTypes.WithLocalStoragePersistBehavior,

    /** Owning stage */
    parentId: StageIdTypes.Persist,

    /** UI label */
    label: 'Local Storage Persist',

    question:
      'Do you want to persist committed FeatureCell state using browser localStorage?',

    description:
      'Writes finalized pipeline state to localStorage during the Persist stage. Provides durable, origin-scoped persistence with fail-safe execution semantics.',

    /**
     * No configuration parameters
     */
    params: [],

    /** Documentation renderer */
    documentationComponentReference: PipelineLocalStoragePersistComponent,

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
        symbol: 'withLocalStoragePersistBehavior',
        role: FileBuilderRoleTypes.Structural,
        import: '@sdux-vault/addons',
        order: 0
      }
    ]
  };
