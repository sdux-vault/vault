import { Component, ViewEncapsulation } from '@angular/core';
import {
  DiagramComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { EntityAccessBehaviorsCommonComponent } from 'apps/docs-app/app/docs/common/entity-access/entity-access-behaviors.common.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline lookup behavior documentation
 */
@Component({
  selector: 'sdux-pipeline-lookup-behavior',
  standalone: true,
  imports: [
    MultiFrameworkExampleComponent,
    PipelineRelatedTopicComponent,
    DiagramComponent,
    EntityAccessBehaviorsCommonComponent
  ],
  templateUrl: './lookup.behavior.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineLookupBehaviorComponent {}
