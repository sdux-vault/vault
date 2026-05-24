import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent
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
  selector: 'sdux-pipeline-core-error-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    BrandNameComponent,
    StateSnapshotShapeCommonComponent,
    VaultErrorShapeCommonComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    VaultErrorCallbackFluentApiCommonComponent,
    ErrorHandlingOrderCommonComponent,
    ErrorConsumptionMechanismCommonComponent,
    VaultErrorBehaviorCommonComponent,
    VaultErrorCallbackShapeCommonComponent
  ],
  templateUrl: './with-core-error.behavior.component.html',
  styleUrls: ['../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineCoreErrorBehaviorComponent {}
