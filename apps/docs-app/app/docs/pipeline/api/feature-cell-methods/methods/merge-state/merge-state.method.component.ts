import { Component, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { StateInputTypeCommonComponent } from 'apps/docs-app/app/docs/common/state/state-input-type.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline merge-state method documentation
 */
@Component({
  selector: 'sdux-pipeline-merge-state-method',
  standalone: true,
  imports: [
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    DiagramComponent,
    MatTabsModule,
    StateInputTypeCommonComponent
  ],
  templateUrl: './merge-state.method.component.html',
  styleUrls: ['../../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineMergeStateMethodComponent {}
