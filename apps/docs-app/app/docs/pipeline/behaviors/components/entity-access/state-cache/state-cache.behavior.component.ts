import { Component, ViewEncapsulation } from '@angular/core';
import {
  DiagramComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { EntityAccessBehaviorsCommonComponent } from 'apps/docs-app/app/docs/common/entity-access/entity-access-behaviors.common.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline state cache behavior documentation
 */
@Component({
  selector: 'sdux-pipeline-state-cache-behavior',
  standalone: true,
  imports: [
    MultiFrameworkExampleComponent,
    PipelineRelatedTopicComponent,
    DiagramComponent,
    EntityAccessBehaviorsCommonComponent
  ],
  templateUrl: './state-cache.behavior.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineStateCacheBehaviorComponent {}
