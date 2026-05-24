import { FileBuilderApiTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-api.type';
import { FileBuilderEmitTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-emit.type';
import { FileBuilderRoleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-target.type';
import { PipelineCookieStoragePersistComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/persist/cookie-storage/cookie-storage.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderCookieStoragePersistConstant: BehaviorDefinitionShape =
  {
    /** Stable identifier */
    id: BehaviorIdTypes.WithCookieStoragePersistBehavior,

    /** Owning stage */
    parentId: StageIdTypes.Persist,

    /** UI label */
    label: 'Cookie Storage Persist',

    question:
      'Do you want to persist committed FeatureCell state using browser cookies (document.cookie)?',

    description:
      'Writes finalized pipeline state to document.cookie during the Persist stage. Enforces a strict payload size limit and operates in a fail-safe, non-blocking manner.',

    /**
     * No configuration parameters
     */
    params: [],

    /** Documentation renderer */
    documentationComponentReference: PipelineCookieStoragePersistComponent,

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
        symbol: 'withCookieStoragePersistBehavior',
        role: FileBuilderRoleTypes.Structural,
        import: '@sdux-vault/addons',
        order: 0
      }
    ]
  };
