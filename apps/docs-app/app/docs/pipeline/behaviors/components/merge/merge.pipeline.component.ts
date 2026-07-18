import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  DiagramComponent,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { VaultArrayMergeCommonComponent } from 'apps/docs-app/app/docs/common/merge/array-merge-behaviors.component';
import { VaultArrayMergeComparisonCommonComponent } from 'apps/docs-app/app/docs/common/merge/array-merge-comparison.component';
import { VaultMergeFluentApiCommonComponent } from 'apps/docs-app/app/docs/common/merge/merge-flient-api.component';
import { MergeInputMechanismCommonComponent } from 'apps/docs-app/app/docs/common/merge/merge-input-mechanism.common.component';
import { VaultObjectMergeCommonComponent } from 'apps/docs-app/app/docs/common/merge/object-merge-behaviors.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline merge documentation
 */
@Component({
  selector: 'sdux-pipeline-merge-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    PipelineRelatedTopicComponent,
    VaultArrayMergeCommonComponent,
    VaultMergeFluentApiCommonComponent,
    VaultObjectMergeCommonComponent,
    BrandNameComponent,
    FeatureCellBrandNameComponent,
    MergeInputMechanismCommonComponent,
    VaultArrayMergeComparisonCommonComponent
  ],
  templateUrl: './merge.pipeline.component.html',
  styleUrls: ['../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineMergeBehaviorComponent {}
