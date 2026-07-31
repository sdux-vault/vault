import { computed, inject, Injectable } from '@angular/core';
import { StackblitzExampleService } from '../../../../../stack-blitz/services/stackblitz-example.service';
import { ExampleFileService } from '../../../../services/example-file.service';
import { ChapterStackBlitzShape } from '../../../../shape/chapter-stackblitz.shape';
import { ChapterStepShape } from '../../../../shape/chapter-step.shape';
import { ChapterShape } from '../../../../shape/chapter.shape';
import { ExampleFileTypes } from '../../../../types/example-file.type';
import { STAR_WARS_ADD_EDIT_CHARACTERS } from '../../../generated/add-edit-characters.generated';

@Injectable({ providedIn: 'root' })
export class AddEditCharactersService {
  readonly #stackblitzService = inject(StackblitzExampleService);
  readonly #exampleFileService = inject(ExampleFileService);
  readonly #characters = STAR_WARS_ADD_EDIT_CHARACTERS;

  chapters(): ChapterShape {
    return {
      id: 3,
      label: 'Add/Edit Chapter',
      fragment: 'chapter-3',
      steps: [
        { id: 1, label: 'Configure Merge Behavior' },
        { id: 2, label: 'Add/Edit Capabilities' },
        { id: 3, label: 'Complete Add/Edit Tutorial' }
      ] satisfies ChapterStepShape[]
    };
  }

  readonly stackblitz = computed<ChapterStackBlitzShape>(() => {
    const example = this.#stackblitzService.getExample('add-edit-characters')!;

    return {
      example,
      language: example.languages.find((lang) => lang.key === 'angular')!
    };
  });

  readonly appConfigFile = computed(() => {
    return this.#exampleFileService.getFile(
      this.#characters,
      ExampleFileTypes.AppConfig
    );
  });

  readonly serviceFiles = computed(() => [
    this.#exampleFileService.getFile(
      this.#characters,
      ExampleFileTypes.Service
    ),
    this.#exampleFileService.getFile(
      this.#characters,
      ExampleFileTypes.ServiceSpec
    ),
    this.#exampleFileService.getFile(
      this.#characters,
      ExampleFileTypes.CharacterDomain
    ),
    this.#exampleFileService.getFile(
      this.#characters,
      ExampleFileTypes.CharacterDomainSpec
    )
  ]);

  readonly componentFiles = computed(() => [
    this.#exampleFileService.getFile(
      this.#characters,
      ExampleFileTypes.Component
    ),
    this.#exampleFileService.getFile(
      this.#characters,
      ExampleFileTypes.ComponentSpec
    ),
    this.#exampleFileService.getFile(this.#characters, ExampleFileTypes.Html),
    this.#exampleFileService.getFile(
      this.#characters,
      ExampleFileTypes.CharacterEditor
    ),
    this.#exampleFileService.getFile(
      this.#characters,
      ExampleFileTypes.CharacterEditorSpec
    )
  ]);
}
