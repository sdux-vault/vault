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
import { TutorialNavigationDirective } from '../../../directive/tutorial-navigation.directive';
import { ExampleFileService } from '../../../services/example-file.service';
import { ChapterStackBlitzShape } from '../../../shape/chapter-stackblitz.shape';
import type { ExampleFileType } from '../../../types/example-file.type';
import { ExampleFileTypes } from '../../../types/example-file.type';
import { STAR_WARS_ASYNC_INPUT } from '../../generated/09-async-input.generated';

@Component({
  selector: 'sdux-async-input-chapter',
  standalone: true,
  imports: [
    RouterModule,
    FeatureCellBrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    StackblitzLanguageExampleComponent,
    SDuXDownloadComponent
  ],
  templateUrl: './async-input.chapter.component.html'
})
export class AsyncInputChapterComponent extends TutorialNavigationDirective {
  readonly #stackblitzService = inject(StackblitzExampleService);
  readonly #exampleFileService = inject(ExampleFileService);
  readonly #characters = STAR_WARS_ASYNC_INPUT;
  readonly downloadUrl = '/assets/tutorial/sdux-async-input.tutorial.zip';

  readonly allFilesSource = this.#characters;

  readonly stackblitz = computed<ChapterStackBlitzShape>(() => {
    const example = this.#stackblitzService.getExample('async-input-tutorial')!;

    return {
      example,
      language: example.languages.find((lang) => lang.key === 'angular')!
    };
  });

  readonly hydrationFiles = computed(() =>
    this.#getFiles(ExampleFileTypes.Hydrate, ExampleFileTypes.HydrateSpec)
  );

  readonly serviceFiles = computed(() =>
    this.#getFiles(ExampleFileTypes.Service, ExampleFileTypes.ServiceSpec)
  );

  readonly promiseFiles = computed(() =>
    this.#getFiles(ExampleFileTypes.Promise, ExampleFileTypes.PromiseSpec)
  );

  readonly observableFiles = computed(() =>
    this.#getFiles(ExampleFileTypes.Observable, ExampleFileTypes.ObservableSpec)
  );

  readonly httpResourceFiles = computed(() =>
    this.#getFiles(
      ExampleFileTypes.HttpResource,
      ExampleFileTypes.HttpResourceSpec
    )
  );

  readonly componentFiles = computed(() =>
    this.#getFiles(ExampleFileTypes.Component, ExampleFileTypes.ComponentSpec)
  );

  readonly htmlFiles = computed(() => this.#getFiles(ExampleFileTypes.Html));

  #getFiles(...types: readonly ExampleFileType[]) {
    return types.map((type) =>
      this.#exampleFileService.getFile(this.#characters, type)
    );
  }
}
