import { Component, ViewEncapsulation } from '@angular/core';
import {
  DiagramComponent,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { EntityAccessBehaviorsCommonComponent } from 'apps/docs-app/app/docs/common/entity-access/entity-access-behaviors.common.component';
import { EntityAccessBehaviorSelectionCommonComponent } from 'apps/docs-app/app/docs/common/entity-access/entity-access-mechanism.common.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
/**
 * The pipeline entity-access documentation
 */
@Component({
  selector: 'sdux-pipeline-entity-access',
  standalone: true,
  imports: [
    DiagramComponent,
    FeatureCellBrandNameComponent,
    EntityAccessBehaviorSelectionCommonComponent,
    EntityAccessBehaviorsCommonComponent,
    PipelineRelatedTopicComponent
  ],
  templateUrl: './entity-access.pipeline.component.html',
  styleUrls: ['../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineEntityAccessComponent {}
