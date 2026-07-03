import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent
} from '@sdux-vault/ui/web-components';
import { VaultControllerDelayCommonComponent } from 'apps/docs-app/app/docs/common/controller/controller-delay.common.component';
import { VaultControllerReplayGlobalErrorCommonComponent } from 'apps/docs-app/app/docs/common/controller/controller-replay-global-error.common.component';
import { VaultControllerStepwiseCommonComponent } from 'apps/docs-app/app/docs/common/controller/controller-stepwise.common.component';
import { VaultControllerThrottleCommonComponent } from 'apps/docs-app/app/docs/common/controller/controller-throttle.common.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
@Component({
  selector: 'sdux-pipeline-policy',
  standalone: true,
  imports: [
    BrandNameComponent,
    RouterModule,
    DiagramComponent,
    PipelineRelatedTopicComponent,
    DiagramComponent,
    BrandNameComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    VaultControllerDelayCommonComponent,
    VaultControllerThrottleCommonComponent,
    VaultControllerStepwiseCommonComponent,
    VaultControllerReplayGlobalErrorCommonComponent
  ],
  templateUrl: './policy.pipeline.component.html',
  styleUrls: ['../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelinePolicyComponent {}
