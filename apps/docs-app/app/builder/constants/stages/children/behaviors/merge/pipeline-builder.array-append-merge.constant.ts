import { PipelineArrayAppendMergeBehaviorComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/merge/array-append-merge/array.append-merge,pipeline.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { FileBuilderApiTypes } from '../../../../../types/file-builder/file-builder-api.type';
import { FileBuilderEmitTypes } from '../../../../../types/file-builder/file-builder-emit.type';
import { FileBuilderRoleTypes } from '../../../../../types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from '../../../../../types/file-builder/file-builder-target.type';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderArrayAppendMergeConstant: BehaviorDefinitionShape =
  {
    /** Stable identifier */
    id: BehaviorIdTypes.WithArrayAppendMergeBehavior,

    /** Owning stage */
    parentId: StageIdTypes.Merge,

    /** UI copy */
    label: 'Array Append Merge',
    question: 'Should incoming arrays be appended to the existing array state?',

    description:
      'Appends the incoming array to the existing array during the Merge stage, producing a new combined immutable array.',

    /**
     * No definition-time params.
     * clearUndefined is runtime merge config only.
     */
    params: [],

    /**
     * Documentation renderer
     */
    documentationComponentReference: PipelineArrayAppendMergeBehaviorComponent,

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
        symbol: 'withArrayAppendMergeBehavior',

        /** Structural behavior */
        role: FileBuilderRoleTypes.Structural,

        /** Comes from addons package */
        import: '@sdux-vault/addons',

        /** Order inside merge stage */
        order: 1
      }
    ]
  };
