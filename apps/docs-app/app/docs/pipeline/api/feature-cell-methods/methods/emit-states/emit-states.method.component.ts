import { Component, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { StateEmitCallbackCommonComponent } from 'apps/docs-app/app/docs/common/state/state-emit-callback.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline emit-states method documentation
 */
@Component({
  selector: 'sdux-pipeline-emit-states-method',
  standalone: true,
  imports: [
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    DiagramComponent,
    MatTabsModule,
    StateEmitCallbackCommonComponent
  ],
  templateUrl: './emit-states.method.component.html',
  styleUrls: ['../../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineEmitStatesMethodComponent {}
