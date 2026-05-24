import { Component, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { FeatureCellInsightsConfigCommonComponent } from 'apps/docs-app/app/docs/common/feature-cell/feature-cell-insights-config.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline provide vault documentation
 */
@Component({
  selector: 'sdux-pipeline-provide-feature-cell',
  standalone: true,
  imports: [
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    BrandNameComponent,
    PipelineRelatedTopicComponent,
    MatTabsModule,
    FeatureCellInsightsConfigCommonComponent
  ],
  templateUrl: './provide-feature-cell.api.component.html',
  styleUrls: ['../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineProvideFeatureCellComponent {}
