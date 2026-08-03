import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  PackageNameComponent,
  SDuXDownloadComponent
} from '@sdux-vault/ui/web-components';
import { StackblitzLanguageExampleComponent } from '../../../../stack-blitz/example/stackblitz-language-example/stackblitz-language-example.component';
import { StackblitzExampleService } from '../../../../stack-blitz/services/stackblitz-example.service';
import { ExampleFileService } from '../../../services/example-file.service';
import { ChapterStackBlitzShape } from '../../../shape/chapter-stackblitz.shape';
import { ExampleFileTypes } from '../../../types/example-file.type';
import { STAR_WARS_DISTINCT_UNTIL_CHANGED } from '../../generated/distinct-until-changed.generated';

@Component({
  selector: 'sdux-distinct-until-changed-chapter',
  standalone: true,
  imports: [
    RouterModule,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    StackblitzLanguageExampleComponent,
    SDuXDownloadComponent,
    PackageNameComponent
  ],
  templateUrl: './distinct-until-changed.chapter.component.html'
})
export class DistinctUntilChangedChapterComponent {
  readonly #stackblitzService = inject(StackblitzExampleService);
  readonly #exampleFileService = inject(ExampleFileService);
  readonly #files = STAR_WARS_DISTINCT_UNTIL_CHANGED;
  readonly downloadUrl =
    '/assets/tutorial/sdux-distinct-until-changed.tutorial.zip';
  readonly stackblitz = computed<ChapterStackBlitzShape>(() => {
    const example = this.#stackblitzService.getExample(
      'distinct-until-changed-tutorial'
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
  readonly componentFiles = computed(() => [
    this.#exampleFileService.getFile(this.#files, ExampleFileTypes.Component),
    this.#exampleFileService.getFile(this.#files, ExampleFileTypes.Html),
    this.#exampleFileService.getFile(
      this.#files,
      ExampleFileTypes.ComponentSpec
    )
  ]);
}
