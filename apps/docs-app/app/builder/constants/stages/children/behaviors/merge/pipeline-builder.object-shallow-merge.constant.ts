import { PipelineObjectShallowMergeBehaviorComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/merge/object-shallow-merge/object-shallow-merge.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { FileBuilderApiTypes } from '../../../../../types/file-builder/file-builder-api.type';
import { FileBuilderEmitTypes } from '../../../../../types/file-builder/file-builder-emit.type';
import { FileBuilderRoleTypes } from '../../../../../types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from '../../../../../types/file-builder/file-builder-target.type';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderObjectShallowMergeConstant: BehaviorDefinitionShape =
  {
    /** Stable identifier */
    id: BehaviorIdTypes.WithObjectShallowMergeBehavior,

    /** Owning stage */
    parentId: StageIdTypes.Merge,

    /** UI copy */
    label: 'Object Shallow Merge',
    question: 'Should incoming object values be merged at the top level only?',

    description:
      'Performs a single-level structural merge of plain objects during the Merge stage, replacing top-level properties without recursively merging nested objects.',

    params: [],

    /**
     * Documentation renderer
     */
    documentationComponentReference:
      PipelineObjectShallowMergeBehaviorComponent,

    /**
     * Code emission metadata
     */
    code: [
      {
        /** Merge behaviors attach at FeatureCell definition time */
        target: FileBuilderTargetTypes.FeatureCell,

        /** Declarative behaviors array */
        api: FileBuilderApiTypes.Behaviors,

        /** Reference emission */
        emit: FileBuilderEmitTypes.Reference,

        /** Exported function symbol */
        symbol: 'withObjectShallowMergeBehavior',

        /** Structural merge behavior */
        role: FileBuilderRoleTypes.Structural,

        /** Package source */
        import: '@sdux-vault/core',

        /** Order within merge stage */
        order: 3
      }
    ]
  };
