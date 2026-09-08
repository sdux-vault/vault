import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class FiltersAndReducersService {
  chapters(): ChapterShape {
    return {
      id: 7,
      label: 'Filters and Reducers',
      route: 'chapter-7',
      metadata: {
        track: 'Core',
        prerequisite: 'Chapter 6',
        tier: '★★',
        estimatedTime: '20–30 min'
      },
      steps: [
        { id: 1, label: 'Add Ordered jjjFilters' },
        { id: 2, label: 'Add Ordered Reducers' },
        { id: 3, label: 'Component Update' },
        { id: 4, label: 'Chapter Round-up' },
        { id: 5, label: 'Stackblitz & Downloadable Archive' }
      ] satisfies ChapterStepShape[]
    };
  }
}
