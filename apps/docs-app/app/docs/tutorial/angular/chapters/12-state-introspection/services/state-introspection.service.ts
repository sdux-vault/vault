import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class StateIntrospectionService {
  chapters(): ChapterShape {
    return {
      id: 12,
      label: 'State Introspection',
      route: 'chapter-12',
      metadata: {
        track: 'Lab',
        prerequisite: 'Chapter 7',
        tier: '★★',
        estimatedTime: '30–45 min'
      },
      steps: [
        { id: 1, label: 'Read Raw StateSnapshot' },
        { id: 2, label: 'Observe Raw StateSnapshot$' },
        { id: 3, label: 'Inspect Before Taps' },
        { id: 4, label: 'Inspect After Taps' },
        { id: 5, label: 'Observe State Emission' },
        { id: 6, label: 'Capture Initial State' },
        { id: 7, label: 'Chapter Round-up' },
        { id: 8, label: 'Stackblitz & Downloadable Archive' }
      ] satisfies ChapterStepShape[]
    };
  }
}
