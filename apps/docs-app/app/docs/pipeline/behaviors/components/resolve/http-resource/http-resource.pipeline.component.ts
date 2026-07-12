import { Component, ViewEncapsulation } from '@angular/core';
import {
  DiagramComponent,
  MultiFrameworkExampleComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';
import { VaultResolveBehaviorCommonComponent } from 'apps/docs-app/app/docs/common/resolve/resolve-behaviors.common.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { StackBlitzTryItLiveComponent } from 'apps/docs-app/app/docs/stack-blitz/try-it-live/stack-blitz-try-it-live.component';

/**
 * The pipeline http resource behavior documentation
 */
@Component({
  selector: 'sdux-pipeline-http-resource-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    PipelineRelatedTopicComponent,
    MultiFrameworkExampleComponent,
    VaultResolveBehaviorCommonComponent,
    PackageNameComponent,
    StackBlitzTryItLiveComponent
  ],
  templateUrl: './http-resource.pipeline.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineHttpResourceBehaviorComponent {}
