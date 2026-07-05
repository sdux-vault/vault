import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { VaultTapCallbackShapeCommonComponent } from 'apps/docs-app/app/docs/common/taps/tap-callback-shape.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

@Component({
  selector: 'sdux-pipeline-before-taps-method',
  standalone: true,
  imports: [
    MultiFrameworkExampleComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    DiagramComponent,
    VaultTapCallbackShapeCommonComponent
  ],
  templateUrl: './before-taps.method.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineBeforeTapsMethodComponent {}
