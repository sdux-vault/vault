import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { VaultTapBehaviorCommonComponent } from 'apps/docs-app/app/docs/common/taps/tap-behaviors.component';
import { VaultTapCallbackShapeCommonComponent } from 'apps/docs-app/app/docs/common/taps/tap-callback-shape.component';
import { VaultTapFluentApiCommonComponent } from 'apps/docs-app/app/docs/common/taps/tap-fluent-api.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline afterTap documentation
 */
@Component({
  selector: 'sdux-pipeline-after-tap-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    MultiFrameworkExampleComponent,
    VaultTapCallbackShapeCommonComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    VaultTapBehaviorCommonComponent,
    VaultTapFluentApiCommonComponent
  ],
  templateUrl: './after-tap.pipeline.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineAfterTapBehaviorComponent {}
