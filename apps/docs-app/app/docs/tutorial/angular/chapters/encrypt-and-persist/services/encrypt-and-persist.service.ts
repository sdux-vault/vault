import { Injectable } from '@angular/core';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class EncryptAndPersistService {
  chapters(): ChapterShape {
    return {
      id: 10,
      label: 'Encrypt and Persist Chapter',
      fragment: 'chapter-10',
      steps: [
        { id: 1, label: 'Encrypt Feature State' },
        { id: 2, label: 'Persist Feature State' },
        { id: 3, label: 'Observe Pipeline Errors' },
        { id: 4, label: 'Complete Encrypt and Persist Tutorial' }
      ] satisfies ChapterStepShape[]
    };
  }
}
