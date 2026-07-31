import { inject, Injectable } from '@angular/core';
import { BrandNameService } from '../../../../../../../../../libs/ui/web-components/src/public-api';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';

@Injectable({ providedIn: 'root' })
export class DisplayCharacterService {
  readonly #brandName = inject(BrandNameService);

  chapters(): ChapterShape {
    return {
      id: 1,
      label: 'Foundation Chapter',
      fragment: 'top',
      steps: [
        { id: 1, label: 'Project Set-up' },
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
