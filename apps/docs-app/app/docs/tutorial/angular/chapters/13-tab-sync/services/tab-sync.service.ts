import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class TabSyncService {
  chapters(): ChapterShape {
    return {
      id: 13,
      label: 'Tab Sync',
      route: 'chapter-13',
      metadata: {
        track: 'Lab',
        prerequisite: 'Chapter 7',
        tier: '★★',
        estimatedTime: '20–30 min'
      },
      steps: [
        { id: 1, label: 'Configure Tab Sync' },
        { id: 2, label: 'View Tab Sync' },
        { id: 3, label: 'Chapter Round-up' },
        { id: 4, label: 'Stackblitz & Downloadable Archive' }
      ] satisfies ChapterStepShape[]
    };
  }
}
