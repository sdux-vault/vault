import { Component, inject, ViewEncapsulation } from '@angular/core';
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
import { TutorialNavigationDirective } from '../directive/tutorial-navigation.directive';
import { STAR_WARS_CHARACTER_STATE } from '../examples/generated/star-wars-character-state.generated';
import { TutorialStepShape } from '../shape/tutorial-step.shape';
import { STAR_WARS_COMPLETE_CHARACTER_MANAGEMENT } from './generated/complete-character-management.generated';
import { INITIAL_APP_CONFIG } from './generated/initial-app-config.generated';
import { INITIAL_SERVICE } from './generated/initial-service.generated';
import { REGISTERED_APP_CONFIG } from './generated/registered-app-config.generated';

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
    VaultBrandNameComponent
  ],
  templateUrl: './tutorial.angular.component.html',
  styleUrls: ['../../scss/documentation.scss', '../tutorial.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TutorialAngularComponent extends TutorialNavigationDirective {
  #brandName = inject(BrandNameService);

  protected readonly completeCharacterManagementSource =
    STAR_WARS_COMPLETE_CHARACTER_MANAGEMENT;
  protected readonly starWarsCharacterStateSource = STAR_WARS_CHARACTER_STATE;

  protected readonly initialServiceSource = INITIAL_SERVICE;

  protected readonly initialAppConfigSource = INITIAL_APP_CONFIG;

  protected readonly registeredAppConfigSource = REGISTERED_APP_CONFIG;

  readonly tutorialSteps: readonly TutorialStepShape[] = [
    { id: 1, label: 'Project Set-up' },
    { id: 2, label: `Install ${this.#brandName.value}` },
    { id: 3, label: 'Define Feature State' },
    { id: 4, label: 'Build the Service' },
    { id: 5, label: `Initialize the ${this.#brandName.vaultValue}` },
    { id: 6, label: `Register the ${this.#brandName.featureCellValue}` },
    { id: 7, label: `Connect the service to ${this.#brandName.value}` },
    { id: 8, label: `Final Service` }
  ];
}
