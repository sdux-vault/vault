import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { VaultErrorBehaviorCommonComponent } from 'apps/docs-app/app/docs/common/error/error-behaviors.component';
import { ErrorHandlingOrderCommonComponent } from 'apps/docs-app/app/docs/common/error/error-emission-order.component';
import { VaultErrorShapeCommonComponent } from 'apps/docs-app/app/docs/common/error/error-shape.component';
import { StateSnapshotShapeCommonComponent } from 'apps/docs-app/app/docs/common/state/state-snapshot-shape.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline error behavior documentation
 */
@Component({
  selector: 'sdux-pipeline-with-error-transform-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    MultiFrameworkExampleComponent,
    StateSnapshotShapeCommonComponent,
    VaultErrorShapeCommonComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    ErrorHandlingOrderCommonComponent,
    VaultErrorBehaviorCommonComponent
  ],
  templateUrl: './with-error-transform.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineErrorTransformBehaviorComponent {}
