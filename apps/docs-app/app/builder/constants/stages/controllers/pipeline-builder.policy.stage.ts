import { BehaviorSelectionModeTypes } from 'apps/docs-app/app/builder/types/behavior-selection-mode.type';
import { PipelinePolicyComponent } from '../../../../docs/pipeline/controllers/components/policy/policy.pipeline.component';
import { StageDefinitionShape } from '../../../shapes/stage-definition.shape';
import { BehaviorIdTypes } from '../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../types/id/stage-id.type';
import { SelectionModeTypes } from '../../../types/selection-mode.type';
import { StageLabelType } from '../../../types/stage-label.type';

export const PipelineBuilderPolicyStage: StageDefinitionShape = {
  id: StageIdTypes.Policy,

  /** UI grouping label */
  label: StageLabelType.Policy,

  /** General description of the Policy layer */
  description:
    'The Policy stage governs whether, when, and how pipeline execution attempts are allowed to proceed. ' +
    'Controllers operate as execution authorities, issuing deterministic decisions such as allow, pause, retry, or abort. ' +
    'They do not derive or mutate state values.',

  /** Generic selection prompt */
  question:
    'Do you need to enforce execution rules such as delay, throttling, retries, or global error coordination?',

  /** Behaviors (controllers) will be injected dynamically */
  behaviors: [
    BehaviorIdTypes.WithDelayController,
    BehaviorIdTypes.WithThrottleController,
    BehaviorIdTypes.WithReplayGlobalErrorController,
    BehaviorIdTypes.WithMaxFailureController
  ],

  /** Multiple controllers can be selected */
  selectionMode: SelectionModeTypes.Single,
  behaviorSelectionMode: BehaviorSelectionModeTypes.Multiple,

  documentationComponentReference: PipelinePolicyComponent
};
