import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MultiFrameworkExampleComponent } from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline reset stream documentation
 */
@Component({
  selector: 'sdux-pipeline-reset-stream-method',
  standalone: true,
  imports: [
    MultiFrameworkExampleComponent,
    RouterModule,
    PipelineRelatedTopicComponent
  ],
  templateUrl: './reset-stream.method.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineResetStreamMethodComponent {}
