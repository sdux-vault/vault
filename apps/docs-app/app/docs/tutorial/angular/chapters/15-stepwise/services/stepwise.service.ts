import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class StepwiseService {
  chapters(): ChapterShape {
    return {
      id: 15,
      label: 'Stepwise',
      route: 'chapter-15',
      metadata: {
        track: 'Lab',
        prerequisite: 'Chapter 7',
        tier: '★★★★',
        estimatedTime: '30-45 min'
      },
      steps: [
        { id: 1, label: 'Configure Stepwise Pipeline' },
        { id: 2, label: 'Configure Stepwise Resolve' },
        { id: 3, label: 'Configure Stepwise Filter' },
        { id: 4, label: 'Configure Stepwise Reducer' },
        { id: 5, label: 'Chapter Round-up' },
        { id: 6, label: 'Stackblitz & Downloadable Archive' }
      ] satisfies ChapterStepShape[]
    };
  }
}
