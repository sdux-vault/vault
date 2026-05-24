import { Component, ViewEncapsulation } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { VaultControllerStepwiseCommonComponent } from 'apps/docs-app/app/docs/common/controller/controller-stepwise.common.component';
import { VaultStepwiseDecisionShapeCommonComponent } from 'apps/docs-app/app/docs/common/stepwise/stepwise-decision-shape.component';
import { VaultStepwiseFunctionCommonComponent } from 'apps/docs-app/app/docs/common/stepwise/stepwise-function.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
@Component({
  selector: 'sdux-pipeline-stepwise-controller',
  standalone: true,
  imports: [
    RouterModule,
    DiagramComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    PipelineRelatedTopicComponent,
    MatTab,
    MatTabGroup,
    VaultStepwiseDecisionShapeCommonComponent,
    VaultStepwiseFunctionCommonComponent,
    VaultControllerStepwiseCommonComponent
  ],
  templateUrl: './stepwise.pipeline.component.html',
  styleUrls: ['../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineStepwiseControllerComponent {}
