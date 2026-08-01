import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { StackblitzLanguageExampleComponent } from '../../../../stack-blitz/example/stackblitz-language-example/stackblitz-language-example.component';
import { StackblitzExampleService } from '../../../../stack-blitz/services/stackblitz-example.service';
import { ExampleFileService } from '../../../services/example-file.service';
import { ChapterStackBlitzShape } from '../../../shape/chapter-stackblitz.shape';
import type { ExampleFileType } from '../../../types/example-file.type';
import { ExampleFileTypes } from '../../../types/example-file.type';
import { STAR_WARS_ASYNC_INPUT } from '../../generated/async-input.generated';

@Component({
  selector: 'sdux-async-input-chapter',
  standalone: true,
  imports: [
    RouterModule,
    FeatureCellBrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    StackblitzLanguageExampleComponent
  ],
  templateUrl: './async-input.chapter.component.html'
})
export class AsyncInputChapterComponent {
  readonly #stackblitzService = inject(StackblitzExampleService);
  readonly #exampleFileService = inject(ExampleFileService);
  readonly #files = STAR_WARS_ASYNC_INPUT;

  readonly stackblitz = computed<ChapterStackBlitzShape>(() => {
    const example = this.#stackblitzService.getExample('async-input-tutorial')!;

    return {
      example,
      language: example.languages.find((lang) => lang.key === 'angular')!
    };
  });

  readonly hydrationFiles = computed(() =>
    this.#getFiles(
      ExampleFileTypes.Hydrate,
      ExampleFileTypes.Service,
      ExampleFileTypes.Component
    )
  );

  readonly promiseFiles = computed(() =>
    this.#getFiles(
      ExampleFileTypes.Promise,
      ExampleFileTypes.Service,
      ExampleFileTypes.Component,
      ExampleFileTypes.Html
    )
  );

  readonly observableFiles = computed(() =>
    this.#getFiles(
      ExampleFileTypes.Observable,
      ExampleFileTypes.Service,
      ExampleFileTypes.Component,
      ExampleFileTypes.Html
    )
  );

  readonly httpResourceFiles = computed(() =>
    this.#getFiles(
      ExampleFileTypes.HttpResource,
      ExampleFileTypes.Service,
      ExampleFileTypes.Component,
      ExampleFileTypes.Html
    )
  );

  readonly componentFiles = computed(() =>
    this.#getFiles(
      ExampleFileTypes.HttpResource,
      ExampleFileTypes.HttpResourceSpec,
      ExampleFileTypes.Observable,
      ExampleFileTypes.ObservableSpec,
      ExampleFileTypes.Promise,
      ExampleFileTypes.PromiseSpec,
      ExampleFileTypes.Hydrate,
      ExampleFileTypes.HydrateSpec,
      ExampleFileTypes.Service,
      ExampleFileTypes.ServiceSpec,
      ExampleFileTypes.Component,
      ExampleFileTypes.ComponentSpec,
      ExampleFileTypes.Html
    )
  );

  #getFiles(...types: readonly ExampleFileType[]) {
    return types.map((type) =>
      this.#exampleFileService.getFile(this.#files, type)
    );
  }
}
