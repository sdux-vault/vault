import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline what is a controller documentation
 */
@Component({
  selector: 'sdux-pipeline-what-is-a-controller',
  standalone: true,
  imports: [
    BrandNameComponent,
    DiagramComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    PackageNameComponent
  ],
  templateUrl: 'what-is-a-controller.pipeline.component.html',
  styleUrls: ['../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineWhatIsAControllerComponent {}
