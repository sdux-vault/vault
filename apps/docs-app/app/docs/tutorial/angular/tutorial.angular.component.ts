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
import { TutorialGroupShape } from '../shape/tutorial-group.shape';
import { TutorialStepShape } from '../shape/tutorial-step.shape';
import { ExampleFileTypes } from '../types/example-file.type';
import { STAR_WARS_ADD_EDIT_CHARACTERS } from './generated/add-edit-characters.generated';
import { STAR_WARS_DISPLAY_CHARACTER } from './generated/display-character.generated';
import { STAR_WARS_DISPLAY_CHARACTERS } from './generated/display-characters.generated';
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

  readonly initialTutorialExample = computed<StackBlitzExampleShape>(
    () =>
      this.#stackblitzService.getExample('display-character') ??
      ({} as StackBlitzExampleShape)
  );

  readonly initialTutorialLang = computed<StackBlitzExampleLanguageShape>(
    () =>
      this.initialTutorialExample()?.languages?.find(
        (lang) => lang.key === 'angular'
      ) ?? ({} as StackBlitzExampleLanguageShape)
  );

  readonly dropdownTutorialExample = computed<StackBlitzExampleShape>(
    () =>
      this.#stackblitzService.getExample('display-characters') ??
      ({} as StackBlitzExampleShape)
  );

  readonly dropdownTutorialLang = computed<StackBlitzExampleLanguageShape>(
    () =>
      this.dropdownTutorialExample()?.languages?.find(
        (lang) => lang.key === 'angular'
      ) ?? ({} as StackBlitzExampleLanguageShape)
  );

  protected readonly displayCharacterSource = STAR_WARS_DISPLAY_CHARACTER;

  protected readonly displayCharactersSource = STAR_WARS_DISPLAY_CHARACTERS;

  protected readonly addEditCharactersSource = STAR_WARS_ADD_EDIT_CHARACTERS;

  protected readonly initialServiceSource = INITIAL_SERVICE;

  protected readonly initialAppConfigSource = INITIAL_APP_CONFIG;

  protected readonly registeredAppConfigSource = [
    this.#exampleFileService.getFile(
      this.displayCharacterSource,
      ExampleFileTypes.AppConfig
    ),
    this.#exampleFileService.getFile(
      this.displayCharacterSource,
      ExampleFileTypes.Constant
    )
  ];

  protected readonly mainSource = this.#exampleFileService.getFile(
    this.displayCharacterSource,
    ExampleFileTypes.Main
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

  protected readonly dropdownStepFiles = [
    this.#exampleFileService.getFile(
      this.displayCharactersSource,
      ExampleFileTypes.Component
    ),
    this.#exampleFileService.getFile(
      this.displayCharactersSource,
      ExampleFileTypes.Html
    ),
    this.#exampleFileService.getFile(
      this.displayCharactersSource,
      ExampleFileTypes.ComponentSpec
    )
  ];

  protected readonly addEditServiceFiles = [
    this.#exampleFileService.getFile(
      this.addEditCharactersSource,
      ExampleFileTypes.Service
    ),
    this.#exampleFileService.getFile(
      this.addEditCharactersSource,
      ExampleFileTypes.ServiceSpec
    ),
    this.#exampleFileService.getFile(
      this.addEditCharactersSource,
      ExampleFileTypes.CharacterDomain
    ),
    this.#exampleFileService.getFile(
      this.addEditCharactersSource,
      ExampleFileTypes.CharacterDomainSpec
    )
  ];

  protected readonly addEditComponentFiles = [
    this.#exampleFileService.getFile(
      this.addEditCharactersSource,
      ExampleFileTypes.Component
    ),
    this.#exampleFileService.getFile(
      this.addEditCharactersSource,
      ExampleFileTypes.ComponentSpec
    ),
    this.#exampleFileService.getFile(
      this.addEditCharactersSource,
      ExampleFileTypes.Html
    ),
    this.#exampleFileService.getFile(
      this.addEditCharactersSource,
      ExampleFileTypes.CharacterEditor
    ),
    this.#exampleFileService.getFile(
      this.addEditCharactersSource,
      ExampleFileTypes.CharacterEditorSpec
    )
  ];

  getStepId(groupIndex: number, stepIndex: number): number {
    const completedSteps = this.tutorialGroups
      .slice(0, groupIndex)
      .reduce((count, group) => count + group.steps.length, 0);

    return completedSteps + stepIndex + 1;
  }

  readonly tutorialGroups: readonly TutorialGroupShape[] = [
    {
      id: 1,
      label: 'Tutorial Steps',
      steps: [
        { id: 1, label: 'Project Set-up' },
        { id: 2, label: `Install ${this.#brandName.value}` },
        { id: 3, label: 'Define Feature State' },
        { id: 4, label: 'Build the Service' },
        { id: 5, label: `Initialize the ${this.#brandName.vaultValue}` },
        { id: 6, label: `Register the ${this.#brandName.featureCellValue}` },
        { id: 7, label: `Connect the service to ${this.#brandName.value}` },
        { id: 8, label: 'Display Character State' },
        { id: 9, label: 'Start the Application' },
        { id: 10, label: 'Complete Initial Tutorial' }
      ] satisfies TutorialStepShape[]
    },
    {
      id: 2,
      label: 'User-Directed Read Steps',
      steps: [
        { id: 1, label: 'Add a Dropdown' },
        { id: 2, label: 'Complete Dropdown Tutorial' }
      ] satisfies TutorialStepShape[]
    },
    {
      id: 3,
      label: 'Mutation Steps',
      steps: [
        { id: 1, label: 'Add/Edit Capabilities' },
        { id: 2, label: 'Complete Add/Edit Tutorial' }
      ] satisfies TutorialStepShape[]
    }
  ];
}
