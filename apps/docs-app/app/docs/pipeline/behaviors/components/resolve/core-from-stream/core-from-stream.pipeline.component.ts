import { Component, ViewEncapsulation } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import {
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { VaultResolveBehaviorCommonComponent } from 'apps/docs-app/app/docs/common/resolve/resolve-behaviors.common.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline core from stream documentation
 */
@Component({
  selector: 'sdux-pipeline-core-from-stream-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    PipelineRelatedTopicComponent,
    MatTab,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    MatTabGroup,
    VaultResolveBehaviorCommonComponent
  ],
  templateUrl: './core-from-stream.pipeline.component.html',
  styleUrls: ['../../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineCoreFromStreamBehaviorComponent {}
