import { Component, ViewEncapsulation } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import {
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { VaultArrayMergeCommonComponent } from 'apps/docs-app/app/docs/common/merge/array-merge-behaviors.component';
import { VaultMergeFluentApiCommonComponent } from 'apps/docs-app/app/docs/common/merge/merge-flient-api.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline array push-merge documentation
 */
@Component({
  selector: 'sdux-pipeline-array-push-merge-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    PipelineRelatedTopicComponent,
    VaultArrayMergeCommonComponent,
    VaultMergeFluentApiCommonComponent,
    MatTabGroup,
    MatTab,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent
  ],
  templateUrl: './array-push-merge.pipeline.component.html',
  styleUrls: ['../../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineArrayPushMergeBehaviorComponent {}
