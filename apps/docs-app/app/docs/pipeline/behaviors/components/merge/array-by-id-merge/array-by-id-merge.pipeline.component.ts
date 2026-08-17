import { Component, ViewEncapsulation } from '@angular/core';
import {
  DiagramComponent,
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { VaultMergeFluentApiCommonComponent } from 'apps/docs-app/app/docs/common/merge/merge-flient-api.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline array by ID merge documentation
 */
@Component({
  selector: 'sdux-pipeline-array-by-id-merge-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    FeatureCellBrandNameComponent,
    PipelineRelatedTopicComponent,
    VaultMergeFluentApiCommonComponent,
    MultiFrameworkExampleComponent
  ],
  templateUrl: './array-by-id-merge.pipeline.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineArrayByIdMergeBehaviorComponent {}
