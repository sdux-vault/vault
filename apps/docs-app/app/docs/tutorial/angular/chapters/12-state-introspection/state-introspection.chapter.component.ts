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
import { STAR_WARS_STATE_INTROSPECTION_FILES } from '../../generated/12-state-introspection.generated';

@Component({
  selector: 'sdux-state-introspection-chapter',
  standalone: true,
  imports: [
    RouterModule,
    FeatureCellBrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    StackblitzLanguageExampleComponent,
    SDuXDownloadComponent
  ],
  templateUrl: './state-introspection.chapter.component.html'
})
export class StateIntrospectionChapterComponent extends TutorialNavigationDirective {
  readonly #stackblitzService = inject(StackblitzExampleService);
  readonly #exampleFileService = inject(ExampleFileService);
  readonly #files = STAR_WARS_STATE_INTROSPECTION_FILES;
  readonly downloadUrl =
    '/assets/tutorial/sdux-12-state-introspection.tutorial.zip';

  readonly allSourceFiles = this.#files;

  readonly stackblitz = computed<ChapterStackBlitzShape>(() => {
    const example = this.#stackblitzService.getExample(
      'state-introspection-tutorial'
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
    this.#exampleFileService.getFile(
      this.#files,
      ExampleFileTypes.ComponentSpec
    )
  ]);

  readonly htmlFiles = computed(() => [
    this.#exampleFileService.getFile(this.#files, ExampleFileTypes.Html)
  ]);
}
