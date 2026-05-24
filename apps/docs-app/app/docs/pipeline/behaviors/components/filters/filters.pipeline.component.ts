import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { VaultFilterFunctionShapeCommonComponent } from 'apps/docs-app/app/docs/common/filter-function-shape.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline filters documentation
 */
@Component({
  selector: 'sdux-pipeline-filters-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    VaultFilterFunctionShapeCommonComponent,
    PipelineRelatedTopicComponent
  ],
  templateUrl: './filters.pipeline.component.html',
  styleUrls: ['../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineFiltersBehaviorComponent {}
