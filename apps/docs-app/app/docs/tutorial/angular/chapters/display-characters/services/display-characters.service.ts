import { computed, inject, Injectable } from '@angular/core';
import { StackblitzExampleService } from '../../../../../stack-blitz/services/stackblitz-example.service';
import { ExampleFileService } from '../../../../services/example-file.service';
import { ChapterStackBlitzShape } from '../../../../shape/chapter-stackblitz.shape';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';
import { ExampleFileTypes } from '../../../../types/example-file.type';
import { STAR_WARS_DISPLAY_CHARACTERS } from '../../../generated/display-characters.generated';

@Injectable({ providedIn: 'root' })
export class DisplayCharactersService {
  readonly #stackblitzService = inject(StackblitzExampleService);
  readonly #exampleFileService = inject(ExampleFileService);
  readonly #characters = STAR_WARS_DISPLAY_CHARACTERS;

  chapters(): ChapterShape {
    return {
      id: 2,
      label: 'Multi-select Chapter',
      fragment: 'chapter-2',
      steps: [
        { id: 1, label: 'Add a Dropdown' },
        { id: 2, label: 'Complete Dropdown Tutorial' }
      ] satisfies ChapterStepShape[]
    };
  }

  readonly stackblitz = computed<ChapterStackBlitzShape>(() => {
    const example = this.#stackblitzService.getExample('display-characters')!;

    return {
      example,
      language: example.languages.find((lang) => lang.key === 'angular')!
    };
  });

  readonly displayCharactersFiles = computed(() => [
    this.#exampleFileService.getFile(
      this.#characters,
      ExampleFileTypes.Component
    ),
    this.#exampleFileService.getFile(this.#characters, ExampleFileTypes.Html),
    this.#exampleFileService.getFile(
      this.#characters,
      ExampleFileTypes.ComponentSpec
    )
  ]);
}
