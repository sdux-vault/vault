import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class TabSyncService {
  chapters(): ChapterShape {
    return {
      id: 12,
      label: 'Tab Sync Chapter',
      fragment: 'chapter-12',
      steps: [
        { id: 1, label: 'Configure Tab Sync' },
        { id: 2, label: 'View Tab Sync' },
        { id: 3, label: 'Complete Tab Sync Tutorial' }
      ] satisfies ChapterStepShape[]
    };
  }
}
