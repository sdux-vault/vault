import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class AddEditCharactersService {
  chapters(): ChapterShape {
    return {
      id: 4,
      label: 'Add/Edit Characters',
      route: 'chapter-4',
      metadata: {
        track: 'Core',
        prerequisite: 'Chapter 3',
        tier: '★',
        estimatedTime: '20–30 min'
      },
      steps: [
        { id: 1, label: 'Configure Array Append Merge Behavior' },
        { id: 2, label: 'Add/Edit Service' },
        { id: 3, label: 'Add/Edit Component' },
        { id: 4, label: 'Chapter Round-up' },
        { id: 5, label: 'Stackblitz & Downloadable Archive' }
      ] satisfies ChapterStepShape[]
    };
  }
}
