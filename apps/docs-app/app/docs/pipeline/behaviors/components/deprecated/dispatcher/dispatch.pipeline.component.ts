import { Component, ViewEncapsulation } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline dispatch documentation
 */
@Component({
  selector: 'sdux-pipeline-dispatch-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    BrandNameComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    MatTabGroup,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    MatTab
  ],
  templateUrl: './dispatch.pipeline.component.html',
  styleUrls: ['../../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineDispatchBehaviorComponent {}
