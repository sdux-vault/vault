import { ChapterMetadataShape } from './chapter-metadata.shape';
import { ChapterStepShape } from './chapter-step.shape';

export interface ChapterShape {
  id: number;
  label: string;
  route: string;
  steps: readonly ChapterStepShape[];
  metadata?: ChapterMetadataShape;
}
