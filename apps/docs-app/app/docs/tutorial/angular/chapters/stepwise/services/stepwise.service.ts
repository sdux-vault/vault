import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class StepwiseService {
  chapters(): ChapterShape {
    return {
      id: 14,
      label: 'Stepwise Pipeline Chapter',
      fragment: 'chapter-14',
      steps: [
        { id: 1, label: 'Configure Stepwise Pipeline' },
        { id: 2, label: 'Configure Stepwise Resolve' },
        { id: 3, label: 'Configure Stepwise Filter' },
        { id: 4, label: 'Configure Stepwise Reducer' },
        { id: 5, label: 'Complete Stepwise Tutorial' }
      ] satisfies ChapterStepShape[]
    };
  }
}
