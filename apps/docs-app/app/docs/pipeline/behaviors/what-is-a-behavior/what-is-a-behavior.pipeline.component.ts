import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from '../../../related-topic/related-topic.component';

/**
 * The pipeline what is a behavior documentation
 */
@Component({
  selector: 'sdux-pipeline-what-is-a-behavior',
  standalone: true,
  imports: [
    BrandNameComponent,
    DiagramComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    PackageNameComponent,
    PipelineRelatedTopicComponent
  ],
  templateUrl: 'what-is-a-behavior.pipeline.component.html',
  styleUrls: ['../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineWhatIsABehaviorComponent {}
