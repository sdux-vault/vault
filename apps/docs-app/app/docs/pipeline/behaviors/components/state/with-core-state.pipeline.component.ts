import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DiagramComponent } from '@sdux-vault/ui/web-components';
import { VaultStateBehaviorCommonComponent } from 'apps/docs-app/app/docs/common/state/state-behaviors.component';
import { StateConsumptionMechanismCommonComponent } from 'apps/docs-app/app/docs/common/state/state-consumption-mechanism.component';
import { StateEmissionOrderCommonComponent } from 'apps/docs-app/app/docs/common/state/state-emission-order.component';
import { StateUpdateMechanismCommonComponent } from 'apps/docs-app/app/docs/common/state/state-update-mechanism.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { StackBlitzTryItLiveComponent } from '../../../../stack-blitz/try-it-live/stack-blitz-try-it-live.component';

/**
 * The pipeline core state behavior documentation
 */
@Component({
  selector: 'sdux-pipeline-core-state-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    VaultStateBehaviorCommonComponent,
    StateEmissionOrderCommonComponent,
    StateConsumptionMechanismCommonComponent,
    StateUpdateMechanismCommonComponent,
    StackBlitzTryItLiveComponent
  ],
  templateUrl: './with-core-state.pipeline.component.html',
  styleUrls: ['../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineCoreStateBehaviorComponent {}
