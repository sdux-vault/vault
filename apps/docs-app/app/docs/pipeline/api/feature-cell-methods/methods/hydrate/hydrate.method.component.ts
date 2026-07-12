import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { StackBlitzTryItLiveComponent } from 'apps/docs-app/app/docs/stack-blitz/try-it-live/stack-blitz-try-it-live.component';

/**
 * The pipeline hydrate method documentation
 */
@Component({
  selector: 'sdux-pipeline-hydrate-method',
  standalone: true,
  imports: [
    MultiFrameworkExampleComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    DiagramComponent,
    StackBlitzTryItLiveComponent
  ],
  templateUrl: './hydrate.method.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineHydrateMethodComponent {}
