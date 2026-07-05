import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { VaultTapCallbackShapeCommonComponent } from 'apps/docs-app/app/docs/common/taps/tap-callback-shape.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline provide vault documentation
 */
@Component({
  selector: 'sdux-pipeline-after-taps-method',
  standalone: true,
  imports: [
    MultiFrameworkExampleComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    DiagramComponent,
    VaultTapCallbackShapeCommonComponent
  ],
  templateUrl: './after-taps.method.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineAfterTapsMethodComponent {}
