import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent,
  MultiFrameworkExampleComponent
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
    MultiFrameworkExampleComponent
  ],
  templateUrl: './dispatch.pipeline.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineDispatchBehaviorComponent {}
