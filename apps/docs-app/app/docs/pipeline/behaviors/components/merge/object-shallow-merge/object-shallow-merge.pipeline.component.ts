import { Component, ViewEncapsulation } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import {
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { VaultMergeFluentApiCommonComponent } from 'apps/docs-app/app/docs/common/merge/merge-flient-api.component';
import { VaultObjectMergeCommonComponent } from 'apps/docs-app/app/docs/common/merge/object-merge-behaviors.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline object shallow merge documentation
 */
@Component({
  selector: 'sdux-pipeline-object-shallow-merge-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    PipelineRelatedTopicComponent,
    MatTab,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    VaultObjectMergeCommonComponent,
    VaultMergeFluentApiCommonComponent,
    MatTabGroup
  ],
  templateUrl: './object-shallow-merge.pipeline.component.html',
  styleUrls: ['../../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineObjectShallowMergeBehaviorComponent {}
