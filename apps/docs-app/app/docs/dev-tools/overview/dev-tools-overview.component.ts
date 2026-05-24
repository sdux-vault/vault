import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The dev-tools-overview documentation
 */
@Component({
  selector: 'sdux-dev-tools-overview',
  standalone: true,
  imports: [
    PipelineRelatedTopicComponent,
    BrandNameComponent,
    FeatureCellBrandNameComponent,
    RouterModule
  ],
  templateUrl: './dev-tools-overview.component.html',
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DevToolsOverviewComponent {}
