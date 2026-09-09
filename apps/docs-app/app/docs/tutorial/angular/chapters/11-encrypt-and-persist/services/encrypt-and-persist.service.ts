import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class EncryptAndPersistService {
  chapters(): ChapterShape {
    return {
      id: 11,
      label: 'Encrypt and Persist',
      route: 'chapter-11',
      metadata: {
        track: 'Lab',
        prerequisite: 'Chapter 7',
        tier: '★★★',
        estimatedTime: '30–45 min'
      },
      steps: [
        { id: 1, label: 'Configure Encrypt and Persist Behaviors' },
        { id: 2, label: 'Encrypt Feature State' },
        { id: 3, label: 'Persist Feature State' },
        { id: 4, label: 'Chapter Round-up' },
        { id: 5, label: 'Stackblitz & Downloadable Archive' }
      ] satisfies ChapterStepShape[]
    };
  }
}
