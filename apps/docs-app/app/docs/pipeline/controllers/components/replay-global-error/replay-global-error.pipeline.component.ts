import { Component, ViewEncapsulation } from '@angular/core';
import {
  DiagramComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { VaultControllerReplayGlobalErrorCommonComponent } from 'apps/docs-app/app/docs/common/controller/controller-replay-global-error.common.component';
import { VaultErrorShapeCommonComponent } from 'apps/docs-app/app/docs/common/error/error-shape.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline replay global error controller documentation
 */
@Component({
  selector: 'sdux-pipeline-replay-global-error-controller',
  standalone: true,
  imports: [
    DiagramComponent,
    MultiFrameworkExampleComponent,
    PipelineRelatedTopicComponent,
    VaultErrorShapeCommonComponent,
    VaultControllerReplayGlobalErrorCommonComponent
  ],
  templateUrl: './replay-global-error.pipeline.component.html',
  styleUrls: ['../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineReplayGlobalErrorControllerComponent {}
