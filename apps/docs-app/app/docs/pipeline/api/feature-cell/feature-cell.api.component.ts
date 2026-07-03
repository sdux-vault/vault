import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  GenericTabComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { FeatureCellInsightsConfigCommonComponent } from 'apps/docs-app/app/docs/common/feature-cell/feature-cell-insights-config.component';
import { VaultFeatureCellShapeCommonComponent } from 'apps/docs-app/app/docs/common/feature-cell/feature-cell-shape.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { FeatureCellDiagramCommonComponent } from '../../../common/feature-cell/feature-cell-diagram.component';

/**
 * The pipeline feature celldocumentation
 */
@Component({
  selector: 'sdux-pipeline-feature-cell',
  standalone: true,
  imports: [
    MultiFrameworkExampleComponent,
    GenericTabComponent,
    RouterModule,
    BrandNameComponent,
    PipelineRelatedTopicComponent,
    VaultFeatureCellShapeCommonComponent,
    FeatureCellInsightsConfigCommonComponent,
    FeatureCellDiagramCommonComponent
  ],
  templateUrl: './feature-cell.api.component.html',
  styleUrls: ['../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineFeatureCellComponent {}
