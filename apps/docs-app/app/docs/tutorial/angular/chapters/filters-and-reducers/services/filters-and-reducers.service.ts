import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class FiltersAndReducersService {
  chapters(): ChapterShape {
    return {
      id: 6,
      label: 'Filters and Reducers',
      fragment: 'chapter-6',
      metadata: {
        track: 'Core',
        prerequisite: 'Chapter 5',
        tier: '★★',
        estimatedTime: '20–30 min'
      },
      steps: [
        { id: 1, label: 'Add Filter Stage' },
        { id: 2, label: 'Register Ordered Reducers' },
        { id: 3, label: 'Complete Filter/Reducer Tutorial' }
      ] satisfies ChapterStepShape[]
    };
  }
}
