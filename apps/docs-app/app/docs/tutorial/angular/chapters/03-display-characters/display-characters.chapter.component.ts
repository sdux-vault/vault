import { Component, computed, inject } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
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
import { STAR_WARS_DISPLAY_CHARACTERS_FILES } from '../../generated/03-display-characters.generated';

@Component({
  selector: 'sdux-display-characters-chapter',
  standalone: true,
  imports: [
    RouterModule,
    BrandNameComponent,
    FeatureCellBrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    StackblitzLanguageExampleComponent,
    SDuXDownloadComponent,
    MatTooltipModule
  ],
  templateUrl: './display-characters.chapter.component.html'
})
export class DisplayCharactersChapterComponent extends TutorialNavigationDirective {
  readonly #stackblitzService = inject(StackblitzExampleService);
  readonly #exampleFileService = inject(ExampleFileService);
  readonly #files = STAR_WARS_DISPLAY_CHARACTERS_FILES;
  readonly downloadUrl =
    '/assets/tutorial/sdux-03-display-characters.tutorial.zip';

  readonly allSourceFiles = this.#files;

  readonly stackblitz = computed<ChapterStackBlitzShape>(() => {
    const example = this.#stackblitzService.getExample('display-characters')!;

    return {
      example,
      language: example.languages.find((lang) => lang.key === 'angular')!
    };
  });

  readonly files = computed(() => [
    this.#exampleFileService.getFile(this.#files, ExampleFileTypes.Component),
    this.#exampleFileService.getFile(this.#files, ExampleFileTypes.Html),
    this.#exampleFileService.getFile(
      this.#files,
      ExampleFileTypes.ComponentSpec
    )
  ]);
}
