import { BehaviorSelectionModeTypes } from 'apps/docs-app/app/builder/types/behavior-selection-mode.type';
import { PipelineStepwiseControllerComponent } from '../../../../docs/pipeline/controllers/components/stepwise/stepwise.pipeline.component';
import { StageDefinitionShape } from '../../../shapes/stage-definition.shape';
import { BehaviorIdTypes } from '../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../types/id/stage-id.type';
import { SelectionModeTypes } from '../../../types/selection-mode.type';
import { StageLabelType } from '../../../types/stage-label.type';

export const PipelineBuilderStepwisePolicyStage: StageDefinitionShape = {
  id: StageIdTypes.Stepwise,

  /** Execution authority stage */

  /** UI grouping label */
  label: StageLabelType.Stepwise,

  /** General description */
  description:
    'The Stepwise Policy stage enables deterministic, stage-level execution control. ' +
    'Stepwise behaviors observe the current committed state and a stage-specific candidate value, ' +
    'then explicitly decide whether pipeline execution should continue, block, or clear. ' +
    'They do not derive values or mutate state.',

  /** Generic selection prompt */
  question:
    'Do you need stage-level execution control to explicitly continue, block, or clear candidate updates?',

  /** Behaviors available in this stage */
  behaviors: [
    BehaviorIdTypes.WithStepwiseResolveBehavior,
    BehaviorIdTypes.WithStepwiseFilterBehavior,
    BehaviorIdTypes.WithStepwiseReducerBehavior
  ],

  /** Only one Stepwise configuration per stage */
  selectionMode: SelectionModeTypes.Single,

  /** Multiple stepwise behaviors across supported stages allowed */
  behaviorSelectionMode: BehaviorSelectionModeTypes.Multiple,

  documentationComponentReference: PipelineStepwiseControllerComponent
};
