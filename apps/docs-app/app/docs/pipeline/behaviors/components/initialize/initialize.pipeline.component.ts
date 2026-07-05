import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  MultiFrameworkExampleComponent
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
    MultiFrameworkExampleComponent
  ],
  templateUrl: './initialize.pipeline.component.html',
  styleUrls: ['../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineInitializeBehaviorComponent extends PipelineRoutingDirective {}
