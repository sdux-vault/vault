import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';
import { StackblitzLanguageExampleComponent } from '../../../../stack-blitz/example/stackblitz-language-example/stackblitz-language-example.component';
import { StackblitzExampleService } from '../../../../stack-blitz/services/stackblitz-example.service';
import { ExampleFileService } from '../../../services/example-file.service';
import { ChapterStackBlitzShape } from '../../../shape/chapter-stackblitz.shape';
import type { ExampleFileType } from '../../../types/example-file.type';
import { ExampleFileTypes } from '../../../types/example-file.type';
import { STAR_WARS_DELAY } from '../../generated/delay.generated';

@Component({
  selector: 'sdux-delay-chapter',
  standalone: true,
  imports: [
    RouterModule,
    FeatureCellBrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    StackblitzLanguageExampleComponent,
    PackageNameComponent
  ],
  templateUrl: './delay.chapter.component.html'
})
export class DelayChapterComponent {
  readonly #stackblitzService = inject(StackblitzExampleService);
  readonly #exampleFileService = inject(ExampleFileService);
  readonly #files = STAR_WARS_DELAY;

  readonly stackblitz = computed<ChapterStackBlitzShape>(() => {
    const example = this.#stackblitzService.getExample('delay-tutorial')!;

    return {
      example,
      language: example.languages.find((lang) => lang.key === 'angular')!
    };
  });

  readonly configurationFiles = computed(() =>
    this.#getFiles(
      ExampleFileTypes.Timer,
      ExampleFileTypes.AppConfig,
      ExampleFileTypes.Service
    )
  );

  readonly timingFiles = computed(() =>
    this.#getFiles(
      ExampleFileTypes.Component,
      ExampleFileTypes.ComponentSpec,
      ExampleFileTypes.Html
    )
  );

  readonly completedFiles = computed(() =>
    this.#getFiles(
      ExampleFileTypes.Timer,
      ExampleFileTypes.TimerSpec,
      ExampleFileTypes.AppConfig,
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
