import { BehaviorSelectionModeTypes } from 'apps/docs-app/app/builder/types/behavior-selection-mode.type';
import { PipelineCoreErrorBehaviorComponent } from '../../../../docs/pipeline/behaviors/components/errors/with-core-error.behavior.component';
import { StageDefinitionShape } from '../../../shapes/stage-definition.shape';
import { BehaviorIdTypes } from '../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../types/id/stage-id.type';
import { SelectionModeTypes } from '../../../types/selection-mode.type';
import { StageLabelType } from '../../../types/stage-label.type';

export const PipelineBuilderStateStage: StageDefinitionShape = {
  id: StageIdTypes.State,

  label: StageLabelType.State,

  description:
    'Register deterministic state emission callbacks that execute after successful state commitment. Emit-state handlers observe finalized snapshots but do not influence pipeline execution.',

  question:
    'Do you need to run logic whenever committed state changes, without affecting pipeline control flow?',

  note: 'These behaviors are "Core Behaviors" and do not need to be registered when the FeatureCell is defined. They must be added to the fluent chain during vault initialization.',

  /**
   * Emit States are powered by a core behavior.
   * Engineers provide callbacks via the fluent .emitStates() API.
   */
  behaviors: [BehaviorIdTypes.WithCoreEmitStateBehavior],

  /**
   * Stage is selectable
   */
  selectionMode: SelectionModeTypes.Single,

  /**
   * Multiple emit-state callbacks allowed
   */
  behaviorSelectionMode: BehaviorSelectionModeTypes.Multiple,

  /**
   * Documentation renderer
   */
  documentationComponentReference: PipelineCoreErrorBehaviorComponent
};
