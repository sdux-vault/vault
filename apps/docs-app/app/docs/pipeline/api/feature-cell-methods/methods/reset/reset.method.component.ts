import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MultiFrameworkExampleComponent } from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline reset documentation
 */
@Component({
  selector: 'sdux-pipeline-reset-method',
  standalone: true,
  imports: [
    MultiFrameworkExampleComponent,
    RouterModule,
    PipelineRelatedTopicComponent
  ],
  templateUrl: './reset.method.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineResetMethodComponent {}
