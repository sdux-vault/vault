import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class DisplayCharactersService {
  chapters(): ChapterShape {
    return {
      id: 3,
      label: 'Display Characters',
      route: 'chapter-3',
      metadata: {
        track: 'Core',
        prerequisite: 'Chapter 2',
        tier: '★',
        estimatedTime: '20–30 min'
      },
      steps: [
        { id: 1, label: 'Add a Dropdown' },
        { id: 2, label: 'Chapter Round-up' },
        { id: 3, label: 'Stackblitz & Downloadable Archive' }
      ] satisfies ChapterStepShape[]
    };
  }
}
