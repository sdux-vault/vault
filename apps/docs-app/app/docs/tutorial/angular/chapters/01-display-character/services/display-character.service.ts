import { inject, Injectable } from '@angular/core';
import { BrandNameService } from '../../../../../../../../../libs/ui/web-components/src/public-api';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class DisplayCharacterService {
  readonly #brandName = inject(BrandNameService);

  chapters(): ChapterShape {
    return {
      id: 0,
      label: 'Foundation: Read State',
      route: 'chapter-1',
      metadata: {
        track: 'Core',
        prerequisite: 'None',
        tier: '★',
        estimatedTime: '60-90 minutes'
      },
      steps: [
        { id: 1, label: 'Angular Project Setup' },
        { id: 2, label: `Install ${this.#brandName.value}` },
        { id: 3, label: 'Define Feature State' },
        { id: 4, label: 'Build the Service' },
        { id: 5, label: `Initialize the ${this.#brandName.vaultValue}` },
        { id: 6, label: `Register the ${this.#brandName.featureCellValue}` },
        { id: 7, label: `Connect the service to ${this.#brandName.value}` },
        { id: 8, label: 'Display Character State' },
        { id: 9, label: 'Start the Application' },
        { id: 10, label: 'Complete Initial Tutorial' }
      ] satisfies ChapterStepShape[]
    };
  }
}
