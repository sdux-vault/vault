import { Component, ViewEncapsulation } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import {
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { EntityAccessBehaviorsCommonComponent } from 'apps/docs-app/app/docs/common/entity-access/entity-access-behaviors.common.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline query behavior documentation
 */
@Component({
  selector: 'sdux-pipeline-query-behavior',
  standalone: true,
  imports: [
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    PipelineRelatedTopicComponent,
    DiagramComponent,
    MatTabGroup,
    MatTab,
    EntityAccessBehaviorsCommonComponent
  ],
  templateUrl: './query.behavior.component.html',
  styleUrls: ['../../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineQueryBehaviorComponent {}
