import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class LifecycleService {
  chapters(): ChapterShape {
    return {
      id: 6,
      label: 'Lifecycle',
      route: 'chapter-6',
      metadata: {
        track: 'Core',
        prerequisite: 'Chapter 3',
        tier: '★',
        estimatedTime: '20–30 min'
      },
      steps: [
        { id: 1, label: 'Persist Null and Reset State' },
        { id: 2, label: 'Finalize with destroy()' },
        { id: 3, label: 'Chapter Round-up' },
        { id: 4, label: 'Stackblitz & Downloadable Archive' }
      ] satisfies ChapterStepShape[]
    };
  }
}
