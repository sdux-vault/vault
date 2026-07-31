import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class AddEditCharactersService {
  chapters(): ChapterShape {
    return {
      id: 3,
      label: 'Add/Edit Chapter',
      fragment: 'chapter-3',
      steps: [
        { id: 1, label: 'Configure Merge Behavior' },
        { id: 2, label: 'Add/Edit Capabilities' },
        { id: 3, label: 'Complete Add/Edit Tutorial' }
      ] satisfies ChapterStepShape[]
    };
  }
}
