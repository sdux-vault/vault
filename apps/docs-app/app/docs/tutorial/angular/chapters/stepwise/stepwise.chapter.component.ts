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
import {
  ExampleFileType,
  ExampleFileTypes
} from '../../../types/example-file.type';
import { STAR_WARS_STEPWISE } from '../../generated/stepwise.generated';

@Component({
  selector: 'sdux-stepwise-chapter',
  standalone: true,
  imports: [
    RouterModule,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    StackblitzLanguageExampleComponent,
    SDuXDownloadComponent,
    PackageNameComponent
  ],
  templateUrl: './stepwise.chapter.component.html'
})
export class StepwiseChapterComponent {
  readonly #stackblitzService = inject(StackblitzExampleService);
  readonly #exampleFileService = inject(ExampleFileService);
  readonly #files = STAR_WARS_STEPWISE;
  readonly downloadUrl = '/assets/tutorial/sdux-stepwise.tutorial.zip';

  readonly stackblitz = computed<ChapterStackBlitzShape>(() => {
    const example = this.#stackblitzService.getExample('stepwise-tutorial')!;

    return {
      example,
      language: example.languages.find((lang) => lang.key === 'angular')!
    };
  });

  readonly appConfigFile = computed(() =>
    this.#exampleFileService.getFile(this.#files, ExampleFileTypes.AppConfig)
  );

  readonly serviceFiles = computed(() =>
    this.#getFiles(
      ExampleFileTypes.Service,
      ExampleFileTypes.Component,
      ExampleFileTypes.Html
    )
  );

  readonly chapterFiles = computed(() =>
    this.#getFiles(
      ExampleFileTypes.AppConfig,
      ExampleFileTypes.Service,
      ExampleFileTypes.Component,
      ExampleFileTypes.Html,
      ExampleFileTypes.ServiceSpec,
      ExampleFileTypes.ComponentSpec
    )
  );

  #getFiles(...types: readonly ExampleFileType[]) {
    return types.map((type) =>
      this.#exampleFileService.getFile(this.#files, type)
    );
  }
}
