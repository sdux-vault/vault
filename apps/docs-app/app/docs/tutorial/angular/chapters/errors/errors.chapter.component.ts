import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  SDuXDownloadComponent
} from '@sdux-vault/ui/web-components';
import { StackblitzLanguageExampleComponent } from '../../../../stack-blitz/example/stackblitz-language-example/stackblitz-language-example.component';
import { StackblitzExampleService } from '../../../../stack-blitz/services/stackblitz-example.service';
import { ExampleFileService } from '../../../services/example-file.service';
import { ChapterStackBlitzShape } from '../../../shape/chapter-stackblitz.shape';
import { ExampleFileTypes } from '../../../types/example-file.type';
import { STAR_WARS_ERRORS_CHARACTERS } from '../../generated/errors.generated';

@Component({
  selector: 'sdux-errors-chapter',
  standalone: true,
  imports: [
    RouterModule,
    FeatureCellBrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    StackblitzLanguageExampleComponent,
    SDuXDownloadComponent
  ],
  templateUrl: './errors.chapter.component.html'
})
export class ErrorsChapterComponent {
  readonly #stackblitzService = inject(StackblitzExampleService);
  readonly #exampleFileService = inject(ExampleFileService);
  readonly #characters = STAR_WARS_ERRORS_CHARACTERS;
  readonly downloadUrl = '/assets/tutorial/sdux-errors.tutorial.zip';

  readonly stackblitz = computed<ChapterStackBlitzShape>(() => {
    const example = this.#stackblitzService.getExample('errors-tutorial')!;

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
    )
  ]);

  readonly componentFiles = computed(() => [
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
