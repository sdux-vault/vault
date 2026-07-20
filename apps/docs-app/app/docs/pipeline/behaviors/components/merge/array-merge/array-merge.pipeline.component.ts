import { Component, ViewEncapsulation } from '@angular/core';
import {
  DiagramComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { VaultArrayMergeCommonComponent } from 'apps/docs-app/app/docs/common/merge/array-merge-behaviors.component';
import { VaultMergeFluentApiCommonComponent } from 'apps/docs-app/app/docs/common/merge/merge-flient-api.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { VaultArrayMergeComparisonCommonComponent } from '../../../../../common/merge/array-merge-comparison.component';

/**
 * The pipeline array merge documentation
 */
@Component({
  selector: 'sdux-pipeline-array-merge-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    PipelineRelatedTopicComponent,
    MultiFrameworkExampleComponent,
    VaultArrayMergeCommonComponent,
    VaultMergeFluentApiCommonComponent,
    VaultArrayMergeComparisonCommonComponent
  ],
  templateUrl: './array-merge.pipeline.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineArrayMergeBehaviorComponent {}
