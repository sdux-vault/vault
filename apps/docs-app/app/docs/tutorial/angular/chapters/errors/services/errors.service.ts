import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class ErrorsService {
  chapters(): ChapterShape {
    return {
      id: 7,
      label: 'Errors',
      fragment: 'chapter-7',
      metadata: {
        track: 'Core',
        prerequisite: 'Chapter 6',
        tier: '★★',
        estimatedTime: '20–30 min'
      },
      steps: [
        { id: 1, label: 'Simulate Pipeline Errors' },
        { id: 2, label: 'Display Global Error State' },
        { id: 3, label: 'Complete Errors Tutorial' }
      ] satisfies ChapterStepShape[]
    };
  }
}
