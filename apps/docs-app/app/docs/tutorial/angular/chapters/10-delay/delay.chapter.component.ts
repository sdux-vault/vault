import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  PackageNameComponent,
  SDuXDownloadComponent
} from '@sdux-vault/ui/web-components';
import { StackblitzLanguageExampleComponent } from '../../../../stack-blitz/example/stackblitz-language-example/stackblitz-language-example.component';
import { StackblitzExampleService } from '../../../../stack-blitz/services/stackblitz-example.service';
import { TutorialNavigationDirective } from '../../../directive/tutorial-navigation.directive';
import { ExampleFileService } from '../../../services/example-file.service';
import { ChapterStackBlitzShape } from '../../../shape/chapter-stackblitz.shape';
import type { ExampleFileType } from '../../../types/example-file.type';
import { ExampleFileTypes } from '../../../types/example-file.type';
import { STAR_WARS_DELAY_FILES } from '../../generated/10-delay.generated';

@Component({
  selector: 'sdux-delay-chapter',
  standalone: true,
  imports: [
    RouterModule,
    FeatureCellBrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    StackblitzLanguageExampleComponent,
    PackageNameComponent,
    SDuXDownloadComponent
  ],
  templateUrl: './delay.chapter.component.html'
})
export class DelayChapterComponent extends TutorialNavigationDirective {
  readonly #stackblitzService = inject(StackblitzExampleService);
  readonly #exampleFileService = inject(ExampleFileService);
  readonly #files = STAR_WARS_DELAY_FILES;
  readonly downloadUrl = '/assets/tutorial/sdux-10-delay.tutorial.zip';

  readonly allSourceFiles = this.#files;

  readonly stackblitz = computed<ChapterStackBlitzShape>(() => {
    const example = this.#stackblitzService.getExample('delay-tutorial')!;

    return {
      example,
      language: example.languages.find((lang) => lang.key === 'angular')!
    };
  });

  readonly appConfigFile = computed(() =>
    this.#getFiles(ExampleFileTypes.AppConfig)
  );

  readonly timingFiles = computed(() =>
    this.#getFiles(ExampleFileTypes.Timer, ExampleFileTypes.TimerSpec)
  );

  readonly serviceFiles = computed(() =>
    this.#getFiles(ExampleFileTypes.Service, ExampleFileTypes.ServiceSpec)
  );

  readonly componentFiles = computed(() =>
    this.#getFiles(ExampleFileTypes.Component, ExampleFileTypes.ComponentSpec)
  );
  readonly htmlFiles = computed(() => this.#getFiles(ExampleFileTypes.Html));

  #getFiles(...types: readonly ExampleFileType[]) {
    return types.map((type) =>
      this.#exampleFileService.getFile(this.#files, type)
    );
  }
}
