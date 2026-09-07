import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class TabSyncService {
  chapters(): ChapterShape {
    return {
      id: 12,
      label: 'Tab Sync',
      route: 'chapter-12',
      metadata: {
        track: 'Lab',
        prerequisite: 'Chapter 6',
        tier: '★★',
        estimatedTime: '20–30 min'
      },
      steps: [
        { id: 1, label: 'Configure Tab Sync' },
        { id: 2, label: 'View Tab Sync' },
        { id: 3, label: 'Complete Tab Sync Tutorial' }
      ] satisfies ChapterStepShape[]
    };
  }
}
