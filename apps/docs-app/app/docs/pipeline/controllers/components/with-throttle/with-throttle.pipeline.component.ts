import { Component, ViewEncapsulation } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { VaultControllerThrottleFluentApiCommonComponent } from 'apps/docs-app/app/docs/common/controller/controller-throttle-fluent-api.component';
import { VaultControllerThrottleCommonComponent } from 'apps/docs-app/app/docs/common/controller/controller-throttle.common.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

@Component({
  selector: 'sdux-pipeline-with-throttle-controller',
  standalone: true,
  imports: [
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    DiagramComponent,
    PipelineRelatedTopicComponent,
    VaultControllerThrottleFluentApiCommonComponent,
    MatTabGroup,
    MatTab,
    VaultControllerThrottleCommonComponent
  ],
  templateUrl: './with-throttle.pipeline.component.html',
  styleUrls: ['../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineWithThrottleControllerComponent {}
