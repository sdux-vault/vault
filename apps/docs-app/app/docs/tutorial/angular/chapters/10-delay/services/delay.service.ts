import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class DelayService {
  chapters(): ChapterShape {
    return {
      id: 10,
      label: 'Delay',
      route: 'chapter-10',
      metadata: {
        track: 'Lab',
        prerequisite: 'Chapter 7',
        tier: '★★★',
        estimatedTime: '30–45 min'
      },
      steps: [
        { id: 1, label: 'Configure Delay Controller' },
        { id: 2, label: 'Delay Component' },
        { id: 3, label: 'Chapter Round-up' },
        { id: 4, label: 'Stackblitz & Downloadable Archive' }
      ] satisfies ChapterStepShape[]
    };
  }
}
