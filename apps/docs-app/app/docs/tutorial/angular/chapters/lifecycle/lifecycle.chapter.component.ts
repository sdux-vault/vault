import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { lifecycleExampleProject } from '../../../../../stackblitz/projects/angular/lifecycle-example.project';
import { StackblitzLanguageExampleComponent } from '../../../../stack-blitz/example/stackblitz-language-example/stackblitz-language-example.component';
import { StackblitzExampleService } from '../../../../stack-blitz/services/stackblitz-example.service';
import { ChapterStackBlitzShape } from '../../../shape/chapter-stackblitz.shape';
import type { ExampleFileShape } from '../../../shape/example-file.shape';
import { ExampleFileTypes } from '../../../types/example-file.type';

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
  readonly #files = lifecycleExampleProject.files as Record<string, string>;

  readonly stackblitz = computed<ChapterStackBlitzShape>(() => {
    const example = this.#stackblitzService.getExample('lifecycle')!;

    return {
      example,
      language: example.languages.find((lang) => lang.key === 'angular')!
    };
  });

  readonly serviceFiles = computed(() => [
    this.#getFile(
      ExampleFileTypes.Service,
      'example.service.ts',
      'src/example.service.ts'
    ),
    this.#getFile(
      ExampleFileTypes.ServiceSpec,
      'example.service.spec.ts',
      'src/example.service.spec.ts'
    )
  ]);

  readonly componentFiles = computed(() => [
    this.#getFile(
      ExampleFileTypes.Component,
      'example.component.ts',
      'src/example.component.ts'
    ),
    this.#getFile(
      ExampleFileTypes.ComponentSpec,
      'example.component.spec.ts',
      'src/example.component.spec.ts'
    ),
    this.#getFile(
      ExampleFileTypes.Html,
      'example.component.html',
      'src/example.component.html'
    )
  ]);

  #getFile(
    type: (typeof ExampleFileTypes)[keyof typeof ExampleFileTypes],
    fileName: string,
    path: string
  ): ExampleFileShape {
    return {
      type,
      fileName,
      source: this.#files[path] ?? ''
    };
  }
}
