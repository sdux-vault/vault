import { Component, ViewEncapsulation } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { VaultErrorBehaviorCommonComponent } from 'apps/docs-app/app/docs/common/error/error-behaviors.component';
import { VaultErrorCallbackFluentApiCommonComponent } from 'apps/docs-app/app/docs/common/error/error-callback-fluent-api.component';
import { VaultErrorCallbackShapeCommonComponent } from 'apps/docs-app/app/docs/common/error/error-callback-shape.component';
import { ErrorConsumptionMechanismCommonComponent } from 'apps/docs-app/app/docs/common/error/error-consumption-mechanism.component';
import { ErrorHandlingOrderCommonComponent } from 'apps/docs-app/app/docs/common/error/error-emission-order.component';
import { VaultErrorShapeCommonComponent } from 'apps/docs-app/app/docs/common/error/error-shape.component';
import { StateSnapshotShapeCommonComponent } from 'apps/docs-app/app/docs/common/state/state-snapshot-shape.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline error behavior documentation
 */
@Component({
  selector: 'sdux-pipeline-with-core-error-callback-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    StateSnapshotShapeCommonComponent,
    VaultErrorShapeCommonComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    VaultErrorCallbackFluentApiCommonComponent,
    VaultErrorCallbackShapeCommonComponent,
    MatTab,
    MatTabGroup,
    ErrorHandlingOrderCommonComponent,
    ErrorConsumptionMechanismCommonComponent,
    VaultErrorBehaviorCommonComponent
  ],
  templateUrl: './with-core-error-callback.component.html',
  styleUrls: ['../../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineCoreErrorCallbackBehaviorComponent {}
