import { Component, ViewEncapsulation } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import {
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { VaultStepwiseFluentApiCommonComponent } from 'apps/docs-app/app/docs/common/stepwise/stepwise-fluent-api.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

@Component({
  selector: 'sdux-pipeline-stepwise-filter-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    PipelineRelatedTopicComponent,
    VaultStepwiseFluentApiCommonComponent,
    MatTabGroup,
    MatTab
  ],
  templateUrl: './with-stepwise-filter.pipeline.component.html',
  styleUrls: ['../../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineWithStepwiseFilterBehaviorComponent {}
