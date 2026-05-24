import { Component, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { VaultControllerDelayFluentApiCommonComponent } from 'apps/docs-app/app/docs/common/controller/controller-delay-fluent-api.component';
import { VaultControllerDelayCommonComponent } from 'apps/docs-app/app/docs/common/controller/controller-delay.common.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

@Component({
  selector: 'sdux-pipeline-delay-controller',
  standalone: true,
  imports: [
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    DiagramComponent,
    PipelineRelatedTopicComponent,
    MatTabsModule,
    VaultControllerDelayCommonComponent,
    VaultControllerDelayFluentApiCommonComponent
  ],
  templateUrl: './delay.pipeline.component.html',
  styleUrls: ['../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineDelayControllerComponent {}
