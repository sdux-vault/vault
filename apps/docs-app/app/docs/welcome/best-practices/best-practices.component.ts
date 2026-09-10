import { Component, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
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
import { MergeInputMechanismCommonComponent } from '../../common/merge/merge-input-mechanism.common.component';
import { PipelineRoutingDirective } from '../../pipeline/directives/pipeline-routing.directive';

/**
 * The best practices the pipeline documentation
 */
@Component({
  selector: 'sdux-best-practices',
  standalone: true,
  imports: [
    RouterModule,
    PipelineRelatedTopicComponent,
    MatTabsModule,
    BrandNameComponent,
    FeatureCellBrandNameComponent,
    VaultBrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    MergeInputMechanismCommonComponent,
    PackageNameComponent
  ],
  templateUrl: './best-practices.component.html',
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SDuXBestPracticesComponent extends PipelineRoutingDirective {}
