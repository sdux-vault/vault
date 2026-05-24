import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { FeatureCellInsightsConfigCommonComponent } from 'apps/docs-app/app/docs/common/feature-cell/feature-cell-insights-config.component';
import { VaultFeatureCellShapeCommonComponent } from 'apps/docs-app/app/docs/common/feature-cell/feature-cell-shape.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

@Component({
  selector: 'sdux-pipeline-cell-builder-api',
  standalone: true,
  imports: [
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    BrandNameComponent,
    PipelineRelatedTopicComponent,
    VaultFeatureCellShapeCommonComponent,
    FeatureCellInsightsConfigCommonComponent
  ],
  templateUrl: './cell-builder.api.component.html',
  styleUrls: ['../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineCellBuilderComponent {}
