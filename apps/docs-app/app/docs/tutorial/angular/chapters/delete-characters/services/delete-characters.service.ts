import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class DeleteCharactersService {
  chapters(): ChapterShape {
    return {
      id: 4,
      label: 'Delete Chapter',
      fragment: 'chapter-4',
      steps: [
        { id: 1, label: 'Add Delete Capabilities' },
        { id: 2, label: 'Complete Delete Tutorial' }
      ] satisfies ChapterStepShape[]
    };
  }
}
