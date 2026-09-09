import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
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
import {
  ExampleFileType,
  ExampleFileTypes
} from '../../../types/example-file.type';
import { STAR_WARS_TAB_SYNC_FILES } from '../../generated/13-tab-sync.generated';

@Component({
  selector: 'sdux-tab-sync-chapter',
  standalone: true,
  imports: [
    RouterModule,
    FeatureCellBrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    StackblitzLanguageExampleComponent,
    SDuXDownloadComponent,
    PackageNameComponent,
    BrandNameComponent
  ],
  templateUrl: './tab-sync.chapter.component.html'
})
export class TabSyncChapterComponent extends TutorialNavigationDirective {
  readonly #stackblitzService = inject(StackblitzExampleService);
  readonly #exampleFileService = inject(ExampleFileService);
  readonly #files = STAR_WARS_TAB_SYNC_FILES;
  readonly downloadUrl = '/assets/tutorial/sdux-13-tab-sync.tutorial.zip';

  readonly allSourceFiles = this.#files;

  readonly stackblitz = computed<ChapterStackBlitzShape>(() => {
    const example = this.#stackblitzService.getExample('tab-sync-tutorial')!;

    return {
      example,
      language: example.languages.find((lang) => lang.key === 'angular')!
    };
  });

  readonly appConfigFile = computed(() =>
    this.#exampleFileService.getFile(this.#files, ExampleFileTypes.AppConfig)
  );

  readonly componentFiles = computed(() =>
    this.#getFiles(ExampleFileTypes.Component, ExampleFileTypes.ComponentSpec)
  );

  readonly serviceFiles = computed(() =>
    this.#getFiles(ExampleFileTypes.Service, ExampleFileTypes.ServiceSpec)
  );

  readonly htmlFiles = computed(() => this.#getFiles(ExampleFileTypes.Html));

  #getFiles(...types: readonly ExampleFileType[]) {
    return types.map((type) =>
      this.#exampleFileService.getFile(this.#files, type)
    );
  }
}
