import { ChapterStepShape } from './chapter-step.shape';

export interface ChapterShape {
  id: number;
  label: string;
  fragment: string;
  steps: readonly ChapterStepShape[];
}
