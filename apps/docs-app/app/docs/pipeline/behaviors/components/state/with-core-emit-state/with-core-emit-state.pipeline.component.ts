import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { VaultStateBehaviorCommonComponent } from 'apps/docs-app/app/docs/common/state/state-behaviors.component';
import { StateCallbackFluentApiCommonComponent } from 'apps/docs-app/app/docs/common/state/state-callback-fluent-api.component';
import { StateConsumptionMechanismCommonComponent } from 'apps/docs-app/app/docs/common/state/state-consumption-mechanism.component';
import { StateEmissionOrderCommonComponent } from 'apps/docs-app/app/docs/common/state/state-emission-order.component';
import { StateEmitCallbackCommonComponent } from 'apps/docs-app/app/docs/common/state/state-emit-callback.component';
import { StateSnapshotShapeCommonComponent } from 'apps/docs-app/app/docs/common/state/state-snapshot-shape.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline core state callback behavior documentation
 */
@Component({
  selector: 'sdux-pipeline-with-core-emit-state-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    StateSnapshotShapeCommonComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    VaultStateBehaviorCommonComponent,
    StateEmitCallbackCommonComponent,
    StateCallbackFluentApiCommonComponent,
    MultiFrameworkExampleComponent,
    StateEmissionOrderCommonComponent,
    StateConsumptionMechanismCommonComponent
  ],
  templateUrl: './with-core-emit-state.pipeline.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineCoreEmitStateBehaviorComponent {}
