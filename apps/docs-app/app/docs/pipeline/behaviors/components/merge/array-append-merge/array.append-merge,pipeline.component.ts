import { Component, ViewEncapsulation } from '@angular/core';
import {
  DiagramComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { VaultArrayMergeCommonComponent } from 'apps/docs-app/app/docs/common/merge/array-merge-behaviors.component';
import { VaultMergeFluentApiCommonComponent } from 'apps/docs-app/app/docs/common/merge/merge-flient-api.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline array append merge documentation
 */
@Component({
  selector: 'sdux-pipeline-array-append-merge-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    PipelineRelatedTopicComponent,
    VaultArrayMergeCommonComponent,
    VaultMergeFluentApiCommonComponent,
    MultiFrameworkExampleComponent
  ],
  templateUrl: './array-append-merge.pipeline.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineArrayAppendMergeBehaviorComponent {}
