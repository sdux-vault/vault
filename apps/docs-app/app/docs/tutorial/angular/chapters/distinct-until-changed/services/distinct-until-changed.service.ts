import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class DistinctUntilChangedService {
  chapters(): ChapterShape {
    return {
      id: 13,
      label: 'Distinct Until Changed',
      route: 'chapter-13',
      metadata: {
        track: 'Lab',
        prerequisite: 'Chapter 6',
        tier: '★★★',
        estimatedTime: '20–30 min'
      },
      steps: [
        { id: 1, label: 'Configure Distinct Until Changed' },
        { id: 2, label: 'Submit Same and Changed State' },
        { id: 3, label: 'Complete Distinct Until Changed Tutorial' }
      ] satisfies ChapterStepShape[]
    };
  }
}
