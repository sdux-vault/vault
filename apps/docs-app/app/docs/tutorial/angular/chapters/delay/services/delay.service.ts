import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class DelayService {
  chapters(): ChapterShape {
    return {
      id: 9,
      label: 'Delay',
      route: 'chapter-9',
      metadata: {
        track: 'Lab',
        prerequisite: 'Chapter 6',
        tier: '★★★',
        estimatedTime: '30–45 min'
      },
      steps: [
        { id: 1, label: 'Configure Delay Controller' },
        { id: 2, label: 'Observe Delayed Execution' },
        { id: 3, label: 'Complete Delay Tutorial' }
      ] satisfies ChapterStepShape[]
    };
  }
}
