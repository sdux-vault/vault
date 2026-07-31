import { TutorialStepShape } from './tutorial-step.shape';

export interface TutorialGroupShape {
  id: number;
  label: string;
  fragment: string;
  steps: readonly TutorialStepShape[];
}
