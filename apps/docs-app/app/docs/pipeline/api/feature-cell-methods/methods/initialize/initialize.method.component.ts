import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline initialize method documentation
 */
@Component({
  selector: 'sdux-pipeline-initialize-method',
  standalone: true,
  imports: [
    MultiFrameworkExampleComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    DiagramComponent
  ],
  templateUrl: './initialize.method.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineInitializeMethodComponent {}
