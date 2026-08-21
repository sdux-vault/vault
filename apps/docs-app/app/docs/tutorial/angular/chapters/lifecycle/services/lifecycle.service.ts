import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class LifecycleService {
  chapters(): ChapterShape {
    return {
      id: 5,
      label: 'Lifecycle',
      fragment: 'chapter-5',
      metadata: {
        track: 'Core',
        prerequisite: 'Chapter 4',
        tier: '★',
        estimatedTime: '20–30 min'
      },
      steps: [
        { id: 1, label: 'Persist Null and Reset State' },
        { id: 2, label: 'Finalize with destroy()' }
      ] satisfies ChapterStepShape[]
    };
  }
}
