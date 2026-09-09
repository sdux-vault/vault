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
import { ExampleFileTypes } from '../../../types/example-file.type';
import { STAR_WARS_FILTER_AND_REDUCER_FILES } from '../../generated/07-filters-and-reducers.generated';

@Component({
  selector: 'sdux-filters-and-reducers-chapter',
  standalone: true,
  imports: [
    RouterModule,
    FeatureCellBrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    StackblitzLanguageExampleComponent,
    SDuXDownloadComponent
  ],
  templateUrl: './filters-and-reducers.chapter.component.html'
})
export class FiltersAndReducersChapterComponent extends TutorialNavigationDirective {
  readonly #stackblitzService = inject(StackblitzExampleService);
  readonly #exampleFileService = inject(ExampleFileService);
  readonly #files = STAR_WARS_FILTER_AND_REDUCER_FILES;
  readonly downloadUrl =
    '/assets/tutorial/sdux-07-filters-and-reducers.tutorial.zip';

  readonly allSourceFiles = this.#files;

  readonly stackblitz = computed<ChapterStackBlitzShape>(() => {
    const example = this.#stackblitzService.getExample(
      'filters-and-reducers-tutorial'
    )!;

    return {
      example,
      language: example.languages.find((lang) => lang.key === 'angular')!
    };
  });

  readonly serviceFiles = computed(() => [
    this.#exampleFileService.getFile(this.#files, ExampleFileTypes.Service),
    this.#exampleFileService.getFile(this.#files, ExampleFileTypes.ServiceSpec)
  ]);

  readonly filterFiles = computed(() => [
    this.#exampleFileService.getFile(this.#files, ExampleFileTypes.Filter)
  ]);

  readonly characterDomain = computed(() => [
    this.#exampleFileService.getFile(
      this.#files,
      ExampleFileTypes.CharacterDomain
    ),
    this.#exampleFileService.getFile(
      this.#files,
      ExampleFileTypes.CharacterDomainSpec
    )
  ]);

  readonly componentFiles = computed(() => [
    this.#exampleFileService.getFile(this.#files, ExampleFileTypes.Component),
    this.#exampleFileService.getFile(
      this.#files,
      ExampleFileTypes.ComponentSpec
    )
  ]);

  readonly htmlFiles = computed(() => [
    this.#exampleFileService.getFile(this.#files, ExampleFileTypes.Html)
  ]);
}
