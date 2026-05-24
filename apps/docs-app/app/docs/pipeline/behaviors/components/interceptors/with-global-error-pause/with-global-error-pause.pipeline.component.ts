import { Component, ViewEncapsulation } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { VaultInterceptorCommonComponent } from 'apps/docs-app/app/docs/common/interceptor/interceptor-behaviors.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

@Component({
  selector: 'sdux-pipeline-interceptors-with-global-error-pause-behavior',
  standalone: true,
  imports: [
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    DiagramComponent,
    PipelineRelatedTopicComponent,
    MatTabGroup,
    MatTab,
    VaultInterceptorCommonComponent
  ],
  templateUrl: './with-global-error-pause.pipeline.component.html',
  styleUrls: ['../../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineInterceptorsWithGlobalErrorPauseBehaviorComponent {}
