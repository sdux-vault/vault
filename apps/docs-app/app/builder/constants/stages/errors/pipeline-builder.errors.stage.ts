import { BehaviorSelectionModeTypes } from 'apps/docs-app/app/builder/types/behavior-selection-mode.type';
import { PipelineCoreErrorBehaviorComponent } from '../../../../docs/pipeline/behaviors/components/errors/with-core-error.behavior.component';
import { StageDefinitionShape } from '../../../shapes/stage-definition.shape';
import { BehaviorIdTypes } from '../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../types/id/stage-id.type';
import { SelectionModeTypes } from '../../../types/selection-mode.type';
import { StageLabelType } from '../../../types/stage-label.type';

export const PipelineBuilderErrorStage: StageDefinitionShape = {
  id: StageIdTypes.Error,

  label: StageLabelType.Error,

  description:
    'Provide deterministic, centralized handling for pipeline failures. Error behaviors normalize, transform, and observe finalized Vault error conditions without resuming pipeline execution.',

  question:
    'Do you need to observe or transform Vault errors after failure, without affecting successful state execution?',

  note: 'Error handling is a core pipeline stage. A core error normalization behavior is always installed. Additional error transform or callback behaviors are optional and layered after normalization.',

  /**
   * Error stage supports:
   *  - Core normalization (always present)
   *  - Optional transform behaviors
   *  - Optional callback behaviors
   */
  behaviors: [BehaviorIdTypes.WithCoreEmitErrorBehavior],

  /**
   * Stage is selectable
   */
  selectionMode: SelectionModeTypes.Single,

  /**
   * Multiple error behaviors allowed
   */
  behaviorSelectionMode: BehaviorSelectionModeTypes.Multiple,

  /**
   * Documentation renderer
   */
  documentationComponentReference: PipelineCoreErrorBehaviorComponent
};
