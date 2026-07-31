import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class LifecycleService {
  chapters(): ChapterShape {
    return {
      id: 5,
      label: 'Lifecycle Chapter',
      fragment: 'chapter-5',
      steps: [
        { id: 1, label: 'Persist Null and Reset State' },
        { id: 2, label: 'Finalize with destroy()' }
      ] satisfies ChapterStepShape[]
    };
  }
}
