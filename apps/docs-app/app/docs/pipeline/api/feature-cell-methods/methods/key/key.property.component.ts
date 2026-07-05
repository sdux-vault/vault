import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MultiFrameworkExampleComponent } from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline key property documentation
 */
@Component({
  selector: 'sdux-pipeline-key-property',
  standalone: true,
  imports: [
    RouterModule,
    PipelineRelatedTopicComponent,
    MultiFrameworkExampleComponent
  ],
  templateUrl: './key.property.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineKeyPropertyComponent {}
