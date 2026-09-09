import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class DeleteCharactersService {
  chapters(): ChapterShape {
    return {
      id: 5,
      label: 'Delete Characters',
      route: 'chapter-5',
      metadata: {
        track: 'Core',
        prerequisite: 'Chapter 4',
        tier: '★',
        estimatedTime: '20–30 min'
      },
      steps: [
        { id: 1, label: 'Configure Array By Id Merge Behavior' },
        { id: 2, label: 'Delete Service' },
        { id: 3, label: 'Delete Component' },
        { id: 4, label: 'Chapter Round-up' },
        { id: 5, label: 'Stackblitz & Downloadable Archive' }
      ] satisfies ChapterStepShape[]
    };
  }
}
