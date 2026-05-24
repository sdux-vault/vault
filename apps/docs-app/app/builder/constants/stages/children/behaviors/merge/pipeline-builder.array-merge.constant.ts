import { PipelineArrayMergeBehaviorComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/merge/array-merge/array-merge.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderArrayMergeConstant: BehaviorDefinitionShape = {
  /** Stable identifier */
  id: BehaviorIdTypes.WithArrayMergeBehavior,

  selected: true,
  complete: true,
  disabled: false,
  default: true,

  /** Owning stage */
  parentId: StageIdTypes.Merge,

  /** UI copy */
  label: 'Array Merge (Default)',
  question: 'Should incoming arrays replace the current array state?',

  description:
    'Replaces the current array state with the incoming array value. Arrays are treated as atomic immutable values and are never merged element-by-element.',

  /**
   * No definition-time params.
   * clearUndefined is runtime mergeState config,
   * NOT builder-time config.
   */
  params: [],

  /**
   * Documentation renderer
   */
  documentationComponentReference: PipelineArrayMergeBehaviorComponent,

  /**
   * Code emission metadata
   */
  code: []
};
