import { inject, Injectable } from '@angular/core';
import { BrandNameService } from '../../../../../../../../../libs/ui/web-components/src/public-api';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class AngularWelcomeService {
  readonly #brandName = inject(BrandNameService);

  chapters(): ChapterShape {
    return {
      id: 1,
      label: 'Welcome',
      route: 'welcome',
      steps: [
        { id: 1, label: 'Before You Begin' },
        { id: 2, label: `The ${this.#brandName.value} Mental Model` },
        { id: 3, label: `${this.#brandName.value} in 5 Minutes` }
      ] satisfies ChapterStepShape[]
    };
  }
}
