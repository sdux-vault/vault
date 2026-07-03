import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline reducers documentation
 */
@Component({
  selector: 'sdux-pipeline-reducers-behavior',
  standalone: true,
  imports: [
    MultiFrameworkExampleComponent,
    DiagramComponent,
    PipelineRelatedTopicComponent,
    RouterModule
  ],
  templateUrl: './reducers.pipeline.component.html',
  styleUrls: ['../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineReducersBehaviorComponent {}
