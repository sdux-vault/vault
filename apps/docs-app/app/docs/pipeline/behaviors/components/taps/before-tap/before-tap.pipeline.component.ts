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
 * The pipeline beforeTap documentation
 */
@Component({
  selector: 'sdux-pipeline-before-tap-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    MultiFrameworkExampleComponent,
    RouterModule,
    VaultTapCallbackShapeCommonComponent,
    PipelineRelatedTopicComponent,
    VaultTapBehaviorCommonComponent,
    VaultTapFluentApiCommonComponent
  ],
  templateUrl: './before-tap.pipeline.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineBeforeTapBehaviorComponent {}
