import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  DiagramComponent,
  SDuXVideoComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from '../related-topic/related-topic.component';

/**
 * The pipeline splashpage documentation
 */
@Component({
  selector: 'sdux-pipeline-splashpage',
  standalone: true,
  imports: [
    DiagramComponent,
    BrandNameComponent,
    SDuXVideoComponent,
    PipelineRelatedTopicComponent
  ],
  templateUrl: 'pipeline.splashpage.component.html',
  styleUrls: ['../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineSplashpageComponent {}
