import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent,
  MultiFrameworkExampleComponent,
  SDuXVideoComponent
} from '@sdux-vault/ui/web-components';
import { StateConsumptionMechanismCommonComponent } from 'apps/docs-app/app/docs/common/state/state-consumption-mechanism.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline selectors documentation
 */
@Component({
  selector: 'sdux-pipeline-selectors-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    BrandNameComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    StateConsumptionMechanismCommonComponent,
    MultiFrameworkExampleComponent,
    SDuXVideoComponent
  ],
  templateUrl: './selectors.pipeline.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineSelectorsBehaviorComponent {}
