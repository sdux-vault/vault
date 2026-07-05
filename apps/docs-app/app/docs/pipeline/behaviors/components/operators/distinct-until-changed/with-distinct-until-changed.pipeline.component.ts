import { Component, ViewEncapsulation } from '@angular/core';
import {
  DiagramComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { VaultDistinctUntilChangedBehaviorCommonComponent } from 'apps/docs-app/app/docs/common/distinct-until-change-behavior.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline distinct until changed documentation
 */
@Component({
  selector: 'sdux-pipeline-operators-with-distinct-until-changed',
  standalone: true,
  imports: [
    DiagramComponent,
    VaultDistinctUntilChangedBehaviorCommonComponent,
    PipelineRelatedTopicComponent,
    MultiFrameworkExampleComponent
  ],
  templateUrl: './with-distinct-until-changed.pipeline.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineOperatorsWithDistinctUntilChangedComponent {}
