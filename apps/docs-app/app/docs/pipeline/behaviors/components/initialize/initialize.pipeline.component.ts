import { Component, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { PipelineRoutingDirective } from '../../../directives/pipeline-routing.directive';

@Component({
  selector: 'sdux-pipeline-initialize-behavior',
  standalone: true,
  imports: [
    RouterModule,
    DiagramComponent,
    PipelineRelatedTopicComponent,
    MatTabsModule,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent
  ],
  templateUrl: './initialize.pipeline.component.html',
  styleUrls: ['../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineInitializeBehaviorComponent extends PipelineRoutingDirective {}
