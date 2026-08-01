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
import { ExampleFileService } from '../../../services/example-file.service';
import { ChapterStackBlitzShape } from '../../../shape/chapter-stackblitz.shape';
import {
  ExampleFileType,
  ExampleFileTypes
} from '../../../types/example-file.type';
import { STAR_WARS_ENCRYPT_AND_PERSIST } from '../../generated/encrypt-and-persist.generated';

@Component({
  selector: 'sdux-encrypt-and-persist-chapter',
  standalone: true,
  imports: [
    RouterModule,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    StackblitzLanguageExampleComponent,
    SDuXDownloadComponent,
    FeatureCellBrandNameComponent,
    PackageNameComponent,
    BrandNameComponent
  ],
  templateUrl: './encrypt-and-persist.chapter.component.html'
})
export class EncryptAndPersistChapterComponent {
  readonly #stackblitzService = inject(StackblitzExampleService);
  readonly #exampleFileService = inject(ExampleFileService);
  readonly #files = STAR_WARS_ENCRYPT_AND_PERSIST;
  readonly downloadUrl =
    '/assets/tutorial/sdux-encrypt-and-persist.tutorial.zip';

  readonly stackblitz = computed<ChapterStackBlitzShape>(() => {
    const example = this.#stackblitzService.getExample(
      'encrypt-and-persist-tutorial'
    )!;

    return {
      example,
      language: example.languages.find((lang) => lang.key === 'angular')!
    };
  });

  readonly appConfigFile = computed(() =>
    this.#exampleFileService.getFile(this.#files, ExampleFileTypes.AppConfig)
  );

  readonly serviceFiles = computed(() =>
    this.#exampleFileService.getFile(this.#files, ExampleFileTypes.Service)
  );

  readonly componentFiles = computed(() =>
    this.#getFiles(ExampleFileTypes.Component, ExampleFileTypes.Html)
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
