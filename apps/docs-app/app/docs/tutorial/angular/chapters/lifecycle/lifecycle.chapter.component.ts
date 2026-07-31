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
import { STAR_WARS_LIFECYCLE_CHARACTERS } from '../../generated/lifecycle.generated';

@Component({
  selector: 'sdux-lifecycle-chapter',
  standalone: true,
  imports: [
    RouterModule,
    BrandNameComponent,
    FeatureCellBrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    StackblitzLanguageExampleComponent
  ],
  templateUrl: './lifecycle.chapter.component.html'
})
export class LifecycleChapterComponent {
  readonly #stackblitzService = inject(StackblitzExampleService);
  readonly #exampleFileService = inject(ExampleFileService);
  readonly #characters = STAR_WARS_LIFECYCLE_CHARACTERS;

  readonly stackblitz = computed<ChapterStackBlitzShape>(() => {
    const example = this.#stackblitzService.getExample('lifecycle')!;

    return {
      example,
      language: example.languages.find((lang) => lang.key === 'angular')!
    };
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
