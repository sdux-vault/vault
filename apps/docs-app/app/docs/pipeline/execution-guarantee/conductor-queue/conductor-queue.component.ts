import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent,
  FeatureCellBrandNameComponent,
  SDuXVideoComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { PipelineRoutingDirective } from '../../directives/pipeline-routing.directive';

@Component({
  selector: 'sdux-conductor-queue',
  standalone: true,
  imports: [
    RouterModule,
    BrandNameComponent,
    DiagramComponent,
    FeatureCellBrandNameComponent,
    PipelineRelatedTopicComponent,
    SDuXVideoComponent
  ],
  templateUrl: './conductor-queue.component.html',
  styleUrls: ['../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConductorQueueComponent extends PipelineRoutingDirective {}
