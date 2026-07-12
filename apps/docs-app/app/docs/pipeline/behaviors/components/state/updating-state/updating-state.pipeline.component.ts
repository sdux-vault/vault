import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent
} from '@sdux-vault/ui/web-components';
import { StateConsumptionMechanismCommonComponent } from 'apps/docs-app/app/docs/common/state/state-consumption-mechanism.component';
import { StateEmissionOrderCommonComponent } from 'apps/docs-app/app/docs/common/state/state-emission-order.component';
import { StateUpdateMechanismCommonComponent } from 'apps/docs-app/app/docs/common/state/state-update-mechanism.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { StackBlitzTryItLiveComponent } from 'apps/docs-app/app/docs/stack-blitz/try-it-live/stack-blitz-try-it-live.component';

/**
 * The pipeline updating state behavior documentation
 */
@Component({
  selector: 'sdux-pipeline-updating-state-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    StateEmissionOrderCommonComponent,
    StateConsumptionMechanismCommonComponent,
    BrandNameComponent,
    StateUpdateMechanismCommonComponent,
    StackBlitzTryItLiveComponent
  ],
  templateUrl: './updating-state.pipeline.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineUpdatingStateBehaviorComponent {}
