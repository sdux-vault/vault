import { BehaviorSelectionModeTypes } from 'apps/docs-app/app/builder/types/behavior-selection-mode.type';
import { PipelineInterceptorsBehaviorComponent } from '../../../../docs/pipeline/behaviors/components/interceptors/interceptors.pipeline.component';
import { StageDefinitionShape } from '../../../shapes/stage-definition.shape';
import { BehaviorIdTypes } from '../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../types/id/stage-id.type';
import { SelectionModeTypes } from '../../../types/selection-mode.type';
import { StageLabelType } from '../../../types/stage-label.type';

export const PipelineBuilderInterceptorStage: StageDefinitionShape = {
  id: StageIdTypes.Interceptor,

  label: StageLabelType.Interceptor,

  description:
    'Control when incoming state updates are allowed to enter the pipeline. Interceptors gate, delay, or suppress updates without modifying state values or participating in computation.',

  question:
    'Do you need to control when state updates are admitted into the pipeline (delay, throttle, debounce, or gate execution)?',

  /**
   * Behaviors are selected and configured in Step 2
   * via the fluent interceptors() API
   */
  behaviors: [BehaviorIdTypes.WithGlobalErrorPauseBehavior],

  selectionMode: SelectionModeTypes.Single,
  behaviorSelectionMode: BehaviorSelectionModeTypes.Multiple,

  documentationComponentReference: PipelineInterceptorsBehaviorComponent
};
