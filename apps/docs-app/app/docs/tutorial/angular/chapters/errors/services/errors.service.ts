import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class ErrorsService {
  chapters(): ChapterShape {
    return {
      id: 7,
      label: 'Errors Chapter',
      fragment: 'chapter-7',
      steps: [
        { id: 1, label: 'Simulate Pipeline Errors' },
        { id: 2, label: 'Display Global Error State' },
        { id: 3, label: 'Complete Errors Tutorial' }
      ] satisfies ChapterStepShape[]
    };
  }
}
