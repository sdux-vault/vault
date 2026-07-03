import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { VaultControllerMaxFailuresFluentApiCommonComponent } from 'apps/docs-app/app/docs/common/controller/controller-max-failures-fluent-api.component';
import { VaultControllerMaxFailuresCommonComponent } from 'apps/docs-app/app/docs/common/controller/controller-max-failures.common.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

@Component({
  selector: 'sdux-pipeline-max-failures-controller',
  standalone: true,
  imports: [
    MultiFrameworkExampleComponent,
    RouterModule,
    DiagramComponent,
    PipelineRelatedTopicComponent,
    VaultControllerMaxFailuresCommonComponent,
    VaultControllerMaxFailuresFluentApiCommonComponent
  ],
  templateUrl: './max-failures.pipeline.component.html',
  styleUrls: ['../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineMaxFailuresControllerComponent {}
