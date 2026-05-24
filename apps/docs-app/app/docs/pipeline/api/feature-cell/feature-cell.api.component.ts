import { Component, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { FeatureCellInsightsConfigCommonComponent } from 'apps/docs-app/app/docs/common/feature-cell/feature-cell-insights-config.component';
import { VaultFeatureCellShapeCommonComponent } from 'apps/docs-app/app/docs/common/feature-cell/feature-cell-shape.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline feature celldocumentation
 */
@Component({
  selector: 'sdux-pipeline-feature-cell',
  standalone: true,
  imports: [
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    BrandNameComponent,
    PipelineRelatedTopicComponent,
    VaultFeatureCellShapeCommonComponent,
    MatTabsModule,
    FeatureCellInsightsConfigCommonComponent
  ],
  templateUrl: './feature-cell.api.component.html',
  styleUrls: ['../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineFeatureCellComponent {}
