import { BehaviorSelectionModeTypes } from 'apps/docs-app/app/builder/types/behavior-selection-mode.type';
import { FileBuilderModeTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-mode.type';
import { PipelineFiltersBehaviorComponent } from '../../../../docs/pipeline/behaviors/components/filters/filters.pipeline.component';
import { StageDefinitionShape } from '../../../shapes/stage-definition.shape';
import { BehaviorIdTypes } from '../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../types/id/stage-id.type';
import { SelectionModeTypes } from '../../../types/selection-mode.type';

export const PipelineBuilderFilterStage: StageDefinitionShape = {
  id: StageIdTypes.Filter,

  mode: FileBuilderModeTypes.Basic,

  disabled: false,

  // Used on the left-hand navigation
  label: 'Filter Input',
  shortDescription:
    'Validate, refine, or suppress candidate state updates before they reach reducers.',

  // Used for right-hand explanation
  description:
    'The Filter stage deterministically validates and refines candidate state values before reduction occurs. Filters execute in order, must remain pure, preserve structural type, and may return undefined to suppress an update entirely.',

  question:
    'Do you need to validate, refine, or conditionally suppress candidate state updates before reduction?',

  note: 'Core behaviors are intrinsic to the pipeline and will not appear as explicit registrations in the generated file. Engineers attach filter logic using the fluent .filters() API during vault initialization.',

  /**
   * Powered by a core filter behavior.
   */
  behaviors: [BehaviorIdTypes.WithCoreFilterBehavior],

  /**
   * Filters are optional but singular at stage level.
   */
  selectionMode: SelectionModeTypes.Single,

  /**
   * Multiple filter functions allowed.
   */
  behaviorSelectionMode: BehaviorSelectionModeTypes.Multiple,

  /**
   * Documentation renderer
   */
  documentationComponentReference: PipelineFiltersBehaviorComponent
};
