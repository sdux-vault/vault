import { Component, ViewEncapsulation } from '@angular/core';
import {
  DiagramComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { VaultResolveBehaviorCommonComponent } from 'apps/docs-app/app/docs/common/resolve/resolve-behaviors.common.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline core from promise documentation
 */
@Component({
  selector: 'sdux-pipeline-core-from-promise-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    PipelineRelatedTopicComponent,
    MultiFrameworkExampleComponent,
    VaultResolveBehaviorCommonComponent
  ],
  templateUrl: './core-from-promise.pipeline.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineCoreFromPromiseBehaviorComponent {}
