import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent,
  MultiFrameworkExampleComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';
import { VaultStepwiseDecisionShapeCommonComponent } from 'apps/docs-app/app/docs/common/stepwise/stepwise-decision-shape.component';
import { VaultStepwiseFluentApiCommonComponent } from 'apps/docs-app/app/docs/common/stepwise/stepwise-fluent-api.component';
import { VaultStepwiseFunctionCommonComponent } from 'apps/docs-app/app/docs/common/stepwise/stepwise-function.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
@Component({
  selector: 'sdux-pipeline-stepwise-behavior',
  standalone: true,
  imports: [
    BrandNameComponent,
    RouterModule,
    DiagramComponent,
    MultiFrameworkExampleComponent,
    PipelineRelatedTopicComponent,
    VaultStepwiseFluentApiCommonComponent,
    VaultStepwiseDecisionShapeCommonComponent,
    VaultStepwiseFunctionCommonComponent,
    PackageNameComponent
  ],
  templateUrl: './stepwise.pipeline.component.html',
  styleUrls: ['../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineStepwiseBehaviorComponent {}
