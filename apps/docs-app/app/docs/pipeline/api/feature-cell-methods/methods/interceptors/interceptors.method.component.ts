import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline interceptors method documentation
 */
@Component({
  selector: 'sdux-pipeline-interceptors-method',
  standalone: true,
  imports: [
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    DiagramComponent
  ],
  templateUrl: './interceptors.method.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineInterceptorsMethodComponent {}
