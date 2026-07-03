import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  GenericTabComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from '../../related-topic/related-topic.component';

@Component({
  selector: 'sdux-dev-tools-event-bus',
  standalone: true,
  imports: [
    PipelineRelatedTopicComponent,
    BrandNameComponent,
    RouterModule,
    MultiFrameworkExampleComponent,
    GenericTabComponent,
    FeatureCellBrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent
  ],
  templateUrl: './event-bus.component.html',
  styleUrls: ['../../scss/documentation.scss']
})
export class SDuXDevToolsEventBusComponent {}
