import { Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  BrandNameService,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  PackageNameComponent,
  SDuXVideoComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { StackblitzLanguageExampleComponent } from '../../stack-blitz/example/stackblitz-language-example/stackblitz-language-example.component';
import { StackblitzExampleService } from '../../stack-blitz/services/stackblitz-example.service';
import { StackBlitzExampleLanguageShape } from '../../stack-blitz/shapes/stackblitz-example.language.shape';
import { StackBlitzExampleShape } from '../../stack-blitz/shapes/stackblitz-example.shape';
import { TutorialNavigationDirective } from '../directive/tutorial-navigation.directive';
import { ExampleFileService } from '../services/example-file.service';
import { TutorialStepShape } from '../shape/tutorial-step.shape';
import { ExampleFileTypes } from '../types/example-file.type';
import { STAR_WARS_DISPLAY_CHARACTER } from './generated/display-character.generated';
import { INITIAL_APP_CONFIG } from './generated/initial-app-config.generated';
import { INITIAL_SERVICE } from './generated/initial-service.generated';

@Component({
  selector: 'sdux-angular-tutorial',
  standalone: true,
  imports: [
    RouterModule,
    BrandNameComponent,
    PipelineRelatedTopicComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    SDuXVideoComponent,
    PackageNameComponent,
    FeatureCellBrandNameComponent,
    VaultBrandNameComponent,
    StackblitzLanguageExampleComponent
  ],
  templateUrl: './tutorial.angular.component.html',
  styleUrls: ['../../scss/documentation.scss', '../tutorial.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TutorialAngularComponent extends TutorialNavigationDirective {
  #brandName = inject(BrandNameService);
  #exampleFileService = inject(ExampleFileService);

  readonly #stackblitzService = inject(StackblitzExampleService);

  readonly example = computed<StackBlitzExampleShape>(
    () =>
      this.#stackblitzService.getExample('display-character') ??
      ({} as StackBlitzExampleShape)
  );

  readonly lang = computed<StackBlitzExampleLanguageShape>(
    () =>
      this.example()?.languages?.find((lang) => lang.key === 'angular') ??
      ({} as StackBlitzExampleLanguageShape)
  );

  protected readonly displayCharacterSource = STAR_WARS_DISPLAY_CHARACTER;

  protected readonly initialServiceSource = INITIAL_SERVICE;

  protected readonly initialAppConfigSource = INITIAL_APP_CONFIG;

  protected readonly registeredAppConfigSource =
    this.#exampleFileService.getFile(
      this.displayCharacterSource,
      ExampleFileTypes.AppConfig
    );

  protected readonly starWarsCharacterStateSource =
    this.#exampleFileService.getFile(
      this.displayCharacterSource,
      ExampleFileTypes.Shape
    );

  protected readonly registeredFeatureCellService =
    this.#exampleFileService.getFile(
      this.displayCharacterSource,
      ExampleFileTypes.Service
    );

  protected readonly initialComponentAndHtmlFiles = [
    this.#exampleFileService.getFile(
      this.displayCharacterSource,
      ExampleFileTypes.Component
    ),
    this.#exampleFileService.getFile(
      this.displayCharacterSource,
      ExampleFileTypes.Html
    ),
    this.#exampleFileService.getFile(
      this.displayCharacterSource,
      ExampleFileTypes.Scss
    )
  ];

  readonly tutorialSteps: readonly TutorialStepShape[] = [
    { id: 1, label: 'Project Set-up' },
    { id: 2, label: `Install ${this.#brandName.value}` },
    { id: 3, label: 'Define Feature State' },
    { id: 4, label: 'Build the Service' },
    { id: 5, label: `Initialize the ${this.#brandName.vaultValue}` },
    { id: 6, label: `Register the ${this.#brandName.featureCellValue}` },
    { id: 7, label: `Connect the service to ${this.#brandName.value}` },
    { id: 8, label: 'Display Character State' },
    { id: 9, label: 'Complete Initial Tutorial' }
  ];
}
