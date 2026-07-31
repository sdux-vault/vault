import { TutorialStepShape } from './tutorial-step.shape';

export interface TutorialGroupShape {
  id: number;
  label: string;
  steps: readonly TutorialStepShape[];
}
