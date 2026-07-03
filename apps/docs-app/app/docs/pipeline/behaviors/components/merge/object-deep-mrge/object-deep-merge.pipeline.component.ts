import { Component, ViewEncapsulation } from '@angular/core';
import {
  DiagramComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { VaultMergeFluentApiCommonComponent } from 'apps/docs-app/app/docs/common/merge/merge-flient-api.component';
import { VaultObjectMergeCommonComponent } from 'apps/docs-app/app/docs/common/merge/object-merge-behaviors.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline object deep merge documentation
 */
@Component({
  selector: 'sdux-pipeline-object-deep-merge-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    PipelineRelatedTopicComponent,
    MultiFrameworkExampleComponent,
    VaultMergeFluentApiCommonComponent,
    VaultObjectMergeCommonComponent
  ],
  templateUrl: './object-deep-merge.pipeline.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineObjectDeepMergeBehaviorComponent {}
