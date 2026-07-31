import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { StackblitzLanguageExampleComponent } from '../../../../stack-blitz/example/stackblitz-language-example/stackblitz-language-example.component';
import { StackblitzExampleService } from '../../../../stack-blitz/services/stackblitz-example.service';
import { ExampleFileService } from '../../../services/example-file.service';
import { ChapterStackBlitzShape } from '../../../shape/chapter-stackblitz.shape';
import { ExampleFileTypes } from '../../../types/example-file.type';
import { STAR_WARS_ADD_EDIT_CHARACTERS } from '../../generated/add-edit-characters.generated';

@Component({
  selector: 'sdux-add-edit-characters-chapter',
  standalone: true,
  imports: [
    RouterModule,
    BrandNameComponent,
    FeatureCellBrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    StackblitzLanguageExampleComponent
  ],
  templateUrl: './add-edit-characters.chapter.component.html'
})
export class AddEditCharactersChapterComponent {
  readonly #stackblitzService = inject(StackblitzExampleService);
  readonly #exampleFileService = inject(ExampleFileService);
  readonly #characters = STAR_WARS_ADD_EDIT_CHARACTERS;

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
