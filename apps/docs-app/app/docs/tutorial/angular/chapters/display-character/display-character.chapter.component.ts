import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  PackageNameComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { StackblitzLanguageExampleComponent } from '../../../../stack-blitz/example/stackblitz-language-example/stackblitz-language-example.component';
import { StackblitzExampleService } from '../../../../stack-blitz/services/stackblitz-example.service';
import { ExampleFileService } from '../../../services/example-file.service';
import { ChapterStackBlitzShape } from '../../../shape/chapter-stackblitz.shape';
import { ExampleFileTypes } from '../../../types/example-file.type';
import { STAR_WARS_DISPLAY_CHARACTER } from '../../generated/display-character.generated';
import { INITIAL_APP_CONFIG } from '../../generated/initial-app-config.generated';
import { INITIAL_SERVICE } from '../../generated/initial-service.generated';

@Component({
  selector: 'sdux-display-character-chapter',
  standalone: true,
  imports: [
    RouterModule,
    PackageNameComponent,
    VaultBrandNameComponent,
    BrandNameComponent,
    FeatureCellBrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    StackblitzLanguageExampleComponent
  ],
  templateUrl: './display-character.chapter.component.html'
})
export class DisplayCharacterChapterComponent {
  readonly #stackblitzService = inject(StackblitzExampleService);
  readonly #exampleFileService = inject(ExampleFileService);
  readonly #characters = STAR_WARS_DISPLAY_CHARACTER;

  readonly displayCharacterSource = this.#characters;

  readonly stackblitz = computed<ChapterStackBlitzShape>(() => {
    const example = this.#stackblitzService.getExample('display-character')!;

    return {
      example,
      language: example.languages.find((lang) => lang.key === 'angular')!
    };
  });

  readonly mainSourceFile = computed(() =>
    this.#exampleFileService.getFile(this.#characters, ExampleFileTypes.Main)
  );

  readonly starWarsCharacterFile = computed(() =>
    this.#exampleFileService.getFile(this.#characters, ExampleFileTypes.Shape)
  );

  readonly registeredFeatureCellService = computed(() =>
    this.#exampleFileService.getFile(this.#characters, ExampleFileTypes.Service)
  );

  readonly initialServiceSource = computed(() => INITIAL_SERVICE);

  readonly initialAppConfigSource = computed(() => INITIAL_APP_CONFIG);

  readonly registeredAppConfigSource = computed(() => [
    this.#exampleFileService.getFile(
      this.#characters,
      ExampleFileTypes.AppConfig
    ),
    this.#exampleFileService.getFile(
      this.#characters,
      ExampleFileTypes.Constant
    )
  ]);

  readonly initialComponentAndHtmlFiles = computed(() => [
    this.#exampleFileService.getFile(
      this.#characters,
      ExampleFileTypes.Component
    ),
    this.#exampleFileService.getFile(this.#characters, ExampleFileTypes.Html),
    this.#exampleFileService.getFile(this.#characters, ExampleFileTypes.Scss),
    this.#exampleFileService.getFile(
      this.#characters,
      ExampleFileTypes.ComponentSpec
    )
  ]);
}
