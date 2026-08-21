import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class DisplayCharactersService {
  chapters(): ChapterShape {
    return {
      id: 2,
      label: 'Selection: Display Records',
      fragment: 'chapter-2',
      metadata: {
        track: 'Core',
        prerequisite: 'Chapter 1',
        tier: '★',
        estimatedTime: '20–30 min'
      },
      steps: [
        { id: 1, label: 'Add a Dropdown' },
        { id: 2, label: 'Complete Dropdown Tutorial' }
      ] satisfies ChapterStepShape[]
    };
  }
}
