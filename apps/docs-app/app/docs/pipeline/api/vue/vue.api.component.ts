import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline vue overview
 */
@Component({
  selector: 'sdux-pipeline-vue-overview-api',
  standalone: true,
  imports: [
    BrandNameComponent,
    FeatureCellBrandNameComponent,
    PackageNameComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent
  ],
  templateUrl: './vue.api.component.html',
  styleUrls: ['../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineVueApiOverviewComponent {}
