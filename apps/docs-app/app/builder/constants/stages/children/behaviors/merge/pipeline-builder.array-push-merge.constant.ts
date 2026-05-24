import { PipelineArrayPushMergeBehaviorComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/merge/array-push-merge/array-push-merge.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { FileBuilderApiTypes } from '../../../../../types/file-builder/file-builder-api.type';
import { FileBuilderEmitTypes } from '../../../../../types/file-builder/file-builder-emit.type';
import { FileBuilderRoleTypes } from '../../../../../types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from '../../../../../types/file-builder/file-builder-target.type';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderArrayPushMergeConstant: BehaviorDefinitionShape = {
  /** Stable identifier */
  id: BehaviorIdTypes.WithArrayPushMergeBehavior,

  /** Owning stage */
  parentId: StageIdTypes.Merge,

  /** UI copy */
  label: 'Array Push Merge',
  question:
    'Should incoming values be pushed as single elements onto the existing array state?',

  description:
    'Pushes a single incoming value onto the existing array during the Merge stage, producing a new immutable array instance.',

  params: [],

  /**
   * Documentation renderer
   */
  documentationComponentReference: PipelineArrayPushMergeBehaviorComponent,

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

      /** Exported symbol */
      symbol: 'withArrayPushMergeBehavior',

      /** Structural merge behavior */
      role: FileBuilderRoleTypes.Structural,

      /** Package source */
      import: '@sdux-vault/addons',

      /** Order within merge stage */
      order: 2
    }
  ]
};
