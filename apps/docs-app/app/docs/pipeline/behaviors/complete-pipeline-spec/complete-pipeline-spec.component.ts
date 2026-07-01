import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent,
  SDuXVideoComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

@Component({
  selector: 'sdux-full-pipeline-spec',
  standalone: true,
  imports: [
    RouterModule,
    DiagramComponent,
    BrandNameComponent,
    PipelineRelatedTopicComponent,
    SDuXVideoComponent
  ],
  templateUrl: './complete-pipeline-spec.component.html',
  styleUrls: ['../../../scss/example.scss']
})
export class CompletePipelineSpecComponent {}
