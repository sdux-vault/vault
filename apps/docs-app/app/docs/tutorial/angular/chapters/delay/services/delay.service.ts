import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class DelayService {
  chapters(): ChapterShape {
    return {
      id: 6,
      label: 'Filters/Reducers Chapter',
      fragment: 'chapter-6',
      steps: [
        { id: 1, label: 'Add Filter Stage' },
        { id: 2, label: 'Add Reducer Styles' },
        { id: 3, label: 'Complete Filter/Reducer Tutorial' }
      ] satisfies ChapterStepShape[]
    };
  }
}
