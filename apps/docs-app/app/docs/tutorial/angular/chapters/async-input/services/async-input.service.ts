import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class AsyncInputService {
  chapters(): ChapterShape {
    return {
      id: 8,
      label: 'Async Input',
      route: 'chapter-8',
      metadata: {
        track: 'Lab',
        prerequisite: 'Chapter 7',
        tier: '★★',
        estimatedTime: '20–30 min'
      },
      steps: [
        { id: 1, label: 'Hydrate Initial State' },
        { id: 2, label: 'Resolve a Promise' },
        { id: 3, label: 'Resolve an Observable' },
        { id: 4, label: 'Resolve an HTTP Resource' },
        { id: 5, label: 'Complete Async Input Tutorial' }
      ] satisfies ChapterStepShape[]
    };
  }
}
