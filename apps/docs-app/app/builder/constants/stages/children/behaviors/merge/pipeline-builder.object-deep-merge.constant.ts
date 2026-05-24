import { PipelineObjectDeepMergeBehaviorComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/merge/object-deep-mrge/object-deep-merge.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { FileBuilderApiTypes } from '../../../../../types/file-builder/file-builder-api.type';
import { FileBuilderEmitTypes } from '../../../../../types/file-builder/file-builder-emit.type';
import { FileBuilderRoleTypes } from '../../../../../types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from '../../../../../types/file-builder/file-builder-target.type';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderObjectDeepMergeConstant: BehaviorDefinitionShape = {
  /** Stable identifier */
  id: BehaviorIdTypes.WithObjectDeepMergeBehavior,

  /** Owning stage */
  parentId: StageIdTypes.Merge,

  /** UI copy */
  label: 'Object Deep Merge',
  question:
    'Should incoming object values be recursively merged into existing state?',

  description:
    'Recursively merges nested plain-object structures during the Merge stage, producing a new immutable object without mutating existing state.',

  params: [],

  /**
   * Documentation renderer
   */
  documentationComponentReference: PipelineObjectDeepMergeBehaviorComponent,

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
      symbol: 'withObjectDeepMergeBehavior',

      /** Structural merge behavior */
      role: FileBuilderRoleTypes.Structural,

      /** Package source */
      import: '@sdux-vault/addons',

      /** Order within merge stage */
      order: 4
    }
  ]
};
