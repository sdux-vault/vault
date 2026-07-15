import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  PackageNameComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline angular overview
 */
@Component({
  selector: 'sdux-pipeline-angular-overview-api',
  standalone: true,
  imports: [
    BrandNameComponent,
    FeatureCellBrandNameComponent,
    PackageNameComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    VaultBrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent
  ],
  templateUrl: './angular.api.component.html',
  styleUrls: ['../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineAngularApiOverviewComponent {}
