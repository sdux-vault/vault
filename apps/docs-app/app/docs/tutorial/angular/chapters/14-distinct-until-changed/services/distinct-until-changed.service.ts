import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class DistinctUntilChangedService {
  chapters(): ChapterShape {
    return {
      id: 14,
      label: 'Distinct Until Changed',
      route: 'chapter-14',
      metadata: {
        track: 'Lab',
        prerequisite: 'Chapter 7',
        tier: '★★★',
        estimatedTime: '20–30 min'
      },
      steps: [
        { id: 1, label: 'Configure Distinct Until Changed' },
        { id: 2, label: 'Component and HTML' },
        { id: 3, label: 'Chapter Round-up' },
        { id: 4, label: 'Stackblitz & Downloadable Archive' }
      ] satisfies ChapterStepShape[]
    };
  }
}
