import { BehaviorSelectionModeTypes } from 'apps/docs-app/app/builder/types/behavior-selection-mode.type';
import { BehaviorIdTypes } from 'apps/docs-app/app/builder/types/id/behavior-id.type';
import { PipelineOperatorsComponent } from '../../../../docs/pipeline/behaviors/components/operators/operators.pipeline.component';
import { StageDefinitionShape } from '../../../shapes/stage-definition.shape';
import { StageIdTypes } from '../../../types/id/stage-id.type';
import { SelectionModeTypes } from '../../../types/selection-mode.type';
import { StageLabelType } from '../../../types/stage-label.type';

export const PipelineBuilderOperatorStage: StageDefinitionShape = {
  id: StageIdTypes.Operator,

  label: StageLabelType.Operator,

  description:
    'Refine, suppress, or transform resolved pipeline values before filters, reducers, and taps execute. Operators act on fully resolved and merged values without mutating state directly.',

  question:
    'Do you need to conditionally suppress, deduplicate, or refine resolved values before downstream pipeline stages execute?',

  note: 'These behaviors are "Core Behaviors" and does not need to be registered when the FeatureCell is defined or added to the fluent chain during vault initialization.',
  /**
   * Behaviors are selected and configured in Step 2
   * via the fluent operators() API
   */
  behaviors: [BehaviorIdTypes.WithDistinctUntilChangedBehavior],

  selectionMode: SelectionModeTypes.Single,
  behaviorSelectionMode: BehaviorSelectionModeTypes.Multiple,

  documentationComponentReference: PipelineOperatorsComponent
};
