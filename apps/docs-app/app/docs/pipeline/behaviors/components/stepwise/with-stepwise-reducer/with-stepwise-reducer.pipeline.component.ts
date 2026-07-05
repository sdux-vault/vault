import { Component, ViewEncapsulation } from '@angular/core';
import {
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { VaultStepwiseFluentApiCommonComponent } from 'apps/docs-app/app/docs/common/stepwise/stepwise-fluent-api.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

@Component({
  selector: 'sdux-pipeline-stepwise-reducer-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    MultiFrameworkExampleComponent,
    PipelineRelatedTopicComponent,
    VaultStepwiseFluentApiCommonComponent
  ],
  templateUrl: './with-stepwise-reducer.pipeline.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineWithStepwiseReducerBehaviorComponent {}
