import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { VaultReducerFunctionShapeCommonComponent } from 'apps/docs-app/app/docs/common/reducer-function-shape.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline reducers method documentation
 */
@Component({
  selector: 'sdux-pipeline-reducers-method',
  standalone: true,
  imports: [
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    DiagramComponent,
    VaultReducerFunctionShapeCommonComponent
  ],
  templateUrl: './reducers.method.component.html',
  styleUrls: ['../../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineReducersMethodComponent {}
