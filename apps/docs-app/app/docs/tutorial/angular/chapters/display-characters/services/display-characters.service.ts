import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class DisplayCharactersService {
  chapters(): ChapterShape {
    return {
      id: 2,
      label: 'Multi-select Chapter',
      fragment: 'chapter-2',
      steps: [
        { id: 1, label: 'Add a Dropdown' },
        { id: 2, label: 'Complete Dropdown Tutorial' }
      ] satisfies ChapterStepShape[]
    };
  }
}
