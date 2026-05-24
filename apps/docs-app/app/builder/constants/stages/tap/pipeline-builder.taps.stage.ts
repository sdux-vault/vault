import { BehaviorSelectionModeTypes } from 'apps/docs-app/app/builder/types/behavior-selection-mode.type';
import { PipelineCoreTapBehaviorComponent } from '../../../../docs/pipeline/behaviors/components/taps/with-core-tap.pipeline.component';
import { StageDefinitionShape } from '../../../shapes/stage-definition.shape';
import { BehaviorIdTypes } from '../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../types/id/stage-id.type';
import { SelectionModeTypes } from '../../../types/selection-mode.type';
import { StageLabelType } from '../../../types/stage-label.type';

export const PipelineBuilderTapStage: StageDefinitionShape = {
  id: StageIdTypes.Tap,

  label: StageLabelType.Tap,

  description:
    'Provide deterministic, ordered observation points within the Processing Layer. Tap callbacks may execute side effects but must not mutate pipeline values or influence control flow.',

  question:
    'Do you need to observe pipeline values before or after reducer execution without affecting state commitment?',

  note: 'Tap behaviors are core infrastructure behaviors. They do not need to be registered when the FeatureCell is defined, but they must be added to the fluent chain during vault initialization.',

  /**
   * Two core tap behaviors
   */
  behaviors: [
    BehaviorIdTypes.WithCoreBeforeTapBehavior,
    BehaviorIdTypes.WithCoreAfterTapBehavior
  ],

  /**
   * Stage is selectable
   */
  selectionMode: SelectionModeTypes.Single,

  /**
   * Multiple tap callbacks allowed for both behaviors
   */
  behaviorSelectionMode: BehaviorSelectionModeTypes.Multiple,

  /**
   * Documentation renderer
   */
  documentationComponentReference: PipelineCoreTapBehaviorComponent
};
