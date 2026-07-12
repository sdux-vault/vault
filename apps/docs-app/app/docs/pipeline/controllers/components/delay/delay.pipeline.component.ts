import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { VaultControllerDelayFluentApiCommonComponent } from 'apps/docs-app/app/docs/common/controller/controller-delay-fluent-api.component';
import { VaultControllerDelayCommonComponent } from 'apps/docs-app/app/docs/common/controller/controller-delay.common.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { StackBlitzTryItLiveComponent } from '../../../../stack-blitz/try-it-live/stack-blitz-try-it-live.component';

@Component({
  selector: 'sdux-pipeline-delay-controller',
  standalone: true,
  imports: [
    MultiFrameworkExampleComponent,
    RouterModule,
    DiagramComponent,
    PipelineRelatedTopicComponent,
    VaultControllerDelayCommonComponent,
    VaultControllerDelayFluentApiCommonComponent,
    StackBlitzTryItLiveComponent
  ],
  templateUrl: './delay.pipeline.component.html',
  styleUrls: ['../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineDelayControllerComponent {}
