import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  MultiFrameworkExampleComponent
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
    MultiFrameworkExampleComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    DiagramComponent,
    StateEmitCallbackCommonComponent
  ],
  templateUrl: './emit-states.method.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineEmitStatesMethodComponent {}
