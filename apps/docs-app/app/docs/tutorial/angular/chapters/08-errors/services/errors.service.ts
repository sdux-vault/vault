import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class ErrorsService {
  chapters(): ChapterShape {
    return {
      id: 8,
      label: 'Errors',
      route: 'chapter-8',
      metadata: {
        track: 'Core',
        prerequisite: 'Chapter 7',
        tier: '★★',
        estimatedTime: '20–30 min'
      },
      steps: [
        { id: 1, label: 'Simulate Pipeline Errors' },
        { id: 2, label: 'Display Global Error State' },
        { id: 3, label: 'Complete Errors Tutorial' },
        { id: 4, label: 'Chapter Round-up' },
        { id: 5, label: 'Stackblitz & Downloadable Archive' }
      ] satisfies ChapterStepShape[]
    };
  }
}
