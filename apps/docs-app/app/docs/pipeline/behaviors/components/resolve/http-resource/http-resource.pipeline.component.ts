import { Component, ViewEncapsulation } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import {
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';
import { VaultResolveBehaviorCommonComponent } from 'apps/docs-app/app/docs/common/resolve/resolve-behaviors.common.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline http resource behavior documentation
 */
@Component({
  selector: 'sdux-pipeline-http-resource-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    PipelineRelatedTopicComponent,
    MatTab,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    MatTabGroup,
    VaultResolveBehaviorCommonComponent,
    PackageNameComponent
  ],
  templateUrl: './http-resource.pipeline.component.html',
  styleUrls: ['../../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineHttpResourceBehaviorComponent {}
