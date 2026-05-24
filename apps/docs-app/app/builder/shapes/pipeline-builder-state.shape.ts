import { StageIdType } from '../types/id/stage-id.type';
import { BehaviorInstanceShape } from './behavior-instance.shape';
import { StageInstanceShape } from './stage-instance.shape';
import { StateInputShape } from './state-definition.shape';

export interface PipelineBuilderStateShape {
  currentStep: number;
  stateInput: StateInputShape;
  stageInstances: StageInstanceShape[];
  behaviorInstances?: BehaviorInstanceShape[];
  viewingStageId?: StageIdType | null;
}
