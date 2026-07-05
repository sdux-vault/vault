import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  MultiFrameworkExampleComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { FeatureCellDiagramCommonComponent } from '../../../common/feature-cell/feature-cell-diagram.component';

/**
 * The pipeline @<a href="/docs/references/functions/feature-cell">FeatureCell</a> documentation
 */
@Component({
  selector: 'sdux-pipeline-at-feature-cell-api',
  standalone: true,
  imports: [
    MultiFrameworkExampleComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    PackageNameComponent,
    FeatureCellDiagramCommonComponent
  ],
  templateUrl: './at-feature-cell.api.component.html',
  styleUrls: ['../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineAtFeatureCellComponent {}
