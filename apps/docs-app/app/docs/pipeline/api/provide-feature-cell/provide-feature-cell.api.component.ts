import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { FeatureCellInsightsConfigCommonComponent } from 'apps/docs-app/app/docs/common/feature-cell/feature-cell-insights-config.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { FeatureCellDiagramCommonComponent } from '../../../common/feature-cell/feature-cell-diagram.component';

/**
 * The pipeline provide vault documentation
 */
@Component({
  selector: 'sdux-pipeline-provide-feature-cell',
  standalone: true,
  imports: [
    MultiFrameworkExampleComponent,
    RouterModule,
    BrandNameComponent,
    PipelineRelatedTopicComponent,
    FeatureCellInsightsConfigCommonComponent,
    FeatureCellDiagramCommonComponent
  ],
  templateUrl: './provide-feature-cell.api.component.html',
  styleUrls: ['../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineProvideFeatureCellComponent {}
