import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class DistinctUntilChangedService {
  chapters(): ChapterShape {
    return {
      id: 13,
      label: 'Distinct Until Changed Chapter',
      fragment: 'chapter-13',
      steps: [
        { id: 1, label: 'Configure Distinct Until Changed' },
        { id: 2, label: 'Submit Same and Changed State' },
        { id: 3, label: 'Complete Distinct Until Changed Tutorial' }
      ] satisfies ChapterStepShape[]
    };
  }
}
